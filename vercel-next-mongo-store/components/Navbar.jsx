export default function Navbar(){
  return (<header className="border-b border-white/10 sticky top-0 z-30 bg-[#0b1020]/80 backdrop-blur">
    <div className="container py-4 flex items-center justify-between">
      <a href="/" className="text-xl font-bold tracking-wide"><span className="text-brand-400">Vitou</span> Store</a>
      <nav className="flex items-center gap-3">
        <a className="btn" href="/admin">Admin</a>
        <a className="btn" href="https://t.me/Vitouhuot" target="_blank" rel="noreferrer">Telegram</a>
      </nav>
    </div></header>);
}