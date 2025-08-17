export default function ProductCard({p}){
  const openTelegram=()=>{const msg=encodeURIComponent(`I want to buy: ${p.title} ($${p.price})`);window.open(`https://t.me/Vitouhuot?text=${msg}`,"_blank");};
  return (<div className="card overflow-hidden">
    <img src={p.image||`https://images.unsplash.com/photo-1605901309584-818e25960a8c?q=80&w=1200&auto=format&fit=crop`} alt={p.title} className="h-40 w-full object-cover"/>
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between"><h3 className="font-semibold">{p.title}</h3><span className="text-brand-300 font-semibold">${p.price}</span></div>
      <p className="text-sm text-slate-300 line-clamp-2">{p.description}</p>
      <button onClick={openTelegram} className="btn w-full">Buy via Telegram</button>
    </div></div>);
}