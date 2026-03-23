import React, { useState, useEffect } from 'react';
import { 
  Star, 
  TrendingUp, 
  Zap, 
  BadgeCheck, 
  Users, 
  MessageCircle, 
  ArrowRight,
  Instagram,
  Twitter,
  Globe,
  Languages,
  Menu,
  X
} from 'lucide-react';

const WHATSAPP_NUMBER = "+923431390157";

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState('home');

  // Page Direction Fix
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = {
    en: {
      hero: "Boost Your Snapchat Presence Instantly",
      sub: "Trusted by 10,000+ Clients Worldwide. Securely increase your Snap Score and buy premium aged accounts.",
      cta: "View Catalog",
      langBtn: "العربية"
    },
    ar: {
      hero: "ارفع سكور السناب شات فوراً",
      sub: "موثوق من قبل +10,000 عميل عالمياً. زد سكور حسابك بأمان واحصل على حسابات قديمة.",
      cta: "عرض الكتالوج",
      langBtn: "English"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-black tracking-tighter">SNAPIFY <span className="text-yellow-400 text-xs">@snapscorestore</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10 hover:bg-white/10 transition-all"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform">
              {lang === 'en' ? 'SHOP NOW' : 'تسوق الآن'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-[10px] font-black tracking-widest mb-8">
            <BadgeCheck className="w-4 h-4" /> VERIFIED GLOBAL PROVIDER
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            {lang === 'en' ? t.en.hero : t.ar.hero}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' ? t.en.sub : t.ar.sub}
          </p>
          <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-colors flex items-center gap-3 mx-auto">
            {lang === 'en' ? t.en.cta : t.ar.cta} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Section (Worldwide Reviews) */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12 italic underline decoration-yellow-400">WORLDWIDE TRUSTED</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-yellow-400/50 transition-all">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-sm">James W. 🇺🇸</span>
                <span className="text-green-400 text-[10px] font-bold bg-green-400/10 px-2 py-1 rounded">VERIFIED</span>
              </div>
              <p className="text-gray-400 italic text-sm mb-4">"Best service for Snap Score! Got 500k in one day. Very safe."</p>
              <div className="flex text-yellow-400 gap-1"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
            </div>
            {/* Review 2 */}
            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-yellow-400/50 transition-all">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-sm">عبدالعزيز 🇸🇦</span>
                <span className="text-green-400 text-[10px] font-bold bg-green-400/10 px-2 py-1 rounded">VERIFIED</span>
              </div>
              <p className="text-gray-400 italic text-sm mb-4">"خدمة ممتازة وسريعة جداً. أنصح بالتعامل معهم لزيادة السكور."</p>
              <div className="flex text-yellow-400 gap-1"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
            </div>
            {/* Review 3 */}
            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-yellow-400/50 transition-all">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-sm">Sarah J. 🇬🇧</span>
                <span className="text-green-400 text-[10px] font-bold bg-green-400/10 px-2 py-1 rounded">VERIFIED</span>
              </div>
              <p className="text-gray-400 italic text-sm mb-4">"Professional and fast. The aged account I bought is perfect."</p>
              <div className="flex text-yellow-400 gap-1"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Payment Badges */}
      <div className="py-10 border-t border-white/5 flex flex-wrap justify-center gap-10 opacity-30 grayscale">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-5" alt="Stripe" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-5" alt="Visa" />
      </div>

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] p-5 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}
