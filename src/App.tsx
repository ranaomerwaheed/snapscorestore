import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Infinity, 
  Lock, 
  Star, 
  MessageCircle, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Users, 
  Eye, 
  BadgeCheck, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCcw, 
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';

const WHATSAPP_NUMBER = "+923431390157";

// Pricing and Packages preserved from original file
const scoreAccountsStock = [
  { id: 'sa5k', amount: '5,000', price: '$3', type: 'Starter', desc: { en: 'Starter Score Account', ar: 'حساب سكور بداية' } },
  { id: 'sa10k', amount: '10,000', price: '$5', type: 'Basic', desc: { en: 'Aged Score Account', ar: 'حساب سكور قديم' } },
  { id: 'sa100k', amount: '100,000', price: '$14', type: 'Influencer', desc: { en: 'Influencer Ready', ar: 'جاهز للمؤثرين' } },
  { id: 'sa1m', amount: '1,000,000', price: '$50', type: 'Legendary', desc: { en: 'Legendary Status', ar: 'حالة أسطورية' } },
  { id: 'sa10m', amount: '10,000,000', price: '$500', type: 'Ultimate', desc: { en: 'Ultimate Authority', ar: 'السلطة القصوى' } },
];

const followerAccountsStock = [
  { id: 'fa5k', amount: '5,000', price: '$45', type: 'Rising Star' },
  { id: 'fa50k', amount: '50,000', price: '$350', type: 'Elite' },
];

// Testimonials with original images
const testimonials = [
  {
    name: { en: "Ahmed Al-Harbi", ar: "أحمد الحربي" },
    avatar: "https://i.pinimg.com/736x/d4/d1/09/d4d10914504759b9c917d0b338e13744.jpg",
    text: { en: "Best service in the Middle East. My Snap score reached 1M in just 2 days.", ar: "أفضل خدمة في الشرق الأوسط. وصل سكور حسابي إلى مليون في يومين فقط." }
  },
  {
    name: { en: "Sara Mohammed", ar: "سارة محمد" },
    avatar: "https://i.pinimg.com/1200x/3d/b5/31/3db5313f860c6c6f67480f238e2e4f27.jpg",
    text: { en: "Service was extremely professional. Highly recommended.", ar: "الخدمة كانت احترافية للغاية. أنصح فيهم وبقوة." }
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'shop' | 'blog'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <span className="text-xl font-black italic tracking-tighter">SNAP BOOST</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-gray-400">
            <button onClick={() => setView('home')} className={view === 'home' ? 'text-yellow-400' : ''}>{lang === 'en' ? 'Home' : 'الرئيسية'}</button>
            <button onClick={() => setView('shop')} className={view === 'shop' ? 'text-yellow-400' : ''}>{lang === 'en' ? 'Shop' : 'المتجر'}</button>
            <button onClick={() => setView('blog')} className={view === 'blog' ? 'text-yellow-400' : ''}>{lang === 'en' ? 'Blog' : 'المدونة'}</button>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-yellow-400 transition-all">
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {view === 'home' && (
        <main className="pt-32 pb-20 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-[10px] font-black tracking-widest mb-6">
              10,000+ CLIENTS TRUSTED
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              {lang === 'en' ? 'BOOST YOUR SNAPCHAT' : 'ارفع سكور السناب شات'} <br />
              <span className="text-yellow-400 italic">INSTANTLY</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12">
              {lang === 'en' ? 'Securely increase your Snap Score and get aged accounts starting from just $3.' : 'زد سكور حسابك بأمان واحصل على حسابات قديمة بأسعار تبدأ من 3 دولار فقط.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setView('shop')} className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all flex items-center gap-2">
                {lang === 'en' ? 'VIEW CATALOG' : 'عرض الكتالوج'} <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => openWhatsApp("I want to inquire about Snap services")} className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                {lang === 'en' ? 'CONTACT US' : 'اتصل بنا'}
              </button>
            </div>
          </motion.div>

          {/* Testimonials preserved with original avatars */}
          <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-right flex flex-col items-center md:items-start">
                <img src={t.avatar} className="w-16 h-16 rounded-full mb-6 border-2 border-yellow-400 object-cover" alt="User" />
                <p className="text-gray-300 italic mb-4">"{lang === 'en' ? t.text.en : t.text.ar}"</p>
                <h4 className="font-bold text-yellow-400">-{lang === 'en' ? t.name.en : t.name.ar}</h4>
              </div>
            ))}
          </section>
        </main>
      )}

      {/* Shop Section - Original Pricing Preserved */}
      {view === 'shop' && (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-black italic mb-12 text-center underline decoration-yellow-400 underline-offset-8">PREMIUM STOCK</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scoreAccountsStock.map((pkg) => (
              <div key={pkg.id} className="p-8 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] hover:border-yellow-400 transition-all group">
                <span className="bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase mb-6 inline-block">{pkg.type}</span>
                <h3 className="text-4xl font-black mb-2 italic">{pkg.amount} <span className="text-lg font-normal text-gray-400">Score</span></h3>
                <div className="text-3xl font-black text-yellow-400 mb-8">{pkg.price}</div>
                <button 
                  onClick={() => openWhatsApp(`I want to buy ${pkg.amount} Score package for ${pkg.price}`)}
                  className="w-full bg-white text-black py-4 rounded-xl font-black flex items-center justify-center gap-2 group-hover:bg-yellow-400 transition-all"
                >
                  ORDER VIA WHATSAPP <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating WhatsApp with original branding */}
      <button 
        onClick={() => openWhatsApp("Hello Snap Boost!")}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
      </button>

      <footer className="py-10 text-center border-t border-white/5 opacity-50 text-[10px] font-bold tracking-[0.3em]">
        © 2026 SNAP BOOST @SNAPSCORESTORE
      </footer>
    </div>
  );
}
