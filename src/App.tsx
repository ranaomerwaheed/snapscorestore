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
      badge: "Trusted by 10,000+ Clients",
      title: "Boost Your Snapchat Presence Instantly",
      desc: "Securely increase your Snap Score, get aged accounts, and grow your followers with the GCC's most trusted provider.",
      cta: "View Catalog",
      secondary: "Our Services",
      scoreLabel: "Current Score",
      targetLabel: "Target Boost"
    },
    shop: {
      title: "Premium Catalog",
      subtitle: "Select the perfect package for your needs",
      scoreAccounts: "Score Accounts",
      followerAccounts: "Follower Accounts",
      servicesTab: "Growth Services",
      buy: "Order via WhatsApp",
      order: "Order Now",
      price: "Price"
    },
    guarantee: {
      title: "14-Day Money Back Guarantee",
      desc: "We stand by our service. If you're not satisfied, we'll refund your purchase within 14 days."
    },
    checkout: {
      summary: "Order Summary",
      package: "Selected Package",
      price: "Total Price",
      details: "Account Details",
      username: "Snapchat Username",
      password: "Account Password (Required for Score)",
      notice: "Your credentials are encrypted and used only for the boosting process. We recommend changing your password after completion.",
      button: "Confirm Order via WhatsApp",
      processing: "Processing...",
      paymentTitle: "Preferred Payment Method",
      productDetails: "High-quality Snapchat account with the specified features. Delivery usually takes 1-24 hours depending on the package."
    },
    packages: {
      score: "Score Boost",
      followers: "Followers",
      aged: "Aged Account",
      verified: "Verified"
    },
    why: {
      title: "Why Choose Us?",
      subtitle: "We provide the most secure and efficient growth services in the region.",
      items: [
        {
          title: "Total Security",
          desc: "We use advanced encryption and safe methods that comply with platform guidelines."
        },
        {
          title: "Fast Delivery",
          desc: "Most orders are processed within hours. We value your time."
        },
        {
          title: "24/7 Support",
          desc: "Our expert team is available around the clock to assist you via WhatsApp."
        }
      ]
    },
    catalog: {
      title: "Available Accounts",
      subtitle: "Ready-to-use accounts with high scores and history",
      viewAll: "View All Accounts",
      score: "Score",
      age: "Age",
      price: "Price",
      buy: "Buy Now",
      order: "Order via WhatsApp",
      titleHighlight: "Available"
    },
    services: {
      title: "Our Premium Services",
      titleHighlight: "Solutions",
      subtitle: "Everything you need to dominate Snapchat",
      items: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "Score Boosting",
          desc: "Increase your Snap Score by thousands or millions safely and quickly."
        },
        {
          icon: <Infinity className="w-8 h-8" />,
          title: "Aged Accounts",
          desc: "Get established accounts from 2011-2020 with high trust scores."
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "Follower Growth",
          desc: "Grow your public profile with real-looking, active followers."
        }
      ]
    },
    how: {
      title: "How It Works",
      subtitle: "Three simple steps to boost your presence",
      steps: [
        {
          icon: <ShoppingBag className="w-10 h-10" />,
          title: "Choose Package",
          desc: "Select the account or service that fits your goals."
        },
        {
          icon: <RefreshCcw className="w-10 h-10" />,
          title: "Provide Details",
          desc: "Enter your username and complete the secure checkout."
        },
        {
          icon: <Zap className="w-10 h-10" />,
          title: "Get Boosted",
          desc: "Relax while our team processes your order safely."
        }
      ]
    },
    stats: {
      items: [
        { value: "10K+", label: "Happy Clients" },
        { value: "30K+", label: "Orders Completed" },
        { value: "5+", label: "Years Experience" },
        { value: "4.9", label: "Average Rating" }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our services",
      items: [
        {
          q: "Is it safe for my account?",
          a: "Yes, we use secure methods that comply with Snapchat's guidelines. We have served over 10,000 clients without issues."
        },
        {
          q: "How long does it take?",
          a: "Most orders are completed within 1-24 hours. Larger score boosts might take up to 48 hours for maximum safety."
        },
        {
          q: "Do I need to provide my password?",
          a: "For score boosting, we need temporary access. For followers or buying new accounts, no password is required."
        }
      ]
    },
    testimonials: {
      title: "Client Success Stories",
      subtitle: "Hear from our satisfied customers"
    },
    blog: {
      title: "Snapchat Tips & News",
      subtitle: "Stay updated with the latest trends and strategies",
      readMore: "Read More",
      posts: [
        {
          title: "Snapchat Account Safety Guide: Safe Login Practices & Ban Prevention",
          date: "March 18, 2026",
          excerpt: "Discover the most effective and safe methods to boost your score in 2024."
        },
        {
          title: "Snapchat Score Top-Up: Important Information During Top-Up Process",
          date: "March 18, 2026",
          excerpt: "The benefits of using accounts with history for your personal brand."
        },
        {
          title: "Snapchat Security Best Practices",
          date: "March 18, 2026",
          excerpt: "Keep your account safe while growing your presence online."
        }
      ]
    },
    payments: {
      title: "Secure Payments",
      subtitle: "We accept all major payment methods",
      methods: [
        { name: "Apple Pay", icon: "" },
        { name: "Google Pay", icon: "stc" },
        { name: "Mada", icon: "mada" },
        { name: "Credit Card", icon: "💳" }
      ]
    },
    cta: {
      title: "Ready to Level Up?",
      subtitle: "Join thousands of satisfied users and start your boost today.",
      button: "Contact on WhatsApp"
    },
    footer: {
      rights: "© 2026 Snap Boost. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
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
      badge: "موثوق من قبل +10,000 عميل",
      title: "ارفع سكور السناب شات فوراً",
      desc: "زد سكور حسابك بأمان، احصل على حسابات قديمة، ونمِ متابعيك مع المزود الأكثر ثقة.",
      cta: "عرض الكتالوج",
      secondary: "خدماتنا",
      scoreLabel: "السكور الحالي",
      targetLabel: "الزيادة المستهدفة"
    },
    shop: {
      title: "الكتالوج المميز",
      subtitle: "اختر الباقة المناسبة لاحتياجاتك",
      scoreAccounts: "حسابات سكور",
      followerAccounts: "حسابات متابعين",
      servicesTab: "خدمات النمو",
      buy: "طلب عبر واتساب",
      order: "اطلب الآن",
      price: "السعر"
    },
    guarantee: {
      title: "ضمان استرداد الأموال لمدة 14 يوماً",
      desc: "نحن نثق في خدماتنا. إذا لم تكن راضياً، سنعيد لك أموالك خلال 14 يوماً."
    },
    checkout: {
      summary: "ملخص الطلب",
      package: "الباقة المختارة",
      price: "السعر الإجمالي",
      details: "تفاصيل الحساب",
      username: "اسم المستخدم (اليوزر)",
      password: "كلمة المرور (مطلوبة للسكور)",
      notice: "بياناتك مشفرة وتستخدم فقط لعملية الرفع. ننصح بتغيير كلمة المرور بعد الانتهاء.",
      button: "تأكيد الطلب عبر واتساب",
      processing: "جاري المعالجة...",
      paymentTitle: "طريقة الدفع المفضلة",
      productDetails: "حساب سناب شات عالي الجودة بالمواصفات المذكورة. التسليم يستغرق عادة 1-24 ساعة."
    },
    packages: {
      score: "رفع سكور",
      followers: "متابعين",
      aged: "حساب قديم",
      verified: "موثق"
    },
    why: {
      title: "لماذا تختار سناب بوست؟",
      subtitle: "نقدم خدمات النمو الأكثر أماناً وفعالية في المنطقة.",
      items: [
        {
          title: "أمان تام",
          desc: "نستخدم تشفيراً متقدماً وطرقاً آمنة تتوافق مع إرشادات المنصة."
        },
        {
          title: "سرعة التنفيذ",
          desc: "يتم معالجة معظم الطلبات خلال ساعات. نحن نقدر وقتك."
        },
        {
          title: "دعم 24/7",
          desc: "فريقنا الخبير متاح على مدار الساعة لمساعدتك عبر الواتساب."
        }
      ]
    },
    catalog: {
      title: "الحسابات المتاحة",
      subtitle: "حسابات جاهزة للاستخدام مع سكور عالٍ وتاريخ قديم",
      viewAll: "عرض كل الحسابات",
      score: "السكور",
      age: "العمر",
      price: "السعر",
      buy: "شراء الآن",
      order: "اطلب عبر واتساب",
      titleHighlight: "المتاحة"
    },
    services: {
      title: "خدماتنا المميزة",
      titleHighlight: "الحلول",
      subtitle: "كل ما تحتاجه للسيطرة على سناب شات",
      items: [
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "رفع السكور",
          desc: "زد سكور حسابك بآلاف أو ملايين النقاط بأمان وبسرعة."
        },
        {
          icon: <Infinity className="w-8 h-8" />,
          title: "حسابات قديمة",
          desc: "احصل على حسابات منشأة من 2011-2020 مع موثوقية عالية."
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "زيادة المتابعين",
          desc: "نمِ ملفك الشخصي العام بمتابعين حقيقيين ونشطين."
        }
      ]
    },
    how: {
      title: "كيف يعمل النظام",
      subtitle: "ثلاث خطوات بسيطة لتعزيز حضورك",
      steps: [
        {
          icon: <ShoppingBag className="w-10 h-10" />,
          title: "اختر الباقة",
          desc: "اختر الحساب أو الخدمة التي تناسب أهدافك."
        },
        {
          icon: <RefreshCcw className="w-10 h-10" />,
          title: "زودنا بالتفاصيل",
          desc: "أدخل اسم المستخدم وأكمل عملية الدفع الآمنة."
        },
        {
          icon: <Zap className="w-10 h-10" />,
          title: "استمتع بالنمو",
          desc: "استرخِ بينما يقوم فريقنا بمعالجة طلبك بأمان."
        }
      ]
    },
    stats: {
      items: [
        { value: "10K+", label: "عميل سعيد" },
        { value: "50K+", label: "طلب مكتمل" },
        { value: "12+", label: "سنوات خبرة" },
        { value: "4.9", label: "متوسط التقييم" }
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته عن خدماتنا",
      items: [
        {
          q: "هل الخدمة آمنة لحسابي؟",
          a: "نعم، نستخدم طرقاً آمنة تتوافق مع إرشادات سناب شات. خدمنا أكثر من 10,000 عميل بدون أي مشاكل."
        },
        {
          q: "كم من الوقت يستغرق التنفيذ؟",
          a: "معظم الطلبات تكتمل خلال 1-24 ساعة. رفع السكور الكبير قد يستغرق حتى 48 ساعة لأقصى درجات الأمان."
        },
        {
          q: "هل أحتاج لتزويدكم بكلمة المرور؟",
          a: "لرفع السكور، نحتاج وصولاً مؤقتاً. لزيادة المتابعين أو شراء حسابات جديدة، لا يلزم وجود كلمة مرور."
        }
      ]
    },
    testimonials: {
      title: "قصص نجاح عملائنا",
      subtitle: "استمع إلى عملائنا الراضين"
    },
    blog: {
      title: "نصائح وأخبار سناب شات",
      subtitle: "ابقَ على اطلاع بأحدث الاتجاهات والاستراتيجيات",
      readMore: "اقرأ المزيد",
      posts: [
        {
          title: "كيف ترفع سكور سناب شات بسرعة",
          date: "15 مارس 2024",
          excerpt: "اكتشف أكثر الطرق فعالية وأماناً لرفع السكور في 2024."
        },
        {
          title: "لماذا الحسابات القديمة أفضل؟",
          date: "10 مارس 2024",
          excerpt: "فوائد استخدام حسابات قديمة لعلامتك التجارية الشخصية."
        },
        {
          title: "أفضل ممارسات أمان سناب شات",
          date: "5 مارس 2024",
          excerpt: "حافظ على أمان حسابك أثناء نمو حضورك عبر الإنترنت."
        }
      ]
    },
    payments: {
      title: "دفع آمن",
      subtitle: "نقبل جميع طرق الدفع الرئيسية",
      methods: [
        { name: "Apple Pay", icon: "" },
        { name: "STC Pay", icon: "stc" },
        { name: "Mada", icon: "mada" },
        { name: "Credit Card", icon: "💳" }
      ]
    },
    cta: {
      title: "جاهز للانطلاق؟",
      subtitle: "انضم إلى آلاف المستخدمين الراضين وابدأ تعزيز حسابك اليوم.",
      button: "تواصل عبر واتساب"
    },
    footer: {
      rights: "© 2024 سناب بوست. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة"
    }
  }
};

