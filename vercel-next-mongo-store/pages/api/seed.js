import dbConnect from "../../lib/mongodb";
import Product from "../../models/Product";
const items = [
  "Steam Wallet Code","Xbox Game Pass","PlayStation Plus","Netflix Premium","Discord Nitro",
  "Spotify Premium","Adobe Photoshop","Windows 11 Pro Key","Office 365","Epic Games Gift Card",
  "PUBG UC","Valorant Points","Roblox Gift Card","Nintendo eShop","Minecraft Java",
  "Elden Ring Steam Key","Cyberpunk 2077","GTA V","Apex Coins","Battle.net Balance"
].map((title,i)=>({title,description:"Digital item — instant delivery via Telegram.",price:(i+1)*2+3,image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",category:"Digital"}));
export default async function handler(req,res){try{await dbConnect();await Product.deleteMany({});const out=await Product.insertMany(items);res.status(200).json({inserted:out.length});}catch(e){res.status(500).json({error:e.message});}}