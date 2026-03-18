import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Bitcoin,
  Wallet,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  ShoppingBag
} from 'lucide-react';

const WHATSAPP_NUMBER = "+923431390157";

const translations = {
  en: {
    nav: {
      contact: "Contact Us",
      lang: "العربية",
      blog: "Blog",
      packages: "Packages"
    },
    hero: {
      title: "Boost Your",
      titleHighlight: "Snap Score",
      subtitle: "Safely & Professionally",
      desc: "Our services are tailored for the elite in the GCC. We guarantee real growth, 14-day money-back guarantee, and zero risk to your account.",
      cta: "View Packages",
      protection: "100% Ban Protection"
    },
    guarantee: {
      title: "14-Day Money-Back Guarantee",
      desc: "Not satisfied with the results? We'll refund your payment within 14 days, no questions asked."
    },
    checkout: {
      details: "Account Details",
      username: "Snapchat Username",
      password: "Password (Required for Score)",
      notice: "Important: We need access to post snaps to increase your score. Your data is encrypted and deleted after service. We provide a 14-day money-back guarantee if the service is not delivered as promised.",
      productDetails: "This service includes a permanent boost to your Snapchat score. The process is manual and 100% safe. Delivery time: 24-48 hours.",
      button: "Check Out Now",
      paymentTitle: "Select Payment Method",
      processing: "Processing Your Order...",
      summary: "Order Summary",
      package: "Package",
      price: "Price"
    },
    packages: {
      title: "Snap Score Packages",
      subtitle: "Select the perfect boost for your profile",
      buy: "Buy Now"
    },
    why: {
      title: "Why Professionals Choose Us?",
      items: [
        { title: "Total Privacy", desc: "We never ask for access to your private chats or photos." },
        { title: "Guaranteed Safety", desc: "We use manual and professional methods that guarantee your account's safety from bans." },
        { title: "Lifetime Warranty", desc: "Permanent results that don't decrease over time, with continuous technical support." }
      ]
    },
    catalog: {
      title: "Snapchat Accounts",
      titleHighlight: "Available",
      subtitle: "Choose the perfect aged account for your presence",
      order: "Order via WhatsApp"
    },
    services: {
      title: "Our Premium",
      titleHighlight: "Services",
      subtitle: "For the Digital Elite",
      items: [
        { title: "Score Booster", desc: "Rapidly increase your snap score with our safe, manual methods.", icon: <TrendingUp className="w-8 h-8 text-snap-yellow" /> },
        { title: "Verified Badge", desc: "Assistance in obtaining the prestigious verified star for your profile.", icon: <BadgeCheck className="w-8 h-8 text-snap-yellow" /> },
        { title: "Snapchat Views", desc: "Boost your story views and reach a wider audience instantly.", icon: <Eye className="w-8 h-8 text-snap-yellow" /> },
        { title: "Followers Growth", desc: "Gain real, active followers to build your influence and brand.", icon: <Users className="w-8 h-8 text-snap-yellow" /> }
      ]
    },
    how: {
      title: "How It Works",
      steps: [
        { title: "Choose Package", desc: "Select the score or account package that fits your needs.", icon: <Zap className="w-6 h-6" /> },
        { title: "Contact Us", desc: "Send us your details via WhatsApp for a quick consultation.", icon: <MessageCircle className="w-6 h-6" /> },
        { title: "Fast Delivery", desc: "Watch your score grow safely within 24-48 hours.", icon: <CheckCircle2 className="w-6 h-6" /> }
      ]
    },
    stats: {
      items: [
        { label: "Happy Clients", value: "10K+" },
        { label: "Accounts Boosted", value: "25K+" },
        { label: "Years Experience", value: "5+" },
        { label: "Support", value: "24/7" }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is it safe for my account?", a: "Yes, we use manual methods that comply with Snapchat's safety guidelines to ensure zero risk of bans." },
        { q: "How long does it take?", a: "Most orders are completed within 24 to 48 hours depending on the package size." },
        { q: "Do you need my password?", a: "For score boosting, we only need your username. For account purchases, we provide full access details." },
        { q: "Is there a warranty?", a: "We provide a lifetime warranty on all our scores and accounts. If anything drops, we refill it for free." }
      ]
    },
    testimonials: {
      title: "What Our GCC Clients Say"
    },
    blog: {
      title: "Latest News & Tips",
      subtitle: "Stay updated with Snapchat trends in the Gulf",
      readMore: "Read More",
      posts: [
        { title: "How to Increase Your Snap Score Safely in 2026", date: "March 15, 2026", excerpt: "Discover the latest manual methods to boost your score without risking your account. We focus on organic growth patterns that keep your account healthy." },
        { title: "The Importance of Aged Snapchat Accounts for Influencers", date: "March 10, 2026", excerpt: "Why professional influencers prefer aged accounts over new ones for better reach and trust. Aged accounts have higher authority in the Snapchat algorithm." },
        { title: "Snapchat Verification: The Ultimate Guide for GCC Users", date: "March 5, 2026", excerpt: "Everything you need to know about getting the verified star in Saudi Arabia and UAE. Requirements, process, and professional tips for success." },
        { title: "Snapchat Marketing Trends in Saudi Arabia for 2026", date: "February 28, 2026", excerpt: "How businesses in KSA are leveraging Snapchat to reach younger audiences and drive sales effectively." }
      ]
    },
    payments: {
      title: "Secure Payment Methods",
      subtitle: "We accept various secure payment options for your convenience",
      methods: [
        { name: "Debit Card", desc: "Visa / Mastercard", icon: <CreditCard className="w-8 h-8" /> },
        { name: "Crypto", desc: "Bitcoin / USDT", icon: <Bitcoin className="w-8 h-8" /> },
        { name: "Payoneer", desc: "Global Transfer", icon: <Wallet className="w-8 h-8" /> },
        { name: "Payeer", desc: "Digital Wallet", icon: <Zap className="w-8 h-8" /> }
      ]
    },
    cta: {
      title: "Ready to Stand Out?",
      desc: "Contact us now on WhatsApp for a free consultation to boost your account score or get a premium account.",
      button: "Chat on WhatsApp"
    },
    footer: {
      rights: "© 2026 SNAP BOOST. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      serving: "Serving the Middle East:"
    }
  },
  ar: {
    nav: {
      contact: "اتصل بنا",
      lang: "English",
      blog: "المدونة",
      packages: "الباقات"
    },
    hero: {
      title: "ارفع سكور",
      titleHighlight: "سناب شات",
      subtitle: "بأمان واحترافية",
      desc: "خدماتنا مصممة خصيصاً للنخبة في دول الخليج. نضمن لك زيادة حقيقية، ضمان استرداد الأموال لمدة 14 يوماً، وبدون أي مخاطر على حسابك.",
      cta: "عرض الباقات",
      protection: "ضمان عدم الحظر 100%"
    },
    guarantee: {
      title: "ضمان استرداد الأموال لمدة 14 يوماً",
      desc: "غير راضٍ عن النتائج؟ سنعيد لك أموالك في غضون 14 يوماً، دون طرح أي أسئلة."
    },
    checkout: {
      details: "تفاصيل الحساب",
      username: "اسم مستخدم سناب شات",
      password: "كلمة المرور (مطلوبة للسكور)",
      notice: "هام: نحتاج إلى الوصول لنشر السنابات لزيادة السكور الخاص بك. بياناتك مشفرة ويتم حذفها بعد الخدمة. نقدم ضمان استرداد الأموال لمدة 14 يوماً إذا لم يتم تقديم الخدمة كما هو موعود.",
      productDetails: "تتضمن هذه الخدمة زيادة دائمة في سكور سناب شات الخاص بك. العملية يدوية وآمنة بنسبة 100%. وقت التسليم: 24-48 ساعة.",
      button: "الدفع الآن",
      paymentTitle: "اختر طريقة الدفع",
      processing: "جاري معالجة طلبك...",
      summary: "ملخص الطلب",
      package: "الباقة",
      price: "السعر"
    },
    packages: {
      title: "باقات سكور سناب شات",
      subtitle: "اختر الزيادة المثالية لملفك الشخصي",
      buy: "اشترِ الآن"
    },
    why: {
      title: "لماذا يختارنا المحترفون؟",
      items: [
        { title: "خصوصية تامة", desc: "نحن لا نطلب الدخول إلى محادثاتك أو صورك الخاصة أبداً." },
        { title: "أمان مضمون", desc: "نستخدم طرقاً يدوية واحترافية تضمن سلامة حسابك من الحظر." },
        { title: "ضمان مدى الحياة", desc: "نتائج دائمة ولا تنقص مع مرور الوقت، مع دعم فني مستمر." }
      ]
    },
    catalog: {
      title: "حسابات سناب شات",
      titleHighlight: "متوفرة",
      subtitle: "اختر الحساب القديم المثالي لحضورك الرقمي",
      order: "اطلب عبر واتساب"
    },
    services: {
      title: "خدماتنا",
      titleHighlight: "الفاخرة",
      subtitle: "للنخبة الرقمية",
      items: [
        { title: "زيادة السكور", desc: "ارفع نقاط السناب شات بسرعة وبطرق يدوية آمنة تماماً.", icon: <TrendingUp className="w-8 h-8 text-snap-yellow" /> },
        { title: "توثيق الحساب", desc: "مساعدة احترافية للحصول على نجمة التوثيق الذهبية لملفك الشخصي.", icon: <BadgeCheck className="w-8 h-8 text-snap-yellow" /> },
        { title: "زيادة المشاهدات", desc: "عزز مشاهدات قصصك (ستوري) لتصل إلى جمهور أوسع فوراً.", icon: <Eye className="w-8 h-8 text-snap-yellow" /> },
        { title: "زيادة المتابعين", desc: "احصل على متابعين حقيقيين ومتفاعلين لبناء تأثيرك وعلامتك التجارية.", icon: <Users className="w-8 h-8 text-snap-yellow" /> }
      ]
    },
    how: {
      title: "كيف نعمل؟",
      steps: [
        { title: "اختر الباقة", desc: "اختر باقة السكور أو الحساب التي تناسب احتياجاتك.", icon: <Zap className="w-6 h-6" /> },
        { title: "تواصل معنا", desc: "أرسل لنا التفاصيل عبر الواتساب للحصول على استشارة سريعة.", icon: <MessageCircle className="w-6 h-6" /> },
        { title: "تسليم سريع", desc: "شاهد السكور يرتفع بأمان خلال 24-48 ساعة.", icon: <CheckCircle2 className="w-6 h-6" /> }
      ]
    },
    stats: {
      items: [
        { label: "عميل سعيد", value: "+10 آلاف" },
        { label: "حساب تم رفعه", value: "+25 ألف" },
        { label: "سنوات خبرة", value: "+5" },
        { label: "دعم فني", value: "24/7" }
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "هل الخدمة آمنة على حسابي؟", a: "نعم، نستخدم طرقاً يدوية تلتزم بمعايير الأمان لضمان عدم تعرض حسابك للحظر." },
        { q: "كم من الوقت يستغرق التنفيذ؟", a: "يتم تنفيذ معظم الطلبات خلال 24 إلى 48 ساعة حسب حجم الباقة المختارة." },
        { q: "هل تحتاجون كلمة المرور الخاصة بي؟", a: "لزيادة السكور نحتاج فقط اسم المستخدم. أما عند شراء حساب، فنحن نسلمك كافة بيانات الدخول." },
        { q: "هل يوجد ضمان؟", a: "نقدم ضماناً مدى الحياة على جميع خدماتنا. في حال حدوث أي نقص، نقوم بالتعويض مجاناً." }
      ]
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا في الخليج؟"
    },
    blog: {
      title: "آخر الأخبار والنصائح",
      subtitle: "ابقَ على اطلاع بأحدث اتجاهات سناب شات في الخليج",
      readMore: "اقرأ المزيد",
      posts: [
        { title: "كيف ترفع سكور سناب شات بأمان في 2026", date: "15 مارس 2026", excerpt: "اكتشف أحدث الطرق اليدوية لزيادة السكور دون المخاطرة بحسابك. نركز على أنماط النمو العضوي التي تحافظ على صحة حسابك." },
        { title: "أهمية حسابات سناب شات القديمة للمؤثرين", date: "10 مارس 2026", excerpt: "لماذا يفضل المؤثرون المحترفون الحسابات القديمة على الجديدة لانتشار وثقة أفضل. الحسابات القديمة لها سلطة أعلى في خوارزمية سناب شات." },
        { title: "توثيق سناب شات: الدليل الشامل لمستخدمي الخليج", date: "5 مارس 2026", excerpt: "كل ما تحتاج معرفته عن الحصول على نجمة التوثيق في السعودية والإمارات. المتطلبات، العملية، ونصائح احترافية للنجاح." },
        { title: "اتجاهات تسويق سناب شات في السعودية لعام 2026", date: "28 فبراير 2026", excerpt: "كيف تستفيد الشركات في المملكة العربية السعودية من سناب شات للوصول إلى الجماهير الشابة وزيادة المبيعات بفعالية." }
      ]
    },
    payments: {
      title: "طرق دفع آمنة",
      subtitle: "نقبل خيارات دفع متنوعة وآمنة لراحتك",
      methods: [
        { name: "بطاقة مدى / فيزا", desc: "فيزا / ماستركارد", icon: <CreditCard className="w-8 h-8" /> },
        { name: "العملات الرقمية", desc: "بيتكوين / USDT", icon: <Bitcoin className="w-8 h-8" /> },
        { name: "بايونير", desc: "تحويل عالمي", icon: <Wallet className="w-8 h-8" /> },
        { name: "بايير", desc: "محفظة رقمية", icon: <Zap className="w-8 h-8" /> }
      ]
    },
    cta: {
      title: "جاهز للتميز؟",
      desc: "تواصل معنا الآن عبر الواتساب واحصل على استشارة مجانية لرفع سكور حسابك أو شراء حساب مميز.",
      button: "تواصل عبر واتساب"
    },
    footer: {
      rights: "© 2026 سناب بوست. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      serving: "نخدم الشرق الأوسط:"
    }
  }
};

