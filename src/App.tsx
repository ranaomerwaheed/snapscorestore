import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  InfinityIcon, 
  Lock, 
  Star, 
  HelpCircle, 
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
  Youtube,
  Send,
  Share2,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  ShoppingBag,
  Camera,
  MapPin,
  UserCircle,
  Upload,
  Download,
  Loader2,
  Search,
  Calculator,
  User,
  History,
  ExternalLink,
  Link,
  AlertTriangle,
  Check,
  Sparkles,
  Gem,
  Flame,
  Crown,
  Target,
  Rocket
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
      tools: "Tools",
      shop: "Shop Now",
      lang: "العربية",
      toolItems: [
        { id: 'calc', title: "Snapchat Score Calculator", ar: "سناب شات سكور حاسبة" },
        { id: 'checker', title: "Account Age & Trust Checker", ar: "فاحص عمر الحساب" },
        { id: 'tracker', title: "Snapchat Score Milestone Tracker", ar: "مخطط أهداف السكور" },
        { id: 'bitmoji', title: "Bitmoji Avatar Creator", ar: "منشئ صور بيتموجي" },
        { id: 'lens', title: "AI Lens Simulator", ar: "محاكي عدسات الذكاء الاصطناعي" },
        { id: 'map', title: "Snap Map Location Finder", ar: "مكتشف مواقع خريطة سناب" },
        { id: 'snapify', title: "Snapify Pro", ar: "سناب فاي برو", isPro: true }
      ],
      serviceItems: [
        { id: 'boosting', title: "Score Boosting", ar: "زيادة السكور" },
        { id: 'followers', title: "Follower Increase", ar: "زيادة المتابعين" },
        { id: 'views', title: "Stories Spotlight View", ar: "مشاهدات الستوري" },
        { id: 'lens', title: "Create Lens", ar: "إنشاء عدسات" },
        { id: 'badge', title: "Verified Badge", ar: "توثيق الحساب" }
      ],
      catalogItems: [
        { id: 'score', title: "Score Account", ar: "حسابات سكور" },
        { id: 'followers', title: "Follower Account", ar: "حسابات متابعين" },
        { id: 'age', title: "Age Account", ar: "حسابات قديمة" },
        { id: 'verified', title: "Verified Account", ar: "حسابات موثقة" }
      ]
    },
    hero: {
      badge: "Trusted by 10,000+ Clients",
      title: "Boost Your Snapchat Presence Instantly",
      titleHighlight: "",
      subtitle: "",
      desc: "Securely increase your Snap Score, get aged accounts, and grow your followers with the world's most trusted provider.",
      cta: "View Catalog",
      secondary: "Our Services",
      scoreLabel: "Current Score",
      targetLabel: "Target Boost",
      protection: "100% Account Safety Guaranteed"
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
      title: "Why Choose SnapScore Store?",
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
    tools_ui: {
      bitmoji: {
        title: "Bitmoji Avatar Creator",
        subtitle: "Describe your perfect character and let AI create it",
        placeholder: "Example: Cool guy with sunglasses, blue hoodie, blonde hair",
        button: "Generate Image",
        result: "Your Custom Avatar"
      },
      lens: {
        title: "AI Lens Simulator",
        subtitle: "Upload an image and apply famous Snapchat lenses",
        upload: "Upload Image",
        type: "Select Lens Type",
        button: "Apply Lens",
        result: "Lens Applied"
      },
      map: {
        title: "Snap Map Location Finder",
        subtitle: "Explore popular Snap Map locations anywhere in the world",
        placeholder: "Enter city or place name",
        button: "Find Locations",
        result: "Popular Locations"
      }
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
          icon: <InfinityIcon className="w-8 h-8" />,
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
    snapify: {
      titleHighlight: "Snapify Pro",
      subtitle: "",
      protection: "100% Account Safety Guaranteed"
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
        { value: "50K+", label: "Orders Completed" },
        { value: "12+", label: "Years Experience" },
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
        },
        {
          q: "What is the 14-Day Money Back Guarantee?",
          a: "We stand by our service. If you're not satisfied with the results, we'll refund your purchase within 14 days."
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
          arTitle: "دليل أمان حساب سناب شات: ممارسات تسجيل الدخول الآمن ومنع الحظر",
          date: "March 20, 2026",
          excerpt: "Learn how to keep your account safe and prevent bans with our comprehensive safety guide.",
          arExcerpt: "تعرف على كيفية الحفاظ على أمان حسابك ومنع الحظر من خلال دليل الأمان الشامل الخاص بنا.",
          thumbnail: "https://picsum.photos/seed/snap-safety/1200/800",
          content: `...`
        },
        {
          title: "Snapchat Score Top-Up: Important Information During Top-Up Process",
          date: "March 28, 2026",
          excerpt: "Everything you need to know about the score top-up process and what to expect.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-topup.svg",
          content: `...`
        },
        {
          title: "Buy Premade Snapchat Accounts with High SnapScore (10k to 1M+)",
          date: "March 28, 2026",
          excerpt: "Discover the benefits of buying premade accounts with high scores and how to choose the right one.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-boost.svg",
          content: `...`
        },
        {
          title: "Snapchat Cross-Promotion Tips: Grow Followers Fast on Any Platform",
          date: "March 29, 2026",
          excerpt: "Discover the most effective and safe methods to boost your score in 2026.",
          thumbnail: "https://freesnapscores.com/blog/cross-promotion.svg",
          content: `...`
        }
      ]
    },
    cta: {
      title: "Ready to Level Up?",
      subtitle: "Join thousands of satisfied users and start your boost today.",
      button: "Contact on WhatsApp"
    },
    footer: {
      rights: "© 2026 SnapScore Store. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: March 2026",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information you provide directly to us when you place an order, including your Snapchat username and, in some cases, account credentials required for score boosting services."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you."
        },
        {
          title: "3. Data Security",
          content: "We implement a variety of security measures to maintain the safety of your personal information. Your credentials are encrypted and used only for the duration of the service."
        },
        {
          title: "4. Third-Party Disclosure",
          content: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: March 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using SnapScore Store, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          title: "2. Description of Service",
          content: "SnapScore Store provides social media growth services. We are not affiliated with Snapchat Inc."
        },
        {
          title: "3. User Responsibilities",
          content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
        },
        {
          title: "4. Refund Policy",
          content: "Due to the nature of digital services, all sales are final. Refunds are only issued if we are unable to complete the service."
        }
      ]
    }
  },
  ar: {
    // ... Arabic translations
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
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: { en: "Sara Mohammed", ar: "سارة محمد" },
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
  },
  {
    name: { en: "Layla Hassan", ar: "ليلى حسن" },
    location: { en: "Kuwait City, Kuwait", ar: "مدينة الكويت، الكويت" },
    text: { 
      en: "Incredible results! My account looks so much more professional now. The support team was very helpful.", 
      ar: "نتائج مذهلة! حسابي يبدو أكثر احترافية الآن. فريق الدعم كان متعاوناً جداً." 
    },
    avatar: "https://picsum.photos/seed/user4/100/100"
  },
  {
    name: { en: "Omar Farooq", ar: "عمر فاروق" },
    location: { en: "Manama, Bahrain", ar: "المنامة، البحرين" },
    text: { 
      en: "Fast delivery and great communication. I will definitely use this service again for my other accounts.", 
      ar: "تسليم سريع وتواصل رائع. سأستخدم هذه الخدمة بالتأكيد مرة أخرى لحساباتي الأخرى." 
    },
    avatar: "https://picsum.photos/seed/user5/100/100"
  },
  {
    name: { en: "Noura Al-Said", ar: "نورة السعيد" },
    location: { en: "Muscat, Oman", ar: "مسقط، عمان" },
    text: { 
      en: "The AI tools are a game changer! I love the Bitmoji creator. The score boost was also perfect.", 
      ar: "أدوات الذكاء الاصطناعي غيرت كل شيء! أحببت منشئ البيتموجي. زيادة السكور كانت مثالية أيضاً." 
    },
    avatar: "https://picsum.photos/seed/user6/100/100"
  }
];

const catalog = [
  { id: 1, score: "5K+", price: "$15", age: "2023", type: "Starter", description: { en: "Fresh Account", ar: "حساب جديد" } },
  { id: 2, score: "10K+", price: "$25", age: "2022", type: "Basic", description: { en: "Established Account", ar: "حساب قائم" } },
  { id: 3, score: "20K+", price: "$35", age: "2021", type: "Growth", description: { en: "Active Account", ar: "حساب نشط" } },
  { id: 4, score: "50K+", price: "$55", age: "2020", type: "Popular", description: { en: "High Engagement", ar: "تفاعل عالي" } },
  { id: 5, score: "100K+", price: "$95", age: "2019", type: "Influencer", description: { en: "Professional Presence", ar: "حضور احترافي" } },
  { id: 6, score: "200K+", price: "$160", age: "2018", type: "Pro", description: { en: "Authority Account", ar: "حساب سلطة" } },
  { id: 7, score: "300K+", price: "$220", age: "2017", type: "Expert", description: { en: "Expert Presence", ar: "حضور خبير" } },
  { id: 8, score: "500K+", price: "$280", age: "2016", type: "Elite", description: { en: "Elite Presence", ar: "حضور النخبة" } },
  { id: 9, score: "700K+", price: "$350", age: "2015", type: "Ultimate", description: { en: "Ultimate Presence", ar: "حضور أقصى" } },
  { id: 10, score: "1M+", price: "$450", age: "2014", type: "Legendary", description: { en: "Legendary Status", ar: "حالة أسطورية" } },
  { id: 11, score: "2M+", price: "$850", age: "2013", type: "Mythic", description: { en: "Mythic Status", ar: "حالة خرافية" } },
  { id: 12, score: "5M+", price: "$1800", age: "2012", type: "Godlike", description: { en: "Godlike Authority", ar: "سلطة إلهية" } },
  { id: 13, score: "10M+", price: "$3500", age: "2011", type: "Ultimate", description: { en: "Ultimate Authority", ar: "السلطة القصوى" } },
];