const testimonials = [
  {
    name: { en: "Ahmed Al-Harbi", ar: "أحمد الحربي" },
    location: { en: "Riyadh, KSA", ar: "الرياض، السعودية" },
    text: { 
      en: "Best service in the Middle East. My Snap score reached 1M in just 2 days. Highly recommended for anyone looking for reliability.", 
      ar: "أفضل خدمة في الشرق الأوسط. وصل سكور حسابي إلى مليون في يومين فقط. أنصح به بشدة لكل من يبحث عن المصداقية." 
    },
    avatar: "https://i.pinimg.com/736x/d4/d1/09/d4d10914504759b9c917d0b338e13744.jpg"
  },
  {
    name: { en: "Sara Mohammed", ar: "سارة محمد" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    text: { 
      en: "I was worried about my account, but they reassured me and the service was extremely professional. Highly recommended.", 
      ar: "كنت خايفة على حسابي بس طمنوني والخدمة كانت احترافية للغاية. أنصح فيهم وبقوة." 
    },
    avatar: "https://i.pinimg.com/1200x/3d/b5/31/3db5313f860c6c6f67480f238e2e4f27.jpg"
  },
  {
    name: { en: "Sultan Al-Kuwari", ar: "سلطان الكواري" },
    location: { en: "Doha, Qatar", ar: "الدوحة، قطر" },
    text: { 
      en: "Best service I've dealt with in the Gulf. Credibility and speed in execution.", 
      ar: "أفضل خدمة تعاملت معها في الخليج. مصداقية وسرعة في التنفيذ." 
    },
    avatar: "https://i.pinimg.com/1200x/7b/76/90/7b7690d1d9769561cb5fb6fdb2045943.jpg"
  }
];

const ReviewSection = () => {
  return (
    <section className="py-20 bg-black/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Users Globally</h2>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
            <span className="text-white ml-2 font-semibold">4.9/5 based on 10k+ orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.country} • {review.date}</p>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                    <BadgeCheck className="w-4 h-4" /> VERIFIED
                  </span>
                )}
              </div>
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
              </div>
              <p className="text-gray-300 italic leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
        </div>
      </div>
    </section>
  );
};
];

