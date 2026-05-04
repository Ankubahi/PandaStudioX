// data.js — PandaStudioX complete site data

export const BRAND = {
  name:       "PandaStudioX",
  tagline:    "Turn Views Into Clicks",
  usp:        "6-Hour Express Delivery Guaranteed",
  email:      "pandaankit2007@gmail.com",
  phone:      "+91 8082646863",
  whatsapp:   "918082646863",
  upi:        "pandaankit@upi",
  instagram:  "@pandastudiox",
  discord:    "discord.gg/pandastudiox",
  youtube:    "@pandastudiox",
  maxOrders:  10,
  adminPass:  "admin123", // change before going live!
};

// ── Thumbnail portfolio ────────────────────────────────────
export const THUMBS = [
  { id:1,  cat:"minecraft", text:"RICHEST",        sub:"MINECRAFT SMP",   e:"⛏️", v:"2.4M",  bg:["#0a1d0a","#124f12"], ac:"#FFB700" },
  { id:2,  cat:"minecraft", text:"BASE RAID",       sub:"FIREMC 🏰",       e:"💀", v:"890K",  bg:["#110825","#28005a"], ac:"#AE44FF" },
  { id:3,  cat:"minecraft", text:"₹1 → ₹1M",       sub:"MINECRAFT",       e:"💰", v:"5.6M",  bg:["#160000","#340000"], ac:"#FFB700" },
  { id:4,  cat:"minecraft", text:"EVERYTHING OP",   sub:"CHALLENGE",       e:"⚡", v:"1.2M",  bg:["#001616","#003a3a"], ac:"#00D4FF" },
  { id:5,  cat:"gta5",      text:"HEIST GONE",      sub:"WRONG 💀",        e:"🔫", v:"5.1M",  bg:["#04040e","#0c0c26"], ac:"#FF2055" },
  { id:6,  cat:"gta5",      text:"RICHEST EVER",    sub:"GTA RP",          e:"🚗", v:"3.2M",  bg:["#0c0800","#201400"], ac:"#FFB700" },
  { id:7,  cat:"gta5",      text:"WANTED ★★★★★",   sub:"24 HOURS",        e:"🚔", v:"4.4M",  bg:["#060600","#141400"], ac:"#FF8C00" },
  { id:8,  cat:"bgmi",      text:"SOLO vs SQUAD",   sub:"BGMI 🏆",         e:"🎯", v:"1.8M",  bg:["#02060c","#081424"], ac:"#00D4FF" },
  { id:9,  cat:"bgmi",      text:"CONQUEROR",       sub:"₹100 PHONE",      e:"📱", v:"4.5M",  bg:["#100500","#240c00"], ac:"#FF8C00" },
  { id:10, cat:"freefire",  text:"SURVIVED",        sub:"100 PLAYERS 🔥",  e:"🔥", v:"6.2M",  bg:["#120300","#320900"], ac:"#FFB700" },
  { id:11, cat:"freefire",  text:"LEGENDARY",       sub:"RANK PUSH 👑",    e:"👑", v:"2.9M",  bg:["#100024","#30006a"], ac:"#AE44FF" },
  { id:12, cat:"vlog",      text:"₹10,000",         sub:"IN ONE DAY",      e:"💸", v:"1.3M",  bg:["#030303","#101010"], ac:"#FFB700" },
  { id:13, cat:"vlog",      text:"MY STORY",        sub:"CREATOR VLOG",    e:"📷", v:"680K",  bg:["#0a0014","#1e0038"], ac:"#FF2055" },
  { id:14, cat:"trading",   text:"₹50K PROFIT",     sub:"DAY TRADING",     e:"📈", v:"3.7M",  bg:["#001020","#001c38"], ac:"#00FF7A" },
  { id:15, cat:"trading",   text:"CRASH ALERT",     sub:"MY STRATEGY",     e:"📉", v:"2.1M",  bg:["#140000","#280000"], ac:"#FF2055" },
  { id:16, cat:"course",    text:"PYTHON",          sub:"7 DAYS COURSE",   e:"🐍", v:"5.8M",  bg:["#001224","#002050"], ac:"#00FF7A" },
  { id:17, cat:"course",    text:"₹1 LAKH/MONTH",   sub:"FREELANCING",     e:"💻", v:"4.2M",  bg:["#0a0a00","#181800"], ac:"#FFB700" },
  { id:18, cat:"shorts",    text:"MIND BLOWN",      sub:"#SHORTS",         e:"🤯", v:"12M",   bg:["#140026","#2c0058"], ac:"#AE44FF" },
  { id:19, cat:"shorts",    text:"WAIT FOR IT",     sub:"#SHORTS",         e:"😱", v:"8.5M",  bg:["#040404","#0e0e0e"], ac:"#00D4FF" },
  { id:20, cat:"reaction",  text:"REACTING TO",     sub:"VIRAL VIDEOS",    e:"😂", v:"3.1M",  bg:["#160a00","#2c1400"], ac:"#FF8C00" },
];

