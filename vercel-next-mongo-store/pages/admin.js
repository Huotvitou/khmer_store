import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
export default function Admin(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({title:"",price:"",description:"",image:"",category:""});
  const [adminKey,setAdminKey]=useState("");
  useEffect(()=>{fetch("/api/products").then(r=>r.json()).then(setItems);const s=localStorage.getItem("admin_key");if(s) setAdminKey(s);},[]);
  const save=()=>{localStorage.setItem("admin_key",adminKey);alert("Admin key saved (header x-admin-key).");};
  const submit=async(e)=>{e.preventDefault();const res=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json","x-admin-key":adminKey},body:JSON.stringify({...form,price:Number(form.price)})}); if(res.ok){const c=await res.json();setItems([c,...items]);setForm({title:"",price:"",description:"",image:"",category:""});} else {alert("Failed: "+await res.text());}};
  const del=async(id)=>{if(!confirm("Delete?"))return;const res=await fetch("/api/products?id="+id,{method:"DELETE",headers:{"x-admin-key":adminKey}}); if(res.ok) setItems(items.filter(i=>i._id!==id)); else alert("Failed: "+await res.text());};
  return (<main><Navbar/>
    <section className="container py-8 space-y-6">
      <div className="card p-4"><h2 className="text-xl font-semibold mb-3">Admin Key</h2>
        <div className="flex gap-3"><input value={adminKey} onChange={e=>setAdminKey(e.target.value)} placeholder="Enter ADMIN_PASSWORD" className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none"/><button className="btn" onClick={save}>Save</button></div>
        <p className="text-xs text-slate-400 mt-2">Use the same value as Vercel env <code>ADMIN_PASSWORD</code>.</p></div>
      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={submit} className="card p-4 space-y-3">
          <h2 className="text-xl font-semibold">Add Product</h2>
          <input className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
          <input type="number" className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
          <input className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none" placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
          <input className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
          <textarea className="w-full px-3 py-2 rounded-xl bg-white/10 outline-none" placeholder="Description" rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea>
          <button className="btn w-full">Create</button>
        </form>
        <div className="md:col-span-2 card p-4"><h2 className="text-xl font-semibold mb-3">Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(i=>(<div key={i._id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm font-semibold">{i.title}</div>
              <div className="text-xs text-slate-400">${i.price}</div>
              <button onClick={()=>del(i._id)} className="mt-2 btn w-full">Delete</button>
            </div>))}
          </div>
        </div>
      </div>
    </section></main>);
}