const accountCategories = [
  { id: 'snapscore', title: { en: 'SnapScore Account', ar: 'حسابات سكور عالي' }, icon: <Star />, color: 'blue', desc: { en: 'High score accounts ready for use.', ar: 'حسابات بسكور عالي جاهزة للاستخدام.' } },
  { id: 'follower', title: { en: 'Follower Account', ar: 'حسابات متابعين' }, icon: <Users />, color: 'purple', desc: { en: 'Accounts with real followers and reach.', ar: 'حسابات مع متابعين حقيقيين وتفاعل.' } },
  { id: 'aged', title: { en: 'Aged Account', ar: 'حسابات قديمة' }, icon: <History />, color: 'orange', desc: { en: 'Old accounts from 2015-2020.', ar: 'حسابات قديمة من 2015-2020.' } },
  { id: 'verified', title: { en: 'Verified Account', ar: 'حسابات موثقة' }, icon: <BadgeCheck />, color: 'green', desc: { en: 'Accounts with verification badges.', ar: 'حسابات موثقة بشارات التوثيق.' } },
];

const agedAccountsStock = [
  { id: 'a2015', amount: '2015 Created', price: '$45', desc: { en: 'Rare 2015 account', ar: 'حساب نادر من 2015' } },
  { id: 'a2016', amount: '2016 Created', price: '$35', desc: { en: 'Vintage 2016 account', ar: 'حساب قديم من 2016' } },
  { id: 'a2017', amount: '2017 Created', price: '$25', desc: { en: 'Stable 2017 account', ar: 'حساب مستقر من 2017' } },
  { id: 'a2018', amount: '2018 Created', price: '$20', desc: { en: 'Trusted 2018 account', ar: 'حساب موثوق من 2018' } },
];

const verifiedAccountsStock = [
  { id: 'vgold', amount: 'Gold Badge', price: '$1500', desc: { en: 'Official Gold Star verification', ar: 'توثيق النجمة الذهبية الرسمي' } },
  { id: 'vpublic', amount: 'Public Profile', price: '$50', desc: { en: 'Verified public profile status', ar: 'حالة ملف تعريف عام موثقة' } },
];

const scoreAccountsStock = [
  { id: 'sa5k', amount: '5,000', price: '$15', type: 'Score Account', age: '2023', followers: '100-500', deliveryTime: '1-2 Hours', desc: { en: 'Starter Score Account', ar: 'حساب سكور بداية' } },
  { id: 'sa10k', amount: '10,000', price: '$25', type: 'Score Account', age: '2022', followers: '500-1k', deliveryTime: '1-2 Hours', desc: { en: 'Aged Score Account', ar: 'حساب سكور قديم' } },
  { id: 'sa20k', amount: '20,000', price: '$35', type: 'Score Account', age: '2021', followers: '1k-2k', deliveryTime: '2-4 Hours', desc: { en: 'Growth Score Account', ar: 'حساب سكور نمو' } },
  { id: 'sa50k', amount: '50,000', price: '$55', type: 'Score Account', age: '2020', followers: '2k-5k', deliveryTime: '4-6 Hours', desc: { en: 'Popular Score Tier', ar: 'فئة سكور شائعة' } },
  { id: 'sa100k', amount: '100,000', price: '$95', type: 'Score Account', age: '2019', followers: '5k-10k', deliveryTime: '6-12 Hours', desc: { en: 'Influencer Ready', ar: 'جاهز للمؤثرين' } },
  { id: 'sa200k', amount: '200,000', price: '$160', type: 'Score Account', age: '2018', followers: '10k-20k', deliveryTime: '12-24 Hours', desc: { en: 'Pro Status', ar: 'مستوى المحترفين' } },
  { id: 'sa300k', amount: '300,000', price: '$220', type: 'Score Account', age: '2017', followers: '20k-30k', deliveryTime: '24-48 Hours', desc: { en: 'Expert Status', ar: 'مستوى الخبراء' } },
  { id: 'sa500k', amount: '500,000', price: '$280', type: 'Score Account', age: '2016', followers: '30k-50k', deliveryTime: '2-3 Days', desc: { en: 'Elite Presence', ar: 'حضور النخبة' } },
  { id: 'sa700k', amount: '700,000', price: '$350', type: 'Score Account', age: '2015', followers: '50k-70k', deliveryTime: '3-5 Days', desc: { en: 'Ultimate Presence', ar: 'حضور أقصى' } },
  { id: 'sa1m', amount: '1,000,000', price: '$450', type: 'Score Account', age: '2014', followers: '100k+', deliveryTime: '5-7 Days', desc: { en: 'Legendary Status', ar: 'حالة أسطورية' } },
  { id: 'sa2m', amount: '2,000,000', price: '$850', type: 'Score Account', age: '2013', followers: '200k+', deliveryTime: '7-10 Days', desc: { en: 'Double Millionaire', ar: 'مليونير مزدوج' } },
  { id: 'sa5m', amount: '5,000,000', price: '$1800', type: 'Score Account', age: '2012', followers: '500k+', deliveryTime: '10-15 Days', desc: { en: 'Mega Authority', ar: 'سلطة ضخمة' } },
  { id: 'sa10m', amount: '10,000,000', price: '$3500', type: 'Score Account', age: '2011', followers: '1M+', deliveryTime: '15-20 Days', desc: { en: 'Ultimate Authority', ar: 'السلطة القصوى' } },
];

const followerAccountsStock = [
  { id: 'fa5k', amount: '5,000', price: '$45', type: 'Follower Account', age: '2022', score: '1k-5k', deliveryTime: '1-2 Hours', desc: { en: 'Rising Star', ar: 'نجم صاعد' } },
  { id: 'fa10k', amount: '10,000', price: '$85', type: 'Follower Account', age: '2021', score: '5k-10k', deliveryTime: '2-4 Hours', desc: { en: 'Popular Account', ar: 'حساب شائع' } },
  { id: 'fa20k', amount: '20,000', price: '$150', type: 'Follower Account', age: '2020', score: '10k-20k', deliveryTime: '4-6 Hours', desc: { en: 'Influencer Pack', ar: 'باقة المؤثرين' } },
  { id: 'fa50k', amount: '50,000', price: '$350', type: 'Follower Account', age: '2019', score: '20k-50k', deliveryTime: '6-12 Hours', desc: { en: 'Elite Presence', ar: 'حضور النخبة' } },
  { id: 'fa100k', amount: '100,000', price: '$650', type: 'Follower Account', age: '2018', score: '50k-100k', deliveryTime: '12-24 Hours', desc: { en: 'Verified Potential', ar: 'إمكانية توثيق' } },
  { id: 'fa200k', amount: '200,000', price: '$1100', type: 'Follower Account', age: '2017', score: '100k-200k', deliveryTime: '24-48 Hours', desc: { en: 'Mega Account', ar: 'حساب ضخم' } },
  { id: 'fa300k', amount: '300,000', price: '$1500', type: 'Follower Account', age: '2016', score: '200k-300k', deliveryTime: '2-3 Days', desc: { en: 'Pro Account', ar: 'حساب محترف' } },
  { id: 'fa500k', amount: '500,000', price: '$2200', type: 'Follower Account', age: '2015', score: '300k-500k', deliveryTime: '3-5 Days', desc: { en: 'Top Tier Presence', ar: 'حضور من الفئة الأولى' } },
  { id: 'fa700k', amount: '700,000', price: '$2900', type: 'Follower Account', age: '2014', score: '500k-700k', deliveryTime: '5-7 Days', desc: { en: 'Ultimate Reach', ar: 'وصول أقصى' } },
];

const servicesList = [
  { id: 's_boost', title: 'Snap Score Boost', price: 'From $10', icon: <TrendingUp />, deliveryTime: '1-48 Hours', guarantee: '100% Safe', desc: { en: 'Boost your own account from 5k to 1M score safely.', ar: 'ارفع سكور حسابك من 5000 إلى مليون بأمان.' } },
  { id: 's_lens', title: 'Snapchat AR Lens Create', price: 'Contact Us', icon: <Zap />, deliveryTime: '3-5 Days', guarantee: 'Custom Design', desc: { en: 'Custom AR lenses created for your profile.', ar: 'عدسات واقع معزز مخصصة لملفك الشخصي.' } },
  { id: 's_followers', title: 'Snapchat Follower Increase', price: 'From $20', icon: <Users />, deliveryTime: '1-24 Hours', guarantee: 'Non-Drop', desc: { en: 'Increase real followers on your account.', ar: 'زيادة متابعين حقيقيين على حسابك.' } },
  { id: 's_badge', title: 'Get Verified Badge', price: 'Contact Us', icon: <BadgeCheck />, deliveryTime: '7-14 Days', guarantee: 'Official Badge', desc: { en: 'Professional assistance for the Gold Star badge.', ar: 'مساعدة احترافية للحصول على شارة النجمة الذهبية.' } },
  { id: 's_views', title: 'View Service', price: 'From $15', icon: <Eye />, deliveryTime: '1-2 Hours', guarantee: 'Instant Start', desc: { en: 'Boost your story views instantly.', ar: 'عزز مشاهدات الستوري الخاصة بك فوراً.' } },
];

const boostingTiers = [
  { id: 'b5k', amount: '5,000', price: '$10' },
  { id: 'b10k', amount: '10,000', price: '$18' },
  { id: 'b20k', amount: '20,000', price: '$35' },
  { id: 'b50k', amount: '50,000', price: '$80' },
  { id: 'b100k', amount: '100,000', price: '$150' },
  { id: 'b200k', amount: '200,000', price: '$280' },
  { id: 'b300k', amount: '300,000', price: '$400' },
  { id: 'b500k', amount: '500,000', price: '$650' },
  { id: 'b700k', amount: '700,000', price: '$850' },
  { id: 'b1m', amount: '1,000,000', price: '$1200' },
];

