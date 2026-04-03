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
  Check
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
        title: "منشئ صور بيتموجي",
        subtitle: "صف شخصيتك المثالية ودع الذكاء الاصطناعي ينشئها",
        placeholder: "مثال: شاب رائع يرتدي نظارات شمسية، هودي أزرق، وشعر أشقر",
        button: "إنشاء الصورة",
        result: "صورتك المخصصة"
      },
      lens: {
        title: "محاكي عدسات الذكاء الاصطناعي",
        subtitle: "ارفع صورة وطبق عدسات سناب شات الشهيرة",
        upload: "رفع صورة",
        type: "اختر نوع العدسة",
        button: "تطبيق العدسة",
        result: "تم تطبيق العدسة"
      },
      map: {
        title: "مكتشف مواقع خريطة سناب",
        subtitle: "استكشف المواقع الشهيرة على خريطة سناب في أي مكان في العالم",
        placeholder: "أدخل اسم المدينة أو المكان",
        button: "البحث عن المواقع",
        result: "المواقع الشهيرة"
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
          content: `Snapchat uses advanced security systems to protect user accounts from unauthorized access, fraud, and misuse. While logging in from a new IP address or a different country is not automatically a violation, unsafe login practices and sudden activity can trigger security checks that may lead to a temporary or permanent account ban.

This guide explains how to safely log in, what actions to avoid, and the main reasons Snapchat accounts get banned.

### How to Safely Log In to a Snapchat Account
Safe login behavior is critical, especially when accessing an account for the first time or from a new IP address.

**1. Use a Stable and Real Internet Connection**
*   Always log in using real mobile data or trusted home Wi-Fi
*   Avoid public Wi-Fi networks
*   Never use VPNs or proxy services
A stable IP helps Snapchat recognize the login as legitimate.

**2. Use One Device Only**
*   Log in from one device
*   Do not switch between multiple phones or emulators
*   Avoid logging in from multiple locations in a short time
Frequent device changes raise security red flags.

**3. Log In Calmly and Naturally**
*   Enter login details normally
*   Avoid repeated login attempts
*   If login fails, wait before trying again
Multiple failed attempts can cause temporary locks.

**4. Do Not Change Any Account Information Immediately**
After logging in:
*   Do not change email
*   Do not change password
*   Do not change username
Wait at least 3 days, preferably 15–30 days, before making any changes.

### What to Do After Logging In (First 3 Days)
For the first 3 days after login, keep the account inactive. This means:
*   Do not add friends
*   Do not accept friend requests
*   Do not send messages
*   Do not edit profile details
This period helps Snapchat’s system trust the account’s new activity pattern.

### Safe Usage Rules After 3 Days
Once the initial period is complete:
*   Add or accept no more than 5 friends per day
*   Avoid bulk actions
*   Increase activity slowly and naturally
*   Do not send repetitive or spam-like messages

### Why IP Change + Immediate Actions Cause Bans
When an account logs in from a new IP or country and immediately changes credentials or starts adding many friends, Snapchat may interpret this as a compromised or hacked account, which can lead to a permanent ban without appeal.

### Reasons Why Snapchat Accounts Get Banned
Below are the most common reasons for Snapchat bans:
*   **Immediate Credential Changes After New IP Login:** Changing email, password, or username right after login from a new IP.
*   **Excessive Friend Requests:** Adding or accepting too many friends in a short time.
*   **VPN or Proxy Usage:** VPNs often use flagged IPs that Snapchat considers high-risk.
*   **Abnormal or Automated Activity:** Fast actions that do not match normal human behavior.
*   **Multiple Devices or Locations:** Logging in from several devices or countries within a short period.
*   **Use of Third-Party Apps or Bots:** Any unofficial app, plugin, or automation tool violates Snapchat policies.
*   **Repeated Login Failures:** Too many incorrect password attempts.

### Best Practices to Keep Your Account Safe
*   Use one device and one network
*   Avoid VPNs completely
*   Keep activity minimal at the start
*   Follow waiting periods before making changes
*   Use Snapchat normally and patiently

### Conclusion
Safely logging into a Snapchat account requires patience and controlled behavior. While IP or country changes alone do not cause bans, immediate profile changes, VPN usage, and aggressive activity significantly increase the risk of a permanent ban.

By following safe login practices, waiting before making changes, and keeping activity limited, users can greatly reduce the risk of losing access to their Snapchat account.`,
          arContent: `يستخدم سناب شات أنظمة أمان متقدمة لحماية حسابات المستخدمين من الوصول غير المصرح به والاحتيال وسوء الاستخدام. في حين أن تسجيل الدخول من عنوان IP جديد أو بلد مختلف ليس انتهاكًا تلقائيًا، إلا أن ممارسات تسجيل الدخول غير الآمنة والنشاط المفاجئ يمكن أن تؤدي إلى فحوصات أمنية قد تؤدي إلى حظر حساب مؤقت أو دائم.

يشرح هذا الدليل كيفية تسجيل الدخول بأمان، وما هي الإجراءات التي يجب تجنبها، والأسباب الرئيسية لحظر حسابات سناب شات.

### كيفية تسجيل الدخول بأمان إلى حساب سناب شات
يعد سلوك تسجيل الدخول الآمن أمرًا بالغ الأهمية، خاصة عند الوصول إلى حساب لأول مرة أو من عنوان IP جديد.

**1. استخدم اتصال إنترنت مستقر وحقيقي**
*   قم دائمًا بتسجيل الدخول باستخدام بيانات الهاتف المحمول الحقيقية أو شبكة Wi-Fi منزلية موثوقة
*   تجنب شبكات Wi-Fi العامة
*   لا تستخدم أبدًا شبكات VPN أو خدمات الوكيل يساعد عنوان IP المستقر سناب شات في التعرف على تسجيل الدخول كأمر مشروع.

**2. استخدم جهازًا واحدًا فقط**
*   سجل الدخول من جهاز واحد
*   لا تنتقل بين هواتف متعددة أو محاكيات
*   تجنب تسجيل الدخول من مواقع متعددة في وقت قصير تثير تغييرات الجهاز المتكررة مخاوف أمنية.

**3. سجل الدخول بهدوء وبشكل طبيعي**
*   أدخل تفاصيل تسجيل الدخول بشكل طبيعي
*   تجنب محاولات تسجيل الدخول المتكررة
*   إذا فشل تسجيل الدخول، انتظر قبل المحاولة مرة أخرى يمكن أن تؤدي محاولات تسجيل الدخول الفاشلة المتعددة إلى أقفال مؤقتة.

**4. لا تغير أي معلومات حساب على الفور**
بعد تسجيل الدخول:
*   لا تغير البريد الإلكتروني
*   لا تغير كلمة المرور
*   لا تغير اسم المستخدم انتظر 3 أيام على الأقل، ويفضل 15-30 يومًا، قبل إجراء أي تغييرات.

### ماذا تفعل بعد تسجيل الدخول (أول 3 أيام)
خلال أول 3 أيام بعد تسجيل الدخول، حافظ على عدم نشاط الحساب. هذا يعني:
*   لا تضف أصدقاء
*   لا تقبل طلبات الصداقة
*   لا ترسل رسائل
*   لا تعدل تفاصيل الملف الشخصي تساعد هذه فترة نظام سناب شات على الوثوق بنمط نشاط الحساب الجديد.

### قواعد الاستخدام الآمن بعد 3 أيام
بمجرد اكتمال الفترة الأولية:
*   أضف أو اقبل ما لا يزيد عن 5 أصدقاء يوميًا
*   تجنب الإجراءات الجماعية
*   زد النشاط ببطء وبشكل طبيعي
*   لا ترسل رسائل متكررة أو تشبه الرسائل غير المرغوب فيها

### لماذا يسبب تغيير عنوان IP + الإجراءات الفورية الحظر
عندما يسجل حساب الدخول من عنوان IP أو بلد جديد ويغير بيانات الاعتماد على الفور أو يبدأ في إضافة العديد من الأصدقاء، قد يفسر سناب شات ذلك على أنه حساب مخترق أو مقرصن، مما قد يؤدي إلى حظر دائم دون استئناف.

### أسباب حظر حسابات سناب شات
فيما يلي الأسباب الأكثر شيوعًا لحظر سناب شات:
*   **تغييرات فورية في بيانات الاعتماد بعد تسجيل الدخول بـ IP جديد:** تغيير البريد الإلكتروني أو كلمة المرور أو اسم المستخدم مباشرة بعد تسجيل الدخول من عنوان IP جديد.
*   **طلبات صداقة مفرطة:** إضافة أو قبول الكثير من الأصدقاء في وقت قصير.
*   **استخدام VPN أو الوكيل:** غالبًا ما تستخدم شبكات VPN عناوين IP تم وضع علامة عليها والتي يعتبرها سناب شات عالية المخاطر.
*   **نشاط غير طبيعي أو آلي:** إجراءات سريعة لا تتطابق مع سلوك الإنسان الطبيعي.
*   **أجهزة أو مواقع متعددة:** تسجيل الدخول من عدة أجهزة أو بلدان خلال فترة قصيرة.
*   **استخدام تطبيقات أو برامج تابعة لجهات خارجية:** أي تطبيق غير رسمي أو مكون إضافي أو أداة أتمتة ينتهك سياسات سناب شات.
*   **فشل تسجيل الدخول المتكرر:** الكثير من محاولات كلمة المرور غير الصحيحة.

### أفضل الممارسات للحفاظ على أمان حسابك
*   استخدم جهازًا واحدًا وشبكة واحدة
*   تجنب شبكات VPN تمامًا
*   حافظ على الحد الأدنى من النشاط في البداية
*   اتبع فترات الانتظار قبل إجراء التغييرات
*   استخدم سناب شات بشكل طبيعي وصبور

### الخاتمة
يتطلب تسجيل الدخول بأمان إلى حساب سناب شات الصبر والسلوك المنضبط. في حين أن تغييرات IP أو البلد وحدها لا تسبب الحظر، فإن تغييرات الملف الشخصي الفورية واستخدام VPN والنشاط العدواني تزيد بشكل كبير من خطر الحظر الدائم.

من خلال اتباع ممارسات تسجيل الدخول الآمنة، والانتظار قبل إجراء التغييرات، والحفاظ على نشاط محدود، يمكن للمستخدمين تقليل خطر فقدان الوصول إلى حساب سناب شات الخاص بهم بشكل كبير.`
        },
        {
          title: "Snapchat Score Top-Up: Important Information During Top-Up Process",
          date: "March 28, 2026",
          excerpt: "Everything you need to know about the score top-up process and what to expect.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-topup.svg",
          content: `Please read the following information carefully before the score top-up process begins. These instructions are necessary to ensure a smooth and uninterrupted service.

### 🔒 1. Account Login Restriction During Service
Once the score top-up process has started, the buyer must not log in to the Snapchat account until the service is completed.

**⚠️ Logging in during the process may:**
*   Interrupt score progress
*   Slow down the service
*   Cause temporary restrictions on the account
The buyer should wait for confirmation before accessing the account again.

### 👤 2. Single Access Requirement
During the score top-up, the account should remain active from only one side.

**If the same account is accessed simultaneously from multiple locations or devices:**
*   Snapchat systems may detect unusual activity
*   The account may be temporarily locked
*   The score process may stop automatically
For this reason, the buyer must remain logged out during the service.

### 📱 3. Device & Network Instructions
*   The buyer should log out from all devices before the process begins
*   Do not refresh, log in, or switch devices during the top-up
*   Stable processing requires no activity from the buyer's side
*   Any interruption can affect completion time

### 📈 4. Score Increase Behavior
Snapchat score increases gradually, not instantly.
*   Score updates may take time to reflect
*   Temporary pauses are normal during processing
*   Checking the account repeatedly can disrupt the process
Patience during the service period is required.

### 📬 5. Communication & Confirmation Rule
The buyer should only log back into the account after receiving confirmation that the score top-up is complete.

**✅ Important Reminders:**
*   Do not assume completion without confirmation
*   Early login may cancel the remaining process
*   Follow seller instructions strictly

### ⚖️ 6. Responsibility for Instructions
If the buyer does not follow the provided instructions:

**🚫 Consequences of Non-Compliance:**
*   Any delay or interruption will not be the seller's responsibility
*   The service may not be repeated
*   The order may be considered completed as-is
These rules exist only to ensure successful delivery.

### ✅ 7. After Completion
Once confirmation is given:
*   The buyer may log in and use the account normally
*   The score top-up service is considered finished
*   No further action is required unless stated

### Important Disclaimer
*   This is a third-party score top-up service
*   The service is not affiliated with or endorsed by Snapchat
*   Results depend on Snapchat's system behavior and limitations

📊 Ready to boost your Snapchat score? Visit freesnapscores.com to get started with our reliable score top-up service. Follow the instructions above for a smooth experience!`
        },
        {
          title: "Buy Premade Snapchat Accounts with High SnapScore (10k to 1M+)",
          date: "March 28, 2026",
          excerpt: "Discover the benefits of buying premade accounts with high scores and how to choose the right one.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-boost.svg",
          content: `Ready to level up instantly? Why spend weeks, months, or even years trying to push your SnapScore up manually when you can leap straight to the top? We are the ultimate destination to buy Snapchat premade accounts with massive scores ready to go.

You want influence, you want credibility, and you want it right now. Creating a brand new account with a zero score won't cut it in 2026. Whether you need a starter account at 10k or an elite 1 Million+ SnapScore account, we have precisely what you need in our inventory.

### ⭐ Why You Should Buy ONLY From Us
The market is full of scammers selling banned or stolen accounts. Buy ONLY from SnapScore Store!

*   **100% Organic Accounts:** Our accounts are naturally grown without bots or banned scripts.
*   **Zero Shadowbans:** Clean IP creation means these accounts are fully ready for use.
*   **Instant Delivery:** Get your username and password details instantly upon purchase.
*   **Every Range Available:** From 10k to 1 Million+, we have the perfect account for your needs.
*   **Full Access Security:** You get complete ownership and can change all details.
Don't risk your money elsewhere! We are the ONLY trusted source on the web.

### 🔥 Buy Snapchat SnapScores Accounts: Every Range Available
We cater to everyone. Whether you're a casual user wanting a head start or a brand looking for immediate authority, we offer premade Snapchat accounts in every score bracket:

*   **Starter Tier (10k - 50k SnapScore):** Perfect for secondary accounts or individuals looking to quickly establish a normal presence without looking like a bot.
*   **Influencer Tier (100k - 500k SnapScore):** Elite accounts meant for people who want to look popular. Great for marketing, business, and jumping straight into the "Snap Star" territory.
*   **God Tier (1 Million+ SnapScore):** The absolute pinnacle. Only a fraction of Snapchat users ever reach 1 Million points. Instantly command respect.
We stock all of these. You select the exact score range you want, check out safely through our portal, and log in to your new powerhouse account.

### 🤖 Wait! Before You Go... Try Our Free Meta AI Downloader
Besides providing the world's best premade Snapchat accounts, we also offer the internet's most advanced free tools. Have you ever generated or seen an incredible AI video on Facebook, Instagram, or WhatsApp and wished you could save it?

Now you can! Try our highly popular Meta AI Downloader. It's 100% free, fast, and saves stunning AI-generated videos straight to your device with no watermarks.

From social media to your camera roll in seconds. Grab the tool today to complement your massive new Snapchat presence!

### 🌍 Our Global Reach: Serving You Everywhere
Our digital assets aren't bound by borders. We provide premier Snapchat services specifically optimized for locations across the globe. We highly recommend checking out our dedicated local guides for SnapScore services and premade accounts in your area:

📍 New York, USA | 📍 Los Angeles, USA | 📍 Chicago, USA | 📍 Miami, USA | 📍 Dallas, USA | 📍 United States | 📍 London, UK | 📍 United Kingdom | 📍 Toronto, Canada | 📍 Canada | 📍 Sydney, Australia | 📍 Australia | 📍 Dubai, UAE | 📍 United Arab Emirates | 📍 Riyadh, Saudi Arabia | 📍 Jeddah, Saudi Arabia | 📍 Saudi Arabia | 📍 Doha, Qatar | 📍 Qatar | 📍 Kuwait City | 📍 Kuwait | 📍 Paris, France | 📍 France | 📍 Berlin, Germany | 📍 Germany | 📍 Egypt | 📍 Nigeria | 📍 South Africa

### Ready To Claim Your New Account?
Don't wait any longer. High SnapScore accounts are in heavy demand, and our inventory updates daily. When you want the absolute best, most secure, and instantly accessible Snap accounts, buy ONLY from us.

🚀 Stop waiting! Head over to our Services page now to browse our current premade account inventory, or use our tools to boost your existing score.`
        },
        {
          title: "Snapchat Cross-Promotion Tips: Grow Followers Fast on Any Platform",
          date: "March 29, 2026",
          excerpt: "Discover the most effective and safe methods to boost your score in 2026.",
          thumbnail: "https://freesnapscores.com/blog/cross-promotion.svg",
          content: `Here is the truth: Growing a Snapchat account from zero strictly inside Snapchat is hard. The discovery features are getting better, but they aren't perfect.

The secret to rapid growth? Cross-Promotion. You likely have followers on Instagram, TikTok, or even friends on WhatsApp. You need to build a bridge that moves them from there to here. Here is how to become a cross-platform master.

### 👻 The Snapcode: Your Secret Weapon
Your Snapcode (that yellow ghost with dots) is the most powerful tool you have. It's a QR code that instantly adds you.

*   **Customize It:** Put your selfie in the ghost. Make it recognizable.
*   **Print It:** Put it on business cards, stickers, or even your car (if you're bold).
*   **Digital Everywhere:** Make it your profile picture on other private accounts.

### 📸 Instagram to Snapchat
Instagram is your showroom; Snapchat is your living room.

*   **Link in Bio:** Use a tool like Linktree and make "Add me on Snap" the top button.
*   **Story Teasers:** Post a blurred or intriguing photo on your Insta Story with text: "Full story/uncensored rant only on Snapchat! Link in bio." FOMO (Fear Of Missing Out) works.
*   **Highlights:** Create an "Add Me" highlight on your Insta profile with your Snapcode.

### 🎵 TikTok to Snapchat
TikTok gives you viral reach; Snapchat gives you connection.

*   **The CTA (Call to Action):** End your TikToks with "More behind the scenes on my Snap!"
*   **Bio Link:** TikTok allows you to link your Snapchat directly in your profile. Ensure it's connected!
*   **Exclusive Content:** "I'm doing a Q&A on Snapchat right now, go ask me anything!"

### 📺 YouTube to Snapchat
YouTube is for polished content. Snapchat is for the raw "vlog" style.

*   **Description Box:** Put your Snap link at the very top.
*   **On-Screen Graphics:** Flash your Snapcode on screen during your video intro and outro.
*   **Community Tab:** Post your Snapcode in a YouTube Community post.

### 💘 Dating Apps (Tinder/Bumble)
Okay, this is a bit different, but effective for personal brands.

Many people put their Snapchat in their bio. It's a low-pressure way for people to connect with you. Just be careful with privacy settings!

💡 **Pro Tip:** Give them a REASON to add you. "Add me on Snap" is boring. "Add me on Snap for daily marketing tips" or "Add me for exclusive discount codes" is compelling.

### 🔄 The "Content Loop" Strategy
Don't just move people to Snapchat. Move them around.

Post a Snap saying "Just posted a new TikTok!" Post a TikTok saying "Check my Insta!" Keep your audience moving between platforms. This signals to all algorithms that your audience is super engaged.

### Build Your Ecosystem
Don't build your house on rented land. If TikTok gets banned or Instagram changes its algorithm, you lose everything.

By cross-promoting and building a strong Snapchat following, you own a direct line to your fans that no algorithm can take away. Start building those bridges today!`
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
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      catalog: "الكتالوج",
      how: "كيف يعمل",
      faq: "الأسئلة الشائعة",
      blog: "المدونة",
      contact: "اتصل بنا",
      tools: "الأدوات",
      shop: "تسوق الآن",
      lang: "English",
      toolItems: [
        { id: 'calc', title: "حاسبة سكور سناب شات", ar: "سناب شات سكور حاسبة" },
        { id: 'checker', title: "فاحص العمر والموثوقية", ar: "فاحص عمر الحساب" },
        { id: 'tracker', title: "مخطط أهداف السكور", ar: "مخطط أهداف السكور" },
        { id: 'bitmoji', title: "منشئ صور بيتموجي", ar: "منشئ صور بيتموجي" },
        { id: 'lens', title: "محاكي عدسات الذكاء الاصطناعي", ar: "محاكي عدسات الذكاء الاصطناعي" },
        { id: 'map', title: "مكتشف مواقع خريطة سناب", ar: "مكتشف مواقع خريطة سناب" },
        { id: 'snapify', title: "سناب فاي برو", ar: "سناب فاي برو", isPro: true }
      ],
      serviceItems: [
        { id: 'boosting', title: "زيادة السكور", ar: "زيادة السكور" },
        { id: 'followers', title: "زيادة المتابعين", ar: "زيادة المتابعين" },
        { id: 'views', title: "مشاهدات الستوري", ar: "مشاهدات الستوري" },
        { id: 'lens', title: "إنشاء عدسات", ar: "إنشاء عدسات" },
        { id: 'badge', title: "توثيق الحساب", ar: "توثيق الحساب" }
      ],
      catalogItems: [
        { id: 'score', title: "حسابات سكور", ar: "حسابات سكور" },
        { id: 'followers', title: "حسابات متابعين", ar: "حسابات متابعين" },
        { id: 'age', title: "حسابات قديمة", ar: "حسابات قديمة" },
        { id: 'verified', title: "حسابات موثقة", ar: "حسابات موثقة" }
      ]
    },
    hero: {
      badge: "موثوق من قبل 10,000+ عميل",
      title: "عزز حضورك على سناب شات فوراً",
      titleHighlight: "",
      subtitle: "",
      desc: "زد سكور سناب شات الخاص بك بأمان، واحصل على حسابات قديمة، ونمِ متابعيك مع المزود الأكثر ثقة في العالم.",
      cta: "عرض الكتالوج",
      secondary: "خدماتنا",
      scoreLabel: "السكور الحالي",
      targetLabel: "الهدف",
      protection: "ضمان أمان الحساب بنسبة 100%"
    },
    shop: {
      title: "الكتالوج المميز",
      subtitle: "اختر الباقة المثالية لاحتياجاتك",
      scoreAccounts: "حسابات سكور",
      followerAccounts: "حسابات متابعين",
      servicesTab: "خدمات النمو",
      buy: "اطلب عبر واتساب",
      order: "اطلب الآن",
      price: "السعر"
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
      title: "لماذا تختار سناب سكور ستور؟",
      subtitle: "نقدم خدمات النمو الأكثر أماناً وفعالية عالمياً.",
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
          icon: <InfinityIcon className="w-8 h-8" />,
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
    snapify: {
      titleHighlight: "سناب فاي برو",
      subtitle: "",
      protection: "ضمان أمان الحساب بنسبة 100%"
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
        },
        {
          q: "ما هو ضمان استرداد الأموال لمدة 14 يوماً؟",
          a: "نحن نثق في خدماتنا. إذا لم تكن راضياً عن النتائج، سنعيد لك أموالك خلال 14 يوماً."
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
          title: "دليل أمان حساب سناب شات: ممارسات تسجيل الدخول الآمن ومنع الحظر",
          date: "30 مارس 2026",
          excerpt: "تعرف على كيفية الحفاظ على أمان حسابك ومنع الحظر من خلال دليل الأمان الشامل الخاص بنا.",
          thumbnail: "https://freesnapscores.com/blog/snapchat-account-safety-guide",
          content: `سناب شات يستخدم أنظمة أمان متقدمة لحماية حسابات المستخدمين من الوصول غير المصرح به والاحتيال وإساءة الاستخدام. بينما لا يعد تسجيل الدخول من عنوان IP جديد أو بلد مختلف انتهاكًا تلقائيًا، فإن ممارسات تسجيل الدخول غير الآمنة والنشاط المفاجئ يمكن أن تؤدي إلى فحوصات أمنية قد تؤدي إلى حظر الحساب مؤقتًا أو دائمًا.

هذا الدليل يشرح كيفية تسجيل الدخول بأمان، وما هي الإجراءات التي يجب تجنبها، والأسباب الرئيسية لحظر حسابات سناب شات.

### كيفية تسجيل الدخول بأمان إلى حساب سناب شات
سلوك تسجيل الدخول الآمن أمر بالغ الأهمية، خاصة عند الوصول إلى حساب لأول مرة أو من عنوان IP جديد.

**1. استخدم اتصال إنترنت مستقر وحقيقي**
*   قم دائمًا بتسجيل الدخول باستخدام بيانات الهاتف المحمول الحقيقية أو شبكة Wi-Fi منزلية موثوقة
*   تجنب شبكات Wi-Fi العامة
*   لا تستخدم أبدًا شبكات VPN أو خدمات البروكسي
يساعد عنوان IP المستقر سناب شات في التعرف على تسجيل الدخول كعملية مشروعة.

**2. استخدم جهازًا واحدًا فقط**
*   سجل الدخول من جهاز واحد
*   لا تتنقل بين هواتف متعددة أو محاكيات
*   تجنب تسجيل الدخول من مواقع متعددة في وقت قصير
تغييرات الجهاز المتكررة ترفع علامات التحذير الأمنية.

**3. سجل الدخول بهدوء وبشكل طبيعي**
*   أدخل تفاصيل تسجيل الدخول بشكل طبيعي
*   تجنب محاولات تسجيل الدخول المتكررة
*   إذا فشل تسجيل الدخول، انتظر قبل المحاولة مرة أخرى
المحاولات الفاشلة المتعددة يمكن أن تسبب أقفالاً مؤقتة.

**4. لا تغير أي معلومات للحساب على الفور**
بعد تسجيل الدخول:
*   لا تغير البريد الإلكتروني
*   لا تغير كلمة المرور
*   لا تغير اسم المستخدم
انتظر 3 أيام على الأقل، ويفضل 15-30 يومًا، قبل إجراء أي تغييرات.

### ماذا تفعل بعد تسجيل الدخول (أول 3 أيام)
خلال أول 3 أيام بعد تسجيل الدخول، حافظ على عدم نشاط الحساب. هذا يعني:
*   لا تضف أصدقاء
*   لا تقبل طلبات الصداقة
*   لا ترسل رسائل
*   لا تعدل تفاصيل الملف الشخصي
هذه الفترة تساعد نظام سناب شات على الوثوق بنمط النشاط الجديد للحساب.

### قواعد الاستخدام الآمن بعد 3 أيام
بمجرد اكتمال الفترة الأولية:
*   لا تضف أو تقبل أكثر من 5 أصدقاء يوميًا
*   تجنب الإجراءات الجماعية
*   زد النشاط ببطء وبشكل طبيعي
*   لا ترسل رسائل متكررة أو تبدو كرسائل مزعجة

### لماذا يسبب تغيير IP + الإجراءات الفورية الحظر
عندما يسجل حساب الدخول من IP أو بلد جديد ويغير بيانات الاعتماد فورًا أو يبدأ في إضافة العديد من الأصدقاء، قد يفسر سناب شات ذلك على أنه حساب مخترق أو مقرصن، مما قد يؤدي إلى حظر دائم دون استئناف.

### أسباب حظر حسابات سناب شات
فيما يلي الأسباب الأكثر شيوعًا لحظر سناب شات:
*   **تغييرات فورية في بيانات الاعتماد بعد تسجيل الدخول من IP جديد:** تغيير البريد الإلكتروني أو كلمة المرور أو اسم المستخدم مباشرة بعد تسجيل الدخول من IP جديد.
*   **طلبات الصداقة المفرطة:** إضافة أو قبول عدد كبير جدًا من الأصدقاء في وقت قصير.
*   **استخدام VPN أو بروكسي:** غالبًا ما تستخدم شبكات VPN عناوين IP تم الإبلاغ عنها والتي يعتبرها سناب شات عالية المخاطر.
*   **نشاط غير طبيعي أو آلي:** إجراءات سريعة لا تتطابق مع السلوك البشري الطبيعي.
*   **أجهزة أو مواقع متعددة:** تسجيل الدخول من عدة أجهزة أو بلدان خلال فترة قصيرة.
*   **استخدام تطبيقات الطرف الثالث أو البوتات:** أي تطبيق غير رسمي أو إضافة أو أداة أتمتة تنتهك سياسات سناب شات.
*   **فشل تسجيل الدخول المتكرر:** الكثير من محاولات كلمة المرور غير الصحيحة.

### أفضل الممارسات للحفاظ على أمان حسابك
*   استخدم جهازًا واحدًا وشبكة واحدة
*   تجنب شبكات VPN تمامًا
*   حافظ على الحد الأدنى من النشاط في البداية
*   اتبع فترات الانتظار قبل إجراء التغييرات
*   استخدم سناب شات بشكل طبيعي وبصبر

### خاتمة
يتطلب تسجيل الدخول بأمان إلى حساب سناب شات الصبر والسلوك المنضبط. بينما لا تسبب تغييرات IP أو البلد وحدها الحظر، فإن تغييرات الملف الشخصي الفورية واستخدام VPN والنشاط العدواني تزيد بشكل كبير من خطر الحظر الدائم.

باتباع ممارسات تسجيل الدخول الآمن، والانتظار قبل إجراء التغييرات، والحفاظ على نشاط محدود، يمكن للمستخدمين تقليل خطر فقدان الوصول إلى حساب سناب شات الخاص بهم بشكل كبير.`
        },
        {
          title: "شحن سكور سناب شات: معلومات مهمة أثناء عملية الشحن",
          date: "30 مارس 2026",
          excerpt: "كل ما تحتاج معرفته عن عملية شحن السكور وماذا تتوقع.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-topup.svg",
          content: `يرجى قراءة المعلومات التالية بعناية قبل بدء عملية شحن السكور. هذه التعليمات ضرورية لضمان خدمة سلسة وغير منقطعة.

### 🔒 1. قيود تسجيل الدخول إلى الحساب أثناء الخدمة
بمجرد بدء عملية شحن السكور، يجب على المشتري عدم تسجيل الدخول إلى حساب سناب شات حتى تكتمل الخدمة.

**⚠️ تسجيل الدخول أثناء العملية قد يؤدي إلى:**
*   مقاطعة تقدم السكور
*   إبطاء الخدمة
*   التسبب في قيود مؤقتة على الحساب
يجب على المشتري انتظار التأكيد قبل الوصول إلى الحساب مرة أخرى.

### 👤 2. متطلبات الوصول الفردي
أثناء شحن السكور، يجب أن يظل الحساب نشطًا من جانب واحد فقط.

**إذا تم الوصول إلى نفس الحساب في وقت واحد من مواقع أو أجهزة متعددة:**
*   قد تكتشف أنظمة سناب شات نشاطًا غير عادي
*   قد يتم قفل الحساب مؤقتًا
*   قد تتوقف عملية السكور تلقائيًا
لهذا السبب، يجب أن يظل المشتري مسجلاً الخروج أثناء الخدمة.

### 📱 3. تعليمات الجهاز والشبكة
*   يجب على المشتري تسجيل الخروج من جميع الأجهزة قبل بدء العملية
*   لا تقم بالتحديث أو تسجيل الدخول أو تبديل الأجهزة أثناء الشحن
*   تتطلب المعالجة المستقرة عدم وجود نشاط من جانب المشتري
*   أي انقطاع يمكن أن يؤثر على وقت الإكمال

### 📈 4. سلوك زيادة السكور
يزداد سكور سناب شات تدريجيًا، وليس فورًا.
*   قد تستغرق تحديثات السكور وقتًا لتظهر
*   التوقفات المؤقتة طبيعية أثناء المعالجة
*   التحقق من الحساب بشكل متكرر يمكن أن يعطل العملية
الصبر مطلوب خلال فترة الخدمة.

### 📬 5. قاعدة التواصل والتأكيد
يجب على المشتري تسجيل الدخول مرة أخرى إلى الحساب فقط بعد تلقي تأكيد بأن شحن السكور قد اكتمل.

**✅ تذكيرات مهمة:**
*   لا تفترض الإكمال دون تأكيد
*   تسجيل الدخول المبكر قد يلغي العملية المتبقية
*   اتبع تعليمات البائع بدقة

### ⚖️ 6. المسؤولية عن التعليمات
إذا لم يتبع المشتري التعليمات المقدمة:

**🚫 عواقب عدم الامتثال:**
*   أي تأخير أو انقطاع لن يكون من مسؤولية البائع
*   قد لا يتم تكرار الخدمة
*   قد يعتبر الطلب مكتملاً كما هو
هذه القواعد موجودة فقط لضمان التسليم الناجح.

### ✅ 7. بعد الإكمال
بمجرد إعطاء التأكيد:
*   يمكن للمشتري تسجيل الدخول واستخدام الحساب بشكل طبيعي
*   تعتبر خدمة شحن السكور منتهية
*   لا يلزم اتخاذ أي إجراء آخر ما لم ينص على خلاف ذلك

### إخلاء مسؤولية مهم
*   هذه خدمة شحن سكور من طرف ثالث
*   الخدمة ليست تابعة لسناب شات أو معتمدة منه
*   تعتمد النتائج على سلوك نظام سناب شات وقيوده

📊 هل أنت مستعد لتعزيز سكور سناب شات الخاص بك؟ تفضل بزيارة freesnapscores.com للبدء في خدمة شحن السكور الموثوقة لدينا. اتبع التعليمات أعلاه لتجربة سلسة!`
        },
        {
          title: "شراء حسابات سناب شات جاهزة بسكور عالٍ (10 آلاف إلى مليون+)",
          date: "30 مارس 2026",
          excerpt: "اكتشف فوائد شراء حسابات جاهزة بسكور عالٍ وكيفية اختيار الحساب المناسب.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-boost.svg",
          content: `هل أنت مستعد لرفع مستواك على الفور؟ لماذا تقضي أسابيع أو شهورًا أو حتى سنوات في محاولة رفع سكور سناب شات يدويًا بينما يمكنك القفز مباشرة إلى القمة؟ نحن الوجهة النهائية لشراء حسابات سناب شات الجاهزة بسكور هائل وجاهزة للاستخدام.

أنت تريد التأثير، وتريد المصداقية، وتريدها الآن. إنشاء حساب جديد تمامًا بسكور صفر لن يفي بالغرض في عام 2026. سواء كنت بحاجة إلى حساب مبتدئ بـ 10 آلاف أو حساب سكور مليون+ للنخبة، فلدينا بالضبط ما تحتاجه في مخزوننا.

### ⭐ لماذا يجب عليك الشراء منا فقط
السوق مليء بالمحتالين الذين يبيعون حسابات محظورة أو مسروقة. اشترِ فقط من متجر SnapScore!

*   **حسابات عضوية 100%:** حساباتنا تنمو بشكل طبيعي بدون بوتات أو سكربتات محظورة.
*   **صفر حظر ظل:** إنشاء IP نظيف يعني أن هذه الحسابات جاهزة تمامًا للاستخدام.
*   **تسليم فوري:** احصل على تفاصيل اسم المستخدم وكلمة المرور فور الشراء.
*   **كل النطاقات متاحة:** من 10 آلاف إلى مليون+، لدينا الحساب المثالي لاحتياجاتك.
*   **أمان الوصول الكامل:** تحصل على ملكية كاملة ويمكنك تغيير جميع التفاصيل.
لا تخاطر بأموالك في مكان آخر! نحن المصدر الوحيد الموثوق به على الويب.

### 🔥 شراء حسابات سكور سناب شات: كل النطاقات متاحة
نحن نلبي احتياجات الجميع. سواء كنت مستخدمًا عاديًا يريد بداية قوية أو علامة تجارية تبحث عن سلطة فورية، فنحن نقدم حسابات سناب شات جاهزة في كل فئة سكور:

*   **فئة المبتدئين (10 آلاف - 50 ألف سكور):** مثالية للحسابات الثانوية أو الأفراد الذين يتطلعون إلى إنشاء حضور طبيعي بسرعة دون أن يبدوا كبوت.
*   **فئة المؤثرين (100 ألف - 500 ألف سكور):** حسابات النخبة المخصصة للأشخاص الذين يريدون أن يبدوا مشهورين. رائعة للتسويق والأعمال والقفز مباشرة إلى منطقة "نجم سناب".
*   **فئة الآلهة (مليون+ سكور):** القمة المطلقة. نسبة ضئيلة فقط من مستخدمي سناب شات يصلون إلى مليون نقطة. احصل على الاحترام فورًا.
نحن نوفر كل هذه. أنت تختار نطاق السكور الدقيق الذي تريده، وتدفع بأمان من خلال بوابتنا، وتسجل الدخول إلى حسابك القوي الجديد.

### 🤖 انتظر! قبل أن تذهب... جرب أداة تحميل Meta AI المجانية
إلى جانب توفير أفضل حسابات سناب شات الجاهزة في العالم، نقدم أيضًا أكثر الأدوات المجانية تقدمًا على الإنترنت. هل سبق لك أن أنشأت أو رأيت فيديو ذكاء اصطناعي رائعًا على فيسبوك أو إنستغرام أو واتساب وتمنيت لو كان بإمكانك حفظه؟

الآن يمكنك ذلك! جرب أداة تحميل Meta AI الشهيرة للغاية. إنها مجانية 100% وسريعة وتحفظ فيديوهات مذهلة من صنع الذكاء الاصطناعي مباشرة على جهازك بدون علامات مائية.

من وسائل التواصل الاجتماعي إلى معرض الصور الخاص بك في ثوانٍ. احصل على الأداة اليوم لتكمل حضورك الهائل الجديد على سناب شات!

### 🌍 وصولنا العالمي: نخدمك في كل مكان
أصولنا الرقمية لا تلتزم بالحدود. نحن نقدم خدمات سناب شات متميزة مصممة خصيصًا لمواقع في جميع أنحاء العالم. نوصي بشدة بالاطلاع على أدلتنا المحلية المخصصة لخدمات SnapScore والحسابات الجاهزة في منطقتك:

📍 نيويورك، الولايات المتحدة الأمريكية | 📍 لوس أنجلوس، الولايات المتحدة الأمريكية | 📍 شيكاغو، الولايات المتحدة الأمريكية | 📍 ميامي، الولايات المتحدة الأمريكية | 📍 دالاس، الولايات المتحدة الأمريكية | 📍 الولايات المتحدة الأمريكية | 📍 لندن، المملكة المتحدة | 📍 المملكة المتحدة | 📍 تورونتو، كندا | 📍 كندا | 📍 سيدني، أستراليا | 📍 أستراليا | 📍 دبي، الإمارات العربية المتحدة | 📍 الإمارات العربية المتحدة | 📍 الرياض، المملكة العربية السعودية | 📍 جدة، المملكة العربية السعودية | 📍 المملكة العربية السعودية | 📍 الدوحة، قطر | 📍 قطر | 📍 مدينة الكويت | 📍 الكويت | 📍 باريس، فرنسا | 📍 فرنسا | 📍 برلين، ألمانيا | 📍 ألمانيا | 📍 مصر | 📍 نيجيريا | 📍 جنوب أفريقيا

### هل أنت مستعد للمطالبة بحسابك الجديد؟
لا تنتظر أكثر من ذلك. حسابات السكور العالي مطلوبة بشدة، ومخزوننا يتحدث يوميًا. عندما تريد الأفضل والأكثر أمانًا والأسهل وصولاً، اشترِ منا فقط.

🚀 توقف عن الانتظار! توجه إلى صفحة خدماتنا الآن لتصفح مخزون الحسابات الجاهزة الحالي لدينا، أو استخدم أدواتنا لتعزيز سكورك الحالي.`
        },
        {
          title: "شحن سكور سناب شات: معلومات مهمة أثناء عملية الشحن",
          date: "30 مارس 2026",
          excerpt: "كل ما تحتاج معرفته عن عملية شحن السكور وماذا تتوقع.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-topup.svg",
          content: `يرجى قراءة المعلومات التالية بعناية قبل بدء عملية شحن السكور. هذه التعليمات ضرورية لضمان خدمة سلسة وغير منقطعة.

### 🔒 1. قيود تسجيل الدخول إلى الحساب أثناء الخدمة
بمجرد بدء عملية شحن السكور، يجب على المشتري عدم تسجيل الدخول إلى حساب سناب شات حتى تكتمل الخدمة.

**⚠️ تسجيل الدخول أثناء العملية قد يؤدي إلى:**
*   مقاطعة تقدم السكور
*   إبطاء الخدمة
*   التسبب في قيود مؤقتة على الحساب
يجب على المشتري انتظار التأكيد قبل الوصول إلى الحساب مرة أخرى.

### 👤 2. متطلبات الوصول الفردي
أثناء شحن السكور، يجب أن يظل الحساب نشطًا من جانب واحد فقط.

**إذا تم الوصول إلى نفس الحساب في وقت واحد من مواقع أو أجهزة متعددة:**
*   قد تكتشف أنظمة سناب شات نشاطًا غير عادي
*   قد يتم قفل الحساب مؤقتًا
*   قد تتوقف عملية السكور تلقائيًا
لهذا السبب، يجب أن يظل المشتري مسجلاً الخروج أثناء الخدمة.

### 📱 3. تعليمات الجهاز والشبكة
*   يجب على المشتري تسجيل الخروج من جميع الأجهزة قبل بدء العملية
*   لا تقم بالتحديث أو تسجيل الدخول أو تبديل الأجهزة أثناء الشحن
*   تتطلب المعالجة المستقرة عدم وجود نشاط من جانب المشتري
*   أي انقطاع يمكن أن يؤثر على وقت الإكمال

### 📈 4. سلوك زيادة السكور
يزداد سكور سناب شات تدريجيًا، وليس فورًا.
*   قد تستغرق تحديثات السكور وقتًا لتظهر
*   التوقفات المؤقتة طبيعية أثناء المعالجة
*   التحقق من الحساب بشكل متكرر يمكن أن يعطل العملية
الصبر مطلوب خلال فترة الخدمة.

### 📬 5. قاعدة التواصل والتأكيد
يجب على المشتري تسجيل الدخول مرة أخرى إلى الحساب فقط بعد تلقي تأكيد بأن شحن السكور قد اكتمل.

**✅ تذكيرات مهمة:**
*   لا تفترض الإكمال دون تأكيد
*   تسجيل الدخول المبكر قد يلغي العملية المتبقية
*   اتبع تعليمات البائع بدقة

### ⚖️ 6. المسؤولية عن التعليمات
إذا لم يتبع المشتري التعليمات المقدمة:

**🚫 عواقب عدم الامتثال:**
*   أي تأخير أو انقطاع لن يكون من مسؤولية البائع
*   قد لا يتم تكرار الخدمة
*   قد يعتبر الطلب مكتملاً كما هو
هذه القواعد موجودة فقط لضمان التسليم الناجح.

### ✅ 7. بعد الإكمال
بمجرد إعطاء التأكيد:
*   يمكن للمشتري تسجيل الدخول واستخدام الحساب بشكل طبيعي
*   تعتبر خدمة شحن السكور منتهية
*   لا يلزم اتخاذ أي إجراء آخر ما لم ينص على خلاف ذلك

### إخلاء مسؤولية مهم
*   هذه خدمة شحن سكور من طرف ثالث
*   الخدمة ليست تابعة لسناب شات أو معتمدة منه
*   تعتمد النتائج على سلوك نظام سناب شات وقيوده

📊 هل أنت مستعد لتعزيز سكور سناب شات الخاص بك؟ تفضل بزيارة freesnapscores.com للبدء في خدمة شحن السكور الموثوقة لدينا. اتبع التعليمات أعلاه لتجربة سلسة!`
        },
        {
          title: "شراء حسابات سناب شات جاهزة بسكور عالٍ (10 آلاف إلى مليون+)",
          date: "30 مارس 2026",
          excerpt: "اكتشف فوائد شراء حسابات جاهزة بسكور عالٍ وكيفية اختيار الحساب المناسب.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-boost.svg",
          content: `هل أنت مستعد لرفع مستواك على الفور؟ لماذا تقضي أسابيع أو شهورًا أو حتى سنوات في محاولة رفع سكور سناب شات يدويًا بينما يمكنك القفز مباشرة إلى القمة؟ نحن الوجهة النهائية لشراء حسابات سناب شات الجاهزة بسكور هائل وجاهزة للاستخدام.

أنت تريد التأثير، وتريد المصداقية، وتريدها الآن. إنشاء حساب جديد تمامًا بسكور صفر لن يفي بالغرض في عام 2026. سواء كنت بحاجة إلى حساب مبتدئ بـ 10 آلاف أو حساب سكور مليون+ للنخبة، فلدينا بالضبط ما تحتاجه في مخزوننا.

### ⭐ لماذا يجب عليك الشراء منا فقط
السوق مليء بالمحتالين الذين يبيعون حسابات محظورة أو مسروقة. اشترِ فقط من متجر SnapScore!

*   **حسابات عضوية 100%:** حساباتنا تنمو بشكل طبيعي بدون بوتات أو سكربتات محظورة.
*   **صفر حظر ظل:** إنشاء IP نظيف يعني أن هذه الحسابات جاهزة تمامًا للاستخدام.
*   **تسليم فوري:** احصل على تفاصيل اسم المستخدم وكلمة المرور فور الشراء.
*   **كل النطاقات متاحة:** من 10 آلاف إلى مليون+، لدينا الحساب المثالي لاحتياجاتك.
*   **أمان الوصول الكامل:** تحصل على ملكية كاملة ويمكنك تغيير جميع التفاصيل.
لا تخاطر بأموالك في مكان آخر! نحن المصدر الوحيد الموثوق به على الويب.

### 🔥 شراء حسابات سكور سناب شات: كل النطاقات متاحة
نحن نلبي احتياجات الجميع. سواء كنت مستخدمًا عاديًا يريد بداية قوية أو علامة تجارية تبحث عن سلطة فورية، فنحن نقدم حسابات سناب شات جاهزة في كل فئة سكور:

*   **فئة المبتدئين (10 آلاف - 50 ألف سكور):** مثالية للحسابات الثانوية أو الأفراد الذين يتطلعون إلى إنشاء حضور طبيعي بسرعة دون أن يبدوا كبوت.
*   **فئة المؤثرين (100 ألف - 500 ألف سكور):** حسابات النخبة المخصصة للأشخاص الذين يريدون أن يبدوا مشهورين. رائعة للتسويق والأعمال والقفز مباشرة إلى منطقة "نجم سناب".
*   **فئة الآلهة (مليون+ سكور):** القمة المطلقة. نسبة ضئيلة فقط من مستخدمي سناب شات يصلون إلى مليون نقطة. احصل على الاحترام فورًا.
نحن نوفر كل هذه. أنت تختار نطاق السكور الدقيق الذي تريده، وتدفع بأمان من خلال بوابتنا، وتسجل الدخول إلى حسابك القوي الجديد.

### 🤖 انتظر! قبل أن تذهب... جرب أداة تحميل Meta AI المجانية
إلى جانب توفير أفضل حسابات سناب شات الجاهزة في العالم، نقدم أيضًا أكثر الأدوات المجانية تقدمًا على الإنترنت. هل سبق لك أن أنشأت أو رأيت فيديو ذكاء اصطناعي رائعًا على فيسبوك أو إنستغرام أو واتساب وتمنيت لو كان بإمكانك حفظه؟

الآن يمكنك ذلك! جرب أداة تحميل Meta AI الشهيرة للغاية. إنها مجانية 100% وسريعة وتحفظ فيديوهات مذهلة من صنع الذكاء الاصطناعي مباشرة على جهازك بدون علامات مائية.

من وسائل التواصل الاجتماعي إلى معرض الصور الخاص بك في ثوانٍ. احصل على الأداة اليوم لتكمل حضورك الهائل الجديد على سناب شات!

### 🌍 وصولنا العالمي: نخدمك في كل مكان
أصولنا الرقمية لا تلتزم بالحدود. نحن نقدم خدمات سناب شات متميزة مصممة خصيصًا لمواقع في جميع أنحاء العالم. نوصي بشدة بالاطلاع على أدلتنا المحلية المخصصة لخدمات SnapScore والحسابات الجاهزة في منطقتك:

📍 نيويورك، الولايات المتحدة الأمريكية | 📍 لوس أنجلوس، الولايات المتحدة الأمريكية | 📍 شيكاغو، الولايات المتحدة الأمريكية | 📍 ميامي، الولايات المتحدة الأمريكية | 📍 دالاس، الولايات المتحدة الأمريكية | 📍 الولايات المتحدة الأمريكية | 📍 لندن، المملكة المتحدة | 📍 المملكة المتحدة | 📍 تورونتو، كندا | 📍 كندا | 📍 سيدني، أستراليا | 📍 أستراليا | 📍 دبي، الإمارات العربية المتحدة | 📍 الإمارات العربية المتحدة | 📍 الرياض، المملكة العربية السعودية | 📍 جدة، المملكة العربية السعودية | 📍 المملكة العربية السعودية | 📍 الدوحة، قطر | 📍 قطر | 📍 مدينة الكويت | 📍 الكويت | 📍 باريس، فرنسا | 📍 فرنسا | 📍 برلين، ألمانيا | 📍 ألمانيا | 📍 مصر | 📍 نيجيريا | 📍 جنوب أفريقيا

### هل أنت مستعد للمطالبة بحسابك الجديد؟
لا تنتظر أكثر من ذلك. حسابات السكور العالي مطلوبة بشدة، ومخزوننا يتحدث يوميًا. عندما تريد الأفضل والأكثر أمانًا والأسهل وصولاً، اشترِ منا فقط.

🚀 توقف عن الانتظار! توجه إلى صفحة خدماتنا الآن لتصفح مخزون الحسابات الجاهزة الحالي لدينا، أو استخدم أدواتنا لتعزيز سكورك الحالي.`
        },
        {
          title: "شراء حسابات سناب شات جاهزة بسكور عالٍ (10 آلاف إلى مليون+)",
          date: "30 مارس 2026",
          excerpt: "اكتشف فوائد شراء حسابات جاهزة بسكور عالٍ وكيفية اختيار الحساب المناسب.",
          thumbnail: "https://freesnapscores.com/blog/snapscore-boost.svg",
          content: `Ready to level up instantly? Why spend weeks, months, or even years trying to push your SnapScore up manually when you can leap straight to the top? We are the ultimate destination to buy Snapchat premade accounts with massive scores ready to go.

You want influence, you want credibility, and you want it right now. Creating a brand new account with a zero score won't cut it in 2026. Whether you need a starter account at 10k or an elite 1 Million+ SnapScore account, we have precisely what you need in our inventory.

### ⭐ Why You Should Buy ONLY From Us
The market is full of scammers selling banned or stolen accounts. Buy ONLY from SnapScore Store!

*   **100% Organic Accounts:** Our accounts are naturally grown without bots or banned scripts.
*   **Zero Shadowbans:** Clean IP creation means these accounts are fully ready for use.
*   **Instant Delivery:** Get your username and password details instantly upon purchase.
*   **Every Range Available:** From 10k to 1 Million+, we have the perfect account for your needs.
*   **Full Access Security:** You get complete ownership and can change all details.
Don't risk your money elsewhere! We are the ONLY trusted source on the web.

### 🔥 Buy Snapchat SnapScores Accounts: Every Range Available
We cater to everyone. Whether you're a casual user wanting a head start or a brand looking for immediate authority, we offer premade Snapchat accounts in every score bracket:

*   **Starter Tier (10k - 50k SnapScore):** Perfect for secondary accounts or individuals looking to quickly establish a normal presence without looking like a bot.
*   **Influencer Tier (100k - 500k SnapScore):** Elite accounts meant for people who want to look popular. Great for marketing, business, and jumping straight into the "Snap Star" territory.
*   **God Tier (1 Million+ SnapScore):** The absolute pinnacle. Only a fraction of Snapchat users ever reach 1 Million points. Instantly command respect.
We stock all of these. You select the exact score range you want, check out safely through our portal, and log in to your new powerhouse account.

### 🤖 Wait! Before You Go... Try Our Free Meta AI Downloader
Besides providing the world's best premade Snapchat accounts, we also offer the internet's most advanced free tools. Have you ever generated or seen an incredible AI video on Facebook, Instagram, or WhatsApp and wished you could save it?

Now you can! Try our highly popular Meta AI Downloader. It's 100% free, fast, and saves stunning AI-generated videos straight to your device with no watermarks.

From social media to your camera roll in seconds. Grab the tool today to complement your massive new Snapchat presence!

### 🌍 Our Global Reach: Serving You Everywhere
Our digital assets aren't bound by borders. We provide premier Snapchat services specifically optimized for locations across the globe. We highly recommend checking out our dedicated local guides for SnapScore services and premade accounts in your area:

📍 New York, USA | 📍 Los Angeles, USA | 📍 Chicago, USA | 📍 Miami, USA | 📍 Dallas, USA | 📍 United States | 📍 London, UK | 📍 United Kingdom | 📍 Toronto, Canada | 📍 Canada | 📍 Sydney, Australia | 📍 Australia | 📍 Dubai, UAE | 📍 United Arab Emirates | 📍 Riyadh, Saudi Arabia | 📍 Jeddah, Saudi Arabia | 📍 Saudi Arabia | 📍 Doha, Qatar | 📍 Qatar | 📍 Kuwait City | 📍 Kuwait | 📍 Paris, France | 📍 France | 📍 Berlin, Germany | 📍 Germany | 📍 Egypt | 📍 Nigeria | 📍 South Africa

### Ready To Claim Your New Account?
Don't wait any longer. High SnapScore accounts are in heavy demand, and our inventory updates daily. When you want the absolute best, most secure, and instantly accessible Snap accounts, buy ONLY from us.

🚀 Stop waiting! Head over to our Services page now to browse our current premade account inventory, or use our tools to boost your existing score.`
        },
        {
          title: "كيف ترفع سكور سناب شات بسرعة وأمان في 2026",
          date: "30 مارس 2026",
          excerpt: "اكتشف أكثر الطرق فعالية وأماناً لرفع السكور في 2026.",
          thumbnail: "https://freesnapscores.com/blog/cross-promotion.svg",
          content: `سواء كنت تبحث عن زيادة سكور سناب شات الخاص بك أو تنمية متابعيك، فإن عام 2026 يتطلب استراتيجية ذكية. الحقيقة هي أن تنمية حساب سناب شات من الصفر داخل التطبيق فقط أمر صعب. ميزات الاكتشاف تتحسن، لكنها ليست مثالية.

السر في النمو السريع؟ الترويج المتبادل (Cross-Promotion). من المحتمل أن يكون لديك متابعون على إنستغرام أو تيك توك أو حتى أصدقاء على واتساب. تحتاج إلى بناء جسر ينقلهم من هناك إلى هنا. إليك كيف تصبح سيد الترويج المتبادل.

### 👻 كود السناب (Snapcode): سلاحك السري
كود السناب الخاص بك (ذلك الشبح الأصفر المنقط) هو أقوى أداة لديك. إنه رمز QR يضيفك فوراً.

*   **خصصه:** ضع صورتك الشخصية داخل الشبح. اجعله مميزاً.
*   **اطبعه:** ضعه على بطاقات العمل، الملصقات، أو حتى سيارتك (إذا كنت جريئاً).
*   **رقمياً في كل مكان:** اجعله صورتك الشخصية على حساباتك الأخرى.

### 📸 من إنستغرام إلى سناب شات
إنستغرام هو صالة العرض الخاصة بك؛ سناب شات هو غرفة المعيشة.

*   **رابط في البايو:** استخدم أداة مثل Linktree واجعل "أضفني على سناب" الزر العلوي.
*   **تشويق الستوري:** انشر صورة مشوشة أو مثيرة للاهتمام على ستوري إنستغرام مع نص: "القصة الكاملة فقط على سناب شات! الرابط في البايو." الخوف من فوات الشيء (FOMO) يعمل دائماً.
*   **الهايلايت:** أنشئ هايلايت "أضفني" على ملفك الشخصي في إنستغرام يحتوي على كود السناب الخاص بك.

### 🎵 من تيك توك إلى سناب شات
تيك توك يمنحك وصولاً واسعاً؛ سناب شات يمنحك اتصالاً.

*   **دعوة لاتخاذ إجراء (CTA):** أنهِ فيديوهات تيك توك بـ "المزيد من خلف الكواليس على سنابي!"
*   **رابط البايو:** يتيح لك تيك توك ربط سناب شات مباشرة بملفك الشخصي. تأكد من توصيله!
*   **محتوى حصري:** "أقوم بالإجابة على الأسئلة على سناب شات الآن، اذهب واسألني أي شيء!"

### 📺 من يوتيوب إلى سناب شات
يوتيوب للمحتوى المصقول. سناب شات لنمط "الفلوق" العفوي.

*   **صندوق الوصف:** ضع رابط سناب الخاص بك في الأعلى تماماً.
*   **رسومات على الشاشة:** اعرض كود السناب الخاص بك على الشاشة أثناء مقدمة وخاتمة الفيديو.
*   **تبويب المنتدى:** انشر كود السناب الخاص بك في منشور منتدى يوتيوب.

### 💘 تطبيقات المواعدة (Tinder/Bumble)
حسناً، هذا مختلف قليلاً، لكنه فعال للعلامات التجارية الشخصية.

يضع الكثير من الناس سناب شات الخاص بهم في البايو. إنها طريقة منخفضة الضغط ليتواصل الناس معك. فقط كن حذراً في إعدادات الخصوصية!

💡 **نصيحة احترافية:** أعطهم سبباً لإضافتك. "أضفني على سناب" مملة. "أضفني على سناب للحصول على نصائح تسويقية يومية" أو "أضفني للحصول على أكواد خصم حصرية" أمر مقنع.

### 🔄 استراتيجية "حلقة المحتوى"
لا تكتفِ بنقل الناس إلى سناب شات. حركهم في كل مكان.

انشر سناب تقول "نشرت تيك توك جديداً!" انشر تيك توك يقول "تحقق من إنستغرامي!" حافظ على حركة جمهورك بين المنصات. هذا يعطي إشارة لجميع الخوارزميات بأن جمهورك متفاعل للغاية.

### ابنِ نظامك البيئي
لا تبنِ منزلك على أرض مستأجرة. إذا تم حظر تيك توك أو غير إنستغرام خوارزميته، فستفقد كل شيء.

من خلال الترويج المتبادل وبناء قاعدة متابعين قوية على سناب شات، فإنك تمتلك خطاً مباشراً مع معجبيك لا يمكن لأي خوارزمية أن تأخذه منك. ابدأ في بناء تلك الجسور اليوم!`
        }
      ]
    },
    cta: {
      title: "جاهز للانطلاق؟",
      subtitle: "انضم إلى آلاف المستخدمين الراضين وابدأ تعزيز حسابك اليوم.",
      button: "تواصل عبر واتساب"
    },
    footer: {
      rights: "© 2026 سناب سكور ستور. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة"
    },
    privacy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: مارس 2026",
      sections: [
        {
          title: "1. المعلومات التي نجمعها",
          content: "نجمع المعلومات التي تقدمها لنا مباشرة عند تقديم طلب، بما في ذلك اسم مستخدم سناب شات الخاص بك، وفي بعض الحالات، بيانات اعتماد الحساب المطلوبة لخدمات زيادة السكور."
        },
        {
          title: "2. كيف نستخدم معلوماتك",
          content: "نستخدم المعلومات التي نجمعها لتوفير خدماتنا وصيانتها وتحسينها، ومعالجة معاملاتك، والتواصل معك."
        },
        {
          title: "3. أمن البيانات",
          content: "نحن ننفذ مجموعة متنوعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك الشخصية. يتم تشفير بيانات اعتمادك واستخدامها فقط طوال مدة الخدمة."
        },
        {
          title: "4. الإفصاح لأطراف ثالثة",
          content: "نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف خارجية."
        }
      ]
    },
    terms: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: مارس 2026",
      sections: [
        {
          title: "1. قبول الشروط",
          content: "من خلال الوصول إلى سناب سكور ستور واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية."
        },
        {
          title: "2. وصف الخدمة",
          content: "يوفر سناب سكور ستور خدمات نمو وسائل التواصل الاجتماعي. نحن لسنا تابعين لشركة سناب شات."
        },
        {
          title: "3. مسؤوليات المستخدم",
          content: "أنت مسؤول عن الحفاظ على سرية معلومات حسابك وعن جميع الأنشطة التي تحدث تحت حسابك."
        },
        {
          title: "4. سياسة الاسترداد",
          content: "نظراً لطبيعة الخدمات الرقمية، فإن جميع المبيعات نهائية. يتم إصدار المبالغ المستردة فقط إذا لم نتمكن من إكمال الخدمة."
        }
      ]
    },
    tools_ui: {
      bitmoji: {
        title: "منشئ صور بيتموجي",
        subtitle: "صف شخصيتك المثالية ودع الذكاء الاصطناعي ينشئها",
        placeholder: "مثال: شاب رائع يرتدي نظارات شمسية، هودي أزرق، وشعر أشقر",
        button: "إنشاء الصورة",
        result: "صورتك المخصصة"
      },
      lens: {
        title: "محاكي عدسات الذكاء الاصطناعي",
        subtitle: "ارفع صورة وطبق عدسات سناب شات الشهيرة",
        upload: "رفع صورة",
        type: "اختر نوع العدسة",
        button: "تطبيق العدسة",
        result: "تم تطبيق العدسة"
      },
      map: {
        title: "مكتشف مواقع خريطة سناب",
        subtitle: "استكشف المواقع الشهيرة على خريطة سناب في أي مكان في العالم",
        placeholder: "أدخل اسم المدينة أو المكان",
        button: "البحث عن المواقع",
        result: "المواقع الشهيرة"
      }
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
  },
  {
    q: { en: "What is the 14-Day Money Back Guarantee?", ar: "ما هو ضمان استرداد الأموال لمدة 14 يوماً؟" },
    a: { en: "We stand by our service. If you're not satisfied with the results, we'll refund your purchase within 14 days.", ar: "نحن نثق في خدماتنا. إذا لم تكن راضياً عن النتائج، سنعيد لك أموالك خلال 14 يوماً." }
  },
  {
    q: { en: "How can I contact support?", ar: "كيف يمكنني التواصل مع الدعم؟" },
    a: { en: "You can reach us 24/7 via WhatsApp, Email, or our social media channels. We're always here to help!", ar: "يمكنك التواصل معنا على مدار الساعة عبر الواتساب، البريد الإلكتروني، أو قنوات التواصل الاجتماعي الخاصة بنا." }
  },
  {
    q: { en: "Are the tools real?", ar: "هل الأدوات حقيقية؟" },
    a: { en: "Yes! Our Bitmoji Creator, AI Lens Simulator, and Snap Map Finder are fully functional and powered by advanced AI models.", ar: "نعم! منشئ بيتموجي، محاكي العدسات، ومكتشف المواقع كلها أدوات وظيفية بالكامل ومدعومة بنماذج الذكاء الاصطناعي المتقدمة." }
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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" className={className}>
    <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7 1-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

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

const ServiceDetail = ({ service, lang, onBack, onOrder, openWhatsApp }: { service: any, lang: string, onBack: () => void, onOrder: (s: any) => void, openWhatsApp: (msg: string) => void }) => {
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
    <section className="pt-40 pb-24 px-6 min-h-screen bg-[#06060f]">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
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

        {/* Tiers Section (if applicable) */}
        {tiers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">
              {lang === 'ar' ? '🎯 اختر الباقة' : '🎯 Choose Package'} <span className="text-snap-yellow">{lang === 'ar' ? '— كل باقة لها رابط خاص' : '— Each Has Its Own Link'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {tiers.map((tier, i) => {
                const tierColors = ['from-blue-900/50 to-blue-600/10 border-blue-500/30','from-purple-900/50 to-purple-600/10 border-purple-500/30','from-orange-900/50 to-orange-600/10 border-orange-500/30','from-green-900/50 to-green-600/10 border-green-500/30','from-pink-900/50 to-pink-600/10 border-pink-500/30','from-cyan-900/50 to-cyan-600/10 border-cyan-500/30'];
                const tc = tierColors[i % tierColors.length];
                const tierHash = `service-${service.id}-tier-${tier.id}`;
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
                            const link = `${window.location.origin}${window.location.pathname}#${tierHash}`;
                            navigator.clipboard.writeText(link).then(() => alert(lang === 'ar' ? 'تم نسخ رابط الباقة!' : 'Tier link copied!'));
                          }}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                          title="Copy link"
                        >
                          <Link className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-3 text-xs text-gray-700 font-mono truncate">#{tierHash}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* No-tier services — direct order */}
        {tiers.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass p-10 rounded-[3rem] border-white/10"
          >
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">{lang === 'ar' ? 'تواصل معنا عبر واتساب للحصول على عرض مخصص.' : 'Contact us via WhatsApp for a custom quote.'}</p>
            <button
              onClick={() => onOrder(service)}
              className="w-full py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] flex items-center justify-center gap-3 text-xl"
            >
              <ShoppingBag className="w-6 h-6" />
              {lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </button>
          </motion.div>
        )}

        {/* Password notice for score boost */}
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
    <section className="pt-40 pb-24 px-6 min-h-screen bg-[#06060f]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${colorStr.split(' text-')[0]} border-2 rounded-[3rem] overflow-hidden shadow-2xl p-8 lg:p-14 relative`}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-snap-yellow"></div>

          {/* Top bar */}
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
            {/* Visual */}
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
              
              {/* Stats grid */}
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

              {/* No password notice */}
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

const BackButton = ({ onClick, lang }: { onClick: () => void, lang: string }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-snap-yellow hover:text-black transition-all font-bold mb-6 group"
  >
    <ChevronLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
    <span>{lang === 'ar' ? 'رجوع' : 'Back'}</span>
  </button>
);

const BlogDetail = ({ post, lang, onBack }: { post: any, lang: string, onBack: () => void }) => {
  const [copied, setCopied] = useState(false);
  const content = lang === 'ar' ? (post.arContent || post.content) : post.content;
  const title = lang === 'ar' ? (post.arTitle || post.title) : post.title;
  const blogIndex = post._index ?? 0;

  // Rich color palettes per blog index
  const palettes = [
    { hero: 'from-indigo-900 via-purple-900 to-indigo-950', accent: '#818cf8', accentDark: '#4f46e5', h2bg: 'from-indigo-900/60 to-purple-800/20', h2border: 'border-indigo-500/50', h2text: 'text-indigo-300', h3border: '#818cf8', blockBg: 'from-indigo-900/40 to-purple-900/20', blockBorder: 'border-indigo-500/40' },
    { hero: 'from-fuchsia-900 via-pink-900 to-fuchsia-950', accent: '#e879f9', accentDark: '#c026d3', h2bg: 'from-fuchsia-900/60 to-pink-800/20', h2border: 'border-fuchsia-500/50', h2text: 'text-fuchsia-300', h3border: '#e879f9', blockBg: 'from-fuchsia-900/40 to-pink-900/20', blockBorder: 'border-fuchsia-500/40' },
    { hero: 'from-orange-900 via-amber-900 to-orange-950', accent: '#fb923c', accentDark: '#ea580c', h2bg: 'from-orange-900/60 to-amber-800/20', h2border: 'border-orange-500/50', h2text: 'text-orange-300', h3border: '#fb923c', blockBg: 'from-orange-900/40 to-amber-900/20', blockBorder: 'border-orange-500/40' },
    { hero: 'from-emerald-900 via-green-900 to-emerald-950', accent: '#4ade80', accentDark: '#16a34a', h2bg: 'from-emerald-900/60 to-green-800/20', h2border: 'border-emerald-500/50', h2text: 'text-emerald-300', h3border: '#4ade80', blockBg: 'from-emerald-900/40 to-green-900/20', blockBorder: 'border-emerald-500/40' },
    { hero: 'from-rose-900 via-pink-900 to-rose-950', accent: '#fb7185', accentDark: '#e11d48', h2bg: 'from-rose-900/60 to-pink-800/20', h2border: 'border-rose-500/50', h2text: 'text-rose-300', h3border: '#fb7185', blockBg: 'from-rose-900/40 to-pink-900/20', blockBorder: 'border-rose-500/40' },
    { hero: 'from-sky-900 via-cyan-900 to-sky-950', accent: '#38bdf8', accentDark: '#0284c7', h2bg: 'from-sky-900/60 to-cyan-800/20', h2border: 'border-sky-500/50', h2text: 'text-sky-300', h3border: '#38bdf8', blockBg: 'from-sky-900/40 to-cyan-900/20', blockBorder: 'border-sky-500/40' },
  ];
  const p = palettes[blogIndex % palettes.length];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="pt-28 pb-24 px-4 lg:px-6 min-h-screen" style={{ background: '#070710' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Hero banner */}
          <div className={`relative h-[260px] lg:h-[420px] rounded-[2.5rem] overflow-hidden mb-0 bg-gradient-to-br ${p.hero}`}>
            <img
              src={`https://picsum.photos/seed/snpblog${blogIndex}hd/1200/600`}
              alt={title}
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            {/* Animated glow overlay */}
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 60%, ${p.accentDark}55 0%, transparent 70%)` }}
            />
            {/* Back button */}
            <button
              onClick={onBack}
              className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-bold hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              {lang === 'ar' ? 'رجوع' : 'Back'}
            </button>
            {/* Date badge */}
            <div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border text-xs font-bold uppercase tracking-widest" style={{ color: p.accent, borderColor: `${p.accent}60` }}>
              📅 {post.date}
            </div>
          </div>

          {/* Title card */}
          <div className="relative -mt-12 mx-4 z-10 mb-0">
            <div className="rounded-[2rem] p-8 lg:p-12" style={{ background: 'rgba(10,10,20,0.95)', border: `2px solid ${p.accent}40`, boxShadow: `0 0 60px ${p.accentDark}30` }}>
              <motion.div
                animate={{ borderColor: [p.accent + '40', p.accent + '90', p.accent + '40'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border"
                style={{ color: p.accent, background: `${p.accentDark}20`, borderColor: p.accent + '50' }}
              >
                ✦ {lang === 'ar' ? 'مقال' : 'Article'} #{blogIndex + 1}
              </motion.div>
              <h1 className="text-3xl lg:text-5xl font-black mb-0 leading-tight tracking-tight text-white">
                {title}
              </h1>
            </div>
          </div>

          {/* Article body */}
          <div className="mt-6 rounded-[2rem] overflow-hidden" style={{ background: 'rgba(10,10,20,0.9)', border: `1px solid ${p.accent}25` }}>
            <div className={`p-8 lg:p-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <div className={`my-10 p-8 rounded-[1.5rem] bg-gradient-to-br ${p.h2bg} border-2 ${p.h2border} relative overflow-hidden`}>
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: p.accentDark }} />
                      <h2 className={`text-2xl lg:text-4xl font-black m-0 uppercase tracking-tight ${p.h2text} relative z-10`} {...props} />
                    </div>
                  ),
                  h3: ({ node, ...props }) => (
                    <div className="my-8 flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: p.h3border }} />
                      <h3 className="text-xl lg:text-3xl font-black m-0 text-white" {...props} />
                    </div>
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-lg lg:text-2xl font-black my-6 text-white/90" style={{ color: p.accent }} {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300 leading-relaxed font-medium mb-6 text-base lg:text-lg" {...props} />
                  ),
                  ul: ({ node, ...props }) => <ul className="space-y-3 my-6 list-none p-0" {...props} />,
                  ol: ({ node, ...props }) => <ol className="space-y-3 my-6 list-decimal list-inside p-0" {...props} />,
                  li: ({ node, ...props }) => (
                    <li className="flex items-start gap-3 text-gray-300 font-medium p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all">
                      <div className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 shadow-[0_0_10px_currentColor]" style={{ background: p.accent, color: p.accent }} />
                      <span className="flex-1">{props.children}</span>
                    </li>
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-black px-1.5 py-0.5 rounded" style={{ color: p.accent, background: `${p.accentDark}25` }} {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <div className={`my-8 p-7 rounded-[1.5rem] bg-gradient-to-br ${p.blockBg} border-l-4 ${p.blockBorder} relative`} style={{ borderLeftColor: p.accent }}>
                      <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: p.accent }}>💡 {lang === 'ar' ? 'نقطة مهمة' : 'Key Point'}</div>
                      <blockquote className="italic text-white/80 m-0 text-lg font-medium leading-relaxed" {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="px-2 py-0.5 rounded text-sm font-mono" style={{ background: `${p.accentDark}30`, color: p.accent }} {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Share footer */}
          <div className="mt-6 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: 'rgba(10,10,20,0.9)', border: `1px solid ${p.accent}25` }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${p.accentDark}30`, color: p.accent }}>
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <div className="font-black text-white text-base">{lang === 'ar' ? 'شارك المقال' : 'Share Article'}</div>
                <div className="text-xs text-gray-500">{lang === 'ar' ? 'رابط خاص بهذا المقال' : `Direct link: #blog-${blogIndex}`}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={copyLink}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all"
                style={{ background: copied ? '#16a34a30' : `${p.accentDark}25`, color: copied ? '#4ade80' : p.accent, border: `1px solid ${copied ? '#4ade8060' : p.accent + '50'}` }}>
                {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                {copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
              </button>
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(title + '\n\n' + window.location.href)}`, '_blank')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-black text-sm hover:bg-[#25D366]/25 transition-all">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + '\n\n' + window.location.href)}`, '_blank')}
                className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 transition-all">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'shop' | 'checkout' | 'blog' | 'blog_detail' | 'service_detail' | 'product_detail' | 'boosting' | 'calc' | 'checker' | 'tracker' | 'bitmoji' | 'lens' | 'map' | 'privacy' | 'terms' | 'category_detail' | 'snapify' | 'recent_work' | 'loyalty'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role:'user'|'bot', text:string}[]>([
    {role:'bot', text:'👋 Hey! I\'m SnapBot. How can I help you today? Ask me about pricing, services, or account safety!'}
  ]);
  const [chatInput, setChatInput] = useState('');
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
  const [isDark, setIsDark] = useState(true);

  const handleToolClick = (toolId: string, isPro?: boolean) => {
    setView(toolId as any);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setToolResult(null);
  };

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
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setView('home');
        return;
      }

      // Handle service detail — e.g. #service-s_boost
      if (hash.startsWith('service-')) {
        const rest = hash.slice('service-'.length); // e.g. "s_boost" or "s_boost-tier-b10k"
        const parts = rest.split('-tier-');
        const serviceId = parts[0];
        const tierId = parts[1] || null;
        const service = servicesList.find(s => s.id === serviceId);
        if (service) {
          setSelectedService({ ...service, _tierId: tierId });
          setView('service_detail');
          window.scrollTo(0, 0);
          return;
        }
      }

      // Handle product detail — e.g. #product-sa10k
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

      // Handle catalog category — e.g. #catalog-snapscore
      if (hash.startsWith('catalog-')) {
        const catId = hash.slice('catalog-'.length);
        setSelectedCategory(catId);
        setView('category_detail');
        window.scrollTo(0, 0);
        return;
      }

      // Handle blog detail — e.g. #blog-0
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

      // Handle tool direct links — e.g. #tool-calc
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

      // Handle basic views
      const validViews = ['home', 'shop', 'checkout', 'blog', 'boosting', 'calc', 'checker', 'tracker', 'bitmoji', 'lens', 'map', 'privacy', 'terms', 'snapify', 'recent_work', 'loyalty'];
      if (validViews.includes(hash)) {
        setView(hash as any);
        window.scrollTo(0, 0);
        return;
      }

      // Handle home page anchors
      const homeAnchors = ['services', 'catalog', 'how', 'faq', 'contact'];
      if (homeAnchors.includes(hash)) {
        setView('home');
        return;
      }

      // Handle shop tabs
      if (hash.startsWith('shop-')) {
        const tab = hash.split('-')[1];
        if (['score', 'followers', 'services'].includes(tab)) {
          setView('shop');
          setShopTab(tab as any);
          window.scrollTo(0, 0);
        }
      }

      // Handle direct product checkout
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
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (view === 'home' && currentHash !== '') {
      // Don't force home hash if we are just on the home page
    } else if (view === 'shop') {
      window.location.hash = `shop-${shopTab}`;
    } else if (view === 'checkout' && selectedPackage) {
      window.location.hash = `buy-${selectedPackage.id}`;
    } else if (view !== 'home' && currentHash !== view) {
      // Sync view to hash if it's not home
      // We don't want to overwrite specific hashes like buy- or shop- if we are already in that view
      const isSpecialHash = currentHash.startsWith('buy-') || currentHash.startsWith('shop-');
      if (!isSpecialHash) {
        window.location.hash = view;
      }
    }
  }, [view, shopTab, selectedPackage]);

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

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`min-h-screen selection:bg-snap-yellow selection:text-black overflow-x-hidden relative transition-all duration-700 ${isDark ? 'bg-[#06060f] text-white' : 'bg-white text-gray-900'}`}>

      {/* ═══════════════════════════════════════════════
          DARK MODE — Snapchat-Vibe Animated Background
          LIGHT MODE — Clean white, no animations
      ════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {isDark ? (
          /* ---- DARK MODE BACKGROUND ---- */
          <>
            {/* Deep space base */}
            <div className="absolute inset-0" style={{background:'linear-gradient(135deg,#06060f 0%,#0c0a1e 40%,#06060f 100%)'}}/>

            {/* Primary yellow glow — top left */}
            <motion.div
              animate={{ scale:[1,1.4,1.1,1], opacity:[0.18,0.35,0.22,0.18], x:[0,60,-20,0], y:[0,-40,20,0] }}
              transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
              style={{background:'radial-gradient(circle,rgba(255,220,0,0.5) 0%,rgba(255,140,0,0.2) 40%,transparent 70%)'}}
            />

            {/* Secondary orange glow — bottom right */}
            <motion.div
              animate={{ scale:[1,1.3,1], opacity:[0.12,0.25,0.12], x:[0,-40,0], y:[0,50,0] }}
              transition={{ duration:12, repeat:Infinity, ease:'easeInOut', delay:3 }}
              className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full"
              style={{background:'radial-gradient(circle,rgba(255,160,0,0.35) 0%,rgba(255,100,0,0.15) 40%,transparent 70%)'}}
            />

            {/* Center purple accent */}
            <motion.div
              animate={{ scale:[1,1.6,1], opacity:[0.05,0.12,0.05] }}
              transition={{ duration:15, repeat:Infinity, ease:'easeInOut', delay:6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{background:'radial-gradient(circle,rgba(168,85,247,0.2) 0%,transparent 70%)'}}
            />

            {/* Snap ghost watermarks */}
            {[
              { left:'8%',  top:'12%', size:120, delay:0   },
              { left:'78%', top:'8%',  size:90,  delay:2   },
              { left:'55%', top:'55%', size:140, delay:4   },
              { left:'18%', top:'68%', size:80,  delay:1.5 },
              { left:'88%', top:'60%', size:100, delay:3.5 },
            ].map((g,i) => (
              <motion.div key={i}
                animate={{ y:[0,-60,0], opacity:[0.04,0.09,0.04], rotate:[0,10,-10,0] }}
                transition={{ duration:9+i*2, repeat:Infinity, ease:'easeInOut', delay:g.delay }}
                className="absolute select-none"
                style={{ left:g.left, top:g.top, fontSize:g.size, filter:'blur(0.5px)' }}
              >👻</motion.div>
            ))}

            {/* Floating score particles */}
            {[
              { val:'1M+', left:'6%',  bot:'15%', sz:48, delay:0   },
              { val:'500K',left:'22%', bot:'8%',  sz:32, delay:2   },
              { val:'10M', left:'65%', bot:'12%', sz:42, delay:4   },
              { val:'100K',left:'82%', bot:'25%', sz:28, delay:1   },
              { val:'2M+', left:'40%', bot:'5%',  sz:36, delay:3   },
            ].map((p,i) => (
              <motion.div key={p.val}
                animate={{ y:[0,-100,0], opacity:[0,0.08,0] }}
                transition={{ duration:7+i*1.8, repeat:Infinity, ease:'easeInOut', delay:p.delay }}
                className="absolute font-black select-none pointer-events-none"
                style={{ left:p.left, bottom:p.bot, fontSize:p.sz, color:'rgba(255,220,0,0.12)' }}
              >{p.val}</motion.div>
            ))}

            {/* Animated diagonal scan line */}
            <motion.div
              animate={{ x:['-100%','200%'] }}
              transition={{ duration:6, repeat:Infinity, ease:'linear', delay:2 }}
              className="absolute top-0 h-full w-[2px] opacity-[0.04]"
              style={{ background:'linear-gradient(to bottom,transparent,rgba(255,220,0,0.8),transparent)' }}
            />

            {/* Yellow grid */}
            <div className="absolute inset-0 opacity-[0.022]" style={{
              backgroundImage:'linear-gradient(rgba(255,220,0,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,220,0,0.6) 1px,transparent 1px)',
              backgroundSize:'80px 80px'
            }}/>

            {/* Vignette */}
            <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.6) 100%)'}}/>
          </>
        ) : (
          /* ---- LIGHT MODE BACKGROUND — Zero animations ---- */
          <>
            <div className="absolute inset-0 bg-white"/>
            {/* Very subtle yellow tint top */}
            <div className="absolute inset-x-0 top-0 h-64 pointer-events-none" style={{background:'linear-gradient(to bottom,rgba(255,220,0,0.04),transparent)'}}/>
            {/* Minimal dot grid */}
            <div className="absolute inset-0 opacity-[0.035]" style={{
              backgroundImage:'radial-gradient(circle,#ca8a04 1px,transparent 1px)',
              backgroundSize:'28px 28px'
            }}/>
          </>
        )}

        {/* Always-present edge fade */}
        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b pointer-events-none ${isDark?'from-[#06060f]':'from-white'} to-transparent`}/>
        <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t pointer-events-none ${isDark?'from-[#06060f]':'from-white'} to-transparent`}/>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-all duration-500 ${isDark ? "bg-black/75 border-b border-white/[0.06] shadow-[0_2px_40px_rgba(0,0,0,0.8)]" : "bg-white/95 border-b border-gray-200 shadow-sm"}`}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* Header Glow */}
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
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500 dark:text-gray-400">
            <button onClick={() => setView('home')} className={`hover:text-snap-yellow transition-colors ${view === 'home' ? 'text-snap-yellow' : ''}`}>{t.nav.home}</button>
            
            {/* Catalog Dropdown */}
            <div className="relative group">
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.catalog}
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-black/90 backdrop-blur-2xl border border-snap-yellow/20 rounded-3xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-br from-snap-yellow/10 to-orange-500/5 rounded-3xl pointer-events-none"></div>
                {[
                  { id: 'snapscore', label: lang === 'ar' ? 'حسابات سكور' : 'Score Accounts', color: 'hover:bg-blue-500' },
                  { id: 'follower', label: lang === 'ar' ? 'حسابات متابعين' : 'Follower Accounts', color: 'hover:bg-purple-500' },
                  { id: 'aged', label: lang === 'ar' ? 'حسابات قديمة' : 'Aged Accounts', color: 'hover:bg-orange-500' },
                  { id: 'verified', label: lang === 'ar' ? 'حسابات موثقة' : 'Verified Accounts', color: 'hover:bg-green-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setView('category_detail');
                      window.location.hash = `catalog-${item.id}`;
                      window.scrollTo(0, 0);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl ${item.color} hover:text-white transition-all text-xs font-black uppercase tracking-wider relative z-10`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.services}
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
              <div className="absolute top-full left-0 w-72 bg-black/90 backdrop-blur-2xl border border-blue-500/20 rounded-3xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-3xl pointer-events-none"></div>
                {[
                  { id: 's_boost', label: lang === 'ar' ? 'زيادة السكور' : 'Score Boosting', color: 'hover:bg-yellow-500 hover:text-black', icon: '⚡' },
                  { id: 's_followers', label: lang === 'ar' ? 'زيادة المتابعين' : 'Follower Increase', color: 'hover:bg-purple-500', icon: '👥' },
                  { id: 's_views', label: lang === 'ar' ? 'مشاهدات الستوري' : 'Stories & Spotlight View', color: 'hover:bg-blue-500', icon: '👁' },
                  { id: 's_lens', label: lang === 'ar' ? 'إنشاء عدسات' : 'Create Lens', color: 'hover:bg-cyan-500', icon: '🎭' },
                  { id: 's_badge', label: lang === 'ar' ? 'توثيق الحساب' : 'Verified Badge', color: 'hover:bg-green-500', icon: '✅' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const svc = servicesList.find(s => s.id === item.id);
                      if (svc) {
                        setSelectedService(svc);
                        setView('service_detail');
                        window.location.hash = `service-${item.id}`;
                        window.scrollTo(0, 0);
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl ${item.color} transition-all text-xs font-black uppercase tracking-wider relative z-10 flex items-center gap-2`}
                  >
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="hover:text-snap-yellow transition-colors flex items-center gap-1 py-4">
                {t.nav.tools}
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
              <div className="absolute top-full left-0 w-72 bg-black/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-3xl pointer-events-none"></div>
                {[
                  { id: 'calc', label: lang === 'ar' ? 'حاسبة السكور' : 'Score Calculator', color: 'hover:bg-blue-500', icon: '🧮' },
                  { id: 'checker', label: lang === 'ar' ? 'فاحص عمر الحساب' : 'Account Checker', color: 'hover:bg-purple-500', icon: '🔍' },
                  { id: 'tracker', label: lang === 'ar' ? 'مخطط أهداف السكور' : 'Score Tracker', color: 'hover:bg-orange-500', icon: '📊' },
                  { id: 'bitmoji', label: lang === 'ar' ? 'منشئ بيتموجي' : 'Bitmoji Creator', color: 'hover:bg-green-500', icon: '🎨' },
                  { id: 'lens', label: lang === 'ar' ? 'محاكي العدسات' : 'AI Lens Simulator', color: 'hover:bg-pink-500', icon: '🎭' },
                  { id: 'map', label: lang === 'ar' ? 'مكتشف المواقع' : 'Snap Map Finder', color: 'hover:bg-cyan-500', icon: '🗺️' },
                  { id: 'snapify', label: 'Snapify Pro ⭐', color: 'hover:bg-snap-yellow hover:text-black', icon: '🚀' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id as any);
                      setToolResult(null);
                      window.location.hash = `tool-${item.id}`;
                      window.scrollTo(0, 0);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl ${item.color} transition-all text-xs font-black uppercase tracking-wider relative z-10 flex items-center gap-2`}
                  >
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => { setView('recent_work'); window.location.hash='recent_work'; window.scrollTo(0,0); }} className={`hover:text-snap-yellow transition-colors ${view === 'recent_work' ? 'text-snap-yellow' : ''}`}>{lang==='ar'?'أعمالنا':'Work'}</button>
            <button onClick={() => { setView('loyalty'); window.location.hash='loyalty'; window.scrollTo(0,0); }} className={`hover:text-snap-yellow transition-colors ${view === 'loyalty' ? 'text-snap-yellow' : ''} relative`}>
              {lang==='ar'?'الولاء':'Loyalty'}
              <span className="absolute -top-2 -right-3 text-[8px] bg-snap-yellow text-black px-1 rounded font-black">NEW</span>
            </button>
            <button onClick={() => { setView('blog'); window.location.hash = 'blog'; window.scrollTo(0,0); }} className={`hover:text-snap-yellow transition-colors ${view === 'blog' ? 'text-snap-yellow' : ''}`}>{t.nav.blog}</button>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative w-14 h-7 rounded-full transition-all duration-500 border flex-shrink-0 ${isDark ? 'bg-snap-yellow/20 border-snap-yellow/40' : 'bg-yellow-100 border-yellow-300'}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.div
                animate={{ x: isDark ? 2 : 30 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg ${isDark ? 'bg-gray-800' : 'bg-snap-yellow'}`}
              >
                {isDark ? '🌙' : '☀️'}
              </motion.div>
            </button>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-snap-yellow/50' : 'bg-white border-gray-200 text-gray-600 hover:border-snap-yellow/50 hover:bg-yellow-50'}`}
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
              className="md:hidden p-2 hover:text-snap-yellow transition-colors"
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
              className="md:hidden bg-black border-t border-white/10 overflow-hidden"
            >
              <div className={`flex flex-col p-6 gap-6 text-lg font-bold text-gray-400 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="hover:text-snap-yellow transition-colors">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button>
                
                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.catalog}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {[
                      { id: 'snapscore', label: lang === 'ar' ? 'حسابات سكور' : 'Score Accounts' },
                      { id: 'follower', label: lang === 'ar' ? 'حسابات متابعين' : 'Follower Accounts' },
                      { id: 'aged', label: lang === 'ar' ? 'حسابات قديمة' : 'Aged Accounts' },
                      { id: 'verified', label: lang === 'ar' ? 'حسابات موثقة' : 'Verified Accounts' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedCategory(item.id);
                          setView('category_detail');
                          window.location.hash = `catalog-${item.id}`;
                          window.scrollTo(0, 0);
                          setIsMenuOpen(false);
                        }}
                        className="hover:text-snap-yellow transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.services}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {[
                      { id: 's_boost', label: lang === 'ar' ? '⚡ زيادة السكور' : '⚡ Score Boosting' },
                      { id: 's_followers', label: lang === 'ar' ? '👥 زيادة المتابعين' : '👥 Follower Increase' },
                      { id: 's_views', label: lang === 'ar' ? '👁 مشاهدات الستوري' : '👁 Stories & Spotlight' },
                      { id: 's_lens', label: lang === 'ar' ? '🎭 إنشاء عدسات' : '🎭 Create Lens' },
                      { id: 's_badge', label: lang === 'ar' ? '✅ توثيق الحساب' : '✅ Verified Badge' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          const svc = servicesList.find(s => s.id === item.id);
                          if (svc) {
                            setSelectedService(svc);
                            setView('service_detail');
                            window.location.hash = `service-${item.id}`;
                            window.scrollTo(0, 0);
                          }
                          setIsMenuOpen(false);
                        }}
                        className="hover:text-snap-yellow transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`text-xs font-black text-snap-yellow uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.nav.tools}</div>
                  <div className={`flex flex-col gap-3 ${lang === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10`}>
                    {[
                      { id: 'calc', label: '🧮 Score Calculator' },
                      { id: 'checker', label: '🔍 Account Checker' },
                      { id: 'tracker', label: '📊 Score Tracker' },
                      { id: 'bitmoji', label: '🎨 Bitmoji Creator' },
                      { id: 'lens', label: '🎭 AI Lens Simulator' },
                      { id: 'map', label: '🗺️ Snap Map Finder' },
                      { id: 'snapify', label: '🚀 Snapify Pro ⭐' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setView(item.id as any);
                          setToolResult(null);
                          window.location.hash = `tool-${item.id}`;
                          window.scrollTo(0, 0);
                          setIsMenuOpen(false);
                        }}
                        className="hover:text-snap-yellow transition-colors text-left"
                      >
                        {item.label}
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
            {/* Hero Section */}
        <section className={`relative pt-40 pb-24 px-6 overflow-hidden section-divider ${isDark?"bg-[#06060f]":"bg-white"}`}>
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
                {lang === 'ar' ? 'الخدمة رقم 1 عالمياً' : '#1 Trusted Service Worldwide'}
              </div>
              <h1 className={`text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter ${isDark?"text-white":"text-gray-900"}`}>
                <span className="bg-gradient-to-r from-current via-snap-yellow to-current bg-clip-text text-transparent animate-gradient-x">
                  {t.hero.title}
                </span> <br />
                <span className="text-snap-yellow drop-shadow-[0_0_30px_rgba(255,252,0,0.5)] inline-block hover:scale-105 transition-transform duration-500">
                  {t.hero.titleHighlight}
                </span> <br />
                <span className="text-3xl lg:text-5xl block mt-4 text-white/90 font-bold italic">{t.hero.subtitle}</span>
              </h1>
              <p className={`text-xl mb-10 max-w-lg leading-relaxed font-medium ${isDark?"text-gray-400":"text-gray-600"}`}>
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



        {/* Stats Section */}
        <section className={`py-20 px-6 relative overflow-hidden section-divider ${isDark?"bg-[#0a0a18] border-y border-white/5":"bg-snap-yellow/5 border-y border-yellow-200"}`}>
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
                    <div className={`text-5xl lg:text-7xl font-black mb-2 tracking-tighter bg-gradient-to-br ${colors[i % colors.length]} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
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

        {/* Why Choose Us Grid */}
        <section id="services" className={`py-32 px-6 relative section-divider ${isDark?"bg-[#0a0a18]":"bg-white"}`}>
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
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] ${
                    i === 0 ? 'bg-blue-500/10 text-blue-400' : 
                    i === 1 ? 'bg-purple-500/10 text-purple-400' : 
                    'bg-orange-500/10 text-orange-400'
                  }`}>
                    {i === 0 ? <Lock className="w-10 h-10" /> : i === 1 ? <ShieldCheck className="w-10 h-10" /> : <InfinityIcon className="w-10 h-10" />}
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog Section (Categories) */}
        <section id="catalog" className={`py-32 px-6 relative overflow-hidden section-divider ${isDark?"bg-[#06060f]":"bg-white"}`}>
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
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${
                      cat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 
                      cat.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 
                      cat.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                    </div>
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

        {/* How It Works */}
        <section id="how" className={`py-32 px-6 relative section-divider ${isDark?"bg-[#080814]":"bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.how.title}</h2>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {t.how.steps.map((step, i) => (
                <div key={i} className="relative text-center group">
                  <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-[0_0_30px_rgba(255,252,0,0.1)] group-hover:scale-110 transition-transform duration-500 relative ${
                    i === 0 ? 'bg-blue-600/20 text-blue-400 border-2 border-blue-500/50' : 
                    i === 1 ? 'bg-purple-600/20 text-purple-400 border-2 border-purple-500/50' : 
                    'bg-orange-600/20 text-orange-400 border-2 border-orange-500/50'
                  }`}>
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
        <section className={`py-32 px-6 relative section-divider ${isDark?"bg-[#06060f]":"bg-gray-50"}`}>
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
                      <div className={`flex-shrink-0 p-4 rounded-2xl h-fit transition-colors ${
                        i === 0 ? 'bg-blue-500/10 text-blue-400 group-hover/service:bg-blue-500 group-hover/service:text-white' : 
                        i === 1 ? 'bg-purple-500/10 text-purple-400 group-hover/service:bg-purple-500 group-hover/service:text-white' : 
                        'bg-orange-500/10 text-orange-400 group-hover/service:bg-orange-500 group-hover/service:text-white'
                      }`}>{service.icon}</div>
                      <div>
                        <h4 className="text-2xl font-black mb-3 group-hover/service:text-white transition-colors">{service.title}</h4>
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

        {/* Tools Section */}
        <section id="tools" className={`py-32 px-6 relative section-divider ${isDark?"bg-[#0a0a18]":"bg-gray-50"}`}>
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
                    className={`p-8 rounded-[3rem] border-2 transition-all group cursor-pointer relative overflow-hidden ${tc.bg} ${tc.border}`}
                  >
                    {tool.isPro ? (
                      <div className="absolute top-5 right-5 px-3 py-1 bg-snap-yellow text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(255,252,0,0.5)] z-20">PRO</div>
                    ) : (
                      <div className="absolute top-5 right-5 px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30 uppercase tracking-widest z-20">FREE</div>
                    )}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all ${tc.glow}`}></div>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${tc.icon}`}>
                      {tool.id === 'calc' ? <Calculator className="w-8 h-8" /> : 
                       tool.id === 'checker' ? <ShieldCheck className="w-8 h-8" /> : 
                       tool.id === 'tracker' ? <TrendingUp className="w-8 h-8" /> : 
                       tool.id === 'bitmoji' ? <User className="w-8 h-8" /> : 
                       tool.id === 'lens' ? <Zap className="w-8 h-8" /> : 
                       tool.id === 'map' ? <MapPin className="w-8 h-8" /> :
                       <InfinityIcon className="w-8 h-8" />}
                    </div>
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
        <section id="faq" className={`py-32 px-6 relative section-divider ${isDark?"bg-[#0a0a18]":"bg-gray-50"}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">{t.faq.title}</h2>
              <div className="w-32 h-1.5 bg-snap-yellow mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((item, i) => (
                <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${
                  i % 3 === 0 ? 'border-blue-500/20 bg-blue-500/5' : 
                  i % 3 === 1 ? 'border-purple-500/20 bg-purple-500/5' : 
                  'border-orange-500/20 bg-orange-500/5'
                }`}>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ BLOG SECTION ═══════════════ */}
        <section id="blog" className={`py-28 px-6 relative overflow-hidden ${isDark ? 'bg-[#0a0a18]' : 'bg-white'}`}>
          {/* Section top border glow */}
          <div className={`absolute inset-x-0 top-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-snap-yellow/40 to-transparent' : 'bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent'}`}/>
          <div className={`absolute inset-x-0 bottom-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-snap-yellow/20 to-transparent' : 'bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent'}`}/>

          {/* Dark mode ambient glow */}
          {isDark && (
            <motion.div animate={{opacity:[0.04,0.1,0.04]}} transition={{duration:5,repeat:Infinity}}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none"
              style={{background:'radial-gradient(ellipse,rgba(255,220,0,0.15) 0%,transparent 70%)'}}
            />
          )}

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-5 border ${isDark ? 'bg-snap-yellow/8 border-snap-yellow/25 text-snap-yellow' : 'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                ✦ {lang === 'ar' ? 'نصائح وأخبار' : 'Tips & News'}
              </span>
              <h2 className={`text-4xl lg:text-6xl font-black uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t.blog.title}
              </h2>
              <p className={`text-lg font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.blog.subtitle}</p>
              <div className="mt-6 w-20 h-1 bg-snap-yellow mx-auto rounded-full"/>
            </motion.div>

            {/* Blog Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {t.blog.posts.map((post: any, i: number) => {
                // Rich unique palette per blog
                const palettes = [
                  { dark:'#0d0820', light:'#f5f0ff', accent:'#a78bfa', border_d:'rgba(167,139,250,0.35)', border_l:'#ddd6fe', tag_d:'#7c3aed', tag_l:'#7c3aed', glow:'rgba(139,92,246,0.4)' },
                  { dark:'#150a1a', light:'#fdf4ff', accent:'#e879f9', border_d:'rgba(232,121,249,0.35)', border_l:'#f5d0fe', tag_d:'#a21caf', tag_l:'#a21caf', glow:'rgba(192,38,211,0.4)' },
                  { dark:'#180900', light:'#fff7ed', accent:'#fb923c', border_d:'rgba(251,146,60,0.35)', border_l:'#fed7aa', tag_d:'#c2410c', tag_l:'#c2410c', glow:'rgba(234,88,12,0.4)' },
                  { dark:'#001a0d', light:'#f0fdf4', accent:'#34d399', border_d:'rgba(52,211,153,0.35)', border_l:'#a7f3d0', tag_d:'#059669', tag_l:'#059669', glow:'rgba(16,185,129,0.4)' },
                  { dark:'#150010', light:'#fff1f2', accent:'#fb7185', border_d:'rgba(251,113,133,0.35)', border_l:'#fecdd3', tag_d:'#be123c', tag_l:'#be123c', glow:'rgba(225,29,72,0.4)' },
                  { dark:'#001520', light:'#f0f9ff', accent:'#38bdf8', border_d:'rgba(56,189,248,0.35)', border_l:'#bae6fd', tag_d:'#0369a1', tag_l:'#0369a1', glow:'rgba(3,105,161,0.4)' },
                  { dark:'#1a1400', light:'#fefce8', accent:'#facc15', border_d:'rgba(250,204,21,0.35)', border_l:'#fef08a', tag_d:'#a16207', tag_l:'#a16207', glow:'rgba(202,138,4,0.4)' },
                  { dark:'#001020', light:'#eff6ff', accent:'#60a5fa', border_d:'rgba(96,165,250,0.35)', border_l:'#bfdbfe', tag_d:'#1d4ed8', tag_l:'#1d4ed8', glow:'rgba(29,78,216,0.4)' },
                ];
                const p = palettes[i % palettes.length];
                const bgCard = isDark ? p.dark : p.light;
                const borderCard = isDark ? p.border_d : p.border_l;
                const tagColor = isDark ? p.tag_d : p.tag_l;
                const blogHash = `blog-${i}`;
                const blogLink = `${window.location.origin}${window.location.pathname}#${blogHash}`;

                const openBlog = () => {
                  setSelectedBlogPost({ ...post, _index: i });
                  setView('blog_detail');
                  window.location.hash = blogHash;
                  window.scrollTo(0, 0);
                };

                return (
                  <motion.article
                    key={i}
                    initial={{opacity:0, y:32, scale:0.96}}
                    whileInView={{opacity:1, y:0, scale:1}}
                    viewport={{once:true}}
                    whileHover={{y:-8, scale:1.02}}
                    transition={{delay:i*0.08, type:'spring', stiffness:200, damping:22}}
                    className="rounded-3xl overflow-hidden flex flex-col group cursor-pointer relative"
                    style={{
                      background: bgCard,
                      border: `1.5px solid ${borderCard}`,
                      boxShadow: isDark
                        ? `0 4px 32px ${p.glow.replace('0.4','0.12')}, 0 1px 0 ${borderCard} inset`
                        : `0 4px 24px rgba(0,0,0,0.06), 0 1px 0 ${borderCard} inset`,
                    }}
                    onClick={openBlog}
                  >
                    {/* Glow pulse — dark only */}
                    {isDark && (
                      <motion.div
                        animate={{opacity:[0.25,0.55,0.25], scale:[1,1.2,1]}}
                        transition={{duration:3+i*0.5, repeat:Infinity, ease:'easeInOut'}}
                        className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                        style={{background:p.glow}}
                      />
                    )}

                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative flex-shrink-0">
                      <motion.img
                        whileHover={{scale:1.08}}
                        transition={{duration:0.5}}
                        src={`https://picsum.photos/seed/snap${i}blog/600/400`}
                        alt={post.title}
                        className={`w-full h-full object-cover ${isDark ? 'brightness-[0.55]' : 'brightness-90'}`}
                      />
                      <div className="absolute inset-0" style={{background:`linear-gradient(to top, ${bgCard}ee 0%, transparent 60%)`}}/>
                      {/* Number badge */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg z-10"
                        style={{background: tagColor}}>
                        {i+1}
                      </div>
                      {/* Share btn */}
                      <button
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border border-white/20"
                        onClick={e=>{
                          e.stopPropagation();
                          if(navigator.share) navigator.share({title:post.title, url:blogLink});
                          else navigator.clipboard.writeText(blogLink).then(()=>alert(lang==='ar'?'✅ تم نسخ الرابط!':'✅ Link copied!'));
                        }}
                      >
                        <Share2 className="w-3.5 h-3.5 text-white"/>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{background:`${tagColor}20`, color:tagColor}}>
                          {post.date}
                        </span>
                      </div>
                      <h3 className={`text-sm font-black leading-snug mb-2 line-clamp-2 flex-1 transition-colors duration-200 ${isDark ? 'text-white group-hover:text-white' : 'text-gray-900'}`}
                        style={{}} onMouseEnter={e=>e.currentTarget.style.color=p.accent} onMouseLeave={e=>e.currentTarget.style.color=isDark?'white':'#111'}>
                        {post.title}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {(lang === 'ar' ? post.arExcerpt : post.excerpt) || post.excerpt || ''}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{borderColor: borderCard}}>
                        <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1" style={{color:p.accent}}>
                          {t.blog.readMore} <ChevronRight className="w-3 h-3"/>
                        </span>
                        <code className="text-[10px] font-mono opacity-40" style={{color:p.accent}}>#{blogHash}</code>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* View All button */}
            <div className="text-center">
              <motion.button
                whileHover={{scale:1.04, y:-2}}
                whileTap={{scale:0.97}}
                onClick={()=>{setView('blog'); window.location.hash='blog'; window.scrollTo(0,0);}}
                className="inline-flex items-center gap-3 px-8 py-4 bg-snap-yellow text-black font-black rounded-2xl text-sm uppercase tracking-wider shadow-[0_8px_32px_rgba(255,220,0,0.3)]"
              >
                {lang==='ar'?'عرض جميع المقالات':'View All Articles'} <ChevronRight className="w-4 h-4"/>
              </motion.button>
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
                  className={`p-10 rounded-[3rem] text-center border relative overflow-hidden ${
                    currentTestimonial % 3 === 0 ? 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/30' : 
                    currentTestimonial % 3 === 1 ? 'bg-gradient-to-br from-purple-600/20 to-pink-500/20 border-purple-500/30' : 
                    'bg-gradient-to-br from-orange-600/20 to-yellow-400/20 border-orange-500/30'
                  }`}
                >
                  <div className="absolute inset-0 backdrop-blur-xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <img 
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

        {/* ══════════ RECENT WORK PREVIEW ══════════ */}
        <section className={`py-24 px-6 relative overflow-hidden ${isDark ? 'bg-[#0a0a18]' : 'bg-gray-50'}`}>
          <div className={`absolute inset-x-0 top-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-snap-yellow/30 to-transparent' : 'bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent'}`}/>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border ${isDark?'bg-snap-yellow/8 border-snap-yellow/25 text-snap-yellow':'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                📸 {lang==='ar'?'أعمالنا':'Recent Work'}
              </span>
              <h2 className={`text-3xl lg:text-5xl font-black uppercase tracking-tight mb-3 ${isDark?'text-white':'text-gray-900'}`}>
                {lang==='ar'?'نتائج حقيقية':'Real Results'} <span className="text-snap-yellow">{lang==='ar'?'من عملاء حقيقيين':'From Real Clients'}</span>
              </h2>
              <p className={`mb-8 ${isDark?'text-gray-500':'text-gray-500'}`}>{lang==='ar'?'شاهد ما حققناه لعملائنا':'See what we\'ve achieved for our clients'}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {[
                {name:'Ahmed Al-Harbi',loc:'Riyadh 🇸🇦',after:'1,000,000+',service:'Score Boost',color:'#facc15',stars:5,msg:'Got 1M score in 6 days. 100% legit!'},
                {name:'Sara Mohammed',loc:'Dubai 🇦🇪',after:'52,400',service:'Follower Account',color:'#a78bfa',stars:5,msg:'Account delivered same day. Very professional!'},
                {name:'Sultan Al-Kuwari',loc:'Qatar 🇶🇦',after:'518,000',service:'Score Boost 500K',color:'#34d399',stars:5,msg:'Best service in the Gulf. Fast and credible!'},
              ].map((c,i)=>(
                <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  whileHover={{y:-5}}
                  className={`p-6 rounded-2xl border ${isDark?'border-white/8':'border-gray-200 shadow-sm'}`}
                  style={{background:isDark?'rgba(255,220,0,0.03)':isDark?'#0a0a0a':'white'}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-black" style={{background:c.color}}>{c.name[0]}</div>
                    <div>
                      <div className={`font-black text-sm ${isDark?'text-white':'text-gray-900'}`}>{c.name}</div>
                      <div className={`text-xs ${isDark?'text-gray-500':'text-gray-400'}`}>{c.loc}</div>
                    </div>
                    <div className="ml-auto flex">{[...Array(c.stars)].map((_,si)=><Star key={si} className="w-3 h-3 fill-snap-yellow text-snap-yellow"/>)}</div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-2 py-1 rounded-full" style={{background:`${c.color}20`,color:c.color}}>{c.service}</span>
                    <span className="font-black" style={{color:c.color}}>{c.after}</span>
                  </div>
                  <p className={`text-sm italic ${isDark?'text-gray-400':'text-gray-600'}`}>"{c.msg}"</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.button whileHover={{scale:1.04}} onClick={()=>{setView('recent_work');window.location.hash='recent_work';window.scrollTo(0,0);}}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm border transition-all ${isDark?'border-white/10 bg-white/5 text-white hover:bg-snap-yellow hover:text-black hover:border-snap-yellow':'border-gray-200 bg-white text-gray-700 hover:bg-snap-yellow hover:text-black hover:border-snap-yellow'}`}>
                {lang==='ar'?'عرض جميع النتائج':'View All Results'} <ChevronRight className="w-4 h-4"/>
              </motion.button>
            </div>
          </div>
        </section>

        {/* ══════════ LOYALTY & AFFILIATE PREVIEW ══════════ */}
        <section className={`py-24 px-6 relative overflow-hidden ${isDark ? 'bg-[#06060f]' : 'bg-white'}`}>
          <div className={`absolute inset-x-0 top-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-snap-yellow/30 to-transparent' : 'bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent'}`}/>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border ${isDark?'bg-snap-yellow/8 border-snap-yellow/25 text-snap-yellow':'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                  🎁 {lang==='ar'?'برنامج الولاء':'Loyalty & Affiliate'}
                </span>
                <h2 className={`text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4 ${isDark?'text-white':'text-gray-900'}`}>
                  {lang==='ar'?'اكسب من كل إحالة':'Earn From Every Referral'}
                </h2>
                <p className={`text-lg mb-8 leading-relaxed ${isDark?'text-gray-400':'text-gray-600'}`}>
                  {lang==='ar'
                    ? 'انضم لبرنامجنا التابع واكسب حتى 20% عمولة على كل طلب يأتي عبر رابطك. العملاء القدامى يحصلون على مكافآت إضافية!'
                    : 'Join our affiliate program and earn up to 20% commission on every order through your link. Existing clients get extra rewards!'}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['🥉 10% Bronze','🥈 15% Silver','🥇 20% Gold'].map((t,i)=>(
                    <span key={i} className={`px-4 py-2 rounded-xl text-sm font-black border ${isDark?'border-snap-yellow/20 bg-snap-yellow/5 text-snap-yellow':'border-yellow-300 bg-yellow-50 text-yellow-700'}`}>{t}</span>
                  ))}
                </div>
                <motion.button whileHover={{scale:1.04}} onClick={()=>{setView('loyalty');window.location.hash='loyalty';window.scrollTo(0,0);}}
                  className="px-8 py-4 bg-snap-yellow text-black font-black rounded-xl shadow-[0_8px_30px_rgba(255,220,0,0.3)] inline-flex items-center gap-2">
                  {lang==='ar'?'انضم للبرنامج':'Join Program'} <ChevronRight className="w-4 h-4"/>
                </motion.button>
              </motion.div>

              <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="grid grid-cols-2 gap-4">
                {[
                  {icon:'🔗',title:lang==='ar'?'رابط خاص بك':'Your Unique Link',desc:lang==='ar'?'احصل على رابط إحالة خاص':'Get your personal referral link'},
                  {icon:'📤',title:lang==='ar'?'شارك مع أصدقائك':'Share With Friends',desc:lang==='ar'?'شارك في قروباتك':'Share in your groups'},
                  {icon:'💰',title:lang==='ar'?'اكسب عمولة':'Earn Commission',desc:lang==='ar'?'حتى 20% على كل طلب':'Up to 20% per order'},
                  {icon:'🎁',title:lang==='ar'?'مكافآت شهرية':'Monthly Bonuses',desc:lang==='ar'?'مكافآت إضافية للأفضل':'Extra rewards for top affiliates'},
                ].map((f,i)=>(
                  <div key={i} className={`p-5 rounded-2xl border ${isDark?'bg-white/3 border-white/8':'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <div className={`font-black text-sm mb-1 ${isDark?'text-white':'text-gray-900'}`}>{f.title}</div>
                    <div className={`text-xs ${isDark?'text-gray-500':'text-gray-500'}`}>{f.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 relative overflow-hidden section-divider">
          {/* Animated contact background */}
          <motion.div animate={{ scale: [1,1.3,1], opacity: [0.05,0.12,0.05] }} transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,220,0,0.3) 0%, transparent 70%)' }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <motion.div animate={{ scale: [1,1.04,1] }} transition={{ duration: 3, repeat: Infinity }}
                className="inline-block px-5 py-2 rounded-full bg-snap-yellow/10 border border-snap-yellow/30 text-snap-yellow text-xs font-black uppercase tracking-widest mb-5">
                💬 {lang === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black mb-4 uppercase tracking-tight">
                {lang === 'ar' ? 'تواصل مع' : 'Contact'} <span className="text-snap-yellow">{lang === 'ar' ? 'فريق الخبراء' : 'Our Experts'}</span>
              </h2>
              <p className={`text-xl font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {lang === 'ar' ? 'فريقنا متاح 24/7 لمساعدتك' : 'Our team is available 24/7 to help you'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left — Contact info */}
              <div className="space-y-5">
                {[
                  { icon: <WhatsAppIcon className="w-8 h-8" />, label: 'WhatsApp Support', value: WHATSAPP_NUMBER, grad: 'from-green-900/50 to-green-600/10', border: 'border-green-500/30 hover:border-green-400/70', action: () => openWhatsApp('Hello, I want to inquire about services') },
                  { icon: <Send className="w-8 h-8" />, label: 'Email Support', value: 'support@snapscore.store', grad: 'from-blue-900/50 to-blue-600/10', border: 'border-blue-500/30 hover:border-blue-400/70', action: () => window.open('mailto:support@snapscore.store') },
                  { icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor"><path d="M12.206 1c-2.945 0-5.687 1.336-7.512 3.59C2.87 6.844 2.204 9.685 2.796 12.354c.592 2.67 2.282 4.99 4.664 6.428l.48.282-.074.548c-.132.975-.418 1.918-.848 2.793.8-.13 1.587-.387 2.322-.762l.456-.231.491.134c.628.17 1.277.257 1.929.257 2.945 0 5.687-1.336 7.512-3.59 1.824-2.254 2.49-5.095 1.898-7.764-.592-2.67-2.282-4.99-4.664-6.428C15.382 1.47 13.807 1 12.206 1z"/></svg>, label: 'Snapchat', value: '@snapscorestore', grad: 'from-yellow-900/50 to-yellow-600/10', border: 'border-yellow-500/30 hover:border-yellow-400/70', action: () => window.open('https://snapchat.com/add/snapscorestore', '_blank') },
                  { icon: <Instagram className="w-8 h-8" />, label: 'Instagram', value: '@snapscore.store', grad: 'from-pink-900/50 to-pink-600/10', border: 'border-pink-500/30 hover:border-pink-400/70', action: () => {} },
                  { icon: <Twitter className="w-8 h-8" />, label: 'Twitter / X', value: '@SnapScoreStore', grad: 'from-sky-900/50 to-sky-600/10', border: 'border-sky-500/30 hover:border-sky-400/70', action: () => {} },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={item.action}
                    className={`flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-br ${item.grad} border ${item.border} transition-all cursor-pointer group`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-snap-yellow group-hover:bg-snap-yellow group-hover:text-black transition-all flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</div>
                      <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.value}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-snap-yellow ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.div>
                ))}
              </div>

              {/* Right — Contact form */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                className={`p-8 lg:p-10 rounded-[3rem] border transition-colors ${isDark ? 'bg-white/3 border-white/10' : 'bg-white border-gray-200 shadow-xl'}`}
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
                  {lang === 'ar' ? '📩 أرسل رسالة' : '📩 Send a Message'}
                </h3>
                <div className="space-y-5">
                  {[
                    { label: lang === 'ar' ? 'الاسم' : 'Your Name', placeholder: lang === 'ar' ? 'أدخل اسمك' : 'Enter your name', type: 'text' },
                    { label: lang === 'ar' ? 'اسم المستخدم (سناب)' : 'Snapchat Username', placeholder: '@username', type: 'text' },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder}
                        className={`w-full border rounded-xl px-5 py-3.5 outline-none transition-all font-medium focus:border-snap-yellow focus:ring-2 focus:ring-snap-yellow/20 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400'}`} />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'ar' ? 'الخدمة المطلوبة' : 'Service Needed'}</label>
                    <select className={`w-full border rounded-xl px-5 py-3.5 outline-none transition-all font-medium focus:border-snap-yellow appearance-none ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                      {['Score Boosting','Buy Score Account','Buy Follower Account','Follower Increase','Create Lens','Verified Badge','Other'].map(o => <option key={o} className={isDark ? 'bg-gray-900' : 'bg-white'}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                    <textarea rows={4} placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                      className={`w-full border rounded-xl px-5 py-3.5 outline-none transition-all font-medium resize-none focus:border-snap-yellow focus:ring-2 focus:ring-snap-yellow/20 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400'}`} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openWhatsApp(lang === 'ar' ? 'أريد استشارة بخصوص خدمات سناب شات' : 'I want a consultation regarding Snapchat services')}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl shadow-[0_0_30px_rgba(255,220,0,0.3)] flex items-center justify-center gap-3 text-lg"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
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
            onOrder={(s) => {
              openWhatsApp(lang === 'ar' ? `أريد طلب خدمة: ${s.title}` : `I want to order service: ${s.title}`);
            }} 
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
                      
                      {/* URL hint */}
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

                      // Build small pricing table per service
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
                          className={`p-8 rounded-[3rem] border-2 transition-all group relative overflow-hidden ${sc.bg} ${sc.border}`}
                        >
                          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-colors ${sc.glow}`}></div>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${sc.icon}`}>
                            {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                          </div>
                          <h3 className="text-2xl font-black mb-3 group-hover:text-snap-yellow transition-colors relative z-10">{service.title}</h3>
                          <p className="text-gray-400 mb-4 leading-relaxed text-sm relative z-10">{service.desc[lang]}</p>
                          
                          {/* Pricing Mini Table */}
                          {svcTiers.length > 0 && (
                            <div className={`rounded-2xl border overflow-hidden mb-6 relative z-10 ${sc.tbl}`}>
                              <div className={`px-4 py-2 text-xs font-black uppercase tracking-widest ${sc.hdr}`}>
                                {lang === 'ar' ? 'الأسعار' : 'Pricing'}
                              </div>
                              <table className="w-full text-sm">
                                <tbody>
                                  {svcTiers.map((tier, ti) => (
                                    <tr key={ti} className="border-t border-white/5">
                                      <td className="px-4 py-2 text-gray-400 font-medium">{tier.label}</td>
                                      <td className="px-4 py-2 text-right font-black text-snap-yellow">{tier.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          
                          {svcTiers.length === 0 && (
                            <div className="text-2xl font-bold text-white mb-6 relative z-10">{service.price}</div>
                          )}
                          
                          {/* Service Info Badges */}
                          <div className="flex gap-2 mb-6 flex-wrap relative z-10">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                              ⏱ {service.deliveryTime}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                              🛡 {service.guarantee}
                            </span>
                          </div>

                          <div className="flex gap-3 relative z-10">
                            <button 
                              onClick={() => {
                                if (service.id === 's_boost') {
                                  setView('boosting');
                                  window.location.hash = 'boosting';
                                  window.scrollTo(0, 0);
                                } else {
                                  setSelectedService(service);
                                  setView('service_detail');
                                  window.location.hash = `service-${service.id}`;
                                  window.scrollTo(0, 0);
                                }
                              }}
                              className="flex-1 py-4 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                              <WhatsAppIcon className="w-5 h-5" />
                              {t.shop.order}
                            </button>
                            <button
                              onClick={() => {
                                const link = `${window.location.origin}${window.location.pathname}#service-${service.id}`;
                                if (navigator.share) {
                                  navigator.share({ title: service.title, url: link });
                                } else {
                                  navigator.clipboard.writeText(link).then(() => {
                                    alert(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
                                  });
                                }
                              }}
                              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-gray-400 hover:text-white flex-shrink-0"
                              title={lang === 'ar' ? 'مشاركة الرابط' : 'Share Link'}
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* URL hint */}
                          <div className="mt-4 flex items-center gap-2 text-xs text-gray-700 font-mono relative z-10">
                            <Link className="w-3 h-3" />
                            <span>#service-{service.id}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'checkout' && selectedPackage && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <BackButton onClick={() => setView('shop')} lang={lang} />
              </div>
              <div className="glass p-10 lg:p-16 rounded-[3rem] border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h1 className="text-4xl font-black uppercase tracking-tight">{t.checkout.summary}</h1>
                  <button onClick={() => setView('shop')} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-snap-yellow/10 border border-snap-yellow/30 mb-8 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-snap-yellow/10 rounded-full blur-3xl group-hover:bg-snap-yellow/20 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkout.package}</span>
                      <span className="text-2xl font-black text-snap-yellow">{selectedPackage.amount || selectedPackage.title} {selectedPackage.type || ''}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkout.price}</span>
                      <span className="text-2xl font-black text-white">{selectedPackage.price}</span>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-sm text-gray-400 leading-relaxed">{t.checkout.productDetails}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight">{t.checkout.details}</h2>
                  <div className="p-8 rounded-2xl bg-blue-600/5 border border-blue-500/20">
                    <label className="block text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">{t.checkout.username}</label>
                    <input 
                      type="text" 
                      value={checkoutData.username}
                      onChange={(e) => setCheckoutData({...checkoutData, username: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors text-lg" 
                      placeholder="@username" 
                    />
                  </div>

                  {/* Password — only required for score accounts */}
                  {selectedPackage.type === 'Score Account' ? (
                    <div className="p-8 rounded-2xl bg-red-600/5 border border-red-500/20">
                      <label className="block text-sm font-bold text-red-400 uppercase tracking-widest mb-3">
                        🔑 {t.checkout.password}
                      </label>
                      <input 
                        type="password" 
                        value={checkoutData.password}
                        onChange={(e) => setCheckoutData({...checkoutData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-snap-yellow outline-none transition-colors text-lg" 
                        placeholder="••••••••" 
                      />
                      <p className="text-xs text-red-400/70 mt-2">{t.checkout.notice}</p>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {lang === 'ar'
                          ? '✅ هذا المنتج لا يتطلب كلمة مرور. فقط أرسل اسم مستخدم سناب شات الخاص بك.'
                          : '✅ This product does NOT require a password. Just send your Snapchat username.'}
                      </p>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        const needsPass = selectedPackage.type === 'Score Account';
                        const message = needsPass
                          ? `New Order!\nPackage: ${selectedPackage.amount} ${selectedPackage.type}\nUsername: ${checkoutData.username}\nPassword: ${checkoutData.password}\nPrice: ${selectedPackage.price}`
                          : `New Order!\nPackage: ${selectedPackage.amount} ${selectedPackage.type}\nUsername: ${checkoutData.username}\nPrice: ${selectedPackage.price}`;
                        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                        setIsProcessing(false);
                        setView('home');
                        setSelectedPackage(null);
                        setCheckoutData({ username: '', password: '' });
                      }, 2000);
                    }}
                    disabled={isProcessing || !checkoutData.username || (selectedPackage.type === 'Score Account' && !checkoutData.password)}
                    className="w-full py-6 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,252,0,0.3)] disabled:opacity-50 disabled:hover:scale-100 text-xl flex items-center justify-center gap-4"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCcw className="w-6 h-6 animate-spin" />
                        {t.checkout.processing}
                      </>
                    ) : (
                      <>
                        <WhatsAppIcon className="w-6 h-6" />
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
          <section className={`pt-36 pb-24 px-6 min-h-screen ${isDark ? 'bg-[#06060f]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <BackButton onClick={() => { setView('home'); window.location.hash = ''; }} lang={lang} />
              </div>

              {/* Page Header */}
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-14">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] mb-5 border ${isDark ? 'bg-snap-yellow/8 border-snap-yellow/25 text-snap-yellow' : 'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                  ✦ {lang==='ar' ? 'جميع المقالات' : 'All Articles'} — {lang==='ar' ? 'كل مقال له رابط خاص' : 'Each has its own link'}
                </span>
                <h1 className={`text-5xl lg:text-7xl font-black mb-4 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.blog.title}</h1>
                <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.blog.subtitle}</p>
                <div className="mt-5 w-20 h-1 bg-snap-yellow mx-auto rounded-full"/>
              </motion.div>

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.blog.posts.map((post: any, i: number) => {
                  const palettes = [
                    { dark:'#0d0820', light:'#f5f0ff', accent:'#a78bfa', border_d:'rgba(167,139,250,0.4)', border_l:'#ddd6fe', tag:'#7c3aed', glow:'rgba(139,92,246,0.35)' },
                    { dark:'#150a1a', light:'#fdf4ff', accent:'#e879f9', border_d:'rgba(232,121,249,0.4)', border_l:'#f5d0fe', tag:'#a21caf', glow:'rgba(192,38,211,0.35)' },
                    { dark:'#180900', light:'#fff7ed', accent:'#fb923c', border_d:'rgba(251,146,60,0.4)', border_l:'#fed7aa', tag:'#c2410c', glow:'rgba(234,88,12,0.35)' },
                    { dark:'#001a0d', light:'#f0fdf4', accent:'#34d399', border_d:'rgba(52,211,153,0.4)', border_l:'#a7f3d0', tag:'#059669', glow:'rgba(16,185,129,0.35)' },
                    { dark:'#150010', light:'#fff1f2', accent:'#fb7185', border_d:'rgba(251,113,133,0.4)', border_l:'#fecdd3', tag:'#be123c', glow:'rgba(225,29,72,0.35)' },
                    { dark:'#001520', light:'#f0f9ff', accent:'#38bdf8', border_d:'rgba(56,189,248,0.4)', border_l:'#bae6fd', tag:'#0369a1', glow:'rgba(3,105,161,0.35)' },
                    { dark:'#1a1400', light:'#fefce8', accent:'#facc15', border_d:'rgba(250,204,21,0.4)', border_l:'#fef08a', tag:'#a16207', glow:'rgba(202,138,4,0.35)' },
                    { dark:'#001020', light:'#eff6ff', accent:'#60a5fa', border_d:'rgba(96,165,250,0.4)', border_l:'#bfdbfe', tag:'#1d4ed8', glow:'rgba(29,78,216,0.35)' },
                  ];
                  const p = palettes[i % palettes.length];
                  const blogHash = `blog-${i}`;
                  const blogLink = `${window.location.origin}${window.location.pathname}#${blogHash}`;
                  const openPost = () => {
                    setSelectedBlogPost({...post, _index:i});
                    setView('blog_detail');
                    window.location.hash = blogHash;
                    window.scrollTo(0,0);
                  };

                  return (
                    <motion.article
                      key={i}
                      initial={{opacity:0, y:24, scale:0.97}}
                      animate={{opacity:1, y:0, scale:1}}
                      whileHover={{y:-6, scale:1.015}}
                      transition={{delay:i*0.07, type:'spring', stiffness:220, damping:24}}
                      className="rounded-2xl overflow-hidden flex flex-col group cursor-pointer relative"
                      style={{
                        background: isDark ? p.dark : p.light,
                        border: `1.5px solid ${isDark ? p.border_d : p.border_l}`,
                        boxShadow: isDark
                          ? `0 4px 40px ${p.glow.replace('0.35','0.1')}, 0 1px 0 ${p.border_d} inset`
                          : `0 2px 20px rgba(0,0,0,0.06)`,
                      }}
                      onClick={openPost}
                    >
                      {/* Glow — dark only */}
                      {isDark && (
                        <motion.div animate={{opacity:[0.2,0.5,0.2], scale:[1,1.15,1]}}
                          transition={{duration:3+i*0.5, repeat:Infinity}}
                          className="absolute -top-5 -right-5 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                          style={{background:p.glow}}
                        />
                      )}

                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <motion.img whileHover={{scale:1.07}} transition={{duration:0.4}}
                          src={`https://picsum.photos/seed/blog${i}full/700/400`} alt={post.title}
                          className={`w-full h-full object-cover ${isDark ? 'brightness-50' : 'brightness-85'}`}
                        />
                        <div className="absolute inset-0" style={{background:`linear-gradient(to top, ${isDark ? p.dark : p.light}ee 0%, transparent 55%)`}}/>
                        {/* Number */}
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg z-10"
                          style={{background:p.tag}}>
                          {i+1}
                        </div>
                        {/* Share */}
                        <button
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border border-white/20"
                          onClick={e=>{
                            e.stopPropagation();
                            if(navigator.share) navigator.share({title:post.title, url:blogLink});
                            else navigator.clipboard.writeText(blogLink).then(()=>alert(lang==='ar'?'✅ تم النسخ!':'✅ Copied!'));
                          }}
                        >
                          <Share2 className="w-3.5 h-3.5 text-white"/>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{background:`${p.tag}20`, color:p.tag}}>
                            {post.date}
                          </span>
                        </div>
                        <h3 className={`text-sm font-black leading-snug mb-2 line-clamp-3 flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                          onMouseEnter={e=>e.currentTarget.style.color=p.accent}
                          onMouseLeave={e=>e.currentTarget.style.color=isDark?'white':'#111'}>
                          {post.title}
                        </h3>
                        <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {(lang==='ar' ? post.arExcerpt : post.excerpt) || post.excerpt || ''}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t mt-auto"
                          style={{borderColor: isDark ? p.border_d.replace('0.4','0.2') : p.border_l}}>
                          <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1" style={{color:p.accent}}>
                            {t.blog.readMore} <ChevronRight className="w-3 h-3"/>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Link className="w-3 h-3 opacity-40" style={{color:p.accent}}/>
                            <code className="text-[10px] font-mono opacity-40" style={{color:p.accent}}>#{blogHash}</code>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        {view === 'boosting' && (
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <BackButton onClick={() => setView('home')} lang={lang} />
              </div>
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
                        className={`p-10 rounded-[3rem] border transition-all group relative overflow-hidden ${
                          i % 4 === 0 ? 'bg-blue-600/10 border-blue-500/20 hover:border-blue-500/50' : 
                          i % 4 === 1 ? 'bg-purple-600/10 border-purple-500/20 hover:border-purple-500/50' : 
                          i % 4 === 2 ? 'bg-orange-600/10 border-orange-500/20 hover:border-orange-500/50' :
                          'bg-green-600/10 border-green-500/20 hover:border-green-500/50'
                        }`}
                      >
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl group-hover:bg-white/10 transition-colors ${
                          i % 4 === 0 ? 'bg-blue-500/10' : 
                          i % 4 === 1 ? 'bg-purple-500/10' : 
                          i % 4 === 2 ? 'bg-orange-500/10' :
                          'bg-green-500/10'
                        }`}></div>
                        <div className="relative z-10">
                          <div className={`text-6xl font-black mb-6 group-hover:text-snap-yellow transition-colors tracking-tighter ${
                             i % 4 === 0 ? 'text-blue-400' : 
                             i % 4 === 1 ? 'text-purple-400' : 
                             i % 4 === 2 ? 'text-orange-400' :
                             'text-green-400'
                          }`}>{tier.amount}</div>
                          <div className="text-3xl font-bold text-white/90 mb-10">{tier.price}</div>
                          <button 
                            onClick={() => setSelectedBoostingTier(tier)}
                            className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-xl shadow-lg"
                          >
                            {lang === 'ar' ? 'اختيار الباقة' : 'Select Package'}
                          </button>
                        </div>
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
                      <div className="p-8 rounded-2xl bg-snap-yellow/10 border border-snap-yellow/30 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-snap-yellow/10 rounded-full blur-3xl group-hover:bg-snap-yellow/20 transition-colors"></div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'الباقة المختارة' : 'Selected Tier'}</span>
                            <span className="text-snap-yellow font-black text-xl">{selectedBoostingTier.amount} Score</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'السعر' : 'Price'}</span>
                            <span className="text-white font-black text-xl">{selectedBoostingTier.price}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-8 rounded-2xl bg-blue-600/5 border border-blue-500/20">
                          <label className="block text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-3 ml-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                          <input 
                            type="email"
                            value={checkoutData.username}
                            onChange={(e) => setCheckoutData({...checkoutData, username: e.target.value})}
                            placeholder="email@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-snap-yellow focus:ring-1 focus:ring-snap-yellow outline-none transition-all font-bold"
                          />
                        </div>
                        <div className="p-8 rounded-2xl bg-purple-600/5 border border-purple-500/20">
                          <label className="block text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-3 ml-2">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
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
        {view === 'privacy' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
              <div className="glass p-10 lg:p-16 rounded-[3rem] border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight">{t.privacy.title}</h1>
                  <button onClick={() => setView('home')} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className={`w-8 h-8 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div className="text-snap-yellow font-bold mb-12">{t.privacy.lastUpdated}</div>
                <div className="space-y-12">
                  {t.privacy.sections.map((section: any, i: number) => (
                    <div key={i} className="space-y-4">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-lg">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'terms' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
              <div className="glass p-10 lg:p-16 rounded-[3rem] border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight">{t.terms.title}</h1>
                  <button onClick={() => setView('home')} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronLeft className={`w-8 h-8 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div className="text-snap-yellow font-bold mb-12">{t.terms.lastUpdated}</div>
                <div className="space-y-12">
                  {t.terms.sections.map((section: any, i: number) => (
                    <div key={i} className="space-y-4">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-lg">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'calc' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {lang === 'ar' ? 'سناب شات سكور' : 'Snapchat Score'} <span className="text-snap-yellow">{lang === 'ar' ? 'حاسبة' : 'Calculator'}</span>
                </h1>
                <p className="text-gray-400 font-medium">
                  {lang === 'ar' ? 'احسب عدد السنابات المطلوبة للوصول إلى هدفك' : 'Calculate how many snaps are needed to reach your target score'}
                </p>
              </div>

              <div className="p-10 rounded-[3rem] bg-blue-600/5 border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-blue-400 mb-3 ml-2">{lang === 'ar' ? 'السكور الحالي' : 'Current Score'}</label>
                      <input 
                        type="number"
                        value={calcInput.current}
                        onChange={(e) => setCalcInput({...calcInput, current: e.target.value})}
                        placeholder="e.g. 10000"
                        className="w-full bg-blue-500/10 border border-blue-400/30 rounded-2xl p-5 focus:border-snap-yellow outline-none transition-all font-bold text-white placeholder:text-blue-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-blue-400 mb-3 ml-2">{lang === 'ar' ? 'السكور المستهدف' : 'Target Score'}</label>
                      <input 
                        type="number"
                        value={calcInput.target}
                        onChange={(e) => setCalcInput({...calcInput, target: e.target.value})}
                        placeholder="e.g. 100000"
                        className="w-full bg-blue-500/10 border border-blue-400/30 rounded-2xl p-5 focus:border-snap-yellow outline-none transition-all font-bold text-white placeholder:text-blue-400/50"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const diff = parseInt(calcInput.target) - parseInt(calcInput.current);
                      if (diff > 0) {
                        setToolResult({
                          snaps: Math.ceil(diff / 1.5),
                          days: Math.ceil(diff / 5000),
                          effort: diff > 50000 ? 'High' : 'Moderate'
                        });
                      }
                    }}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all text-xl"
                  >
                    {lang === 'ar' ? 'احسب الآن' : 'Calculate Now'}
                  </button>

                  {toolResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-4 relative overflow-hidden group"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'السنابات المطلوبة تقريباً' : 'Estimated Snaps Needed'}</span>
                          <span className="text-snap-yellow font-black text-2xl">{toolResult.snaps.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{lang === 'ar' ? 'الأيام المتوقعة (بشكل آمن)' : 'Estimated Days (Safe Speed)'}</span>
                          <span className="text-white font-black text-xl">{toolResult.days} {lang === 'ar' ? 'أيام' : 'Days'}</span>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                          <button 
                            onClick={() => setView('boosting')}
                            className="w-full py-3 bg-snap-yellow text-black rounded-xl font-bold hover:scale-105 transition-all text-sm"
                          >
                            {lang === 'ar' ? 'احصل عليها فوراً عبر خدمتنا' : 'Get it instantly with our service'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'checker' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {lang === 'ar' ? 'فاحص عمر' : 'Account Age'} <span className="text-snap-yellow">{lang === 'ar' ? 'الحساب والموثوقية' : '& Trust Checker'}</span>
                </h1>
                <p className="text-gray-400 font-medium">
                  {lang === 'ar' ? 'تحقق من عمر حسابك ومستوى الموثوقية' : 'Check your account age and trust level'}
                </p>
              </div>

              <div className="p-10 rounded-[3rem] bg-purple-600/5 border border-purple-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div className="space-y-8 relative z-10">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-purple-400 mb-3 ml-2">{lang === 'ar' ? 'اسم المستخدم' : 'Snapchat Username'}</label>
                    <input 
                      type="text"
                      value={checkerInput}
                      onChange={(e) => setCheckerInput(e.target.value)}
                      placeholder="@username"
                      className="w-full bg-purple-500/10 border border-purple-400/30 rounded-2xl p-5 focus:border-snap-yellow outline-none transition-all font-bold text-white placeholder:text-purple-400/50"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setIsProcessing(true);
                      setTimeout(() => {
                        const hash = checkerInput.length;
                        setToolResult({
                          age: 2026 - (hash % 10 + 2012),
                          trust: 60 + (hash % 40),
                          status: hash % 3 === 0 ? 'Excellent' : 'Good'
                        });
                        setIsProcessing(false);
                      }, 1500);
                    }}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3"
                  >
                    {isProcessing ? <RefreshCcw className="animate-spin w-6 h-6" /> : (lang === 'ar' ? 'فحص الآن' : 'Check Now')}
                  </button>

                  {toolResult && !isProcessing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-[2.5rem] bg-purple-600/10 border border-purple-500/30 space-y-6 relative overflow-hidden group"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                      <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div className="text-center p-4 rounded-xl bg-white/5">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-2">{lang === 'ar' ? 'العمر التقريبي' : 'Estimated Age'}</div>
                          <div className="text-2xl font-black text-snap-yellow">{toolResult.age} {lang === 'ar' ? 'سنوات' : 'Years'}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5">
                          <div className="text-xs font-bold text-gray-500 uppercase mb-2">{lang === 'ar' ? 'نقاط الثقة' : 'Trust Score'}</div>
                          <div className="text-2xl font-black text-snap-yellow">{toolResult.trust}%</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-snap-yellow/10 border border-snap-yellow/20 text-center relative z-10">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">{lang === 'ar' ? 'حالة الحساب' : 'Account Status'}</div>
                        <div className="text-xl font-black text-white">{toolResult.status}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'tracker' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {lang === 'ar' ? 'مخطط أهداف' : 'Score Milestone'} <span className="text-snap-yellow">{lang === 'ar' ? 'السكور' : 'Tracker'}</span>
                </h1>
                <p className="text-gray-400 font-medium">
                  {lang === 'ar' ? 'خطط لمسار نمو حسابك والوصول للمراتب العليا' : 'Plan your growth path and reach top tiers'}
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-8 rounded-[2.5rem] bg-orange-600/5 border border-orange-500/20 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                    <div className="space-y-6 relative z-10">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-orange-400 mb-2">{lang === 'ar' ? 'السكور الحالي' : 'Current'}</label>
                        <input 
                          type="number"
                          value={trackerInput.current}
                          onChange={(e) => setTrackerInput({...trackerInput, current: e.target.value})}
                          className="w-full bg-orange-500/10 border border-orange-400/30 rounded-xl p-4 focus:border-snap-yellow outline-none font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-orange-400 mb-2">{lang === 'ar' ? 'الهدف النهائي' : 'Goal'}</label>
                        <input 
                          type="number"
                          value={trackerInput.target}
                          onChange={(e) => setTrackerInput({...trackerInput, target: e.target.value})}
                          className="w-full bg-orange-500/10 border border-orange-400/30 rounded-xl p-4 focus:border-snap-yellow outline-none font-bold text-white"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          const cur = parseInt(trackerInput.current) || 0;
                          const tar = parseInt(trackerInput.target) || 1000000;
                          const milestones = [
                            { label: 'Bronze', score: Math.floor(tar * 0.25) },
                            { label: 'Silver', score: Math.floor(tar * 0.5) },
                            { label: 'Gold', score: Math.floor(tar * 0.75) },
                            { label: 'Diamond', score: tar }
                          ];
                          setToolResult({ cur, tar, milestones });
                        }}
                        className="w-full py-4 bg-snap-yellow text-black font-black rounded-xl hover:scale-105 transition-all"
                      >
                        {lang === 'ar' ? 'تحديث المخطط' : 'Update Tracker'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="glass p-10 rounded-[3rem] border-white/10 h-full">
                    {toolResult ? (
                      <div className="space-y-12">
                        <div className="relative pt-8">
                          <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((toolResult.cur / toolResult.tar) * 100, 100)}%` }}
                              className="h-full bg-snap-yellow shadow-[0_0_20px_rgba(255,252,0,0.5)]"
                            />
                          </div>
                          <div className="flex justify-between mt-4 text-xs font-black uppercase tracking-widest text-gray-500">
                            <span>{toolResult.cur.toLocaleString()}</span>
                            <span>{toolResult.tar.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {toolResult.milestones.map((m: any, i: number) => (
                            <div key={i} className={`p-6 rounded-2xl border transition-all relative overflow-hidden group ${
                              toolResult.cur >= m.score 
                                ? (i % 4 === 0 ? 'bg-blue-600/20 border-blue-500/50' : 
                                   i % 4 === 1 ? 'bg-purple-600/20 border-purple-500/50' : 
                                   i % 4 === 2 ? 'bg-orange-600/20 border-orange-500/50' :
                                   'bg-green-600/20 border-green-500/50')
                                : 'bg-white/5 border-white/10 opacity-50'
                            }`}>
                              <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl transition-colors ${
                                toolResult.cur >= m.score 
                                   ? (i % 4 === 0 ? 'bg-blue-500/10' : 
                                      i % 4 === 1 ? 'bg-purple-500/10' : 
                                      i % 4 === 2 ? 'bg-orange-500/10' :
                                      'bg-green-500/10')
                                   : 'bg-transparent'
                              }`}></div>
                              <div className="flex justify-between items-center relative z-10">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    toolResult.cur >= m.score 
                                       ? 'bg-snap-yellow text-black' 
                                       : 'bg-white/10 text-gray-500'
                                  }`}>
                                    {toolResult.cur >= m.score ? <CheckCircle2 className="w-6 h-6" /> : <Star className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <div className="text-sm font-black uppercase tracking-widest">{m.label} Tier</div>
                                    <div className="text-xs font-bold text-gray-500">{m.score.toLocaleString()} Score</div>
                                  </div>
                                </div>
                                {toolResult.cur < m.score && (
                                  <div className="text-[10px] font-black text-snap-yellow uppercase tracking-widest">
                                    {(m.score - toolResult.cur).toLocaleString()} Left
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                        <TrendingUp className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold">{lang === 'ar' ? 'أدخل بياناتك لعرض مخطط النمو' : 'Enter your data to view growth roadmap'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {view === 'bitmoji' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {t.tools_ui.bitmoji.title}
                </h1>
                <p className="text-gray-400 font-medium">{t.tools_ui.bitmoji.subtitle}</p>
              </div>

              <div className="p-10 rounded-[3rem] bg-orange-600/5 border border-orange-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                <div className="space-y-8 relative z-10">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-orange-400 mb-3 ml-2">{lang === 'ar' ? 'وصف الشخصية' : 'Character Description'}</label>
                    <textarea 
                      value={bitmojiInput}
                      onChange={(e) => setBitmojiInput(e.target.value)}
                      placeholder={t.tools_ui.bitmoji.placeholder}
                      className="w-full bg-orange-500/10 border border-orange-400/30 rounded-2xl p-5 focus:border-snap-yellow outline-none transition-all font-bold min-h-[120px] resize-none text-white placeholder:text-orange-400/50"
                    />
                  </div>

                  <button 
                    onClick={handleBitmoji}
                    disabled={isToolLoading || !bitmojiInput}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isToolLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                      <>
                        <UserCircle className="w-6 h-6" />
                        {t.tools_ui.bitmoji.button}
                      </>
                    )}
                  </button>

                  {toolResult?.image && !isToolLoading && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 rounded-[2.5rem] bg-orange-600/10 border border-orange-500/30 space-y-6 relative overflow-hidden group"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="text-center text-xs font-black uppercase tracking-widest text-snap-yellow mb-4">{t.tools_ui.bitmoji.result}</div>
                        <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl max-w-sm mx-auto">
                          <img src={toolResult.image} alt="Bitmoji" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex justify-center mt-6">
                          <a 
                            href={toolResult.image} 
                            download="bitmoji-avatar.png"
                            className="flex items-center gap-2 text-snap-yellow font-black uppercase tracking-widest text-sm hover:underline"
                          >
                            <Download className="w-4 h-4" />
                            {lang === 'ar' ? 'تحميل الصورة' : 'Download Image'}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'lens' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {t.tools_ui.lens.title}
                </h1>
                <p className="text-gray-400 font-medium">{t.tools_ui.lens.subtitle}</p>
              </div>

              <div className="p-10 rounded-[3rem] bg-blue-600/5 border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="space-y-8 relative z-10">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-2xl border-2 border-dashed border-blue-400/30 bg-blue-500/5 flex flex-col items-center justify-center cursor-pointer hover:border-snap-yellow/50 transition-colors overflow-hidden relative group"
                  >
                    {lensInput ? (
                      <img src={lensInput} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-blue-400/50 mb-4 group-hover:text-snap-yellow transition-colors" />
                        <span className="text-blue-400/70 font-bold">{t.tools_ui.lens.upload}</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {['cartoon', 'anime', 'zombie', 'superhero'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setLensType(type)}
                        className={`py-4 rounded-xl font-black uppercase tracking-widest text-xs border transition-all ${lensType === type ? 'bg-snap-yellow text-black border-snap-yellow' : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/30'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleLens}
                    disabled={isToolLoading || !lensInput}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isToolLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                      <>
                        <Camera className="w-6 h-6" />
                        {t.tools_ui.lens.button}
                      </>
                    )}
                  </button>

                  {toolResult?.image && !isToolLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/30 space-y-6 relative overflow-hidden group"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="text-center text-xs font-black uppercase tracking-widest text-snap-yellow mb-4">{t.tools_ui.lens.result}</div>
                        <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl max-w-sm mx-auto">
                          <img src={toolResult.image} alt="Lens Result" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'map' && (
          <section className="pt-40 pb-24 px-6 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                  {t.tools_ui.map.title}
                </h1>
                <p className="text-gray-400 font-medium">{t.tools_ui.map.subtitle}</p>
              </div>

              <div className="p-10 rounded-[3rem] bg-green-600/5 border border-green-500/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                <div className="space-y-8 relative z-10">
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-green-400 w-6 h-6" />
                    <input 
                      type="text"
                      value={mapInput}
                      onChange={(e) => setMapInput(e.target.value)}
                      placeholder={t.tools_ui.map.placeholder}
                      className="w-full bg-green-500/10 border border-green-400/30 rounded-2xl pl-16 pr-6 py-6 focus:border-snap-yellow outline-none transition-all font-bold text-lg text-white placeholder:text-green-400/50"
                    />
                  </div>

                  <button 
                    onClick={handleMap}
                    disabled={isToolLoading || !mapInput}
                    className="w-full py-5 bg-snap-yellow text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isToolLoading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                      <>
                        <MapPin className="w-6 h-6" />
                        {t.tools_ui.map.button}
                      </>
                    )}
                  </button>

                  {toolResult && !isToolLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-[2.5rem] bg-green-600/10 border border-green-500/30 space-y-8 relative overflow-hidden group"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="text-xs font-black uppercase tracking-widest text-snap-yellow text-center mb-6">{t.tools_ui.map.result}</div>
                        
                        <div className="prose prose-invert max-w-none">
                          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap bg-white/5 p-6 rounded-2xl border border-white/10">
                            {toolResult.text}
                          </div>
                        </div>

                        {toolResult.maps && toolResult.maps.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {toolResult.maps.map((m: any, i: number) => (
                              <a 
                                key={i} 
                                href={m.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-snap-yellow/30 transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-black group-hover:text-snap-yellow transition-colors">{m.title}</span>
                                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-snap-yellow transition-all group-hover:translate-x-1" />
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'snapify' && (
          <section className="min-h-screen pt-40 pb-32 px-6 bg-[#06060f] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              {!isSnapifyUnlocked ? (
                <div className="max-w-4xl mx-auto space-y-12">
                  {/* Verification Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 rounded-[3rem] glass border-white/10 text-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-snap-yellow/5 via-transparent to-purple-500/5 opacity-50"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-snap-yellow/20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <Lock className="w-10 h-10 text-snap-yellow" />
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tighter italic">
                        {lang === 'ar' ? 'التحقق من الوصول' : 'Access Verification'}
                      </h2>
                      <p className="text-gray-400 mb-10 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                        {lang === 'ar' 
                          ? 'سناب فاي برو متاح حصرياً للمستخدمين المعتمدين. يرجى إدخال كود الوصول الخاص بك للمتابعة.' 
                          : 'Snapify Pro is exclusively available to verified users. Please enter your unique access code to continue.'}
                      </p>
                      
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="relative group/input z-20">
                          <input 
                            type="text" 
                            value={snapifyCode}
                            onChange={(e) => setSnapifyCode(e.target.value)}
                            placeholder={lang === 'ar' ? 'أدخل الكود هنا...' : 'Enter access code here...'}
                            className="w-full px-8 py-6 bg-white/10 border-2 border-white/20 rounded-2xl text-white font-black text-center focus:border-snap-yellow focus:bg-white/20 transition-all outline-none text-2xl uppercase placeholder:text-gray-600 relative z-30"
                            autoFocus
                          />
                          <div className="absolute inset-0 rounded-2xl bg-snap-yellow/10 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            if (snapifyCode.toUpperCase() === 'A1B2C3$1') {
                              setIsSnapifyUnlocked(true);
                              window.scrollTo(0, 0);
                            } else {
                              alert(lang === 'ar' ? 'كود غير صحيح!' : 'Incorrect code!');
                            }
                          }}
                          className="w-full py-6 bg-snap-yellow hover:bg-yellow-400 text-black font-black rounded-2xl uppercase tracking-widest text-lg shadow-[0_10px_30px_rgba(255,252,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,252,0,0.5)] transition-all hover:-translate-y-1 active:scale-95"
                        >
                          {lang === 'ar' ? 'فتح لوحة التحكم' : 'Unlock Dashboard'}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* What is Snapify? */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-12 rounded-[3rem] glass border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black mb-6 flex items-center gap-4 text-blue-400 uppercase tracking-tight">
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                          <InfinityIcon className="w-8 h-8" />
                        </div>
                        {lang === 'ar' ? 'ما هو سناب فاي؟' : 'What is Snapify?'}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-medium">
                        Snapify is an advanced Snapchat automation tool developed by FreeSnapScores for power users who want to grow their Snapchat presence faster. Unlike manual growth strategies that require hours of daily effort, Snapify automates the organic engagement actions that naturally increase your SnapScore — including automated snap sending, streak maintenance, and story-view automation.
                        <br /><br />
                        Snapify is available exclusively to verified users on FreeSnapScores. It operates entirely through a web-based interface — no software downloads, no browser extensions, and no third-party app installations required. Because Snapify is access-restricted, it can deliver premium automation capabilities while maintaining the quality standards our users expect.
                      </p>
                    </div>
                  </motion.div>

                  {/* Key Features */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-10 rounded-[3rem] glass border-white/10 relative overflow-hidden group"
                    >
                      <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                      <h3 className="text-2xl font-black mb-8 text-purple-400 uppercase tracking-tight flex items-center gap-3">
                        <Zap className="w-6 h-6" />
                        {lang === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
                      </h3>
                      <ul className="space-y-6">
                        {[
                          { title: 'Score Multiplier', desc: 'Accelerate your SnapScore growth with optimized sending patterns.' },
                          { title: 'Streak Guardian', desc: 'Never lose a streak again with automated daily snap exchanges.' },
                          { title: 'Story Engagement', desc: 'Increase your visibility by automatically viewing friend stories.' },
                          { title: 'Safe-Mode Tech', desc: 'Built-in delays and human-like patterns to ensure account safety.' }
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            </div>
                            <div>
                              <div className="font-black text-white mb-1">{item.title}</div>
                              <div className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-10 rounded-[3rem] glass border-white/10 relative overflow-hidden group"
                    >
                      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors"></div>
                      <h3 className="text-2xl font-black mb-8 text-orange-400 uppercase tracking-tight flex items-center gap-3">
                        <HelpCircle className="w-6 h-6" />
                        {lang === 'ar' ? 'كيف يعمل؟' : 'How It Works'}
                      </h3>
                      <div className="space-y-8">
                        {[
                          { step: '01', title: 'Account Connection', desc: 'Securely link your account via our encrypted web interface.' },
                          { step: '02', title: 'Configure Settings', desc: 'Choose your growth speed and specific automation tasks.' },
                          { step: '03', title: 'Launch Automation', desc: 'Snapify begins performing engagement actions on your behalf.' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-6">
                            <div className="text-4xl font-black text-orange-500/20 italic">{item.step}</div>
                            <div>
                              <div className="font-black text-white mb-1">{item.title}</div>
                              <div className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Responsible Usage */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-12 rounded-[3rem] glass border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                    <h3 className="text-3xl font-black mb-6 text-green-400 uppercase tracking-tight flex items-center gap-4">
                      <ShieldCheck className="w-8 h-8" />
                      {lang === 'ar' ? 'الاستخدام المسؤول' : 'Responsible Usage'}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-medium">
                      While Snapify is designed with safety as a priority, we recommend using it responsibly. Avoid extreme automation speeds and ensure your account has a verified email and phone number. Snapify is intended to supplement organic growth, not replace it entirely.
                    </p>
                  </motion.div>

                  {/* FAQs */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-12 rounded-[3rem] glass border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-snap-yellow/5 rounded-full blur-3xl group-hover:bg-snap-yellow/10 transition-colors"></div>
                    <h3 className="text-3xl font-black mb-10 text-snap-yellow uppercase tracking-tight flex items-center gap-4">
                      <Star className="w-8 h-8" />
                      {lang === 'ar' ? 'الأسئلة الشائعة' : 'Snapify Pro FAQs'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      {[
                        { q: 'Is Snapify safe to use?', a: 'Yes, Snapify uses human-like interaction patterns to remain within platform guidelines.' },
                        { q: 'Do I need to download anything?', a: 'No, Snapify is 100% web-based and works on any device with a browser.' },
                        { q: 'How do I get an access code?', a: 'Access codes are provided to premium customers and verified community members.' },
                        { q: 'Can I use it on multiple accounts?', a: 'Each access code is linked to a single Snapchat account for security.' }
                      ].map((faq, i) => (
                        <div key={i} className="space-y-3">
                          <div className="font-black text-white flex items-start gap-3">
                            <span className="text-snap-yellow">Q:</span>
                            {faq.q}
                          </div>
                          <div className="text-gray-400 font-medium pl-7 leading-relaxed">
                            {faq.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snap-yellow/10 border border-snap-yellow/20 text-snap-yellow text-xs font-black mb-4 uppercase tracking-widest">
                        <Star className="w-4 h-4 fill-snap-yellow" />
                        Snapify Pro Active
                      </div>
                      <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                        {lang === 'ar' ? 'الوصول إلى أداة سناب فاي' : 'Snapify Tool Access'}
                      </h1>
                    </div>
                    <div className="flex items-center gap-4 p-6 glass rounded-3xl border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-snap-yellow/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-snap-yellow" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Welcome Back</div>
                        <div className="text-lg font-black text-white">Pro Member</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Action Buttons */}
                    <div className="space-y-6">
                      <a 
                        href="https://web.snapchat.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-8 rounded-[2.5rem] bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <ExternalLink className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-2xl font-black text-white uppercase italic">Open Snapchat Web</div>
                            <div className="text-blue-400/70 font-bold">Access the official web platform</div>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-2 transition-transform" />
                      </a>

                      <a 
                        href="https://freesnapscores.com/snapify/snapify.user.js" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-8 rounded-[2.5rem] bg-snap-yellow/10 border border-snap-yellow/30 hover:bg-snap-yellow/20 transition-all group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-snap-yellow/20 flex items-center justify-center text-snap-yellow">
                            <Download className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-2xl font-black text-white uppercase italic">Install Snapify Script</div>
                            <div className="text-snap-yellow/70 font-bold">Direct userscript installation</div>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-snap-yellow group-hover:translate-x-2 transition-transform" />
                      </a>
                    </div>

                    {/* Direct URL Box */}
                    <div className="p-10 rounded-[3rem] glass border-white/10 relative overflow-hidden group">
                      <div className="absolute -top-24 -right-24 w-64 h-64 bg-snap-yellow/5 rounded-full blur-3xl group-hover:bg-snap-yellow/10 transition-colors"></div>
                      <h3 className="text-2xl font-black mb-8 text-white uppercase tracking-tight flex items-center gap-3">
                        <Link className="w-6 h-6 text-snap-yellow" />
                        Direct Script URL
                      </h3>
                      <div className="space-y-6">
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/10 font-mono text-sm break-all text-gray-400">
                          https://freesnapscores.com/snapify/snapify.user.js
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText('https://freesnapscores.com/snapify/snapify.user.js');
                            alert('URL copied to clipboard!');
                          }}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm border border-white/10 flex items-center justify-center gap-2"
                        >
                          <History className="w-4 h-4" />
                          Copy URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] glass border-white/10">
                      <h3 className="text-2xl font-black mb-8 text-white uppercase tracking-tight flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        Installation Instructions
                      </h3>
                      <ol className="space-y-6">
                        {[
                          'Install a userscript manager extension (like Tampermonkey) for your browser',
                          'Click the "Install Snapify Script" button above',
                          'Your userscript manager will prompt you to install the script',
                          'After installation, navigate to Snapchat Web to use the tool'
                        ].map((step, i) => (
                          <li key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-snap-yellow font-black flex-shrink-0">
                              {i + 1}
                            </div>
                            <p className="text-gray-400 font-medium leading-relaxed">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-8">
                      <div className="p-10 rounded-[3rem] glass border-white/10 relative overflow-hidden">
                        <button 
                          onClick={() => setShowUsage(!showUsage)}
                          className="w-full flex items-center justify-between text-2xl font-black text-white uppercase tracking-tight"
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-6 h-6 text-snap-yellow" />
                            How to Use Snapify
                          </div>
                          <ChevronRight className={`w-6 h-6 transition-transform ${showUsage ? 'rotate-90' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {showUsage && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-8 space-y-8">
                                <p className="text-gray-400 font-medium leading-relaxed">
                                  After installation, navigate to Snapchat Web where you'll see a control panel in the bottom-right corner:
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-snap-yellow font-black mb-1">Click Auto</div>
                                    <div className="text-xs text-gray-500">Start automatic capture</div>
                                  </div>
                                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-red-400 font-black mb-1">Click Stop</div>
                                    <div className="text-xs text-gray-500">Pause the automation</div>
                                  </div>
                                </div>
                                <div className="p-6 bg-snap-yellow/10 rounded-2xl border border-snap-yellow/20 flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-snap-yellow text-black flex items-center justify-center font-black">
                                    ⌘S
                                  </div>
                                  <div className="text-sm text-gray-300 font-bold">Use Ctrl+Alt+S keyboard shortcut to toggle</div>
                                </div>

                                <div className="space-y-6">
                                  <h4 className="text-2xl font-black text-white uppercase italic">Automation Workflow</h4>
                                  <ul className="space-y-4">
                                    {[
                                      'Navigate to the camera automatically',
                                      'Capture snaps using adaptive techniques',
                                      'Select recipients based on your configuration',
                                      'Send snaps with human-like timing delays',
                                      'Handle errors and retries automatically'
                                    ].map((item, i) => (
                                      <li key={i} className="flex items-center gap-4 text-gray-400 font-medium">
                                        <div className="w-2 h-2 bg-snap-yellow rounded-full"></div>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="p-8 rounded-[2rem] bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center gap-4 mb-4">
                          <AlertTriangle className="w-6 h-6 text-orange-400" />
                          <h4 className="text-xl font-black text-orange-400 uppercase tracking-tight">Pro Tip for Safety</h4>
                        </div>
                        <p className="text-orange-200/70 font-medium leading-relaxed">
                          To maintain account safety, we recommend running Snapify in sessions of 30-60 minutes followed by a break. Avoid sending more than 500 snaps per hour to keep your account health in the green zone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => setView('home')}
                      className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-widest border border-white/10"
                    >
                      {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══════════════ RECENT WORK PAGE ══════════════ */}
        {view === 'recent_work' && (
          <section className={`pt-36 pb-24 px-6 min-h-screen ${isDark?'bg-[#06060f]':'bg-white'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8"><BackButton onClick={()=>setView('home')} lang={lang}/></div>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border bg-snap-yellow/10 border-snap-yellow/30 text-snap-yellow">
                  ✦ {lang==='ar'?'أعمالنا الأخيرة':'Recent Work'}
                </span>
                <h1 className={`text-4xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${isDark?'text-white':'text-gray-900'}`}>
                  {lang==='ar'?'نتائج حقيقية':'Real Results'} <span className="text-snap-yellow">{lang==='ar'?'من عملاء حقيقيين':'From Real Clients'}</span>
                </h1>
                <p className={`text-lg ${isDark?'text-gray-400':'text-gray-500'}`}>{lang==='ar'?'شاهد ما أنجزناه لعملائنا':'See what we\'ve achieved for our clients'}</p>
                <div className="mt-5 w-20 h-1 bg-snap-yellow mx-auto rounded-full"/>
              </motion.div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                {[
                  {val:'10K+', label:lang==='ar'?'عميل راضٍ':'Happy Clients', icon:'😊'},
                  {val:'50K+', label:lang==='ar'?'طلب مكتمل':'Orders Done', icon:'✅'},
                  {val:'99%', label:lang==='ar'?'نسبة النجاح':'Success Rate', icon:'🎯'},
                  {val:'4.9★', label:lang==='ar'?'تقييم العملاء':'Client Rating', icon:'⭐'},
                ].map((s,i)=>(
                  <motion.div key={i} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.1}}
                    className={`p-5 rounded-2xl text-center border ${isDark?'bg-white/3 border-white/8':'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-black text-snap-yellow">{s.val}</div>
                    <div className={`text-xs font-bold mt-1 ${isDark?'text-gray-500':'text-gray-500'}`}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Feedback Screenshots Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                {[
                  {name:'Ahmed Al-Harbi', loc:'Riyadh, KSA 🇸🇦', service:'1M Score Boost', before:'124K', after:'1,000,000+', stars:5, msg:'Fastest service I have ever seen! Got my 1M score in 6 days. 100% legit!', color:'#facc15', bg:'#1a1400'},
                  {name:'Sara Mohammed', loc:'Dubai, UAE 🇦🇪', service:'Follower Account 50K', before:'0', after:'52,400', stars:5, msg:'Account delivered same day. Very professional team and fast support!', color:'#a78bfa', bg:'#0d0820'},
                  {name:'Sultan Al-Kuwari', loc:'Doha, Qatar 🇶🇦', service:'Score Boost 500K', before:'18K', after:'518,000', stars:5, msg:'Best Snapchat service in the Gulf. Credibility and speed!', color:'#34d399', bg:'#001a0d'},
                  {name:'Layla Hassan', loc:'Kuwait 🇰🇼', service:'Verified Badge', before:'—', after:'✅ Gold Badge', stars:5, msg:'Got my gold badge! The team guided me every step of the way.', color:'#fb923c', bg:'#180900'},
                  {name:'Omar Farooq', loc:'Manama, Bahrain 🇧🇭', service:'100K Score Account', before:'0', after:'102K score', stars:5, msg:'Super fast delivery, account is clean and ready to use!', color:'#38bdf8', bg:'#001520'},
                  {name:'Noura Al-Said', loc:'Muscat, Oman 🇴🇲', service:'Follower Increase 20K', before:'1.2K', after:'21.5K', stars:5, msg:'Real followers, no drops! My reach increased 10x. Amazing!', color:'#fb7185', bg:'#150010'},
                ].map((card,i)=>(
                  <motion.div key={i}
                    initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*0.1,type:'spring',stiffness:150}}
                    whileHover={{y:-6,scale:1.02}}
                    className="rounded-2xl overflow-hidden relative group"
                    style={{background:isDark?card.bg:'white', border:`1.5px solid ${card.color}30`, boxShadow:isDark?`0 4px 30px ${card.color}15,0 0 0 1px ${card.color}15 inset`:'0 4px 20px rgba(0,0,0,0.08)'}}>
                    {isDark && <motion.div animate={{opacity:[0.15,0.4,0.15]}} transition={{duration:3+i*0.4,repeat:Infinity}}
                      className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl pointer-events-none" style={{background:card.color}}/>}

                    {/* Header */}
                    <div className="p-5 border-b" style={{borderColor:`${card.color}20`}}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm" style={{background:card.color}}>
                          {card.name[0]}
                        </div>
                        <div>
                          <div className={`font-black text-sm ${isDark?'text-white':'text-gray-900'}`}>{card.name}</div>
                          <div className={`text-xs ${isDark?'text-gray-500':'text-gray-400'}`}>{card.loc}</div>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(card.stars)].map((_,si)=><Star key={si} className="w-3 h-3 fill-snap-yellow text-snap-yellow"/>)}
                        </div>
                      </div>
                      <div className="text-xs font-black uppercase tracking-widest px-2 py-1 rounded-full inline-block" style={{background:`${card.color}20`,color:card.color}}>
                        {card.service}
                      </div>
                    </div>

                    {/* Before/After */}
                    <div className="px-5 py-3 grid grid-cols-2 gap-3 border-b" style={{borderColor:`${card.color}15`}}>
                      <div className={`p-3 rounded-xl text-center ${isDark?'bg-white/3':'bg-gray-50'}`}>
                        <div className={`text-xs font-bold mb-1 ${isDark?'text-gray-500':'text-gray-400'}`}>{lang==='ar'?'قبل':'Before'}</div>
                        <div className={`font-black text-sm ${isDark?'text-gray-300':'text-gray-600'}`}>{card.before}</div>
                      </div>
                      <div className="p-3 rounded-xl text-center" style={{background:`${card.color}15`}}>
                        <div className="text-xs font-bold mb-1" style={{color:card.color}}>{lang==='ar'?'بعد':'After'}</div>
                        <div className="font-black text-sm" style={{color:card.color}}>{card.after}</div>
                      </div>
                    </div>

                    {/* Review */}
                    <div className="p-5">
                      <p className={`text-sm leading-relaxed italic ${isDark?'text-gray-400':'text-gray-600'}`}>"{card.msg}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.button whileHover={{scale:1.04}} onClick={()=>openWhatsApp('Hello! I want to boost my Snapchat.')}
                  className="px-10 py-4 bg-snap-yellow text-black font-black rounded-2xl shadow-[0_8px_30px_rgba(255,220,0,0.3)] inline-flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5"/>
                  {lang==='ar'?'اطلب خدمتك الآن':'Order Your Service Now'}
                </motion.button>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════ LOYALTY & AFFILIATE PAGE ══════════════ */}
        {view === 'loyalty' && (
          <section className={`pt-36 pb-24 px-6 min-h-screen ${isDark?'bg-[#06060f]':'bg-white'}`}>
            <div className="max-w-5xl mx-auto">
              <div className="mb-8"><BackButton onClick={()=>setView('home')} lang={lang}/></div>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 border bg-snap-yellow/10 border-snap-yellow/30 text-snap-yellow">
                  🎁 {lang==='ar'?'برنامج الولاء':'Loyalty & Affiliate'}
                </span>
                <h1 className={`text-4xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${isDark?'text-white':'text-gray-900'}`}>
                  {lang==='ar'?'اكسب مع كل إحالة':'Earn With Every Referral'}
                </h1>
                <p className={`text-lg ${isDark?'text-gray-400':'text-gray-500'}`}>{lang==='ar'?'شارك وكسب — كلما أحلت أصدقاء، كسبت أكثر':'Share & earn — the more you refer, the more you earn'}</p>
              </motion.div>

              {/* Loyalty Tiers */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {tier:'Bronze', icon:'🥉', commission:'10%', orders:'1-5', perks:['10% on every referral','WhatsApp priority support','Exclusive deals'], color:'#cd7f32', bg:isDark?'#1a0e00':'#fff8f0'},
                  {tier:'Silver', icon:'🥈', commission:'15%', orders:'6-20', perks:['15% on every referral','Free score checker tool','Monthly bonus rewards'], color:'#a8a8a8', bg:isDark?'#111114':'#f8f8f8', popular:true},
                  {tier:'Gold', icon:'🥇', commission:'20%', orders:'21+', perks:['20% on every referral','Dedicated account manager','Priority order processing'], color:'#facc15', bg:isDark?'#1a1400':'#fffbeb'},
                ].map((t,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*0.12}}
                    whileHover={{y:-6}} className="rounded-2xl overflow-hidden relative"
                    style={{background:t.bg, border:`2px solid ${t.color}${t.popular?'90':'40'}`, boxShadow:t.popular?`0 8px 40px ${t.color}25`:undefined}}>
                    {t.popular && <div className="absolute top-0 inset-x-0 h-0.5" style={{background:`linear-gradient(90deg,transparent,${t.color},transparent)`}}/>}
                    {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black" style={{background:t.color}}>Most Popular</div>}
                    <div className="p-7 text-center">
                      <div className="text-5xl mb-3">{t.icon}</div>
                      <h3 className={`text-2xl font-black mb-1 ${isDark?'text-white':'text-gray-900'}`}>{t.tier}</h3>
                      <div className="text-4xl font-black mb-1" style={{color:t.color}}>{t.commission}</div>
                      <div className={`text-xs mb-5 ${isDark?'text-gray-500':'text-gray-400'}`}>{lang==='ar'?'عمولة على كل إحالة':'commission per referral'} • {t.orders} {lang==='ar'?'طلبات':'orders'}</div>
                      <div className="space-y-2 mb-6">
                        {t.perks.map((p,pi)=>(
                          <div key={pi} className={`flex items-center gap-2 text-sm ${isDark?'text-gray-300':'text-gray-600'}`}>
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{color:t.color}}/>{p}
                          </div>
                        ))}
                      </div>
                      <button onClick={()=>openWhatsApp(`Hello! I want to join the ${t.tier} affiliate program.`)}
                        className="w-full py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                        style={{background:t.color, color:['Silver'].includes(t.tier)?'#111':'black'}}>
                        {lang==='ar'?'انضم الآن':'Join Now'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* How it works */}
              <div className={`rounded-2xl p-8 border ${isDark?'bg-white/3 border-white/8':'bg-gray-50 border-gray-200'}`}>
                <h3 className={`text-2xl font-black mb-6 text-center ${isDark?'text-white':'text-gray-900'}`}>{lang==='ar'?'كيف يعمل البرنامج؟':'How Does It Work?'}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {step:'1', icon:'🔗', title:lang==='ar'?'احصل على رابطك':'Get Your Link', desc:lang==='ar'?'تواصل معنا عبر واتساب للحصول على رابط إحالتك الخاص':'Contact us on WhatsApp to get your unique referral link'},
                    {step:'2', icon:'📤', title:lang==='ar'?'شارك مع أصدقائك':'Share With Friends', desc:lang==='ar'?'شارك الرابط مع مجموعاتك وأصدقائك الراغبين في الخدمة':'Share the link with your groups and friends interested in the service'},
                    {step:'3', icon:'💰', title:lang==='ar'?'اكسب عمولتك':'Earn Commission', desc:lang==='ar'?'تلقّ عمولتك فور اكتمال أي طلب عبر رابطك':'Receive your commission instantly when any order completes via your link'},
                  ].map((s,i)=>(
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 bg-snap-yellow rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-[0_4px_20px_rgba(255,220,0,0.3)]">{s.icon}</div>
                      <div className="w-7 h-7 bg-snap-yellow/20 border-2 border-snap-yellow/50 rounded-full flex items-center justify-center text-snap-yellow font-black text-sm mx-auto -mt-2 mb-3">{s.step}</div>
                      <h4 className={`font-black mb-2 ${isDark?'text-white':'text-gray-900'}`}>{s.title}</h4>
                      <p className={`text-sm leading-relaxed ${isDark?'text-gray-500':'text-gray-500'}`}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-10">
                <motion.button whileHover={{scale:1.04}} onClick={()=>openWhatsApp('Hello! I want to join the Loyalty & Affiliate program!')}
                  className="px-10 py-4 bg-snap-yellow text-black font-black rounded-2xl shadow-[0_8px_30px_rgba(255,220,0,0.3)] inline-flex items-center gap-3">
                  <WhatsAppIcon className="w-5 h-5"/>
                  {lang==='ar'?'انضم للبرنامج الآن':'Join The Program Now'}
                </motion.button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ══════════════ AUTHORITY / GLOBAL MAP SECTION ══════════════ */}
      {view === 'home' && (
        <section className={`py-24 px-6 relative overflow-hidden ${isDark?'bg-[#06060f]':'bg-gray-50'}`}>
          <div className={`absolute inset-x-0 top-0 h-px ${isDark?'bg-gradient-to-r from-transparent via-snap-yellow/30 to-transparent':'bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent'}`}/>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border ${isDark?'bg-snap-yellow/8 border-snap-yellow/25 text-snap-yellow':'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                🌍 {lang==='ar'?'حضور عالمي':'Global Presence'}
              </span>
              <h2 className={`text-3xl lg:text-5xl font-black uppercase tracking-tight mb-3 ${isDark?'text-white':'text-gray-900'}`}>
                {lang==='ar'?'نخدم عملاء في كل مكان':'We Serve Clients Everywhere'}
              </h2>
              <p className={`${isDark?'text-gray-500':'text-gray-500'}`}>{lang==='ar'?'عملاء نشطون الآن حول العالم':'Active clients right now around the world'}</p>
            </motion.div>

            {/* SVG World Map with yellow dots */}
            <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              className={`relative rounded-3xl overflow-hidden mb-10 border ${isDark?'bg-[#0a0a18] border-white/5':'bg-white border-gray-200 shadow-sm'}`}
              style={{height:'320px'}}>

              {/* Simple SVG world outline */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20" style={{color: isDark?'#facc15':'#ca8a04'}}>
                <path fill="currentColor" d="M150,120 Q180,100 220,110 Q260,120 280,140 Q300,160 290,180 Q280,200 260,210 Q240,220 210,215 Q180,210 160,195 Q140,180 140,160 Q140,140 150,120Z"/>
                <path fill="currentColor" d="M310,80 Q370,60 430,70 Q490,80 520,100 Q550,120 545,150 Q540,180 510,195 Q480,210 440,215 Q400,220 370,205 Q340,190 325,170 Q310,150 310,120 Q310,100 310,80Z"/>
                <path fill="currentColor" d="M420,220 Q440,215 460,225 Q480,235 485,255 Q490,275 475,290 Q460,305 435,305 Q410,305 395,290 Q380,275 385,255 Q390,235 420,220Z"/>
                <path fill="currentColor" d="M530,120 Q570,100 620,105 Q670,110 700,130 Q730,150 725,180 Q720,210 690,225 Q660,240 625,240 Q590,240 565,220 Q540,200 535,175 Q530,150 530,120Z"/>
                <path fill="currentColor" d="M700,200 Q730,190 760,200 Q790,210 800,235 Q810,260 795,280 Q780,300 750,305 Q720,310 698,295 Q676,280 673,258 Q670,236 700,200Z"/>
                <path fill="currentColor" d="M760,100 Q800,85 850,90 Q900,95 930,120 Q960,145 955,175 Q950,205 920,220 Q890,235 850,232 Q810,229 785,208 Q760,187 758,160 Q756,133 760,100Z"/>
                <path fill="currentColor" d="M820,240 Q845,230 870,240 Q895,250 900,270 Q905,290 888,305 Q871,320 845,318 Q819,316 808,300 Q797,284 820,240Z"/>
              </svg>

              {/* Animated yellow dots for cities */}
              {[
                {x:'22%', y:'35%', city:'New York', active:19, delay:0},
                {x:'38%', y:'25%', city:'London', active:15, delay:0.4},
                {x:'48%', y:'32%', city:'Riyadh', active:32, delay:0.8},
                {x:'52%', y:'40%', city:'Dubai', active:18, delay:1.2},
                {x:'62%', y:'38%', city:'Mumbai', active:11, delay:1.6},
                {x:'78%', y:'30%', city:'Singapore', active:9, delay:2.0},
                {x:'30%', y:'55%', city:'São Paulo', active:7, delay:2.4},
                {x:'88%', y:'58%', city:'Sydney', active:6, delay:2.8},
              ].map((dot,i)=>(
                <div key={i} className="absolute" style={{left:dot.x, top:dot.y, transform:'translate(-50%,-50%)'}}>
                  {/* Pulse rings */}
                  <motion.div animate={{scale:[1,2.5,1], opacity:[0.6,0,0.6]}}
                    transition={{duration:2.5, repeat:Infinity, delay:dot.delay, ease:'easeOut'}}
                    className="absolute inset-0 rounded-full bg-snap-yellow"/>
                  <motion.div animate={{scale:[1,1.8,1], opacity:[0.8,0.1,0.8]}}
                    transition={{duration:2.5, repeat:Infinity, delay:dot.delay+0.3, ease:'easeOut'}}
                    className="absolute inset-0 rounded-full bg-snap-yellow"/>
                  {/* Core dot */}
                  <div className="relative w-3 h-3 rounded-full bg-snap-yellow shadow-[0_0_12px_rgba(255,220,0,0.8)] z-10"/>
                  {/* Label */}
                  <motion.div animate={{opacity:[0.7,1,0.7]}} transition={{duration:3, repeat:Infinity, delay:dot.delay}}
                    className="absolute left-5 -top-1 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-lg whitespace-nowrap z-20 pointer-events-none">
                    <span className="text-white text-[10px] font-black">{dot.city}</span>
                    <span className="text-snap-yellow text-[10px] font-black ml-1">{dot.active}</span>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Active cities stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {city:'Riyadh 🇸🇦', active:32, trend:'+5 today'},
                {city:'Dubai 🇦🇪', active:18, trend:'+3 today'},
                {city:'London 🇬🇧', active:15, trend:'+2 today'},
                {city:'New York 🇺🇸', active:19, trend:'+4 today'},
              ].map((c,i)=>(
                <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  whileHover={{y:-4,scale:1.03}}
                  className={`p-4 rounded-2xl border text-center relative overflow-hidden ${isDark?'bg-[#0a0a18] border-white/8':'bg-white border-gray-200 shadow-sm'}`}>
                  {isDark && <motion.div animate={{opacity:[0.1,0.25,0.1]}} transition={{duration:3+i,repeat:Infinity}}
                    className="absolute inset-0 rounded-2xl" style={{background:'radial-gradient(circle,rgba(255,220,0,0.12) 0%,transparent 70%)'}}/>}
                  <div className={`text-sm font-black mb-1 ${isDark?'text-white':'text-gray-800'}`}>{c.city}</div>
                  <div className="text-snap-yellow font-black text-lg">{lang==='ar'?'نشط':'Active'}: {c.active}</div>
                  <motion.div animate={{opacity:[0.6,1,0.6]}} transition={{duration:2,repeat:Infinity,delay:i*0.4}}
                    className="text-xs text-green-400 font-bold mt-1 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"/>
                    {c.trend}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════ AI CHAT WIDGET ══════════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Chat Window */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{opacity:0, scale:0.85, y:20}}
              animate={{opacity:1, scale:1, y:0}}
              exit={{opacity:0, scale:0.85, y:20}}
              transition={{type:'spring', stiffness:300, damping:26}}
              className="w-80 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border"
              style={{background:isDark?'#0d0d1a':'white', borderColor:isDark?'rgba(255,220,0,0.2)':'#e5e7eb'}}
            >
              {/* Chat header */}
              <div className="px-5 py-4 flex items-center gap-3" style={{background:'linear-gradient(135deg,#1a1200,#0d0d00)'}}>
                <div className="w-9 h-9 rounded-full bg-snap-yellow flex items-center justify-center text-black font-black text-base shadow-[0_0_15px_rgba(255,220,0,0.4)]">
                  👻
                </div>
                <div>
                  <div className="text-white font-black text-sm">SnapBot AI</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                    <span className="text-green-400 text-xs font-bold">Online 24/7</span>
                  </div>
                </div>
                <button onClick={()=>setIsChatOpen(false)} className="ml-auto text-gray-400 hover:text-white transition-colors">✕</button>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3" style={{scrollbarWidth:'thin'}}>
                {chatMessages.map((msg,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                    className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role==='user'
                        ? 'bg-snap-yellow text-black rounded-br-sm'
                        : isDark ? 'bg-white/8 text-gray-200 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className={`px-4 py-3 border-t flex gap-2 ${isDark?'border-white/8':'border-gray-200'}`}>
                <input
                  value={chatInput}
                  onChange={e=>setChatInput(e.target.value)}
                  onKeyDown={e=>{
                    if(e.key==='Enter' && chatInput.trim()){
                      const userMsg = chatInput.trim();
                      setChatInput('');
                      setChatMessages(prev=>[...prev,{role:'user',text:userMsg}]);
                      // Smart bot responses
                      setTimeout(()=>{
                        const lower = userMsg.toLowerCase();
                        let reply = '';
                        if(lower.includes('price')||lower.includes('cost')||lower.includes('how much')||lower.includes('سعر')||lower.includes('كم'))
                          reply = '💰 Our prices start from $10 for Score Boost, $45 for Follower Accounts. Check our catalog for full pricing!';
                        else if(lower.includes('safe')||lower.includes('ban')||lower.includes('امان')||lower.includes('حظر'))
                          reply = '🛡️ 100% safe! We use human-like methods. 10,000+ happy clients with zero bans. We have a 14-day guarantee!';
                        else if(lower.includes('time')||lower.includes('fast')||lower.includes('deliver')||lower.includes('وقت')||lower.includes('سرعة'))
                          reply = '⚡ Super fast! Score boosts: 1-48 hours. Account delivery: 1-24 hours. We are the fastest in the region!';
                        else if(lower.includes('password')||lower.includes('كلمة المرور'))
                          reply = '🔑 Only Score Boosting requires your password (temporary access). All other services — NO password needed!';
                        else if(lower.includes('hello')||lower.includes('hi')||lower.includes('مرحبا')||lower.includes('السلام'))
                          reply = '👋 Hello! Welcome to SnapScore Store. How can I help you? Ask me about pricing, services, or safety!';
                        else if(lower.includes('whatsapp')||lower.includes('contact')||lower.includes('واتساب'))
                          reply = `📱 You can reach us directly on WhatsApp: ${WHATSAPP_NUMBER} — we reply within minutes!`;
                        else
                          reply = '🤔 Great question! For detailed info, contact us on WhatsApp for instant support. We\'re always here! 😊';
                        setChatMessages(prev=>[...prev,{role:'bot',text:reply}]);
                      }, 800);
                    }
                  }}
                  placeholder={lang==='ar'?'اسأل SnapBot...':'Ask SnapBot...'}
                  className={`flex-1 text-sm px-3 py-2 rounded-xl outline-none font-medium ${isDark?'bg-white/8 text-white placeholder:text-gray-600 border border-white/8':'bg-gray-100 text-gray-800 placeholder:text-gray-400 border border-gray-200'}`}
                />
                <button
                  onClick={()=>{
                    if(chatInput.trim()){
                      const userMsg = chatInput.trim();
                      setChatInput('');
                      setChatMessages(prev=>[...prev,{role:'user',text:userMsg}]);
                      setTimeout(()=>{
                        setChatMessages(prev=>[...prev,{role:'bot',text:'💬 Got it! For the best answer, contact us on WhatsApp and our team will help you instantly!'}]);
                      },600);
                    }
                  }}
                  className="w-9 h-9 bg-snap-yellow rounded-xl flex items-center justify-center text-black flex-shrink-0 hover:scale-110 transition-transform shadow-[0_4px_12px_rgba(255,220,0,0.3)]"
                >
                  <Send className="w-4 h-4"/>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <motion.button
          onClick={()=>setIsChatOpen(!isChatOpen)}
          whileHover={{scale:1.1}}
          whileTap={{scale:0.95}}
          animate={!isChatOpen ? {y:[0,-6,0]} : {}}
          transition={!isChatOpen ? {duration:2, repeat:Infinity, ease:'easeInOut'} : {}}
          className="w-16 h-16 rounded-full bg-snap-yellow text-black flex items-center justify-center shadow-[0_8px_30px_rgba(255,220,0,0.5)] relative"
        >
          <AnimatePresence mode="wait">
            {isChatOpen
              ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} className="text-2xl font-black">✕</motion.span>
              : <motion.span key="ghost" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="text-2xl">👻</motion.span>
            }
          </AnimatePresence>
          {/* Notification dot */}
          {!isChatOpen && (
            <motion.div animate={{scale:[1,1.3,1]}} transition={{duration:1.5,repeat:Infinity}}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-black">
              1
            </motion.div>
          )}
        </motion.button>
      </div>

      <footer className="footer-gradient pt-32 pb-12 px-6 relative overflow-hidden">
        {/* Footer Background Mesh */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-snap-yellow blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img 
                    src="https://freesnapscores.com/assets/logo.svg" 
                    alt="SnapScore Store" 
                    className="w-12 h-12 relative z-10 drop-shadow-[0_0_15px_rgba(255,252,0,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-snap-yellow via-white to-snap-yellow bg-clip-text text-transparent uppercase animate-gradient-x drop-shadow-[0_0_10px_rgba(255,252,0,0.3)]">
                  {lang === 'ar' ? 'سناب سكور ستور' : 'SnapScore Store'}
                </span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed">
                {lang === 'ar' 
                  ? 'المزود الرائد عالمياً لخدمات نمو سناب شات. نحن نساعدك على بناء حضور قوي وموثوق بأمان تام.' 
                  : 'The world\'s leading provider of Snapchat growth services. We help you build a strong and credible presence safely.'}
              </p>
              <div className="flex gap-4">
                {['twitter', 'instagram', 'facebook'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-snap-yellow hover:text-black transition-all duration-300">
                    <Star className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-snap-yellow">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
              <ul className="space-y-4">
                <li><a href="#catalog" className="text-gray-400 hover:text-snap-yellow transition-colors font-bold">{t.nav.catalog}</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-snap-yellow transition-colors font-bold">{t.nav.services}</a></li>
                <li><a href="#tools" className="text-gray-400 hover:text-snap-yellow transition-colors font-bold">{t.nav.tools}</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-snap-yellow transition-colors font-bold">{t.nav.blog}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-snap-yellow">{lang === 'ar' ? 'خدماتنا' : 'Our Services'}</h4>
              <ul className="space-y-4">
                {t.nav.serviceItems.map((item) => (
                  <li key={item.id}><a href="#" className="text-gray-400 hover:text-snap-yellow transition-colors font-bold">{item.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 uppercase tracking-widest text-snap-yellow">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 font-bold">
                  <WhatsAppIcon className="w-5 h-5 text-snap-yellow" />
                  <span>{WHATSAPP_NUMBER}</span>
                </li>
                <li className="text-gray-400 font-bold">
                  {lang === 'ar' ? 'متاحون 24/7 للمساعدة' : 'Available 24/7 for support'}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-snap-yellow/20 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-snap-yellow/10 via-transparent to-snap-yellow/10 p-8 rounded-[2rem] shadow-[0_0_40px_rgba(255,252,0,0.05)]">
            <div className="text-gray-400 text-sm font-bold flex flex-col gap-2">
              <div className="text-white">{t.footer.rights}</div>
              <div className="opacity-70 flex items-center gap-2">
                <div className="w-5 h-5 bg-snap-yellow rounded-md flex items-center justify-center">
                  <Star className="text-black w-3 h-3 fill-black" />
                </div>
                <span className="text-xs">We are not affiliated with Snapchat Inc.</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-snap-yellow hover:text-black transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-snap-yellow hover:text-black transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-snap-yellow hover:text-black transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-snap-yellow hover:text-black transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-snap-yellow hover:text-black transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            <div className="flex gap-8 text-xs font-bold text-gray-500">
              <button 
                onClick={() => {
                  setView('privacy');
                  window.scrollTo(0, 0);
                }} 
                className="hover:text-snap-yellow transition-colors"
              >
                {t.footer.privacy}
              </button>
              <button 
                onClick={() => {
                  setView('terms');
                  window.scrollTo(0, 0);
                }} 
                className="hover:text-snap-yellow transition-colors"
              >
                {t.footer.terms}
              </button>
            </div>
            </div>
          </div>
        </div>
      </footer>

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