export const CATS = [
  { id:"all",       l:"All Work",   i:"🎨", count:20 },
  { id:"minecraft", l:"Minecraft",  i:"⛏️", count:4  },
  { id:"gta5",      l:"GTA 5",      i:"🚗", count:3  },
  { id:"bgmi",      l:"BGMI",       i:"🎯", count:2  },
  { id:"freefire",  l:"Free Fire",  i:"🔥", count:2  },
  { id:"vlog",      l:"Vlog",       i:"📷", count:2  },
  { id:"trading",   l:"Trading",    i:"📈", count:2  },
  { id:"course",    l:"Course",     i:"📚", count:2  },
  { id:"shorts",    l:"Shorts",     i:"⚡", count:2  },
  { id:"reaction",  l:"Reaction",   i:"😂", count:1  },
];

// ── Packages ───────────────────────────────────────────────
export const PKGS = [
  {
    id:"starter", n:"STARTER", p:99, pop:false, c:"#4FC3F7", ic:"⚡",
    del:"24–48 hrs", rev:1, badge:null,
    desc:"Perfect for new creators getting started.",
    feats:[
      "1 Custom Thumbnail",
      "Basic effects & text styling",
      "1 Free revision",
      "1080p PNG output",
      "Email + Drive delivery",
    ],
    notIncluded:["Source file (.psd)","4K output","A/B version"],
  },
  {
    id:"standard", n:"STANDARD", p:249, pop:true, c:"#FF2055", ic:"🔥",
    del:"12–24 hrs", rev:3, badge:"MOST POPULAR",
    desc:"Best value — chosen by most creators.",
    feats:[
      "1 Custom Thumbnail",
      "Advanced effects + glow layers",
      "3 Free revisions",
      "1080p PNG + transparent version",
      "Priority support via WhatsApp",
      "Competitor thumbnail research",
    ],
    notIncluded:["Source file (.psd)","4K output"],
  },
  {
    id:"premium", n:"PREMIUM", p:499, pop:false, c:"#FFB700", ic:"👑",
    del:"6–12 hrs", rev:-1, badge:"BEST QUALITY",
    desc:"For serious creators who demand the best.",
    feats:[
      "2 Custom Thumbnails",
      "Cinematic pro effects",
      "Unlimited revisions",
      "4K PNG + source file (.psd)",
      "A/B variant for split testing",
      "CTR performance tips",
      "1-week priority support",
    ],
    notIncluded:[],
  },
  {
    id:"bulk", n:"BULK PACK", p:1499, pop:false, c:"#AE44FF", ic:"🚀",
    del:"72 hrs total", rev:-1, badge:"BEST VALUE",
    desc:"Monthly bundle for active channels.",
    feats:[
      "10 Custom Thumbnails",
      "Pro effects on all",
      "Unlimited revisions",
      "4K PNG + all source files",
      "Dedicated order manager",
      "Monthly strategy call",
      "Only ₹149 per thumbnail!",
    ],
    notIncluded:[],
  },
];

export const ADDONS = [
  { id:"e12", l:"Express 12hr",        p:75,  desc:"Guaranteed delivery in 12 hours"       },
  { id:"e6",  l:"Urgent 6hr",          p:150, desc:"Top priority — fastest possible queue"  },
  { id:"src", l:"Source File (.psd)",   p:99,  desc:"Full editable Photoshop source file"   },
  { id:"ab",  l:"A/B Version",         p:79,  desc:"2 variants to split-test your CTR"     },
  { id:"mob", l:"Mobile Crop (9:16)",   p:49,  desc:"Shorts & Reels optimised version"      },
  { id:"fb",  l:"Facebook Cover",       p:39,  desc:"Optimised for Facebook thumbnail size" },
];

export const COUPONS = {
  "PANDA10":  { pct:10, label:"10% OFF — Welcome Discount"  },
  "FIRST20":  { pct:20, label:"20% OFF — First Order Special"},
  "GAMING15": { pct:15, label:"15% OFF — Gamer Special"     },
  "BULK30":   { pct:30, label:"30% OFF — Bulk Order Deal"   },
};