// Service Detail Component
const ServiceDetail = ({ service, lang, onBack, openWhatsApp }: { service: any, lang: string, onBack: () => void, openWhatsApp: (msg: string) => void }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const title = lang === 'ar' ? (service.arTitle || service.title) : service.title;
  const desc = lang === 'ar' ? (service.desc.ar || service.desc.en) : service.desc.en;
  const isScoreBoost = service.id === 's_boost';

  const boostTiers = [
    { id: 'b5k', amount: '5,000', price: '$10', time: '1-2 hrs' },
    { id: 'b10k', amount: '10,000', price: '$18', time: '2-4 hrs' },
    { id: 'b20k', amount: '20,000', price: '$35', time: '4-6 hrs' },
    { id: 'b50k', amount: '50,000', price: '$80', time: '6-12 hrs' },
    { id: 'b100k', amount: '100,000', price: '$150', time: '12-24 hrs' },
    { id: 'b200k', amount: '200,000', price: '$280', time: '24-48 hrs' },
    { id: 'b300k', amount: '300,000', price: '$400', time: '2-3 days' },
    { id: 'b500k', amount: '500,000', price: '$650', time: '3-5 days' },
    { id: 'b700k', amount: '700,000', price: '$850', time: '5-7 days' },
    { id: 'b1m', amount: '1,000,000', price: '$1200', time: '7-10 days' },
  ];

  const followerTiers = [
    { id: 'f500', amount: '500', price: '$20', time: '1-2 hrs' },
    { id: 'f1k', amount: '1,000', price: '$35', time: '2-4 hrs' },
    { id: 'f5k', amount: '5,000', price: '$150', time: '6-12 hrs' },
    { id: 'f10k', amount: '10,000', price: '$280', time: '12-24 hrs' },
  ];

  const viewTiers = [
    { id: 'v1k', amount: '1,000', price: '$15', time: '1-2 hrs' },
    { id: 'v5k', amount: '5,000', price: '$60', time: '2-4 hrs' },
    { id: 'v10k', amount: '10,000', price: '$110', time: '4-8 hrs' },
    { id: 'v50k', amount: '50,000', price: '$480', time: '12-24 hrs' },
  ];

  const tiers = isScoreBoost ? boostTiers : service.id === 's_followers' ? followerTiers : service.id === 's_views' ? viewTiers : [];

  const shareLink = (tierId?: string) => {
    const hash = tierId ? `service-${service.id}-tier-${tierId}` : `service-${service.id}`;
    const link = `${window.location.origin}${window.location.pathname}#${hash}`;
    if (navigator.share) {
      navigator.share({ title, url: link });
    } else {
      navigator.clipboard.writeText(link).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const svcColors: Record<string, string> = {
    's_boost': 'from-yellow-900/60 to-yellow-600/10 border-yellow-500/40',
    's_followers': 'from-purple-900/60 to-purple-600/10 border-purple-500/40',
    's_views': 'from-blue-900/60 to-blue-600/10 border-blue-500/40',
    's_lens': 'from-cyan-900/60 to-cyan-600/10 border-cyan-500/40',
    's_badge': 'from-green-900/60 to-green-600/10 border-green-500/40',
  };
  const colorClass = svcColors[service.id] || 'from-gray-900/60 to-gray-600/10 border-gray-500/40';

  return (
    <section className="pt-40 pb-24 px-6 min-h-screen bg-matte-black">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${colorClass} border-2 rounded-[3rem] overflow-hidden shadow-2xl p-8 lg:p-14 mb-10 relative`}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 bg-snap-yellow"></div>

          <div className="flex items-center gap-4 mb-10">
            <button onClick={onBack} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all shadow-lg flex-shrink-0">
              <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <button onClick={() => shareLink()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white transition-all">
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
            </button>
            <div className="text-xs font-mono text-gray-600 truncate hidden sm:block">#{`service-${service.id}`}</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-24 h-24 rounded-3xl bg-snap-yellow/20 border-2 border-snap-yellow/30 flex items-center justify-center text-snap-yellow shrink-0 shadow-inner">
              {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-12 h-12" })}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl lg:text-6xl font-black mb-4 text-white uppercase tracking-tighter">{title}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-xl bg-snap-yellow/10 border border-snap-yellow/30 text-snap-yellow font-bold text-sm">💰 {service.price}</span>
                <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-sm">⏱ {service.deliveryTime}</span>
                <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-sm">🛡 {service.guarantee}</span>
                {isScoreBoost
                  ? <span className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm">🔑 {lang === 'ar' ? 'كلمة المرور مطلوبة' : 'Password Required'}</span>
                  : <span className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm">✅ {lang === 'ar' ? 'لا كلمة مرور' : 'No Password Needed'}</span>
                }
              </div>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">{desc}</p>
            </div>
          </div>
        </motion.div>

        {tiers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">
              {lang === 'ar' ? '🎯 اختر الباقة' : '🎯 Choose Package'} <span className="text-snap-yellow">{lang === 'ar' ? '— كل باقة لها رابط خاص' : '— Each Has Its Own Link'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {tiers.map((tier, i) => {
                const tierColors = ['from-blue-900/50 to-blue-600/10 border-blue-500/30','from-purple-900/50 to-purple-600/10 border-purple-500/30','from-orange-900/50 to-orange-600/10 border-orange-500/30','from-green-900/50 to-green-600/10 border-green-500/30','from-pink-900/50 to-pink-600/10 border-pink-500/30','from-cyan-900/50 to-cyan-600/10 border-cyan-500/30'];
                const tc = tierColors[i % tierColors.length];
                return (
                  <motion.div key={tier.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className={`p-6 rounded-[2rem] bg-gradient-to-br ${tc} border-2 hover:scale-105 transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl opacity-30 bg-snap-yellow group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-black mb-1 group-hover:text-snap-yellow transition-colors">{tier.amount}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">
                        {isScoreBoost ? 'Score' : service.id === 's_followers' ? 'Followers' : 'Views'}
                      </div>
                      <div className="text-2xl font-bold text-snap-yellow mb-2">{tier.price}</div>
                      <div className="text-xs text-gray-500 mb-5">⏱ {tier.time}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (isScoreBoost) {
                              openWhatsApp(`I want to order Score Boost: ${tier.amount} Score — Price: ${tier.price}`);
                            } else {
                              openWhatsApp(`I want to order ${service.title}: ${tier.amount} — Price: ${tier.price}`);
                            }
                          }}
                          className="flex-1 py-3 bg-snap-yellow text-black font-black rounded-xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          {lang === 'ar' ? 'اطلب' : 'Order'}
                        </button>
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}${window.location.pathname}#service-${service.id}-tier-${tier.id}`;
                            navigator.clipboard.writeText(link).then(() => alert(lang === 'ar' ? 'تم نسخ رابط الباقة!' : 'Tier link copied!'));
                          }}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                          title="Copy link"
                        >
                          <Link className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-3 text-xs text-gray-700 font-mono truncate">#service-{service.id}-tier-{tier.id}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {tiers.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass p-10 rounded-[3rem] border-white/10"
          >
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">{lang === 'ar' ? 'تواصل معنا عبر واتساب للحصول على عرض مخصص.' : 'Contact us via WhatsApp for a custom quote.'}</p>
            <button
              onClick={() => openWhatsApp(`I want to order ${service.title}`)}
              className="w-full py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] flex items-center justify-center gap-3 text-xl"
            >
              <ShoppingBag className="w-6 h-6" />
              {lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </button>
          </motion.div>
        )}

        {isScoreBoost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-4"
          >
            <Lock className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-red-400 mb-1">{lang === 'ar' ? 'تنبيه: كلمة المرور مطلوبة' : 'Note: Password Required'}</div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'خدمة رفع السكور تتطلب وصولاً مؤقتاً للحساب. بياناتك مشفرة وآمنة. غيّر كلمة مرورك بعد اكتمال الخدمة.'
                  : 'Score boosting requires temporary account access. Your credentials are encrypted and safe. Change your password after service completion.'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Product Detail Component
const ProductDetail = ({ product, lang, onBack, onBuy }: { product: any, lang: string, onBack: () => void, onBuy: (p: any) => void }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const desc = lang === 'ar' ? (product.desc?.ar || product.desc?.en || '') : (product.desc?.en || '');
  const isScoreAccount = product.type === 'Score Account';
  const isFollowerAccount = product.type === 'Follower Account';

  const shareThisLink = () => {
    const link = `${window.location.origin}${window.location.pathname}#product-${product.id}`;
    if (navigator.share) {
      navigator.share({ title: `${product.type} ${product.amount}`, url: link });
    } else {
      navigator.clipboard.writeText(link).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const productColors: Record<string, string> = {
    'Score Account': 'from-blue-900/60 to-blue-600/10 border-blue-500/40 text-blue-400',
    'Follower Account': 'from-purple-900/60 to-purple-600/10 border-purple-500/40 text-purple-400',
    'default': 'from-orange-900/60 to-orange-600/10 border-orange-500/40 text-orange-400',
  };
  const colorStr = productColors[product.type] || productColors['default'];
  const accentColor = isScoreAccount ? 'blue' : isFollowerAccount ? 'purple' : 'orange';

  return (
    <section className="pt-40 pb-24 px-6 min-h-screen bg-matte-black">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${colorStr.split(' text-')[0]} border-2 rounded-[3rem] overflow-hidden shadow-2xl p-8 lg:p-14 relative`}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-snap-yellow"></div>

          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <button onClick={onBack} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all shadow-lg flex-shrink-0">
              <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <button onClick={shareThisLink} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white transition-all">
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
            </button>
            <code className="text-xs text-gray-600 font-mono hidden sm:block">#product-{product.id}</code>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className={`w-full lg:w-80 aspect-square rounded-[2.5rem] bg-gradient-to-br from-${accentColor}-600/20 to-transparent border-2 border-${accentColor}-500/30 flex items-center justify-center relative overflow-hidden group flex-shrink-0`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.08)_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="text-center relative z-10 px-4">
                <div className="text-6xl lg:text-7xl font-black text-snap-yellow mb-3 drop-shadow-[0_0_30px_rgba(255,252,0,0.4)]">
                  {product.amount}
                </div>
                <div className="text-lg font-black text-white uppercase tracking-widest opacity-60">
                  {isScoreAccount ? (lang === 'ar' ? 'سكور' : 'Score') : isFollowerAccount ? (lang === 'ar' ? 'متابع' : 'Followers') : product.amount}
                </div>
                <div className="mt-4 px-4 py-2 rounded-full bg-snap-yellow text-black text-sm font-black">{product.price}</div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <h1 className="text-3xl lg:text-5xl font-black mb-6 text-white uppercase tracking-tighter">
                {product.type} — {product.amount}
              </h1>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-gray-500 text-xs uppercase font-black mb-1">{lang === 'ar' ? 'السعر' : 'Price'}</span>
                  <span className="text-2xl font-black text-snap-yellow">{product.price}</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-gray-500 text-xs uppercase font-black mb-1">{lang === 'ar' ? 'التسليم' : 'Delivery'}</span>
                  <span className="text-xl font-black text-white">{product.deliveryTime || '1-24 hrs'}</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-gray-500 text-xs uppercase font-black mb-1">{lang === 'ar' ? 'سنة الإنشاء' : 'Account Age'}</span>
                  <span className="text-xl font-black text-white">{product.age || '2020+'}</span>
                </div>
                {(isScoreAccount || isFollowerAccount) && (
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-gray-500 text-xs uppercase font-black mb-1">
                      {isScoreAccount ? (lang === 'ar' ? 'المتابعون' : 'Followers') : (lang === 'ar' ? 'السكور' : 'Score')}
                    </span>
                    <span className="text-xl font-black text-white">{isScoreAccount ? product.followers : product.score}</span>
                  </div>
                )}
                <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20 col-span-2 sm:col-span-1">
                  <span className="block text-gray-500 text-xs uppercase font-black mb-1">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</span>
                  <span className="text-sm font-black text-green-400">✅ {lang === 'ar' ? 'غير مطلوبة' : 'NOT Required'}</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-10 font-medium">{desc}</p>

              <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20 flex gap-3 mb-8">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">
                  {lang === 'ar'
                    ? 'هذا المنتج لا يتطلب كلمة مرور. فقط أرسل اسم مستخدم سناب شات الخاص بك وسنتولى الباقي.'
                    : 'This product does NOT require a password. Just send your Snapchat username and we handle the rest.'}
                </p>
              </div>

              <button onClick={() => onBuy(product)}
                className="w-full px-12 py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] flex items-center justify-center gap-3 text-xl"
              >
                <ShoppingBag className="w-6 h-6" />
                {lang === 'ar' ? 'اشترِ الآن عبر واتساب' : 'Buy Now via WhatsApp'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Back Button Component
const BackButton = ({ onClick, lang }: { onClick: () => void, lang: string }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-snap-yellow hover:text-black transition-all font-bold mb-6 group"
  >
    <ChevronLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
    <span>{lang === 'ar' ? 'رجوع' : 'Back'}</span>
  </button>
);

// Blog Detail Component
const BlogDetail = ({ post, lang, onBack }: { post: any, lang: string, onBack: () => void }) => {
  const [copied, setCopied] = useState(false);
  const content = lang === 'ar' ? (post.arContent || post.content) : post.content;
  const title = lang === 'ar' ? (post.arTitle || post.title) : post.title;

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-40 pb-24 px-6 min-h-screen bg-matte-black">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[3rem] border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="relative h-[300px] lg:h-[500px]">
            <img 
              src={post.thumbnail || `https://picsum.photos/seed/blog-${post.title}/1200/800`} 
              alt={title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/20 to-transparent"></div>
            <button 
              onClick={onBack}
              className="absolute top-8 left-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all z-20 shadow-lg"
            >
              <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="p-8 lg:p-16 -mt-20 relative z-10">
            <div className="inline-block px-6 py-3 rounded-2xl bg-snap-yellow text-black font-black text-sm uppercase tracking-widest mb-8 shadow-[0_10px_30px_rgba(255,252,0,0.3)]">
              {post.date}
            </div>
            <h1 className="text-4xl lg:text-7xl font-black mb-12 leading-tight tracking-tighter italic text-white uppercase">
              {title}
            </h1>
            
            <div className="prose prose-invert prose-snap max-w-none">
              <div className={`text-gray-300 leading-relaxed text-xl space-y-10 markdown-body ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => (
                      <div className="my-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/30 to-purple-600/10 border-2 border-blue-500/40 shadow-[0_20px_50px_rgba(37,99,235,0.2)] relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                        <h2 className="text-3xl lg:text-5xl font-black text-blue-400 m-0 uppercase tracking-tighter italic relative z-10 drop-shadow-lg" {...props} />
                      </div>
                    ),
                    h3: ({node, ...props}) => (
                      <div className="my-12 p-8 rounded-[2rem] bg-gradient-to-r from-snap-yellow/20 to-transparent border-l-8 border-snap-yellow shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-snap-yellow/5 rounded-full blur-2xl"></div>
                        <h3 className="text-2xl lg:text-4xl font-black text-snap-yellow m-0 uppercase tracking-tight relative z-10 drop-shadow-md" {...props} />
                      </div>
                    ),
                    h4: ({node, ...props}) => (
                      <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-green-600/20 to-emerald-600/5 border-2 border-green-500/30 shadow-xl">
                        <h4 className="text-xl lg:text-3xl font-black text-green-400 m-0 uppercase italic" {...props} />
                      </div>
                    ),
                    p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed font-medium mb-8 text-lg lg:text-xl" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-6 my-10 list-none p-0" {...props} />,
                    ol: ({node, ...props}) => <ol className="space-y-6 my-10 list-decimal list-inside p-0" {...props} />,
                    li: ({node, ...props}) => (
                      <li className="flex items-start gap-4 text-gray-300 font-medium bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-snap-yellow/40 hover:bg-white/10 transition-all shadow-lg group">
                        <div className="w-3 h-3 rounded-full bg-snap-yellow mt-3 shrink-0 shadow-[0_0_15px_rgba(255,252,0,0.6)] group-hover:scale-125 transition-transform"></div>
                        <span className="flex-1">{props.children}</span>
                      </li>
                    ),
                    strong: ({node, ...props}) => <strong className="text-snap-yellow font-black bg-snap-yellow/10 px-2 py-0.5 rounded border border-snap-yellow/20" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <div className="my-12 p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-600/20 to-pink-600/5 border-2 border-dashed border-purple-500/40 relative shadow-2xl">
                        <div className="absolute -top-6 left-10 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg">
                          {lang === 'ar' ? 'ملاحظة هامة' : 'Important Note'}
                        </div>
                        <blockquote className="italic text-purple-200 m-0 text-2xl font-medium leading-relaxed" {...props} />
                      </div>
                    )
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-20 pt-12 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-snap-yellow/20 flex items-center justify-center text-snap-yellow shadow-inner">
                  <Share2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="block font-black text-white uppercase tracking-widest text-lg">
                    {lang === 'ar' ? 'شارك هذا المقال' : 'Share this article'}
                  </span>
                  <span className="text-gray-500 text-sm">{lang === 'ar' ? 'انشر المعرفة مع أصدقائك' : 'Spread the knowledge with your friends'}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={copyLink}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-white font-black hover:bg-white/10 transition-all shadow-lg hover:-translate-y-1 relative group"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Link className="w-5 h-5 text-snap-yellow" />}
                  <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}</span>
                </button>
                
                <button 
                  onClick={() => {
                    const text = `${title}\n\n${window.location.href}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="px-8 py-4 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/30 flex items-center gap-3 text-[#25D366] font-black hover:bg-[#25D366]/30 transition-all shadow-lg hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </button>

                <button 
                  onClick={() => {
                    const text = `${title}\n\n${window.location.href}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg hover:-translate-y-1"
                >
                  <Twitter className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main App Component
export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'shop' | 'checkout' | 'blog' | 'blog_detail' | 'service_detail' | 'product_detail' | 'boosting' | 'calc' | 'checker' | 'tracker' | 'bitmoji' | 'lens' | 'map' | 'privacy' | 'terms' | 'category_detail' | 'snapify'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
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
  const [isSnapifyUnlocked, setIsSnapifyUnlocked] = useState(false);
  const [snapifyCode, setSnapifyCode] = useState('');
  const [showUsage, setShowUsage] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Tool States
  const [calcInput, setCalcInput] = useState({ current: '', target: '' });
  const [checkerInput, setCheckerInput] = useState('');
  const [trackerInput, setTrackerInput] = useState({ current: '', target: '' });
  const [bitmojiInput, setBitmojiInput] = useState('');
  const [lensInput, setLensInput] = useState<string | null>(null);
  const [lensType, setLensType] = useState('cartoon');
  const [mapInput, setMapInput] = useState('');
  const [toolResult, setToolResult] = useState<any>(null);
  const [isToolLoading, setIsToolLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToolClick = (toolId: string, isPro?: boolean) => {
    setView(toolId as any);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setToolResult(null);
  };

  const handleServiceClick = (serviceId: string) => {
    const service = servicesList.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setView('service_detail');
      window.scrollTo(0, 0);
    }
  };

  const handleCatalogClick = (itemId: string) => {
    if (itemId === 'score' || itemId === 'age') {
      setView('shop');
      setShopTab('score');
    } else if (itemId === 'followers') {
      setView('shop');
      setShopTab('followers');
    } else if (itemId === 'verified') {
      setView('shop');
      setShopTab('services');
    }
    window.scrollTo(0, 0);
  };

  const handleToolItemClick = (toolId: string) => {
    setView(toolId as any);
    setToolResult(null);
    window.scrollTo(0, 0);
  };

  const handleBitmoji = async () => {
    if (!bitmojiInput) return;
    setIsToolLoading(true);
    setToolResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Create a high-quality Snapchat Bitmoji-style avatar based on this description: ${bitmojiInput}. The style should be clean, 3D-rendered, and iconic to Snapchat's aesthetic.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      
      if (imageUrl) {
        setToolResult({ image: imageUrl });
      } else {
        throw new Error("No image generated");
      }
    } catch (error) {
      console.error("Bitmoji Error:", error);
      alert(lang === 'ar' ? 'فشل في إنشاء الصورة. يرجى المحاولة مرة أخرى.' : 'Failed to generate image. Please try again.');
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleLens = async () => {
    if (!lensInput) return;
    setIsToolLoading(true);
    setToolResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: lensInput.split(',')[1],
                mimeType: "image/png",
              },
            },
            {
              text: `Apply a Snapchat-style ${lensType} lens filter to this person's face. Make it look like a real Snapchat lens effect.`,
            },
          ],
        },
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      
      if (imageUrl) {
        setToolResult({ image: imageUrl });
      } else {
        throw new Error("No image generated");
      }
    } catch (error) {
      console.error("Lens Error:", error);
      alert(lang === 'ar' ? 'فشل في تطبيق العدسة. يرجى المحاولة مرة أخرى.' : 'Failed to apply lens. Please try again.');
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleMap = async () => {
    if (!mapInput) return;
    setIsToolLoading(true);
    setToolResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find interesting locations and Snap Map hotspots near: ${mapInput}. Provide a list of 3-5 places with a brief description of why they are popular on Snapchat.`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });
      
      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const maps = chunks?.filter(c => c.maps).map(c => c.maps) || [];
      
      setToolResult({ text, maps });
    } catch (error) {
      console.error("Map Error:", error);
      alert(lang === 'ar' ? 'فشل في العثور على المواقع. يرجى المحاولة مرة أخرى.' : 'Failed to find locations. Please try again.');
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLensInput(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
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
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setView('home');
        return;
      }

      if (hash.startsWith('service-')) {
        const rest = hash.slice('service-'.length);
        const parts = rest.split('-tier-');
        const serviceId = parts[0];
        const service = servicesList.find(s => s.id === serviceId);
        if (service) {
          setSelectedService({ ...service, _tierId: parts[1] || null });
          setView('service_detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (hash.startsWith('product-')) {
        const productId = hash.slice('product-'.length);
        const product = [...scoreAccountsStock, ...followerAccountsStock, ...agedAccountsStock, ...verifiedAccountsStock].find(p => p.id === productId);
        if (product) {
          setSelectedProduct(product);
          setView('product_detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (hash.startsWith('catalog-')) {
        const catId = hash.slice('catalog-'.length);
        setSelectedCategory(catId);
        setView('category_detail');
        window.scrollTo(0, 0);
        return;
      }

      if (hash.startsWith('blog-')) {
        const blogIndex = parseInt(hash.split('-')[1]);
        const post = translations[lang].blog.posts[blogIndex];
        if (post) {
          setSelectedBlogPost({ ...post, _index: blogIndex });
          setView('blog_detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      if (hash.startsWith('tool-')) {
        const toolId = hash.slice('tool-'.length);
        const validTools = ['calc', 'checker', 'tracker', 'bitmoji', 'lens', 'map', 'snapify'];
        if (validTools.includes(toolId)) {
          setView(toolId as any);
          setToolResult(null);
          window.scrollTo(0, 0);
          return;
        }
      }

      const validViews = ['home', 'shop', 'checkout', 'blog', 'boosting', 'calc', 'checker', 'tracker', 'bitmoji', 'lens', 'map', 'privacy', 'terms', 'snapify'];
      if (validViews.includes(hash)) {
        setView(hash as any);
        window.scrollTo(0, 0);
        return;
      }

      const homeAnchors = ['services', 'catalog', 'how', 'faq', 'contact'];
      if (homeAnchors.includes(hash)) {
        setView('home');
        return;
      }

      if (hash.startsWith('shop-')) {
        const tab = hash.split('-')[1];
        if (['score', 'followers', 'services'].includes(tab)) {
          setView('shop');
          setShopTab(tab as any);
          window.scrollTo(0, 0);
        }
      }

      if (hash.startsWith('buy-')) {
        const productId = hash.split('-')[1];
        const pkg = [...scoreAccountsStock, ...followerAccountsStock].find(p => p.id === productId);
        if (pkg) {
          setSelectedPackage(pkg);
          setView('checkout');
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lang]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getPackageColor = (amount: string) => {
    let numStr = amount.replace(/,/g, '').replace(/\+/g, '').toUpperCase();
    let num = 0;
    if (numStr.endsWith('K')) {
      num = parseFloat(numStr.replace('K', '')) * 1000;
    } else if (numStr.endsWith('M')) {
      num = parseFloat(numStr.replace('M', '')) * 1000000;
    } else {
      num = parseInt(numStr);
    }

    if (num <= 100000) {
      return 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/60 shadow-[0_0_30px_rgba(37,99,235,0.1)]';
    } else if (num <= 700000) {
      return 'bg-gradient-to-br from-purple-600/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/60 shadow-[0_0_30px_rgba(147,51,234,0.1)]';
    } else {
      return 'bg-gradient-to-br from-orange-600/20 to-yellow-400/20 border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_30px_rgba(234,88,12,0.1)]';
    }
  };

  const dropdownItems = {
    catalog: t.nav.catalogItems.map((item: any) => ({
      id: item.id,
      title: item.title,
      ar: item.ar,
      onClick: () => handleCatalogClick(item.id)
    })),
    services: t.nav.serviceItems.map((item: any) => ({
      id: item.id,
      title: item.title,
      ar: item.ar,
      onClick: () => handleServiceClick(item.id)
    })),
    tools: t.nav.toolItems.map((item: any) => ({
      id: item.id,
      title: item.title,
      ar: item.ar,
      isPro: item.isPro,
      onClick: () => handleToolItemClick(item.id)
    }))
  };

  const blogPosts = translations[lang].blog.posts.map((post, index) => ({ ...post, index }));

  return (
    <div className={`min-h-screen bg-matte-black selection:bg-snap-yellow selection:text-black overflow-x-hidden font-${lang === 'ar' ? 'cairo' : 'sans'} relative`}>
      {/* Enhanced Background with animated mesh and gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,252,0,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,255,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,255,0.05),transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 animate-drift"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,252,0,0.08)_0%,transparent_60%)] animate-spin-slow"></div>
      </div>

      {/* Header with animated dropdowns */}
      <header className="fixed top-0 left-0 right-0 z-50 header-gradient backdrop-blur-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-snap-yellow/60 to-transparent blur-[1px]"></div>
          
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('home')}>
            <div className="relative">
              <img 
                src="https://freesnapscores.com/assets/logo.svg" 
                alt="SnapScore Store Logo" 
                className="w-12 h-12 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,252,0,0.6)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-snap-yellow blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-snap-yellow via-white to-snap-yellow bg-clip-text text-transparent uppercase animate-gradient-x drop-shadow-[0_0_10px_rgba(255,252,0,0.3)]">SnapScore Store</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
            <button onClick={() => setView('home')} className={`hover:text-snap-yellow transition-colors ${view === 'home' ? 'text-snap-yellow' : ''}`}>{t.nav.home}</button>
            
            {/* Catalog Dropdown with animation */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('catalog')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.catalog}
                <ChevronRight className={`w-4 h-4 transition-transform ${activeDropdown === 'catalog' ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'catalog' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-snap-yellow/20 to-orange-500/10 rounded-3xl pointer-events-none"></div>
                    {dropdownItems.catalog.map((item: any) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255,252,0,0.2)' }}
                        onClick={() => {
                          item.onClick();
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-3 rounded-2xl hover:bg-snap-yellow hover:text-black transition-all text-xs font-black uppercase tracking-wider relative z-10"
                      >
                        {item.title}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.services}
                <ChevronRight className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 w-64 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-3xl pointer-events-none"></div>
                    {dropdownItems.services.map((item: any) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 5, backgroundColor: 'rgba(59,130,246,0.2)' }}
                        onClick={() => {
                          item.onClick();
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-3 rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-xs font-black uppercase tracking-wider relative z-10"
                      >
                        {item.title}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('tools')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.tools}
                <ChevronRight className={`w-4 h-4 transition-transform ${activeDropdown === 'tools' ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'tools' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 w-64 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-3xl pointer-events-none"></div>
                    {dropdownItems.tools.map((item: any) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 5, backgroundColor: 'rgba(168,85,247,0.2)' }}
                        onClick={() => {
                          item.onClick();
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-3 rounded-2xl hover:bg-purple-500 hover:text-white transition-all text-xs font-black uppercase tracking-wider relative z-10 flex items-center justify-between"
                      >
                        {item.title}
                        {item.isPro && <span className="text-[8px] bg-snap-yellow text-black px-1.5 py-0.5 rounded-md font-black">PRO</span>}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setView('blog')} className={`hover:text-snap-yellow transition-colors ${view === 'blog' ? 'text-snap-yellow' : ''}`}>{t.nav.blog}</button>
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
              <div className={`flex flex-col p-6 gap-6 text-lg font-bold text-gray-400 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button>
                
                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.catalog}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {t.nav.catalogItems.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleCatalogClick(item.id);
                          setIsMenuOpen(false);
                        }}
                        className="text-right hover:text-snap-yellow transition-colors"
                        style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.services}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {t.nav.serviceItems.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleServiceClick(item.id);
                          setIsMenuOpen(false);
                        }}
                        className="text-right hover:text-snap-yellow transition-colors"
                        style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.tools}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {t.nav.toolItems.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => handleToolClick(item.id, item.isPro)}
                        className={`hover:text-snap-yellow transition-colors flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse justify-start' : 'justify-start'}`}
                        style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                      >
                        {item.title}
                        {item.isPro ? (
                          <span className="text-[8px] bg-snap-yellow text-black px-1.5 py-0.5 rounded-md font-black">PRO</span>
                        ) : (
                          <span className="text-[8px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-md border border-green-500/30 font-black">FREE</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => { setView('blog'); setIsMenuOpen(false); }} className="hover:text-snap-yellow transition-colors">{t.nav.blog}</button>
                
                <a href="#how" onClick={() => setIsMenuOpen(false)} className="hover:text-snap-yellow transition-colors">{t.nav.how}</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="hover:text-snap-yellow transition-colors">{t.nav.faq}</a>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openWhatsApp(lang === 'ar' ? 'مرحباً، أريد الاستفسار عن خدمات سناب سكور ستور' : 'Hello, I want to inquire about SnapScore Store services');
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
            {/* Hero Section with animated elements */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,252,0,0.15),transparent_70%)] pointer-events-none"></div>
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="z-10"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snap-yellow/10 border border-snap-yellow/20 text-snap-yellow text-xs font-bold mb-8"
                  >
                    <Sparkles className="w-4 h-4" />
                    {lang === 'ar' ? 'الخدمة رقم 1 عالمياً' : '#1 Trusted Service Worldwide'}
                  </motion.div>
                  <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
                    <span className="bg-gradient-to-r from-white via-snap-yellow to-white bg-clip-text text-transparent animate-gradient-x">
                      {t.hero.title}
                    </span> <br />
                    <span className="text-snap-yellow drop-shadow-[0_0_30px_rgba(255,252,0,0.5)] inline-block hover:scale-105 transition-transform duration-500">
                      {t.hero.titleHighlight}
                    </span> <br />
                    <span className="text-3xl lg:text-5xl block mt-4 text-white/90 font-bold italic">{t.hero.subtitle}</span>
                  </h1>
                  <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
                    {t.hero.desc}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,252,0,0.5)" }}
                      onClick={() => setView('shop')}
                      className="px-10 py-5 bg-snap-yellow text-black font-black rounded-2xl transition-all duration-300 shadow-[0_10px_40px_rgba(255,252,0,0.3)] flex items-center gap-3"
                    >
                      <ShoppingBag className="w-6 h-6" />
                      {t.hero.cta}
                    </motion.button>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-white font-bold mb-1">
                        <ShieldCheck className="w-5 h-5 text-snap-yellow animate-pulse" />
                        <span>{t.hero.protection}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-snap-yellow fill-snap-yellow animate-glow" style={{ animationDelay: `${i * 0.1}s` }} />)}
                        <span className="text-[10px] text-gray-500 ml-2">5,000+ Happy Clients</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className={`relative flex justify-center ${lang === 'ar' ? 'lg:justify-start' : 'lg:justify-end'}`}
                >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative w-64 h-[500px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-snap-yellow/20 to-black p-6 flex flex-col items-center justify-center text-center">
                      <motion.div 
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 bg-snap-yellow rounded-2xl mb-6 flex items-center justify-center shadow-lg"
                      >
                        <Zap className="w-10 h-10 text-black fill-black" />
                      </motion.div>
                      <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Snap Score</div>
                      <motion.div 
                        key={score}
                        initial={{ scale: 1.2, color: "#FFFC00" }}
                        animate={{ scale: 1, color: "#FFFFFF" }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-black text-snap-yellow tabular-nums"
                      >
                        {score.toLocaleString()}
                      </motion.div>
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
                  </motion.div>
                  
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

            {/* Stats Section with animated counters */}
            <section className="py-20 px-6 bg-matte-black border-y border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 opacity-30"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                  {t.stats.items.map((stat, i) => {
                    const colors = [
                      'from-blue-500 to-cyan-400',
                      'from-purple-500 to-pink-400',
                      'from-orange-500 to-yellow-400',
                      'from-green-500 to-emerald-400'
                    ];
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center group"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`text-5xl lg:text-7xl font-black mb-2 tracking-tighter bg-gradient-to-br ${colors[i % colors.length]} bg-clip-text text-transparent`}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                          {stat.label}
                        </div>
                        <div className={`mt-4 h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${colors[i % colors.length]} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Why Choose Us Grid with animated cards */}
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
                      whileHover={{ y: -10, scale: 1.02 }}
                      className={`p-10 rounded-[2.5rem] group border border-white/10 hover:border-white/50 transition-all duration-500 relative overflow-hidden ${
                        i === 0 ? 'bg-blue-500/5' : 
                        i === 1 ? 'bg-purple-500/5' : 
                        'bg-orange-500/5'
                      }`}
                    >
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl group-hover:bg-white/10 transition-colors ${
                        i === 0 ? 'bg-blue-500/10' : 
                        i === 1 ? 'bg-purple-500/10' : 
                        'bg-orange-500/10'
                      }`}></div>
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] ${
                          i === 0 ? 'bg-blue-500/10 text-blue-400' : 
                          i === 1 ? 'bg-purple-500/10 text-purple-400' : 
                          'bg-orange-500/10 text-orange-400'
                        }`}
                      >
                        {i === 0 ? <Lock className="w-10 h-10" /> : i === 1 ? <ShieldCheck className="w-10 h-10" /> : <InfinityIcon className="w-10 h-10" />}
                      </motion.div>
                      <h3 className="text-3xl font-black mb-4 text-white">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Catalog Section with category cards */}
            <section id="catalog" className="py-32 px-6 bg-matte-black relative overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter">
                    {lang === 'ar' ? 'تصنيفات' : 'Account'} <span className="text-snap-yellow">{lang === 'ar' ? 'الحسابات' : 'Categories'}</span>
                  </h2>
                  <p className="text-gray-400 text-xl font-medium">{lang === 'ar' ? 'اختر نوع الحساب الذي تبحث عنه' : 'Choose the type of account you are looking for'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {accountCategories.map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setView('category_detail');
                        window.scrollTo(0, 0);
                      }}
                      className={`p-10 rounded-[3rem] border transition-all group cursor-pointer relative overflow-hidden ${
                        cat.color === 'blue' ? 'bg-blue-600/10 border-blue-500/20 hover:border-blue-500/50' : 
                        cat.color === 'purple' ? 'bg-purple-600/10 border-purple-500/20 hover:border-purple-500/50' : 
                        cat.color === 'orange' ? 'bg-orange-600/10 border-orange-500/20 hover:border-orange-500/50' :
                        'bg-green-600/10 border-green-500/20 hover:border-green-500/50'
                      }`}
                    >
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl group-hover:bg-white/10 transition-colors ${
                        cat.color === 'blue' ? 'bg-blue-500/10' : 
                        cat.color === 'purple' ? 'bg-purple-500/10' : 
                        cat.color === 'orange' ? 'bg-orange-500/10' :
                        'bg-green-500/10'
                      }`}></div>
                      <div className="relative z-10">
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform ${
                            cat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 
                            cat.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                            cat.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-green-500/10 text-green-400'
                          }`}
                        >
                          {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                        </motion.div>
                        <h3 className="text-2xl font-black mb-4 group-hover:text-snap-yellow transition-colors">{cat.title[lang]}</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">{cat.desc[lang]}</p>
                        <div className="flex items-center gap-2 text-snap-yellow font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                          {lang === 'ar' ? 'عرض الكل' : 'View All'}
                          <ChevronRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works with animated steps */}
            <section id="how" className="py-32 px-6 bg-zinc-900/20">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.how.title}</h2>
                  <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {t.how.steps.map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ y: -10 }}
                      className="relative text-center group"
                    >
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-[0_0_30px_rgba(255,252,0,0.1)] transition-transform duration-500 relative ${
                          i === 0 ? 'bg-blue-600/20 text-blue-400 border-2 border-blue-500/50' : 
                          i === 1 ? 'bg-purple-600/20 text-purple-400 border-2 border-purple-500/50' : 
                          'bg-orange-600/20 text-orange-400 border-2 border-orange-500/50'
                        }`}
                      >
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-snap-yellow text-black rounded-full text-sm flex items-center justify-center border-4 border-matte-black">
                          {i + 1}
                        </div>
                        {step.icon}
                      </motion.div>
                      <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                      {i < 2 && (
                        <div className={`hidden lg:block absolute top-12 left-[70%] w-full h-[2px] bg-gradient-to-r from-snap-yellow/30 to-transparent ${lang === 'ar' ? 'rotate-180' : ''}`}></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Premium Services Section */}
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
                          className={`flex gap-8 p-8 rounded-[2rem] border transition-all cursor-pointer group/service ${
                            i === 0 ? 'bg-blue-600/10 border-blue-500/20 hover:border-blue-500/50' : 
                            i === 1 ? 'bg-purple-600/10 border-purple-500/20 hover:border-purple-500/50' : 
                            'bg-orange-600/10 border-orange-500/20 hover:border-orange-500/50'
                          }`}
                        >
                          <motion.div 
                            whileHover={{ rotate: 10 }}
                            className={`flex-shrink-0 p-4 rounded-2xl h-fit transition-colors ${
                              i === 0 ? 'bg-blue-500/10 text-blue-400 group-hover/service:bg-blue-500 group-hover/service:text-white' : 
                              i === 1 ? 'bg-purple-500/10 text-purple-400 group-hover/service:bg-purple-500 group-hover/service:text-white' : 
                              'bg-orange-500/10 text-orange-400 group-hover/service:bg-orange-500 group-hover/service:text-white'
                            }`}>{service.icon}</motion.div>
                          <div>
                            <h4 className="text-2xl font-black mb-3 group-hover/service:text-white transition-colors">{service.title}</h4>
                            <p className="text-gray-400 text-lg leading-relaxed">{service.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl"
                    >
                      <img 
                        src="https://picsum.photos/seed/snapchat-luxury/1000/1250" 
                        alt="Premium Snapchat Services" 
                        className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent"></div>
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -bottom-10 -right-10 w-56 h-56 glass rounded-[2.5rem] p-8 flex flex-col justify-center border-snap-yellow/40 backdrop-blur-2xl"
                    >
                      <Star className="w-12 h-12 text-snap-yellow fill-snap-yellow mb-4 animate-pulse" />
                      <div className="text-white font-black text-4xl mb-1 tracking-tighter">100%</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-snap-yellow font-bold">Safe & Verified</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools Section with animated cards */}
            <section id="tools" className="py-32 px-6 bg-matte-black relative">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
                    {lang === 'ar' ? 'أدواتنا' : 'Our'} <span className="text-snap-yellow">{lang === 'ar' ? 'المجانية' : 'Tools'}</span>
                  </h2>
                  <p className="text-gray-400 font-medium mb-4">{lang === 'ar' ? 'كل أداة لها رابط خاص بها للمشاركة' : 'Every tool has its own shareable link'}</p>
                  <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {t.nav.toolItems.map((tool: any, i: number) => {
                    const toolColorMap = [
                      { bg: 'bg-gradient-to-br from-blue-900/60 to-blue-600/15', border: 'border-blue-500/30 hover:border-blue-400/60', icon: 'bg-blue-500/15 text-blue-400', glow: 'bg-blue-500', badge: 'bg-blue-600' },
                      { bg: 'bg-gradient-to-br from-purple-900/60 to-purple-600/15', border: 'border-purple-500/30 hover:border-purple-400/60', icon: 'bg-purple-500/15 text-purple-400', glow: 'bg-purple-500', badge: 'bg-purple-600' },
                      { bg: 'bg-gradient-to-br from-orange-900/60 to-orange-600/15', border: 'border-orange-500/30 hover:border-orange-400/60', icon: 'bg-orange-500/15 text-orange-400', glow: 'bg-orange-500', badge: 'bg-orange-600' },
                      { bg: 'bg-gradient-to-br from-green-900/60 to-green-600/15', border: 'border-green-500/30 hover:border-green-400/60', icon: 'bg-green-500/15 text-green-400', glow: 'bg-green-500', badge: 'bg-green-600' },
                      { bg: 'bg-gradient-to-br from-pink-900/60 to-pink-600/15', border: 'border-pink-500/30 hover:border-pink-400/60', icon: 'bg-pink-500/15 text-pink-400', glow: 'bg-pink-500', badge: 'bg-pink-600' },
                      { bg: 'bg-gradient-to-br from-cyan-900/60 to-cyan-600/15', border: 'border-cyan-500/30 hover:border-cyan-400/60', icon: 'bg-cyan-500/15 text-cyan-400', glow: 'bg-cyan-500', badge: 'bg-cyan-600' },
                      { bg: 'bg-gradient-to-br from-yellow-900/60 to-yellow-600/15', border: 'border-yellow-500/30 hover:border-yellow-400/60', icon: 'bg-yellow-500/15 text-yellow-400', glow: 'bg-yellow-500', badge: 'bg-yellow-600' },
                    ];
                    const tc = toolColorMap[i % toolColorMap.length];
                    const toolHash = `tool-${tool.id}`;

                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`p-8 rounded-[3rem] border-2 transition-all group cursor-pointer relative overflow-hidden ${tc.bg} ${tc.border}`}
                      >
                        {tool.isPro ? (
                          <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-5 right-5 px-3 py-1 bg-snap-yellow text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(255,252,0,0.5)] z-20"
                          >
                            PRO
                          </motion.div>
                        ) : (
                          <div className="absolute top-5 right-5 px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30 uppercase tracking-widest z-20">
                            FREE
                          </div>
                        )}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all ${tc.glow}`}></div>
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform ${tc.icon}`}
                        >
                          {tool.id === 'calc' ? <Calculator className="w-8 h-8" /> : 
                           tool.id === 'checker' ? <ShieldCheck className="w-8 h-8" /> : 
                           tool.id === 'tracker' ? <TrendingUp className="w-8 h-8" /> : 
                           tool.id === 'bitmoji' ? <User className="w-8 h-8" /> : 
                           tool.id === 'lens' ? <Zap className="w-8 h-8" /> : 
                           tool.id === 'map' ? <MapPin className="w-8 h-8" /> :
                           <InfinityIcon className="w-8 h-8" />}
                        </motion.div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-snap-yellow transition-colors">{lang === 'ar' ? tool.ar : tool.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                          {tool.isPro 
                            ? (lang === 'ar' ? 'أدوات احترافية حصرية لمشتركي سناب فاي برو.' : 'Exclusive professional tools for Snapify Pro subscribers.')
                            : (lang === 'ar' ? 'استخدم أداتنا المجانية لتحسين تجربتك على سناب شات.' : 'Use our free tool to enhance your Snapchat experience.')
                          }
                        </p>

                        <div className="flex items-center gap-3 mb-4">
                          <button
                            onClick={() => {
                              handleToolClick(tool.id, tool.isPro);
                              window.location.hash = toolHash;
                            }}
                            className="flex-1 py-3 bg-snap-yellow text-black font-black rounded-xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Zap className="w-4 h-4" />
                            {lang === 'ar' ? 'جرب الآن' : 'Try Now'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const link = `${window.location.origin}${window.location.pathname}#${toolHash}`;
                              navigator.clipboard.writeText(link).then(() => alert(lang === 'ar' ? 'تم نسخ رابط الأداة!' : 'Tool link copied!'));
                            }}
                            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-gray-700 font-mono">#{toolHash}</div>
                      </motion.div>
                    );
                  })}
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
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`border rounded-2xl overflow-hidden transition-all ${
                        i % 3 === 0 ? 'border-blue-500/20 bg-blue-500/5' : 
                        i % 3 === 1 ? 'border-purple-500/20 bg-purple-500/5' : 
                        'border-orange-500/20 bg-orange-500/5'
                      }`}
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full p-6 flex items-center justify-between text-right hover:bg-white/5 transition-colors"
                      >
                        <span className={`text-lg font-bold ${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>{item.q}</span>
                        <ChevronRight className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-90' : ''} ${
                          i % 3 === 0 ? 'text-blue-400' : 
                          i % 3 === 1 ? 'text-purple-400' : 
                          'text-orange-400'
                        }`} />
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Section with color-coded animated cards */}
            <section id="blog" className="py-32 px-6 bg-matte-black">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.blog.title}</h2>
                  <p className="text-xl text-gray-400 font-medium">{t.blog.subtitle}</p>
                  <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full mt-8"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {blogPosts.map((post, i) => {
                    const blogColors = [
                      { bg: 'bg-gradient-to-br from-blue-900/60 to-blue-600/20', border: 'border-blue-500/40 hover:border-blue-400/70', glow: 'bg-blue-500/20', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: 'text-blue-400', tag: 'bg-blue-600' },
                      { bg: 'bg-gradient-to-br from-purple-900/60 to-purple-600/20', border: 'border-purple-500/40 hover:border-purple-400/70', glow: 'bg-purple-500/20', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: 'text-purple-400', tag: 'bg-purple-600' },
                      { bg: 'bg-gradient-to-br from-orange-900/60 to-orange-600/20', border: 'border-orange-500/40 hover:border-orange-400/70', glow: 'bg-orange-500/20', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', icon: 'text-orange-400', tag: 'bg-orange-600' },
                      { bg: 'bg-gradient-to-br from-green-900/60 to-green-600/20', border: 'border-green-500/40 hover:border-green-400/70', glow: 'bg-green-500/20', badge: 'bg-green-500/20 text-green-300 border-green-500/30', icon: 'text-green-400', tag: 'bg-green-600' },
                    ];
                    const color = blogColors[i % blogColors.length];
                    const blogLink = `${window.location.origin}${window.location.pathname}#blog-${i}`;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`rounded-[2.5rem] overflow-hidden border-2 transition-all group relative shadow-2xl ${color.bg} ${color.border}`}
                      >
                        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-700 ${color.glow}`}></div>
                        <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-all duration-700 ${color.glow}`}></div>
                        
                        <div className={`absolute top-5 left-5 z-20 w-10 h-10 rounded-full ${color.tag} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                          {i + 1}
                        </div>

                        <div 
                          className="aspect-video overflow-hidden cursor-pointer relative"
                          onClick={() => {
                            setSelectedBlogPost(post);
                            setView('blog_detail');
                            window.location.hash = `blog-${i}`;
                            window.scrollTo(0, 0);
                          }}
                        >
                          <img 
                            src={`https://picsum.photos/seed/blog-post-${i+10}/600/400`}
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        <div className="p-8 relative z-10">
                          <div className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border ${color.badge}`}>
                            {post.date}
                          </div>
                          <h3 
                            className="text-xl font-black mb-4 leading-tight group-hover:text-snap-yellow transition-colors cursor-pointer line-clamp-3"
                            onClick={() => {
                              setSelectedBlogPost(post);
                              setView('blog_detail');
                              window.location.hash = `blog-${i}`;
                              window.scrollTo(0, 0);
                            }}
                          >
                            {post.title}
                          </h3>
                          <p className="text-gray-400 mb-8 leading-relaxed text-sm line-clamp-2">{post.excerpt || (lang === 'ar' ? post.arExcerpt : post.excerpt)}</p>
                          
                          <div className="flex items-center justify-between gap-3">
                            <button 
                              onClick={() => {
                                setSelectedBlogPost(post);
                                setView('blog_detail');
                                window.location.hash = `blog-${i}`;
                                window.scrollTo(0, 0);
                              }}
                              className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 group/btn ${color.icon}`}
                            >
                              {t.blog.readMore}
                              <ChevronRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const link = `${window.location.origin}${window.location.pathname}#blog-${i}`;
                                if (navigator.share) {
                                  navigator.share({ title: post.title, url: link });
                                } else {
                                  navigator.clipboard.writeText(link).then(() => {
                                    alert(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
                                  });
                                }
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold text-gray-400 hover:text-white"
                              title={lang === 'ar' ? 'مشاركة الرابط' : 'Share Link'}
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              {lang === 'ar' ? 'شارك' : 'Share'}
                            </button>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-xs text-gray-600 font-mono truncate">
                              <Link className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">#blog-{i}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials with animated carousel */}
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
                      className={`p-10 rounded-[3rem] text-center border relative overflow-hidden ${
                        currentTestimonial % 3 === 0 ? 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/30' : 
                        currentTestimonial % 3 === 1 ? 'bg-gradient-to-br from-purple-600/20 to-pink-500/20 border-purple-500/30' : 
                        'bg-gradient-to-br from-orange-600/20 to-yellow-400/20 border-orange-500/30'
                      }`}
                    >
                      <div className="absolute inset-0 backdrop-blur-xl pointer-events-none"></div>
                      <div className="relative z-10">
                        <motion.img 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          src={testimonials[currentTestimonial].avatar} 
                          alt={testimonials[currentTestimonial].name[lang]}
                          className={`w-20 h-20 rounded-full mx-auto mb-6 border-2 p-1 ${
                            currentTestimonial % 3 === 0 ? 'border-blue-400' : 
                            currentTestimonial % 3 === 1 ? 'border-purple-400' : 
                            'border-orange-400'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-2xl font-medium italic mb-8 leading-relaxed">
                          "{testimonials[currentTestimonial].text[lang]}"
                        </p>
                        <div className={`font-bold text-3xl mb-2 ${
                          currentTestimonial % 3 === 0 ? 'text-blue-400' : 
                          currentTestimonial % 3 === 1 ? 'text-purple-400' : 
                          'text-orange-400'
                        }`}>{testimonials[currentTestimonial].name[lang]}</div>
                        <div className="text-sm text-gray-500">{testimonials[currentTestimonial].location[lang]}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-4 mt-8">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      onClick={prevTestimonial}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                    >
                      {lang === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      onClick={nextTestimonial}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                    >
                      {lang === 'ar' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 bg-gradient-to-b from-zinc-900/30 to-matte-black">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                      <motion.div 
                        whileHover={{ x: lang === 'ar' ? -10 : 10 }}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 group hover:border-blue-500/50 transition-all"
                      >
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                          <WhatsAppIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">WhatsApp Support</div>
                          <div className="text-2xl font-black text-white">{WHATSAPP_NUMBER}</div>
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: lang === 'ar' ? -10 : 10 }}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-purple-600/10 border border-purple-500/20 group hover:border-purple-500/50 transition-all"
                      >
                        <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                          <Send className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Support</div>
                          <div className="text-2xl font-black text-white">support@snapscore.store</div>
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: lang === 'ar' ? -10 : 10 }}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-orange-600/10 border border-orange-500/20 group hover:border-orange-500/50 transition-all"
                      >
                        <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                          <Share2 className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Social Media</div>
                          <div className="flex gap-4 mt-2">
                            <Facebook className="w-6 h-6 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer transition-colors" />
                            <Instagram className="w-6 h-6 hover:text-pink-400 cursor-pointer transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border-white/10"
                  >
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors text-white placeholder:text-gray-600" placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Your name'} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الخدمة المطلوبة' : 'Service Needed'}</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors appearance-none text-white">
                          <option className="bg-matte-black">{lang === 'ar' ? 'زيادة السكور' : 'Score Boosting'}</option>
                          <option className="bg-matte-black">{lang === 'ar' ? 'شراء حساب' : 'Buy Account'}</option>
                          <option className="bg-matte-black">{lang === 'ar' ? 'توثيق الحساب' : 'Verification'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors h-32 text-white placeholder:text-gray-600" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}></textarea>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => openWhatsApp(lang === 'ar' ? 'أريد استشارة بخصوص خدمات سناب شات' : 'I want a consultation regarding Snapchat services')}
                        className="w-full py-5 bg-snap-yellow text-black font-black rounded-xl hover:scale-105 transition-transform shadow-lg"
                      >
                        {lang === 'ar' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'blog_detail' && selectedBlogPost && (
          <BlogDetail 
            post={selectedBlogPost} 
            lang={lang} 
            onBack={() => setView('home')} 
          />
        )}

        {view === 'service_detail' && selectedService && (
          <ServiceDetail 
            service={selectedService} 
            lang={lang} 
            onBack={() => setView('home')} 
            openWhatsApp={openWhatsApp}
          />
        )}

        {view === 'product_detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            lang={lang} 
            onBack={() => setView('home')} 
            onBuy={(p) => handleBuy(p)} 
          />
        )}

        {view === 'category_detail' && selectedCategory && (
          <section className="pt-40 pb-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <button 
                  onClick={() => setView('home')}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all"
                >
                  <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">
                    {accountCategories.find(c => c.id === selectedCategory)?.title[lang]}
                  </h1>
                  <p className="text-gray-400 font-medium">
                    {accountCategories.find(c => c.id === selectedCategory)?.desc[lang]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory === 'snapscore' ? scoreAccountsStock : 
                  selectedCategory === 'follower' ? followerAccountsStock : 
                  selectedCategory === 'aged' ? agedAccountsStock : 
                  verifiedAccountsStock).map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`p-10 rounded-[3rem] border-2 transition-all group relative overflow-hidden ${
                      selectedCategory === 'snapscore' ? 'bg-gradient-to-br from-blue-900/50 to-blue-600/10 border-blue-500/30 hover:border-blue-400/60' : 
                      selectedCategory === 'follower' ? 'bg-gradient-to-br from-purple-900/50 to-purple-600/10 border-purple-500/30 hover:border-purple-400/60' : 
                      selectedCategory === 'aged' ? 'bg-gradient-to-br from-orange-900/50 to-orange-600/10 border-orange-500/30 hover:border-orange-400/60' :
                      'bg-gradient-to-br from-green-900/50 to-green-600/10 border-green-500/30 hover:border-green-400/60'
                    }`}
                  >
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl group-hover:opacity-70 transition-colors opacity-30 ${
                      selectedCategory === 'snapscore' ? 'bg-blue-500' : 
                      selectedCategory === 'follower' ? 'bg-purple-500' : 
                      selectedCategory === 'aged' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                    <div className="relative z-10">
                      <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                      <div className="text-5xl font-black mb-4 group-hover:text-snap-yellow transition-colors tracking-tighter">
                        {pkg.amount} {selectedCategory === 'snapscore' ? 'Score' : selectedCategory === 'follower' ? 'Followers' : ''}
                      </div>
                      <div className="text-3xl font-bold text-white/90 mb-4">{pkg.price}</div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-mono mb-8">
                        <Link className="w-3 h-3" />
                        <span>#product-{pkg.id}</span>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setSelectedProduct(pkg);
                            setView('product_detail');
                            window.location.hash = `product-${pkg.id}`;
                          }}
                          className="flex-1 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                        >
                          {lang === 'ar' ? 'التفاصيل' : 'Details'}
                        </button>
                        <button 
                          onClick={() => handleBuy(pkg)}
                          className="flex-1 py-4 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-lg"
                        >
                          {t.shop.buy}
                        </button>
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}${window.location.pathname}#product-${pkg.id}`;
                            if (navigator.share) {
                              navigator.share({ title: pkg.desc[lang], url: link });
                            } else {
                              navigator.clipboard.writeText(link).then(() => {
                                alert(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
                              });
                            }
                          }}
                          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-gray-400 hover:text-white flex-shrink-0"
                          title={lang === 'ar' ? 'مشاركة' : 'Share'}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'shop' && (
          <section className="pt-40 pb-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <BackButton onClick={() => setView('home')} lang={lang} />
              </div>
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
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`p-10 rounded-[3rem] border transition-all group relative overflow-hidden ${getPackageColor(pkg.amount)}`}
                      >
                        <div className="absolute inset-0 backdrop-blur-xl pointer-events-none"></div>
                        <div className="relative z-10">
                          <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                          <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{pkg.amount}</div>
                          <div className="text-3xl font-bold text-white/90 mb-10">{pkg.price}</div>
                          <button 
                            onClick={() => handleBuy(pkg)}
                            className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                          >
                            {t.shop.buy}
                          </button>
                        </div>
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
                        whileHover={{ y: -10, scale: 1.02 }}
                        className={`p-10 rounded-[3rem] border transition-all group relative overflow-hidden ${getPackageColor(pkg.amount)}`}
                      >
                        <div className="absolute inset-0 backdrop-blur-xl pointer-events-none"></div>
                        <div className="relative z-10">
                          <div className="text-xs font-black text-snap-yellow mb-4 tracking-[0.3em] uppercase">{pkg.desc[lang]}</div>
                          <div className="text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter">{pkg.amount}</div>
                          <div className="text-3xl font-bold text-white/90 mb-10">{pkg.price}</div>
                          <button 
                            onClick={() => handleBuy(pkg)}
                            className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                          >
                            {t.shop.buy}
                          </button>
                        </div>
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
                    {servicesList.map((service, i) => {
                      const svcColors = [
                        { bg: 'bg-gradient-to-br from-blue-900/50 to-blue-600/10', border: 'border-blue-500/30 hover:border-blue-400/60', icon: 'bg-blue-500/15 text-blue-400', glow: 'bg-blue-500/15', tbl: 'border-blue-500/20 bg-blue-500/5', hdr: 'text-blue-300' },
                        { bg: 'bg-gradient-to-br from-purple-900/50 to-purple-600/10', border: 'border-purple-500/30 hover:border-purple-400/60', icon: 'bg-purple-500/15 text-purple-400', glow: 'bg-purple-500/15', tbl: 'border-purple-500/20 bg-purple-500/5', hdr: 'text-purple-300' },
                        { bg: 'bg-gradient-to-br from-orange-900/50 to-orange-600/10', border: 'border-orange-500/30 hover:border-orange-400/60', icon: 'bg-orange-500/15 text-orange-400', glow: 'bg-orange-500/15', tbl: 'border-orange-500/20 bg-orange-500/5', hdr: 'text-orange-300' },
                        { bg: 'bg-gradient-to-br from-green-900/50 to-green-600/10', border: 'border-green-500/30 hover:border-green-400/60', icon: 'bg-green-500/15 text-green-400', glow: 'bg-green-500/15', tbl: 'border-green-500/20 bg-green-500/5', hdr: 'text-green-300' },
                        { bg: 'bg-gradient-to-br from-pink-900/50 to-pink-600/10', border: 'border-pink-500/30 hover:border-pink-400/60', icon: 'bg-pink-500/15 text-pink-400', glow: 'bg-pink-500/15', tbl: 'border-pink-500/20 bg-pink-500/5', hdr: 'text-pink-300' },
                      ];
                      const sc = svcColors[i % svcColors.length];

                      const svcTiers: {label: string, price: string}[] = 
                        service.id === 's_boost' ? [
                          { label: '5K Score', price: '$10' },
                          { label: '20K Score', price: '$35' },
                          { label: '100K Score', price: '$150' },
                          { label: '1M Score', price: '$1200' },
                        ] :
                        service.id === 's_followers' ? [
                          { label: '500 Followers', price: '$20' },
                          { label: '1K Followers', price: '$35' },
                          { label: '5K Followers', price: '$150' },
                          { label: '10K Followers', price: '$280' },
                        ] :
                        service.id === 's_views' ? [
                          { label: '1K Views', price: '$15' },
                          { label: '5K Views', price: '$60' },
                          { label: '10K Views', price: '$110' },
                          { label: '50K Views', price: '$480' },
                        ] : [];

                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -10, scale: 1.02 }}
                          className={`p-8 rounded-[3rem] border-2 transition-all group relative overflow-hidden ${sc.bg} ${sc.border}`}
                        >
                          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-colors ${sc.glow}`}></div>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${sc.icon}`}>
                            {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                          </div>
                          <h3 className="text-2xl font-black mb-3 group-hover:text-snap-yellow transition-colors relative z-10">{service.title}</h3>
                          <p className="text-gray-400 mb-4 leading-relaxed text-sm relative z-10">{service.desc[lang]}</p>
                          
                          {svcTiers.length > 0 && (
                            <div className={`rounded-2xl border overflow-hidden mb-6 relative z-10 ${sc.tbl}`}>
                              <div className={`px-4 py-2 text-xs font-black uppercase tracking-widest ${sc.hdr}`}>
                                {lang === 'ar' ? 'الأسعار' : 'Pricing'}
                              </div>
                              <table className="w-full text-sm">
                                <tbody>
                                  {svcTiers.map((tier, ti) => (
                                    <tr key={ti} className="border-t border-white/5">
                                      <td className="px-4 py-2 text-gray-400 font-medium">{tier.label}