const testimonials = [
  {
    name: { en: "Abdullah Al-Otaibi", ar: "عبدالله العتيبي" },
    location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
    text: { 
      en: "Honestly, the service is very fast and the score increased incredibly in a short time. Thanks Snap Boost!",
      ar: "بصراحة الخدمة سريعة جداً والسكور ارتفع بشكل خيالي في وقت قصير. شكراً سناب بوست!"
    },
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: { en: "Fatima Al-Marri", ar: "فاطمة المري" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    text: {
      en: "I was worried about my account, but they reassured me and the service was extremely professional. Highly recommended.",
      ar: "كنت خايفة على حسابي بس طمنوني والخدمة كانت احترافية للغاية. أنصح فيهم وبقوة."
    },
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    name: { en: "Sultan Al-Kuwari", ar: "سلطان الكواري" },
    location: { en: "Doha, Qatar", ar: "الدوحة، قطر" },
    text: {
      en: "Best service I've dealt with in the Gulf. Credibility and speed in execution.",
      ar: "أفضل خدمة تعاملت معها في الخليج. مصداقية وسرعة في التنفيذ."
    },
    avatar: "https://picsum.photos/seed/user3/100/100"
  }
];

const catalog = [
  { score: "10K", price: "$15", description: { en: "Starter Boost", ar: "باقة البداية" } },
  { score: "20K", price: "$25", description: { en: "Growth Pack", ar: "باقة النمو" } },
  { score: "50K", price: "$45", description: { en: "Popularity Spike", ar: "باقة الانتشار" } },
  { score: "100K", price: "$80", description: { en: "Influencer Level", ar: "مستوى المؤثرين" } },
  { score: "200K", price: "$150", description: { en: "Pro Status", ar: "مستوى المحترفين" } },
  { score: "500K", price: "$350", description: { en: "Elite Presence", ar: "حضور النخبة" } },
  { score: "700K", price: "$450", description: { en: "Master Tier", ar: "فئة الماستر" } },
  { score: "1M", price: "$600", description: { en: "Legendary Account", ar: "حساب أسطوري" } },
  { score: "10M", price: "$4,500", description: { en: "Ultimate Authority", ar: "السلطة القصوى" } },
];

const flags = [
  { name: "KSA", emoji: "🇸🇦" },
  { name: "UAE", emoji: "🇦🇪" },
  { name: "Qatar", emoji: "🇶🇦" },
  { name: "Kuwait", emoji: "🇰🇼" },
  { name: "Bahrain", emoji: "🇧🇭" },
  { name: "Oman", emoji: "🇴🇲" }
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" className={className}>
    <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7 1-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [view, setView] = useState<'home' | 'packages' | 'checkout' | 'blog'>('home');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [checkoutData, setCheckoutData] = useState({ username: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(124500);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scorePackages = [
    { id: '10k', amount: '10,000', price: '$29', desc: { en: 'Starter Boost', ar: 'باقة البداية' } },
    { id: '50k', amount: '50,000', price: '$69', desc: { en: 'Popular Choice', ar: 'الخيار الشائع' } },
    { id: '200k', amount: '200,000', price: '$149', desc: { en: 'Professional Growth', ar: 'نمو احترافي' } },
    { id: '400k', amount: '400,000', price: '$249', desc: { en: 'Elite Status', ar: 'حالة النخبة' } },
    { id: '1m', amount: '1,000,000', price: '$499', desc: { en: 'Ultimate Power', ar: 'القوة القصوى' } }
  ];

  const handleBuy = (pkg: any) => {
    setSelectedPackage(pkg);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const message = `New Order!\nPackage: ${selectedPackage.amount} Score\nUsername: ${checkoutData.username}\nPassword: ${checkoutData.password}\nPrice: ${selectedPackage.price}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setIsProcessing(false);
      setView('home');
      setSelectedPackage(null);
      setCheckoutData({ username: '', password: '' });
    }, 2000);
  };

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-matte-black selection:bg-snap-yellow selection:text-black overflow-x-hidden font-${lang === 'ar' ? 'cairo' : 'sans'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-matte-black/80 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <Star className="w-10 h-10 text-snap-yellow fill-snap-yellow group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-snap-yellow blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-white uppercase">SNAP BOOST</span>
              <span className="text-[10px] font-bold text-snap-yellow tracking-[0.3em] uppercase">{lang === 'ar' ? 'سناب بوست' : 'Professional Services'}</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
            <button onClick={() => setView('home')} className={`hover:text-snap-yellow transition-colors ${view === 'home' ? 'text-snap-yellow' : ''}`}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</button>
            <button onClick={() => setView('packages')} className={`hover:text-snap-yellow transition-colors ${view === 'packages' ? 'text-snap-yellow' : ''}`}>{t.nav.packages}</button>
            <button onClick={() => setView('blog')} className={`hover:text-snap-yellow transition-colors ${view === 'blog' ? 'text-snap-yellow' : ''}`}>{t.nav.blog}</button>
            <a href="#services" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'خدماتنا' : 'Services'}</a>
            <a href="#catalog" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الحسابات' : 'Catalog'}</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/10 hover:border-snap-yellow/50 transition-all"
            >
              <Globe className="w-4 h-4" />
              {t.nav.lang}
            </button>
            <button 
              onClick={() => openWhatsApp(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن خدمات سناب بوست' : 'Hello, I want to inquire about Snap Boost services')}
              className="hidden sm:flex px-6 py-2.5 bg-snap-yellow text-black font-black rounded-full hover:scale-105 transition-all duration-300 text-sm shadow-[0_0_20px_rgba(255,252,0,0.3)]"
            >
              {t.nav.contact}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-snap-yellow transition-colors"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-matte-black border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-lg font-bold text-gray-400">
                <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-right hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button>
                <button onClick={() => { setView('packages'); setIsMenuOpen(false); }} className="text-right hover:text-snap-yellow transition-colors">{t.nav.packages}</button>
                <button onClick={() => { setView('blog'); setIsMenuOpen(false); }} className="text-right hover:text-snap-yellow transition-colors">{t.nav.blog}</button>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'خدماتنا' : 'Services'}</a>
                <a href="#catalog" onClick={() => setIsMenuOpen(false)} className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الحسابات' : 'Catalog'}</a>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openWhatsApp(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن خدمات سناب بوست' : 'Hello, I want to inquire about Snap Boost services');
                  }}
                  className="w-full py-4 bg-snap-yellow text-black font-black rounded-xl text-center"
                >
                  {t.nav.contact}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {view === 'home' && (
          <>
            {/* Hero Section */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snap-yellow/10 border border-snap-yellow/20 text-snap-yellow text-xs font-bold mb-8">
                <BadgeCheck className="w-4 h-4" />
                {lang === 'ar' ? 'الخدمة رقم 1 في الخليج' : '#1 Trusted Service in GCC'}
              </div>
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
                {t.hero.title} <br />
                <span className="text-snap-yellow drop-shadow-[0_0_30px_rgba(255,252,0,0.3)]">{t.hero.titleHighlight}</span> <br />
                <span className="text-3xl lg:text-5xl block mt-4 text-white/90">{t.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
                {t.hero.desc}
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => setView('packages')}
                  className="px-10 py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(255,252,0,0.3)] flex items-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {t.hero.cta}
                </button>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <ShieldCheck className="w-5 h-5 text-snap-yellow" />
                    <span>{t.hero.protection}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-snap-yellow fill-snap-yellow" />)}
                    <span className="text-[10px] text-gray-500 ml-2">5,000+ Happy Clients</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className={`relative flex justify-center ${lang === 'ar' ? 'lg:justify-start' : 'lg:justify-end'}`}
            >
              <div className="relative w-64 h-[500px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden">
                {/* Phone Screen */}
                <div className="absolute inset-0 bg-gradient-to-b from-snap-yellow/20 to-black p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-snap-yellow rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <Zap className="w-10 h-10 text-black fill-black" />
                  </div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Snap Score</div>
                  <div className="text-4xl font-black text-snap-yellow tabular-nums">
                    {score.toLocaleString()}
                  </div>
                  <div className="mt-8 w-full space-y-3">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: 1000000, repeatType: "loop" }}
                        className="h-full bg-snap-yellow"
                      />
                    </div>
                    <div className="text-[10px] text-gray-500">Boosting in progress...</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Particles */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.random() * 100 - 50, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: 1000000,
                      repeatType: "loop",
                      delay: Math.random() * 2
                    }}
                    className="absolute w-2 h-2 bg-gold-accent rounded-full blur-[1px]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-8 rounded-3xl border-snap-yellow/30 flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
              <div className="w-20 h-20 bg-snap-yellow/10 rounded-full flex items-center justify-center text-snap-yellow flex-shrink-0">
                <RefreshCcw className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-black mb-2 text-snap-yellow">{t.guarantee.title}</h2>
                <p className="text-gray-400 font-medium">{t.guarantee.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 bg-white/5 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="text-2xl font-black tracking-tighter">FORBES</div>
              <div className="text-2xl font-black tracking-tighter italic">VOGUE</div>
              <div className="text-2xl font-black tracking-tighter">GQ</div>
              <div className="text-2xl font-black tracking-tighter">WIRED</div>
              <div className="text-2xl font-black tracking-tighter italic">Esquire</div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-matte-black border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {t.stats.items.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl lg:text-7xl font-black text-snap-yellow mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section id="services" className="py-32 px-6 bg-gradient-to-b from-matte-black to-zinc-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.why.title}</h2>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full shadow-[0_0_15px_rgba(255,252,0,0.5)]"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {t.why.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass p-10 rounded-[2.5rem] group hover:border-snap-yellow/50 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-snap-yellow/5 rounded-full blur-3xl group-hover:bg-snap-yellow/10 transition-colors"></div>
                  <div className="w-20 h-20 bg-snap-yellow/10 rounded-3xl flex items-center justify-center mb-8 text-snap-yellow group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,252,0,0.1)]">
                    {i === 0 ? <Lock className="w-10 h-10" /> : i === 1 ? <ShieldCheck className="w-10 h-10" /> : <Infinity className="w-10 h-10" />}
                  </div>
                  <h3 className="text-3xl font-black mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-32 px-6 bg-matte-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                {t.catalog.title} <span className="text-snap-yellow">{t.catalog.titleHighlight}</span>
              </h2>
              <p className="text-gray-400 text-xl font-medium">{t.catalog.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalog.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Star className="w-20 h-20 text-snap-yellow" />
                  </div>
                  <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{item.description[lang]}</div>
                  <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{item.score}</div>
                  <div className="text-3xl font-bold text-white/90 mb-10">{item.price}</div>
                  <button 
                    onClick={() => openWhatsApp(lang === 'ar' ? `أريد شراء حساب سناب شات بسكور ${item.score} وسعر ${item.price}` : `I want to buy a Snapchat account with score ${item.score} for ${item.price}`)}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-snap-yellow hover:text-black transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                    {t.catalog.order}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-32 px-6 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.how.title}</h2>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {t.how.steps.map((step, i) => (
                <div key={i} className="relative text-center group">
                  <div className="w-24 h-24 bg-matte-black border-2 border-snap-yellow rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-3xl font-black text-snap-yellow shadow-[0_0_30px_rgba(255,252,0,0.1)] group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-snap-yellow text-black rounded-full text-sm flex items-center justify-center border-4 border-matte-black">
                      {i + 1}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                  {i < 2 && (
                    <div className={`hidden lg:block absolute top-12 left-[70%] w-full h-[2px] bg-gradient-to-r from-snap-yellow/30 to-transparent ${lang === 'ar' ? 'rotate-180' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Services */}
        <section className="py-32 px-6 bg-matte-black relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
                  {t.services.title} <br />
                  <span className="text-snap-yellow">{t.services.titleHighlight}</span> <br />
                  <span className="text-2xl lg:text-4xl block mt-4 text-white/80">{t.services.subtitle}</span>
                </h2>
                <div className="space-y-8">
                  {t.services.items.map((service, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: lang === 'ar' ? -10 : 10 }}
                      className="flex gap-8 p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-snap-yellow/30 transition-all cursor-default"
                    >
                      <div className="flex-shrink-0 p-4 bg-snap-yellow/10 rounded-2xl h-fit">{service.icon}</div>
                      <div>
                        <h4 className="text-2xl font-black mb-3">{service.title}</h4>
                        <p className="text-gray-400 text-lg leading-relaxed">{service.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/snapchat-luxury/1000/1250" 
                    alt="Premium Snapchat Services" 
                    className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent"></div>
                </div>
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-10 -right-10 w-56 h-56 glass rounded-[2.5rem] p-8 flex flex-col justify-center border-snap-yellow/40 backdrop-blur-2xl"
                >
                  <Star className="w-12 h-12 text-snap-yellow fill-snap-yellow mb-4" />
                  <div className="text-white font-black text-4xl mb-1 tracking-tighter">100%</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-snap-yellow font-bold">Safe & Verified</div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 px-6 bg-matte-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.faq.title}</h2>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((item, i) => (
                <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-right bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className={`text-lg font-bold ${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>{item.q}</span>
                    <ChevronRight className={`w-5 h-5 text-snap-yellow transition-transform ${activeFaq === i ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-6 text-gray-400 leading-relaxed border-t border-white/10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-32 px-6 bg-matte-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.blog.title}</h2>
              <p className="text-xl text-gray-400 font-medium">{t.blog.subtitle}</p>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full mt-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.blog.posts.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-snap-yellow/30 transition-all group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/blog-${i}/600/400`} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold text-snap-yellow uppercase tracking-widest mb-4">{post.date}</div>
                    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-snap-yellow transition-colors">{post.title}</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">{post.excerpt}</p>
                    <button 
                      onClick={() => openWhatsApp(lang === 'ar' ? `أريد قراءة المزيد عن: ${post.title}` : `I want to read more about: ${post.title}`)}
                      className="text-sm font-black uppercase tracking-widest flex items-center gap-2 group/btn"
                    >
                      {t.blog.readMore}
                      <ChevronRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">{t.testimonials.title}</h2>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: lang === 'ar' ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: lang === 'ar' ? 100 : -100 }}
                  className="glass p-10 rounded-[3rem] text-center"
                >
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name[lang]}
                    className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-snap-yellow p-1"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-2xl font-medium italic mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].text[lang]}"
                  </p>
                  <div className="font-bold text-snap-yellow">{testimonials[currentTestimonial].name[lang]}</div>
                  <div className="text-sm text-gray-500">{testimonials[currentTestimonial].location[lang]}</div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  {lang === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  {lang === 'ar' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-gradient-to-b from-zinc-900/30 to-matte-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black mb-8 uppercase tracking-tight">
                  {lang === 'ar' ? 'تواصل مع' : 'Get in Touch with'} <br />
                  <span className="text-snap-yellow">{lang === 'ar' ? 'فريق الخبراء' : 'Our Experts'}</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                  {lang === 'ar' 
                    ? 'هل لديك استفسار خاص؟ فريقنا متاح على مدار الساعة لمساعدتك في اختيار الباقة المناسبة وتأمين حسابك.' 
                    : 'Have a specific question? Our team is available 24/7 to help you choose the right package and secure your account.'}
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-14 h-14 rounded-full bg-snap-yellow/10 flex items-center justify-center text-snap-yellow">
                      <WhatsAppIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">WhatsApp Support</div>
                      <div className="text-2xl font-black text-white">{WHATSAPP_NUMBER}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-14 h-14 rounded-full bg-snap-yellow/10 flex items-center justify-center text-snap-yellow">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Service Area</div>
                      <div className="text-2xl font-black text-white">GCC & Middle East</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-10 rounded-[3rem] border-white/10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors" placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Your name'} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الخدمة المطلوبة' : 'Service Needed'}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors appearance-none">
                      <option className="bg-matte-black">{lang === 'ar' ? 'زيادة السكور' : 'Score Boosting'}</option>
                      <option className="bg-matte-black">{lang === 'ar' ? 'شراء حساب' : 'Buy Account'}</option>
                      <option className="bg-matte-black">{lang === 'ar' ? 'توثيق الحساب' : 'Verification'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors h-32" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}></textarea>
                  </div>
                  <button 
                    onClick={() => openWhatsApp(lang === 'ar' ? 'أريد استشارة بخصوص خدمات سناب شات' : 'I want a consultation regarding Snapchat services')}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-xl hover:scale-105 transition-transform shadow-lg"
                  >
                    {lang === 'ar' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="py-24 px-6 bg-matte-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black mb-4 uppercase tracking-tight">{t.payments.title}</h2>
              <p className="text-gray-400 font-bold">{t.payments.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.payments.methods.map((method, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-3xl text-center border border-white/5 hover:border-snap-yellow/30 transition-all group"
                >
                  <div className="w-16 h-16 bg-snap-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-snap-yellow group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h4 className="text-xl font-black mb-2">{method.name}</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{method.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Payment Logos Row */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src="https://i.postimg.cc/Y0WCqgnD/Visa.png" alt="Visa" className="h-8" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-12" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin" className="h-10" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" referrerPolicy="no-referrer" />
              <div className="text-2xl font-black text-white tracking-tighter">Payoneer</div>
              <div className="text-2xl font-black text-white tracking-tighter">PAYEER</div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-snap-yellow rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black text-black mb-8">{t.cta.title}</h2>
              <p className="text-black/70 text-xl mb-12 max-w-2xl mx-auto font-bold">
                {t.cta.desc}
              </p>
              
              <button 
                onClick={() => openWhatsApp(lang === 'ar' ? 'أريد البدء في استخدام خدماتكم المميزة' : 'I want to start using your premium services')}
                className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-4 mx-auto hover:scale-105 transition-transform animate-whatsapp"
              >
                <WhatsAppIcon className="w-8 h-8" />
                {t.cta.button}
              </button>
            </div>
          </div>
        </section>
          </>
        )}

        {view === 'packages' && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                  {t.packages.title}
                </h1>
                <p className="text-xl text-gray-400 font-medium">{t.packages.subtitle}</p>
                <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full mt-8"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {scorePackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                      <Zap className="w-20 h-20 text-snap-yellow" />
                    </div>
                    <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                    <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{pkg.amount}</div>
                    <div className="text-3xl font-bold text-white/90 mb-10">{pkg.price}</div>
                    <button 
                      onClick={() => handleBuy(pkg)}
                      className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                    >
                      {t.packages.buy}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'checkout' && selectedPackage && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="glass p-10 lg:p-16 rounded-[3rem] border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h1 className="text-4xl font-black uppercase tracking-tight">{t.checkout.summary}</h1>
                  <button onClick={() => setView('packages')} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkout.package}</span>
                    <span className="text-2xl font-black text-snap-yellow">{selectedPackage.amount} Score</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkout.price}</span>
                    <span className="text-2xl font-black text-white">{selectedPackage.price}</span>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t.checkout.productDetails}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight">{t.checkout.details}</h2>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{t.checkout.username}</label>
                    <input 
                      type="text" 
                      value={checkoutData.username}
                      onChange={(e) => setCheckoutData({...checkoutData, username: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors text-lg" 
                      placeholder="@username" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{t.checkout.password}</label>
                    <input 
                      type="password" 
                      value={checkoutData.password}
                      onChange={(e) => setCheckoutData({...checkoutData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors text-lg" 
                      placeholder="••••••••" 
                    />
                  </div>

                  <div className="p-6 rounded-2xl bg-snap-yellow/5 border border-snap-yellow/20 flex gap-4 items-start">
                    <Lock className="w-6 h-6 text-snap-yellow flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                      {t.checkout.notice}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t.checkout.paymentTitle}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {t.payments.methods.map((method, i) => (
                        <button key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-snap-yellow transition-all flex items-center gap-3">
                          <div className="text-snap-yellow">{method.icon}</div>
                          <span className="text-xs font-bold">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing || !checkoutData.username || !checkoutData.password}
                    className="w-full py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] disabled:opacity-50 disabled:hover:scale-100 text-xl flex items-center justify-center gap-4"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCcw className="w-6 h-6 animate-spin" />
                        {t.checkout.processing}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-6 h-6" />
                        {t.checkout.button}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {view === 'blog' && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                  {t.blog.title}
                </h1>
                <p className="text-xl text-gray-400 font-medium">{t.blog.subtitle}</p>
                <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full mt-8"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.blog.posts.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-snap-yellow/30 transition-all group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/blog-page-${i}/600/400`} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <div className="text-xs font-bold text-snap-yellow uppercase tracking-widest mb-4">{post.date}</div>
                      <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-snap-yellow transition-colors">{post.title}</h3>
                      <p className="text-gray-400 mb-8 leading-relaxed">{post.excerpt}</p>
                      <button 
                        onClick={() => openWhatsApp(lang === 'ar' ? `أريد قراءة المزيد عن: ${post.title}` : `I want to read more about: ${post.title}`)}
                        className="text-sm font-black uppercase tracking-widest flex items-center gap-2 group/btn"
                      >
                        {t.blog.readMore}
                        <ChevronRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-matte-black pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-snap-yellow fill-snap-yellow" />
                <span className="text-2xl font-black tracking-tighter text-white">SNAP BOOST</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-medium">
                {lang === 'ar' 
                  ? 'الخدمة الرائدة في الخليج لرفع سكور السناب شات وتوفير الحسابات القديمة والموثقة بأمان تام.' 
                  : 'The leading service in GCC for Snapchat score boosting and providing aged, verified accounts with total security.'}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <button onClick={() => openWhatsApp('Social Inquiry')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all">
                  <WhatsAppIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-widest text-sm">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
              <ul className="space-y-4 text-gray-400 font-bold">
                <li><a href="#services" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'خدماتنا' : 'Our Services'}</a></li>
                <li><a href="#catalog" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'كتالوج الحسابات' : 'Account Catalog'}</a></li>
                <li><a href="#how" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'كيف نعمل' : 'How It Works'}</a></li>
                <li><a href="#blog" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'المدونة' : 'Blog'}</a></li>
                <li><a href="#faq" className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
                <li><button onClick={() => openWhatsApp('Contact')} className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-widest text-sm">{lang === 'ar' ? 'خدماتنا' : 'Services'}</h4>
              <ul className="space-y-4 text-gray-400 font-bold">
                <li>{lang === 'ar' ? 'زيادة السكور' : 'Score Boosting'}</li>
                <li>{lang === 'ar' ? 'حسابات قديمة' : 'Aged Accounts'}</li>
                <li>{lang === 'ar' ? 'توثيق الحسابات' : 'Account Verification'}</li>
                <li>{lang === 'ar' ? 'زيادة المشاهدات' : 'Views Growth'}</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-widest text-sm">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-snap-yellow/10 flex items-center justify-center text-snap-yellow">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-gray-500">WhatsApp</div>
                    <div className="font-bold text-white">{WHATSAPP_NUMBER}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-snap-yellow/10 flex items-center justify-center text-snap-yellow">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-gray-500">Region</div>
                    <div className="font-bold text-white">GCC (KSA, UAE, Qatar)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{t.footer.serving}</span>
              <div className="flex gap-3 text-xl">
                {flags.map((flag) => (
                  <span key={flag.name} title={flag.name} className="hover:scale-125 transition-transform cursor-default">
                    {flag.emoji}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-gray-500 text-xs font-bold">
              {t.footer.rights}
            </div>
            
            <div className="flex gap-8 text-xs font-bold text-gray-500">
              <a href="#" className="hover:text-snap-yellow transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-snap-yellow transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openWhatsApp(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن خدمات سناب بوست' : 'Hello, I want to inquire about Snap Boost services')}
        className="fixed bottom-24 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        <WhatsAppIcon className="w-10 h-10" />
        <div className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          {lang === 'ar' ? 'تحدث معنا' : 'Chat with us'}
        </div>
      </motion.button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-snap-yellow text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronRight className="-rotate-90 w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}



