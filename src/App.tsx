import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Optimized import
import { 
  Infinity, 
  Lock, 
  Star, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Globe,
  Users,
  Eye,
  BadgeCheck,
  CreditCard,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  ShoppingBag,
  ExternalLink,
  Menu,
  X,
  Languages
} from 'lucide-react';

const WHATSAPP_NUMBER = "+923431390157";

// Schema.org JSON-LD for Google Ranking (Global Trust)
const schemaMarkup = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "SnapScore Store - Snapchat Growth Services",
  "image": "https://snapscores.store/logo.png",
  "description": "Boost your Snapchat score safely and buy aged accounts. Trusted by 10,000+ clients globally.",
  "brand": {
    "@type": "Brand",
    "name": "SnapScore Store"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "10450"
  }
};

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      catalog: "Catalog",
      how: "How it Works",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contact",
      shop: "Shop Now",
      lang: "العربية"
    },
    hero: {
      badge: "Trusted by 10,000+ Clients Worldwide",
      title: "Dominate Snapchat Instantly",
      desc: "Securely increase your Snap Score, buy premium aged accounts, and grow your presence with the world's most trusted provider.",
      cta: "View Catalog",
      secondary: "Our Services",
    },
    shop: {
      title: "Premium Catalog",
      subtitle: "Select the perfect package for your global presence",
      scoreAccounts: "Score Accounts",
      followerAccounts: "Follower Accounts",
      servicesTab: "Growth Services",
      buy: "Order via WhatsApp",
      price: "Price"
    },
    blog: {
      title: "Snapchat Tips & Global News",
      subtitle: "Stay ahead with the latest trends",
      readMore: "Read More",
      posts: [
        {
          title: "Snapchat Account Safety Guide 2026",
          date: "March 18, 2026",
          excerpt: "Effective and safe methods to prevent bans while boosting your profile.",
          image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "The Value of Aged Accounts (2011-2020)",
          date: "March 15, 2026",
          excerpt: "Why established accounts carry more trust and authority in the algorithm.",
          image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "Snapchat Growth Strategies for Businesses",
          date: "March 10, 2026",
          excerpt: "How to use high scores to attract more organic clients globally.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    // ... adding more keys as needed for worldwide focus
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "خدماتنا",
      catalog: "الكتالوج",
      how: "كيف نعمل",
      faq: "الأسئلة الشائعة",
      blog: "المدونة",
      contact: "اتصل بنا",
      shop: "تسوق الآن",
      lang: "English"
    },
    hero: {
      badge: "موثوق من قبل +10,000 عميل عالمياً",
      title: "ارفع سكور السناب شات فوراً",
      desc: "زد سكور حسابك بأمان، احصل على حسابات قديمة، ونمِ متابعيك مع المزود الأكثر ثقة في الخليج والعالم.",
      cta: "عرض الكتالوج",
      secondary: "خدماتنا",
    },
    blog: {
      title: "نصائح وأخبار سناب شات",
      subtitle: "ابقَ على اطلاع بأحدث الاتجاهات والاستراتيجيات",
      readMore: "اقرأ المزيد",
      posts: [
        {
          title: "دليل أمان حساب سناب شات 2026",
          date: "١٨ مارس ٢٠٢٦",
          excerpt: "طرق فعالة وآمنة لمنع الحظر أثناء رفع ملفك الشخصي.",
          image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "أهمية الحسابات القديمة (٢٠١١-٢٠٢٠)",
          date: "١٥ مارس ٢٠٢٦",
          excerpt: "لماذا تتمتع الحسابات القديمة بموثوقية أكبر في خوارزمية السناب.",
          image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=800"
        },
        {
          title: "استراتيجيات نمو سناب شات للأعمال",
          date: "١٠ مارس ٢٠٢٦",
          excerpt: "كيفية استخدام السكور العالي لجذب المزيد من العملاء الحقيقيين.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        }
      ]
    }
  }
};

const worldwideReviews = [
  {
    id: 1,
    name: "James Wilson",
    country: "🇺🇸 USA",
    date: "2 days ago",
    rating: 5,
    text: "Amazing service! My Snap score increased by 500k in less than 24 hours. Communication was super smooth.",
    verified: true,
  },
  {
    id: 2,
    name: "عبدالعزيز الشمري",
    country: "🇸🇦 Saudi Arabia",
    date: "5 days ago",
    rating: 5,
    text: "خدمة ممتازة وسريعة جداً. اشتريت حساب قديم من ٢٠١٤ وكان الشغل احترافي. أنصح الجميع بالتعامل معهم.",
    verified: true,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    country: "🇬🇧 UK",
    date: "1 week ago",
    rating: 5,
    text: "I was skeptical at first, but SnapScore Store is legit. Safest way to boost your profile without risk.",
    verified: true,
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'shop' | 'blog' | 'checkout'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black font-${lang === 'ar' ? 'cairo' : 'sans'}`}>
      
      {/* SEO Script Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            <span className="text-xl font-black tracking-tighter italic">SNAPify <span className="text-yellow-400 italic font-normal text-sm">@snapscorestore</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-bold text-sm text-gray-400 uppercase tracking-widest">
            <button onClick={() => setView('home')} className="hover:text-yellow-400 transition-colors">Home</button>
            <button onClick={() => setView('shop')} className="hover:text-yellow-400 transition-colors">Shop</button>
            <button onClick={() => setView('blog')} className="hover:text-yellow-400 transition-colors">Blog</button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-yellow-400 transition-all"
            >
              <Languages className="w-4 h-4" /> {t.nav.lang}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* Hero Section */}
              <section className="relative px-6 py-20 text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-8 uppercase tracking-widest">
                  <BadgeCheck className="w-4 h-4" /> {t.hero.badge}
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                  {t.hero.title}
                </h1>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button onClick={() => setView('shop')} className="w-full md:w-auto px-10 py-5 bg-yellow-400 text-black font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    {t.hero.cta} <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all">
                    {t.hero.secondary}
                  </button>
                </div>
              </section>

              {/* Verified Reviews Section (Global Focus) */}
              <section className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">Trusted Globally</h2>
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                      <span className="text-white font-bold ml-2">4.9/5 Average Rating</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {worldwideReviews.map((review) => (
                      <div key={review.id} className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-yellow-400/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <p className="text-gray-500 text-sm">{review.country} • {review.date}</p>
                          </div>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-green-400 text-[10px] font-black bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                              VERIFIED
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 italic mb-6">"{review.text}"</p>
                        <div className="flex gap-1 text-yellow-400">
                           {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" className="w-3 h-3" />)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6" />
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {view === 'blog' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black mb-4">{t.blog.title}</h2>
                <p className="text-gray-500">{t.blog.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {t.blog.posts.map((post, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-3xl mb-6">
                      <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 px-4 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-3 group-hover:text-yellow-400 transition-colors">{post.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <button className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-tighter">
                      {t.blog.readMore} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* ... Add other views here ... */}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-10">
            <a href="https://instagram.com/snapscorestore" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Instagram /></a>
            <a href="https://twitter.com/snapscorestore" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Twitter /></a>
            <a href="https://tiktok.com/@snapscorestore" target="_blank" className="text-gray-500 hover:text-white transition-colors"><MessageCircle /></a>
            <a href="https://reddit.com/u/snapscorestore" target="_blank" className="text-gray-500 hover:text-white transition-colors"><ExternalLink /></a>
          </div>
          <p className="text-gray-600 font-bold mb-4">{t.footer.rights}</p>
          <div className="flex justify-center gap-6 text-sm text-gray-700 font-bold">
            <a href="#" className="hover:text-gray-400">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gray-400">{t.footer.terms}</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className="fixed bottom-8 right-8 z-[100] p-5 bg-green-500 text-white rounded-full shadow-[0_20px_50px_rgba(34,197,94,0.3)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}
