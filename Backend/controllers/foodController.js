import foodModel from "../models/foodmodel.js";
import fs from "fs"

// add food items
const addFood = async (req, res) => {
    let image_filename=`${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price, 
        category:req.body.category,
        image: image_filename
        });
        try {
            await food.save();
            res.json({success:true,message:"Food Added"});
            } catch (err) {
                console.log(err);
                res.json({success:false,message:err.message});
                }

}
const listFood=async(req,res)=>{
    try {
        const food = await foodModel.find();
        res.json({success:true,data:food});
        } catch (err) {
        console.log(err);
        res.json({success:false,message:err.message});
        }     
}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) //deleting image from folder
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    
}
export{addFood,listFood,removeFood}
