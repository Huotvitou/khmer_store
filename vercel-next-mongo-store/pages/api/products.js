import dbConnect from "../../lib/mongodb";
import Product from "../../models/Product";
function isAuthorized(req){const key=req.headers["x-admin-key"];return key && process.env.ADMIN_PASSWORD && key===process.env.ADMIN_PASSWORD;}
export default async function handler(req,res){
  try{await dbConnect();}catch(e){return res.status(500).json({error:"DB Connect failed",detail:e.message});}
  const {method,query}=req;
  if(method==="GET"){const items=await Product.find({}).sort({createdAt:-1});return res.status(200).json(items);}
  if(method==="POST"){if(!isAuthorized(req)) return res.status(401).send("Unauthorized"); const body=req.body||{}; if(!body.title||typeof body.price==="undefined"){return res.status(400).json({error:"title and price are required"});} const created=await Product.create(body); return res.status(201).json(created);}
  if(method==="DELETE"){if(!isAuthorized(req)) return res.status(401).send("Unauthorized"); const id=query.id; if(!id) return res.status(400).json({error:"missing id"}); await Product.findByIdAndDelete(id); return res.status(204).end();}
  if(method==="PUT"){if(!isAuthorized(req)) return res.status(401).send("Unauthorized"); const id=query.id; if(!id) return res.status(400).json({error:"missing id"}); const updated=await Product.findByIdAndUpdate(id,req.body,{new:true}); return res.status(200).json(updated);}
  res.setHeader("Allow","GET,POST,PUT,DELETE"); return res.status(405).json({error:"Method Not Allowed"});
}