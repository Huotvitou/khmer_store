import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({title:{type:String,required:true},description:{type:String,default:""},price:{type:Number,required:true,min:0},image:{type:String,default:""},category:{type:String,default:"Digital"}},{timestamps:true});
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);