// ── Style categories ───────────────────────────────────────
export const STYLE_CATS = [
  { id:"mrbeast",  n:"MrBeast Style",   i:"🌟", c:"#FFB700",
    d:"Bold, colourful, face-forward. Maximum emotion. Designed to go viral.",
    k:["Bold text","Face zoom","Bright BG","Arrow overlays"], p:"₹199+",
    bestFor:["Challenge videos","Giveaways","Viral content"] },
  { id:"gaming",   n:"Gaming / Dark",   i:"🎮", c:"#00D4FF",
    d:"Cinematic dark tones, neon glows, aggressive typography.",
    k:["Dark BG","Neon glow","Game renders","Impact type"], p:"₹149+",
    bestFor:["Minecraft","BGMI","GTA 5","Free Fire"] },
  { id:"minimal",  n:"Clean / Minimal", i:"✨", c:"#FFFFFF",
    d:"Modern, professional, soft gradients. Timeless design.",
    k:["Clean layout","Soft gradient","Whitespace","Serif"], p:"₹149+",
    bestFor:["Finance","Education","Tech","Business vlogs"] },
  { id:"cinema",   n:"Cinematic",       i:"🎬", c:"#FF8C00",
    d:"Movie-poster quality. Dramatic lighting, depth-of-field blur.",
    k:["Movie mood","Dramatic light","Film grain","Widescreen"], p:"₹249+",
    bestFor:["Travel","GTA","Story videos","Action"] },
  { id:"text",     n:"Text Heavy",      i:"💬", c:"#FF2055",
    d:"Typography as design. Punchy headlines that communicate instantly.",
    k:["Big type","High contrast","Impact","Minimal imagery"], p:"₹99+",
    bestFor:["Motivation","Tutorials","Tips","Shorts"] },
  { id:"anime",    n:"Anime / Drawn",   i:"🎌", c:"#AE44FF",
    d:"Custom illustrated anime-style characters and backgrounds.",
    k:["Custom art","Anime style","Vivid colours","Character design"], p:"₹349+",
    bestFor:["Gaming","Entertainment","Manga reviews","Shorts"] },
];

// ── Reviews / Testimonials ─────────────────────────────────
export const REVIEWS = [
  { n:"Arjun Sharma",  h:"@ArjunMCGamer",  av:"🎮", pkg:"Premium",
    txt:"Got my thumbnail in 5 hours! My video went from 200 to 14,000 views in 3 days. Completely changed my channel.",
    ctr:"+218%", stars:5 },
  { n:"Priya Kapoor",  h:"@PriyaCreates",  av:"📸", pkg:"Standard",
    txt:"3 revisions, so patient. My CTR jumped from 3.2% to 7.8%. The quality is genuinely professional.",
    ctr:"+144%", stars:5 },
  { n:"Rahul Dev",     h:"@RahulGames",    av:"⚡", pkg:"Bulk Pack",
    txt:"Ordered Bulk Pack for my BGMI series. 10 incredible thumbnails in 2 days. Insane ROI, ordering again.",
    ctr:"+95%",  stars:5 },
  { n:"Sneha Patel",   h:"@SnehaVlogs",    av:"🌟", pkg:"Standard",
    txt:"Was skeptical at ₹249 but my thumbnail got 55K views on a 1K subs channel. Best investment ever.",
    ctr:"+310%", stars:5 },
  { n:"Karan Dev",     h:"@KaranPlays",    av:"🎯", pkg:"Premium",
    txt:"The before/after difference is insane. My impressions went up 4x the same week. 100% recommend PandaStudioX.",
    ctr:"+180%", stars:5 },
  { n:"Meera Singh",   h:"@MeeraFinance",  av:"💹", pkg:"Standard",
    txt:"Even for finance content the design was perfect — clean, professional, and my CTR doubled in a week.",
    ctr:"+102%", stars:5 },
];

