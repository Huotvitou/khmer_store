import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import dbConnect from "../lib/mongodb";
import Product from "../models/Product";
export default function Home({items}){
  return (<main><Navbar/>
    <section className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Digital Store – Steam Keys, DLCs, Subscriptions, Software</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((p)=><ProductCard key={p._id} p={p}/>)}
      </div>
    </section></main>);
}
export async function getServerSideProps(){
  await dbConnect();
  const items = await Product.find({}).sort({createdAt:-1}).lean();
  const serialized = items.map(i=>({...i,_id:i._id.toString(),createdAt:i.createdAt?.toString()||""}));
  return {props:{items:serialized}};
}