const faqData = [
  {
    q: { en: "Is it safe for my account?", ar: "هل الخدمة آمنة لحسابي؟" },
    a: { en: "Yes, we use secure methods that comply with Snapchat's guidelines. We have served over 10,000 clients without issues.", ar: "نعم، نستخدم طرقاً آمنة تتوافق مع إرشادات سناب شات. خدمنا أكثر من 10,000 عميل بدون أي مشاكل." }
  },
  {
    q: { en: "How long does it take?", ar: "كم من الوقت يستغرق التنفيذ؟" },
    a: { en: "Most orders are completed within 1-24 hours. Larger score boosts might take up to 48 hours for maximum safety.", ar: "معظم الطلبات تكتمل خلال 1-24 ساعة. رفع السكور الكبير قد يستغرق حتى 48 ساعة لأقصى درجات الأمان." }
  },
  {
    q: { en: "Do I need to provide my password?", ar: "هل أحتاج لتزويدكم بكلمة المرور؟" },
    a: { en: "For score boosting, we need temporary access. For followers or buying new accounts, no password is required.", ar: "لرفع السكور، نحتاج وصولاً مؤقتاً. لزيادة المتابعين أو شراء حسابات جديدة، لا يلزم وجود كلمة مرور." }
  }
];

const catalog = [
  { id: 1, score: "5K+", price: "$3", age: "2023", type: "Starter", description: { en: "Fresh Account", ar: "حساب جديد" } },
  { id: 2, score: "10K+", price: "$5", age: "2022", type: "Basic", description: { en: "Established Account", ar: "حساب قائم" } },
  { id: 3, score: "20K+", price: "$7", age: "2021", type: "Growth", description: { en: "Active Account", ar: "حساب نشط" } },
  { id: 4, score: "50K+", price: "$12", age: "2020", type: "Popular", description: { en: "High Engagement", ar: "تفاعل عالي" } },
  { id: 5, score: "100K+", price: "$18", age: "2019", type: "Influencer", description: { en: "Professional Presence", ar: "حضور احترافي" } },
  { id: 6, score: "200K+", price: "$22", age: "2018", type: "Pro", description: { en: "Authority Account", ar: "حساب سلطة" } },
  { id: 7, score: "300K+", price: "$25", age: "2017", type: "Expert", description: { en: "Expert Presence", ar: "حضور خبير" } },
  { id: 8, score: "500K+", price: "$32", age: "2016", type: "Elite", description: { en: "Elite Presence", ar: "حضور النخبة" } },
  { id: 9, score: "700K+", price: "$40", age: "2015", type: "Ultimate", description: { en: "Ultimate Presence", ar: "حضور أقصى" } },
  { id: 10, score: "1M+", price: "$50", age: "2014", type: "Legendary", description: { en: "Legendary Status", ar: "حالة أسطورية" } },
  { id: 11, score: "2M+", price: "$80", age: "2013", type: "Mythic", description: { en: "Mythic Status", ar: "حالة خرافية" } },
  { id: 12, score: "5M+", price: "$120", age: "2012", type: "Godlike", description: { en: "Godlike Authority", ar: "سلطة إلهية" } },
  { id: 13, score: "10M+", price: "$250", age: "2011", type: "Ultimate", description: { en: "Ultimate Authority", ar: "السلطة القصوى" } },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" className={className}>
    <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7 1-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'shop' | 'checkout' | 'blog' | 'boosting'>('home');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedBoostingTier, setSelectedBoostingTier] = useState<any>(null);
  const [checkoutData, setCheckoutData] = useState({ username: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(124500);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopTab, setShopTab] = useState<'score' | 'followers' | 'services'>('score');

  const scoreAccountsStock = [
    { id: 'sa5k', amount: '5,000', price: '$3', type: 'Score Account', desc: { en: 'Starter Score Account', ar: 'حساب سكور بداية' } },
    { id: 'sa10k', amount: '10,000', price: '$5', type: 'Score Account', desc: { en: 'Aged Score Account', ar: 'حساب سكور قديم' } },
    { id: 'sa20k', amount: '20,000', price: '$7', type: 'Score Account', desc: { en: 'Growth Score Account', ar: 'حساب سكور نمو' } },
    { id: 'sa50k', amount: '50,000', price: '$20', type: 'Score Account', desc: { en: 'Popular Score Tier', ar: 'فئة سكور شائعة' } },
    { id: 'sa100k', amount: '100,000', price: '$14', type: 'Score Account', desc: { en: 'Influencer Ready', ar: 'جاهز للمؤثرين' } },
    { id: 'sa200k', amount: '200,000', price: '$16', type: 'Score Account', desc: { en: 'Pro Status', ar: 'مستوى المحترفين' } },
    { id: 'sa300k', amount: '300,000', price: '$20', type: 'Score Account', desc: { en: 'Expert Status', ar: 'مستوى الخبراء' } },
    { id: 'sa500k', amount: '500,000', price: '$30', type: 'Score Account', desc: { en: 'Elite Presence', ar: 'حضور النخبة' } },
    { id: 'sa700k', amount: '700,000', price: '$40', type: 'Score Account', desc: { en: 'Ultimate Presence', ar: 'حضور أقصى' } },
    { id: 'sa1m', amount: '1,000,000', price: '$50', type: 'Score Account', desc: { en: 'Legendary Status', ar: 'حالة أسطورية' } },
    { id: 'sa2m', amount: '2,000,000', price: '$80', type: 'Score Account', desc: { en: 'Double Millionaire', ar: 'مليونير مزدوج' } },
    { id: 'sa5m', amount: '5,000,000', price: '$150', type: 'Score Account', desc: { en: 'Mega Authority', ar: 'سلطة ضخمة' } },
    { id: 'sa10m', amount: '10,000,000', price: '$500', type: 'Score Account', desc: { en: 'Ultimate Authority', ar: 'السلطة القصوى' } },
  ];

  const followerAccountsStock = [
    { id: 'fa5k', amount: '5,000', price: '$45', type: 'Follower Account', desc: { en: 'Rising Star', ar: 'نجم صاعد' } },
    { id: 'fa10k', amount: '10,000', price: '$85', type: 'Follower Account', desc: { en: 'Popular Account', ar: 'حساب شائع' } },
    { id: 'fa20k', amount: '20,000', price: '$150', type: 'Follower Account', desc: { en: 'Influencer Pack', ar: 'باقة المؤثرين' } },
    { id: 'fa50k', amount: '50,000', price: '$350', type: 'Follower Account', desc: { en: 'Elite Presence', ar: 'حضور النخبة' } },
    { id: 'fa100k', amount: '100,000', price: '$650', type: 'Follower Account', desc: { en: 'Verified Potential', ar: 'إمكانية توثيق' } },
    { id: 'fa200k', amount: '200,000', price: '$1100', type: 'Follower Account', desc: { en: 'Mega Account', ar: 'حساب ضخم' } },
    { id: 'fa300k', amount: '300,000', price: '$1500', type: 'Follower Account', desc: { en: 'Pro Account', ar: 'حساب محترف' } },
    { id: 'fa500k', amount: '500,000', price: '$2200', type: 'Follower Account', desc: { en: 'Top Tier Presence', ar: 'حضور من الفئة الأولى' } },
    { id: 'fa700k', amount: '700,000', price: '$2900', type: 'Follower Account', desc: { en: 'Ultimate Reach', ar: 'وصول أقصى' } },
  ];

  const servicesList = [
    { id: 's_boost', title: 'Snap Score Boost', price: 'From $3', icon: <TrendingUp />, desc: { en: 'Boost your own account from 5k to 1M score safely.', ar: 'ارفع سكور حسابك من 5000 إلى مليون بأمان.' } },
    { id: 's_lens', title: 'Snapchat AR Lens Create', price: 'Contact Us', icon: <Zap />, desc: { en: 'Custom AR lenses created for your profile.', ar: 'عدسات واقع معزز مخصصة لملفك الشخصي.' } },
    { id: 's_followers', title: 'Snapchat Follower Increase', price: 'From $20', icon: <Users />, desc: { en: 'Increase real followers on your account.', ar: 'زيادة متابعين حقيقيين على حسابك.' } },
    { id: 's_badge', title: 'Get Verified Badge', price: 'Contact Us', icon: <BadgeCheck />, desc: { en: 'Professional assistance for the Gold Star badge.', ar: 'مساعدة احترافية للحصول على شارة النجمة الذهبية.' } },
    { id: 's_views', title: 'View Service', price: 'From $3', icon: <Eye />, desc: { en: 'Boost your story views instantly.', ar: 'عزز مشاهدات الستوري الخاصة بك فوراً.' } },
  ];

  const boostingTiers = [
    { id: 'b5k', amount: '5,000', price: '$5' },
    { id: 'b10k', amount: '10,000', price: '$9' },
    { id: 'b20k', amount: '20,000', price: '$13' },
    { id: 'b50k', amount: '50,000', price: '$17' },
    { id: 'b100k', amount: '100,000', price: '$20' },
    { id: 'b200k', amount: '200,000', price: '$25' },
    { id: 'b300k', amount: '300,000', price: '$30' },
    { id: 'b500k', amount: '500,000', price: '$37' },
    { id: 'b700k', amount: '700,000', price: '$45' },
    { id: 'b1m', amount: '1,000,000', price: '$60' },
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
    <div className={`min-h-screen bg-matte-black selection:bg-snap-yellow selection:text-black overflow-x-hidden font-${lang === 'ar' ? 'cairo' : 'sans'} relative`}>
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,hsla(59,100%,50%,0.1)_0,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(at_100%_100%,hsla(59,100%,50%,0.1)_0,transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.05)_0%,transparent_70%)]"></div>
      </div>

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
            <button onClick={() => setView('home')} className={`hover:text-snap-yellow transition-colors ${view === 'home' ? 'text-snap-yellow' : ''}`}>{t.nav.home}</button>
            <button onClick={() => setView('shop')} className={`hover:text-snap-yellow transition-colors ${view === 'shop' ? 'text-snap-yellow' : ''}`}>{t.nav.packages}</button>
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
                <button onClick={() => { setView('shop'); setIsMenuOpen(false); }} className="text-right hover:text-snap-yellow transition-colors">{t.nav.shop}</button>
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
                  onClick={() => setView('shop')}
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
                      onClick={() => {
                        setView('shop');
                        setShopTab('services');
                      }}
                      className="flex gap-8 p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-snap-yellow/30 transition-all cursor-pointer group/service"
                    >
                      <div className="flex-shrink-0 p-4 bg-snap-yellow/10 rounded-2xl h-fit group-hover/service:bg-snap-yellow group-hover/service:text-black transition-colors">{service.icon}</div>
                      <div>
                        <h4 className="text-2xl font-black mb-3 group-hover/service:text-snap-yellow transition-colors">{service.title}</h4>
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

        {view === 'shop' && (
          <section className="pt-40 pb-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                  {t.shop.title}
                </h1>
                <p className="text-xl text-gray-400 font-medium">{t.shop.subtitle}</p>
              </div>

              <div className="space-y-32">
                {/* Score Accounts Section */}
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-snap-yellow rounded-xl flex items-center justify-center text-black">
                      <Star className="w-6 h-6 fill-black" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight">{t.shop.scoreAccounts}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scoreAccountsStock.map((pkg, i) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group relative overflow-hidden"
                      >
                        <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                        <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{pkg.amount}</div>
                        <div className="text-3xl font-bold text-white/90 mb-10">{pkg.price}</div>
                        <button 
                          onClick={() => handleBuy(pkg)}
                          className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                        >
                          {t.shop.buy}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Follower Accounts Section */}
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-snap-yellow rounded-xl flex items-center justify-center text-black">
                      <Users className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight">{t.shop.followerAccounts}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {followerAccountsStock.map((pkg, i) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group relative overflow-hidden"
                      >
                        <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                        <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{pkg.amount}</div>
                        <div className="text-3xl font-bold text-white/90 mb-10">{pkg.price}</div>
                        <button 
                          onClick={() => handleBuy(pkg)}
                          className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                        >
                          {t.shop.buy}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Professional Services Section */}
                <div>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-snap-yellow rounded-xl flex items-center justify-center text-black">
                      <Zap className="w-6 h-6 fill-black" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight">{t.shop.servicesTab}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesList.map((service, i) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group"
                      >
                        <div className="w-16 h-16 bg-snap-yellow/10 rounded-2xl flex items-center justify-center mb-8 text-snap-yellow group-hover:scale-110 transition-transform">
                          {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8" })}
                        </div>
                        <h3 className="text-3xl font-black mb-4 group-hover:text-snap-yellow transition-colors">{service.title}</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">{service.desc[lang]}</p>
                        <div className="text-2xl font-bold text-white mb-10">{service.price}</div>
                        <button 
                          onClick={() => {
                            if (service.id === 's_boost') {
                              setView('boosting');
                              window.scrollTo(0, 0);
                            } else {
                              openWhatsApp(lang === 'ar' ? `أريد طلب خدمة: ${service.title}` : `I want to order service: ${service.title}`);
                            }
                          }}
                          className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-snap-yellow hover:text-black transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <WhatsAppIcon className="w-6 h-6" />
                          {t.shop.order}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                  <button onClick={() => setView('shop')} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkout.package}</span>
                    <span className="text-2xl font-black text-snap-yellow">{selectedPackage.amount || selectedPackage.title} {selectedPackage.type || ''}</span>
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
        {view === 'boosting' && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              {!selectedBoostingTier ? (
                <>
                  <div className="text-center mb-20">
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                      {lang === 'ar' ? 'اختر باقة' : 'Select'} <span className="text-snap-yellow">{lang === 'ar' ? 'رفع السكور' : 'Score Boost'}</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium">
                      {lang === 'ar' ? 'اختر الكمية التي تريد إضافتها لحسابك الشخصي' : 'Choose the amount you want to add to your personal account'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boostingTiers.map((tier, i) => (
                      <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass p-10 rounded-[3rem] border border-white/5 hover:border-snap-yellow/30 transition-all group relative overflow-hidden"
                      >
                        <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{tier.amount}</div>
                        <div className="text-3xl font-bold text-white/90 mb-10">{tier.price}</div>
                        <button 
                          onClick={() => setSelectedBoostingTier(tier)}
                          className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                        >
                          {lang === 'ar' ? 'اختيار الباقة' : 'Select Package'}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <div className="glass p-10 lg:p-16 rounded-[3rem] border-white/10">
                    <div className="flex items-center justify-between mb-12">
                      <h1 className="text-4xl font-black uppercase tracking-tight">{lang === 'ar' ? 'تفاصيل الحساب' : 'Account Details'}</h1>
                      <button onClick={() => setSelectedBoostingTier(null)} className="text-gray-500 hover:text-white transition-colors">
                        <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'الباقة المختارة' : 'Selected Tier'}</span>
                          <span className="text-snap-yellow font-black text-xl">{selectedBoostingTier.amount} Score</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'السعر' : 'Price'}</span>
                          <span className="text-white font-black text-xl">{selectedBoostingTier.price}</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                          <input 
                            type="email"
                            value={checkoutData.username}
                            onChange={(e) => setCheckoutData({...checkoutData, username: e.target.value})}
                            placeholder="email@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-snap-yellow focus:ring-1 focus:ring-snap-yellow outline-none transition-all font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                          <input 
                            type="password"
                            value={checkoutData.password}
                            onChange={(e) => setCheckoutData({...checkoutData, password: e.target.value})}
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-snap-yellow focus:ring-1 focus:ring-snap-yellow outline-none transition-all font-bold"
                          />
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-snap-yellow/5 border border-snap-yellow/20 flex gap-4">
                        <ShieldCheck className="w-6 h-6 text-snap-yellow flex-shrink-0" />
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          {lang === 'ar' 
                            ? 'بياناتك مشفرة وتستخدم فقط لعملية الرفع. سيتم إرسال طلبك عبر الواتساب.' 
                            : 'Your data is encrypted and used only for the boosting process. Your order will be sent via WhatsApp.'}
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          setIsProcessing(true);
                          setTimeout(() => {
                            const message = `New Score Boosting Order!\nTier: ${selectedBoostingTier.amount} Score\nEmail: ${checkoutData.username}\nPassword: ${checkoutData.password}\nPrice: ${selectedBoostingTier.price}`;
                            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                            setIsProcessing(false);
                          }, 1500);
                        }}
                        disabled={isProcessing || !checkoutData.username || !checkoutData.password}
                        className="w-full py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] disabled:opacity-50 disabled:hover:scale-100 text-xl flex items-center justify-center gap-4"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCcw className="w-6 h-6 animate-spin" />
                            {lang === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                          </>
                        ) : (
                          <>
                            <WhatsAppIcon className="w-6 h-6" />
                            {lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send Order via WhatsApp'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
              <div className="flex gap-3 text-xl">
              </div>
            </div>
            
            <div className="text-gray-500 text-xs font-bold flex items-center gap-2">
              {t.footer.rights}
              <div className="mt-2 text-[10px] opacity-50 flex items-center gap-2">
                <div className="w-4 h-4 bg-snap-yellow rounded-sm flex items-center justify-center">
                  <Star className="text-black w-2.5 h-2.5 fill-black" />
                </div>
                We are not affiliated with Snapchat Inc.
              </div>
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