// ── FAQ ────────────────────────────────────────────────────
export const FAQS = [
  { q:"What exactly do I receive after payment?",
    a:"A high-quality PNG thumbnail (+ .psd source file for Premium/Bulk) delivered via Google Drive link to your registered email. Premium orders also include a 4K version and the editable source file." },
  { q:"How fast is delivery really?",
    a:"Starter: 24–48 hrs | Standard: 12–24 hrs | Premium: 6–12 hrs | Bulk: 72 hrs total. Express and Urgent add-ons available at checkout. 97% of orders are delivered on time." },
  { q:"How many revisions do I get?",
    a:"Starter: 1 revision | Standard: 3 revisions | Premium & Bulk: Unlimited revisions. Minor tweaks (text wording, colour tweak) don't count as revisions. Major redesigns (completely different concept) may need a new order." },
  { q:"What information do I need to provide?",
    a:"Video title, thumbnail text (1–4 words), style preference, emotion you want to convey, target audience, and any reference links or competitor videos. The order form guides you step by step — takes under 2 minutes." },
  { q:"Do you use templates?",
    a:"Never. Every single design is created from scratch, unique to your channel. We never reuse or re-sell client work." },
  { q:"What is the refund policy?",
    a:"Full refund is available only if we completely fail to deliver (extremely rare). Once work starts, we offer unlimited revisions instead of refunds. Please read our full Refund Policy for all conditions." },
  { q:"What payment methods do you accept?",
    a:"UPI (GPay, PhonePe, Paytm), Debit/Credit Card, Net Banking. All payments are 100% secure. INR only." },
  { q:"Can I get both YouTube and Shorts/Reels versions?",
    a:"Yes! Add the Mobile 9:16 add-on (₹49) at checkout and we'll deliver both the 16:9 YouTube version and the 9:16 Shorts/Reels version in the same order." },
  { q:"What if I don't like the first version?",
    a:"Request a revision! We'll fix it based on your feedback. Starter gets 1 revision, Standard gets 3, and Premium/Bulk get unlimited until you're happy." },
  { q:"How do I send my payment screenshot?",
    a:"After placing your order you'll get a WhatsApp link. Simply send your payment screenshot there with your Order ID. Work starts within 1 hour of payment confirmation." },
];

// ── Mock orders for admin demo ─────────────────────────────
export const MOCK_ORDERS = [
  { id:"TH-1001", n:"Arjun Sharma",  e:"arjun@g.com",  pkg:"Premium",   title:"Minecraft SMP Day 1",         style:"Gaming/Dark",   status:"delivered", amt:499,  date:"2026-04-29", del:"6-12hr"  },
  { id:"TH-1002", n:"Priya Kapoor",  e:"priya@g.com",  pkg:"Standard",  title:"BGMI Solo Conqueror Push",     style:"Cinematic",     status:"working",   amt:249,  date:"2026-04-30", del:"12-24hr" },
  { id:"TH-1003", n:"Rahul Dev",     e:"rahul@g.com",  pkg:"Starter",   title:"Free Fire 3v1 Clutch Moment", style:"Gaming/Dark",   status:"pending",   amt:99,   date:"2026-05-01", del:"24-48hr" },
  { id:"TH-1004", n:"Sneha Patel",   e:"sneha@g.com",  pkg:"Bulk Pack", title:"10 Gaming Thumbnails Pack",   style:"Various",       status:"working",   amt:1499, date:"2026-05-01", del:"72hr"    },
  { id:"TH-1005", n:"Karan Dev",     e:"karan@g.com",  pkg:"Standard",  title:"GTA RP — Became Richest",     style:"Cinematic",     status:"delivered", amt:249,  date:"2026-04-28", del:"12-24hr" },
  { id:"TH-1006", n:"Meera Singh",   e:"meera@g.com",  pkg:"Premium",   title:"Stock Market Crash Strategy", style:"Clean/Minimal", status:"pending",   amt:499,  date:"2026-05-02", del:"6-12hr"  },
];

export const REVENUE_MONTHLY = [
  { month:"Jan", amt:8400  },
  { month:"Feb", amt:11200 },
  { month:"Mar", amt:14600 },
  { month:"Apr", amt:18900 },
  { month:"May", amt:22400 },
];

// Form options
export const PLATFORMS = [
  "YouTube (16:9)","YouTube Shorts (9:16)","Instagram Reels (9:16)",
  "Instagram Post (1:1)","Facebook (16:9)","Twitter / X",
];
export const STYLES_OPT = [
  "Gaming / Dark","MrBeast Style","Clean / Minimal",
  "Cinematic","Text Heavy","Anime / Drawn","Custom (describe below)",
];
export const EMOTIONS = [
  "😱 Shock / Surprise","😁 Excitement / Hype","🤔 Curiosity / Mystery",
  "😨 Fear / Suspense","😡 Intense / Aggressive","😂 Funny / Cringe",
  "💪 Epic / Motivation","😢 Emotional / Dramatic",
];
export const AUDIENCES = [
  "Teens (13-17)","Young Adults (18-24)","Gamers",
  "General Viewers","Finance / Business","Education","Kids (6-12)","Fitness / Health",
];
