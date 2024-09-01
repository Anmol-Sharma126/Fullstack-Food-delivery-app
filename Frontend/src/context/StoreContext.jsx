import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "http://localhost:6969";

    // Save cartItems to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Load cartItems from localStorage when the component mounts
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ 
            ...prev, 
            [itemId]: (prev[itemId] || 0) + 1 
        }));
        
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 1) - 1;
            if (newCount <= 0) {
                const updatedCartItems = { ...prev };
                delete updatedCartItems[itemId];
                return updatedCartItems;
            }
            return { ...prev, [itemId]: newCount };
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, itemId) => {
            const item = food_list.find((product) => product._id === itemId);
            return totalAmount + (item?.price || 0) * (cartItems[itemId] || 0);
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.CartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
