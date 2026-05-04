import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   PANDASTUDIOX v4.0 — Complete Single-File Edition
   ✅ Zero hooks inside .map() — every card is a real component
   ✅ All hooks called at component top-level only
   ✅ Form validation on steps 2 & 3
   ✅ Real daily countdown + slot tracker (localStorage)
   ✅ Coupon system: PANDA10 / FIRST20 / GAMING15 / BULK30
   ✅ Admin panel: orders, analytics, audit, settings
   ✅ Before/After comparison, Contact form, Lead magnet
   ✅ WhatsApp + FAB floating buttons
   ✅ Mobile-responsive
   ═══════════════════════════════════════════════════════════ */

/* ─── FONTS + GLOBAL CSS ───────────────────────────────────── */
const FONT_URL = "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Outfit:wght@300;400;500;600;700;800;900&display=swap";

const G = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#060610;color:#fff;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.6}
a{color:inherit;text-decoration:none}
button{cursor:pointer;font-family:'Outfit',sans-serif}
input,textarea,select{font-family:'Outfit',sans-serif;outline:none;transition:border-color .18s,box-shadow .18s}
input:focus,textarea:focus,select:focus{border-color:var(--red)!important;box-shadow:0 0 0 3px var(--red-sm)}
:root{
  --ink:#060610;--ink2:#09091a;--deep:#0d0d20;--surface:#101024;
  --card:#131328;--card2:#17173a;--lift:#1c1c38;
  --b1:rgba(255,255,255,.05);--b2:rgba(255,255,255,.09);--b3:rgba(255,255,255,.15);
  --red:#FF1F4E;--red2:#CC1840;--red-g:rgba(255,31,78,.28);--red-sm:rgba(255,31,78,.10);
  --gold:#FFBA00;--gold2:#FF8C00;--gold-g:rgba(255,186,0,.22);
  --cyan:#00CFFF;--cyan-g:rgba(0,207,255,.18);
  --lime:#00FF7A;--lime-g:rgba(0,255,122,.14);
  --purp:#B044FF;--purp-g:rgba(176,68,255,.18);
  --t1:#fff;--t2:#cccce0;--t3:#8080a8;--t4:#3c3c60;
  --fd:'Black Han Sans','Impact',sans-serif;
  --r1:6px;--r2:12px;--r3:18px;--r4:26px;--r5:40px;
  --ease:cubic-bezier(.22,1,.36,1);
}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--ink)}::-webkit-scrollbar-thumb{background:var(--red);border-radius:2px}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes floatB{0%,100%{transform:translateY(-4px)}50%{transform:translateY(8px)}}
@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
@keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes redGlow{0%,100%{box-shadow:0 0 22px var(--red-g)}50%{box-shadow:0 0 46px var(--red-g),0 0 90px var(--red-sm)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes notifIn{0%{opacity:0;transform:translateX(110%)}10%{opacity:1;transform:translateX(0)}82%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(110%)}}
@keyframes countUp{from{opacity:0;transform:scale(.6)translateY(8px)}to{opacity:1;transform:scale(1)translateY(0)}}

.fu{animation:fadeUp .65s var(--ease) both}
.d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}.d4{animation-delay:.4s}.d5{animation-delay:.5s}
.rg{animation:redGlow 2.6s ease-in-out infinite}
.fl{animation:floatA 4.5s ease-in-out infinite}.fl2{animation:floatB 5.5s ease-in-out infinite}

.shimmer{background:linear-gradient(90deg,#fff 20%,var(--gold) 50%,#fff 80%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
.t-red{background:linear-gradient(90deg,var(--red),#ff5077);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.t-gold{background:linear-gradient(90deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gbg{background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:46px 46px}

.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:var(--r2);font-family:'Outfit',sans-serif;font-weight:800;font-size:13px;letter-spacing:.5px;border:none;cursor:pointer;transition:all .22s var(--ease);white-space:nowrap}
.btn:active{transform:scale(.97)!important}
.btn:disabled{opacity:.42;cursor:not-allowed;transform:none!important}
.btn-red{background:linear-gradient(135deg,var(--red),var(--red2));color:#fff;box-shadow:0 4px 20px var(--red-g)}
.btn-red:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 36px var(--red-g)}
.btn-gold{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#000;box-shadow:0 4px 20px var(--gold-g)}
.btn-gold:hover{transform:translateY(-2px) scale(1.02)}
.btn-ghost{background:rgba(255,255,255,.06);color:var(--t2);border:1px solid var(--b2)}
.btn-ghost:hover{background:rgba(255,255,255,.10);color:#fff;border-color:var(--b3)}
.btn-outline{background:transparent;color:var(--red);border:1.5px solid rgba(255,31,78,.35)}
.btn-outline:hover{background:var(--red-sm);border-color:var(--red)}
.btn-sm{padding:7px 14px;font-size:11px}
.btn-lg{padding:15px 38px;font-size:15px}
.btn-xl{padding:17px 48px;font-size:17px;border-radius:var(--r3)}

.ifield{padding:12px 14px;font-size:14px;font-weight:500;border-radius:var(--r2);width:100%;background:var(--deep);border:1.5px solid var(--b2);color:#fff;display:block}
.ifield.err{border-color:var(--red)!important;box-shadow:0 0 0 3px var(--red-sm)}
.iarea{padding:12px 14px;font-size:14px;font-weight:500;border-radius:var(--r2);width:100%;background:var(--deep);border:1.5px solid var(--b2);color:#fff;resize:vertical;min-height:80px;display:block}
.iarea.err{border-color:var(--red)!important;box-shadow:0 0 0 3px var(--red-sm)}
.isel{padding:12px 14px;font-size:14px;border-radius:var(--r2);width:100%;background:var(--deep);border:1.5px solid var(--b2);color:#fff;display:block}
.ilabel{font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:var(--t4);display:block;margin-bottom:7px}
.igroup{margin-bottom:16px}
.ierr{font-size:11px;color:var(--red);margin-top:4px;font-weight:600}

.chip{padding:7px 14px;border-radius:99px;font-size:11px;font-weight:700;cursor:pointer;border:1.5px solid var(--b2);background:transparent;color:var(--t3);transition:all .18s;white-space:nowrap}
.chip.on{border-color:var(--red);color:var(--red);background:var(--red-sm)}
.chip.on2{border-color:var(--gold);color:var(--gold);background:var(--gold-g)}
.chip.on3{border-color:var(--lime);color:var(--lime);background:var(--lime-g)}
.chip:hover:not(.on):not(.on2):not(.on3){border-color:var(--b3);color:var(--t2)}

.card{background:var(--card);border:1px solid var(--b1);border-radius:var(--r3)}
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase}
.br{background:var(--red-sm);color:var(--red);border:1px solid rgba(255,31,78,.2)}
.bg{background:var(--gold-g);color:var(--gold);border:1px solid rgba(255,186,0,.2)}
.bl{background:var(--lime-g);color:var(--lime);border:1px solid rgba(0,255,122,.2)}
.bc{background:var(--cyan-g);color:var(--cyan);border:1px solid rgba(0,207,255,.2)}

.pbar{height:3px;background:var(--b1);border-radius:2px;overflow:hidden}
.pfill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--red),var(--gold));transition:width .4s var(--ease)}
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--b2),transparent)}

.thc{position:relative;border-radius:var(--r3);overflow:hidden;aspect-ratio:16/9;cursor:pointer;transition:all .32s var(--ease);border:2px solid transparent}
.thc:hover{transform:scale(1.04) translateY(-5px)}
.thc-ov{position:absolute;inset:0;background:rgba(6,6,16,.78);opacity:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transition:opacity .28s;backdrop-filter:blur(3px)}
.thc:hover .thc-ov{opacity:1}

.notif{position:fixed;top:74px;right:18px;z-index:3000;background:var(--card2);border:1.5px solid var(--lime);color:var(--lime);padding:12px 18px;border-radius:var(--r3);font-size:13px;font-weight:700;box-shadow:0 8px 28px var(--lime-g);animation:notifIn 4.2s var(--ease) forwards;max-width:295px;line-height:1.5;pointer-events:none}
.notif-err{border-color:var(--red);color:var(--red);box-shadow:0 8px 28px var(--red-sm)}
.notif-info{border-color:var(--cyan);color:var(--cyan);box-shadow:0 8px 28px var(--cyan-g)}

.fab{position:fixed;bottom:22px;right:22px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--red),var(--red2));border:none;color:#fff;font-size:22px;cursor:pointer;z-index:500;box-shadow:0 6px 26px var(--red-g);display:flex;align-items:center;justify-content:center;transition:transform .2s;animation:redGlow 2.5s infinite}
.fab:hover{transform:scale(1.12)}
.wabtn{position:fixed;bottom:86px;right:22px;width:46px;height:46px;border-radius:50%;background:#25D366;border:none;font-size:20px;cursor:pointer;z-index:499;box-shadow:0 4px 16px rgba(37,211,102,.35);display:flex;align-items:center;justify-content:center;transition:transform .2s;text-decoration:none}
.wabtn:hover{transform:scale(1.12)}
.sec{padding:96px 24px}.sec-sm{padding:60px 24px}
.wrap{max-width:1200px;margin:0 auto}
.dt{width:100%;border-collapse:collapse;font-size:12px}
.dt th{padding:9px 13px;text-align:left;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--t4);font-weight:700;border-bottom:1px solid var(--b1)}
.dt td{padding:12px 13px;border-bottom:1px solid rgba(255,255,255,.03);color:var(--t2)}
.dt tr:hover td{background:rgba(255,255,255,.02)}
@media(max-width:960px){.hgrid{grid-template-columns:1fr!important}.hvis{display:none!important}.pgrid{grid-template-columns:1fr 1fr!important}.tgrid{grid-template-columns:1fr 1fr!important}.fgrid{grid-template-columns:1fr 1fr!important}}
@media(max-width:600px){.pgrid{grid-template-columns:1fr!important}.tgrid{grid-template-columns:1fr!important}.fgrid{grid-template-columns:1fr!important}.hm{display:none!important}.srow{grid-template-columns:repeat(3,1fr)!important}.btn-xl{padding:14px 28px;font-size:14px}}
`;

/* ─── DATA ──────────────────────────────────────────────────── */
const BRAND = { name:"PandaStudioX", email:"pandaankit2007@gmail.com", phone:"+91 8082646863", whatsapp:"918082646863", upi:"pandaankit@upi", adminPass:"admin123" };

const THUMBS = [
  {id:1,cat:"minecraft",text:"RICHEST",sub:"MINECRAFT SMP",e:"⛏️",v:"2.4M",bg:["#0a1d0a","#124f12"],ac:"#FFBA00"},
  {id:2,cat:"minecraft",text:"BASE RAID",sub:"FIREMC 🏰",e:"💀",v:"890K",bg:["#110825","#28005a"],ac:"#B044FF"},
  {id:3,cat:"minecraft",text:"₹1 → ₹1M",sub:"MINECRAFT",e:"💰",v:"5.6M",bg:["#160000","#340000"],ac:"#FFBA00"},
  {id:4,cat:"minecraft",text:"EVERYTHING OP",sub:"CHALLENGE",e:"⚡",v:"1.2M",bg:["#001616","#003a3a"],ac:"#00CFFF"},
  {id:5,cat:"gta5",text:"HEIST GONE",sub:"WRONG 💀",e:"🔫",v:"5.1M",bg:["#04040e","#0c0c26"],ac:"#FF1F4E"},
  {id:6,cat:"gta5",text:"RICHEST EVER",sub:"GTA RP",e:"🚗",v:"3.2M",bg:["#0c0800","#201400"],ac:"#FFBA00"},
  {id:7,cat:"gta5",text:"WANTED ★★★★★",sub:"24 HOURS",e:"🚔",v:"4.4M",bg:["#060600","#141400"],ac:"#FF8C00"},
  {id:8,cat:"bgmi",text:"SOLO vs SQUAD",sub:"BGMI 🏆",e:"🎯",v:"1.8M",bg:["#020610","#081424"],ac:"#00CFFF"},
  {id:9,cat:"bgmi",text:"CONQUEROR",sub:"₹100 PHONE",e:"📱",v:"4.5M",bg:["#100500","#240c00"],ac:"#FF8C00"},
  {id:10,cat:"freefire",text:"SURVIVED",sub:"100 PLAYERS 🔥",e:"🔥",v:"6.2M",bg:["#120300","#320900"],ac:"#FFBA00"},
  {id:11,cat:"freefire",text:"LEGENDARY",sub:"RANK PUSH 👑",e:"👑",v:"2.9M",bg:["#100024","#30006a"],ac:"#B044FF"},
  {id:12,cat:"vlog",text:"₹10,000",sub:"IN ONE DAY",e:"💸",v:"1.3M",bg:["#030303","#101010"],ac:"#FFBA00"},
  {id:13,cat:"trading",text:"₹50K PROFIT",sub:"DAY TRADING",e:"📈",v:"3.7M",bg:["#001020","#001c38"],ac:"#00FF7A"},
  {id:14,cat:"trading",text:"CRASH ALERT",sub:"MY STRATEGY",e:"📉",v:"2.1M",bg:["#140000","#280000"],ac:"#FF1F4E"},
  {id:15,cat:"course",text:"PYTHON",sub:"7 DAYS COURSE",e:"🐍",v:"5.8M",bg:["#001224","#002050"],ac:"#00FF7A"},
  {id:16,cat:"shorts",text:"MIND BLOWN",sub:"#SHORTS",e:"🤯",v:"12M",bg:["#140026","#2c0058"],ac:"#B044FF"},
  {id:17,cat:"shorts",text:"WAIT FOR IT",sub:"#SHORTS",e:"😱",v:"8.5M",bg:["#040404","#0e0e0e"],ac:"#00CFFF"},
  {id:18,cat:"reaction",text:"REACTING TO",sub:"VIRAL VIDEOS",e:"😂",v:"3.1M",bg:["#160a00","#2c1400"],ac:"#FF8C00"},
];
const CATS=[{id:"all",l:"All",i:"🎨"},{id:"minecraft",l:"Minecraft",i:"⛏️"},{id:"gta5",l:"GTA 5",i:"🚗"},{id:"bgmi",l:"BGMI",i:"🎯"},{id:"freefire",l:"Free Fire",i:"🔥"},{id:"vlog",l:"Vlog",i:"📷"},{id:"trading",l:"Trading",i:"📈"},{id:"course",l:"Course",i:"📚"},{id:"shorts",l:"Shorts",i:"⚡"},{id:"reaction",l:"Reaction",i:"😂"}];
const PKGS=[
  {id:"s",n:"STARTER",p:99,pop:false,c:"#4FC3F7",ic:"⚡",del:"24–48 hrs",rev:1,badge:null,desc:"Perfect for new creators getting started.",feats:["1 Custom Thumbnail","Basic effects & text","1 Free revision","1080p PNG output","Email + Drive delivery"],noInc:["Source file","4K output"]},
  {id:"m",n:"STANDARD",p:249,pop:true,c:"#FF1F4E",ic:"🔥",del:"12–24 hrs",rev:3,badge:"MOST POPULAR",desc:"Best value — chosen by most creators.",feats:["1 Custom Thumbnail","Advanced effects + glow","3 Free revisions","1080p PNG + transparent","Priority WhatsApp support","Competitor research"],noInc:["Source file (.psd)","4K output"]},
  {id:"p",n:"PREMIUM",p:499,pop:false,c:"#FFBA00",ic:"👑",del:"6–12 hrs",rev:-1,badge:"BEST QUALITY",desc:"For serious creators who demand the best.",feats:["2 Custom Thumbnails","Cinematic pro effects","Unlimited revisions","4K PNG + source file (.psd)","A/B variant included","CTR tips + 1-week support"],noInc:[]},
  {id:"b",n:"BULK PACK",p:1499,pop:false,c:"#B044FF",ic:"🚀",del:"72 hrs total",rev:-1,badge:"BEST VALUE",desc:"Monthly bundle for active channels.",feats:["10 Custom Thumbnails","Pro effects on all","Unlimited revisions","4K + all source files","Dedicated order manager","Monthly strategy call","Only ₹149/thumbnail!"],noInc:[]},
];
const ADDONS=[{id:"e12",l:"Express 12hr",p:75,d:"Guaranteed in 12hrs"},{id:"e6",l:"Urgent 6hr",p:150,d:"Top-priority queue"},{id:"src",l:"Source File (.psd)",p:99,d:"Full editable file"},{id:"ab",l:"A/B Version",p:79,d:"2 variants to split-test"},{id:"mob",l:"Mobile 9:16",p:49,d:"Shorts & Reels version"}];
const COUPONS={"PANDA10":{pct:10,label:"10% OFF — Welcome"},"FIRST20":{pct:20,label:"20% OFF — First Order"},"GAMING15":{pct:15,label:"15% OFF — Gamer Special"},"BULK30":{pct:30,label:"30% OFF — Bulk Deal"}};
const STLS=["Gaming / Dark","MrBeast Style","Clean / Minimal","Cinematic","Text Heavy","Anime / Drawn","Custom (describe below)"];
const EMOTS=["😱 Shock","😁 Excitement","🤔 Curiosity","😨 Suspense","😡 Intense","😂 Funny","💪 Epic","😢 Emotional"];
const PLATS=["YouTube (16:9)","YouTube Shorts (9:16)","Instagram Reels (9:16)","Instagram Post (1:1)","Facebook","Twitter / X"];
const AUDS=["Teens (13-17)","Young Adults","Gamers","General","Finance/Business","Education","Kids","Fitness"];
const REVIEWS=[
  {n:"Arjun Sharma",h:"@ArjunMCGamer",av:"🎮",pkg:"Premium",txt:"Got my thumbnail in 5 hours! Video went 200 → 14K views in 3 days.",ctr:"+218%"},
  {n:"Priya Kapoor",h:"@PriyaCreates",av:"📸",pkg:"Standard",txt:"3 revisions, so patient. CTR jumped from 3.2% to 7.8%. Absolutely recommend.",ctr:"+144%"},
  {n:"Rahul Dev",h:"@RahulGames",av:"⚡",pkg:"Bulk Pack",txt:"10 incredible thumbnails in 2 days. Insane ROI — ordering again every month.",ctr:"+95%"},
  {n:"Sneha Patel",h:"@SnehaVlogs",av:"🌟",pkg:"Standard",txt:"Skeptical at ₹249 but got 55K views on a 1K subs channel. Best investment ever.",ctr:"+310%"},
  {n:"Karan Dev",h:"@KaranPlays",av:"🎯",pkg:"Premium",txt:"Before/after difference is insane. Impressions up 4x the same week. 100% recommend.",ctr:"+180%"},
  {n:"Meera Singh",h:"@MeeraFinance",av:"💹",pkg:"Standard",txt:"Even for finance content the design was perfect — clean, professional, CTR doubled.",ctr:"+102%"},
];
const FAQS=[
  {q:"What do I receive after payment?",a:"A high-quality PNG thumbnail (+ .psd source file for Premium/Bulk) via Google Drive link to your email. Premium also includes a 4K version."},
  {q:"How fast is delivery really?",a:"Starter: 24–48 hrs | Standard: 12–24 hrs | Premium: 6–12 hrs | Bulk: 72 hrs total. Express/Urgent add-ons available. 97% of orders are delivered on time."},
  {q:"How many revisions do I get?",a:"Starter: 1 | Standard: 3 | Premium & Bulk: Unlimited. Minor tweaks don't count as revisions. Major redesigns (different concept) may need a new order."},
  {q:"What info do I need to provide?",a:"Video title, thumbnail text (1–4 words), style preference, emotion, target audience, and any references. The form guides you step by step — takes under 2 minutes."},
  {q:"Do you use templates?",a:"Never. Every design is created 100% from scratch, unique to your channel. We never reuse client work."},
  {q:"What is the refund policy?",a:"Full refund only if we completely fail to deliver (extremely rare). Once work starts, unlimited revisions are offered instead of refunds."},
  {q:"What payment methods?",a:"UPI (GPay, PhonePe, Paytm), Debit/Credit Card, Net Banking. 100% secure. INR only."},
  {q:"Can I get YouTube + Shorts versions?",a:"Yes! Add the Mobile 9:16 add-on (₹49) at checkout — we deliver both ratios in the same order."},
];
const MOCK_ORDERS=[
  {id:"TH-1001",n:"Arjun Sharma",e:"arjun@g.com",pkg:"Premium",title:"Minecraft SMP Day 1",style:"Gaming/Dark",status:"delivered",amt:499,date:"2026-04-29"},
  {id:"TH-1002",n:"Priya Kapoor",e:"priya@g.com",pkg:"Standard",title:"BGMI Solo Conqueror",style:"Cinematic",status:"working",amt:249,date:"2026-04-30"},
  {id:"TH-1003",n:"Rahul Dev",e:"rahul@g.com",pkg:"Starter",title:"Free Fire 3v1 Clutch",style:"Gaming/Dark",status:"pending",amt:99,date:"2026-05-01"},
  {id:"TH-1004",n:"Sneha Patel",e:"sneha@g.com",pkg:"Bulk Pack",title:"10 Gaming Thumbnails",style:"Various",status:"working",amt:1499,date:"2026-05-01"},
  {id:"TH-1005",n:"Karan Dev",e:"karan@g.com",pkg:"Standard",title:"GTA RP — Richest",style:"Cinematic",status:"delivered",amt:249,date:"2026-04-28"},
  {id:"TH-1006",n:"Meera Singh",e:"meera@g.com",pkg:"Premium",title:"Stock Market Strategy",style:"Clean/Minimal",status:"pending",amt:499,date:"2026-05-02"},
];
const REV_DATA=[{m:"Jan",v:8400},{m:"Feb",v:11200},{m:"Mar",v:14600},{m:"Apr",v:18900},{m:"May",v:22400}];
const STYLE_CATS=[
  {id:"mb",n:"MrBeast Style",i:"🌟",c:"#FFBA00",d:"Bold, colourful, face-forward. Maximum emotion.",k:["Bold text","Face zoom","Bright BG"],p:"₹199+",bf:["Challenge videos","Viral content"]},
  {id:"gd",n:"Gaming / Dark",i:"🎮",c:"#00CFFF",d:"Cinematic dark tones, neon glows, aggressive type.",k:["Dark BG","Neon glow","Renders"],p:"₹149+",bf:["Minecraft","BGMI","GTA 5"]},
  {id:"cl",n:"Clean / Minimal",i:"✨",c:"#FFFFFF",d:"Modern professional with soft gradients.",k:["Minimal","Soft gradient","Whitespace"],p:"₹149+",bf:["Finance","Education","Tech"]},
  {id:"ci",n:"Cinematic",i:"🎬",c:"#FF8C00",d:"Movie-poster quality, dramatic lighting.",k:["Drama","Film grain","Widescreen"],p:"₹249+",bf:["Travel","GTA","Story videos"]},
  {id:"tx",n:"Text Heavy",i:"💬",c:"#FF1F4E",d:"Typography as design — punchy headlines.",k:["Big type","High contrast","Impact"],p:"₹99+",bf:["Motivation","Tutorials","Shorts"]},
  {id:"an",n:"Anime / Drawn",i:"🎌",c:"#B044FF",d:"Custom illustrated anime-style characters.",k:["Custom art","Anime","Vivid"],p:"₹349+",bf:["Gaming","Entertainment"]},
];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useNotif(){
  const [list,setList]=useState([]);
  const push=useCallback((msg,type="ok")=>{
    const id=Date.now()+Math.random();
    setList(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setList(p=>p.filter(n=>n.id!==id)),4200);
  },[]);
  return{list,push};
}
function useCountdown(){
  const getSecs=()=>{const n=new Date(),e=new Date(n);e.setHours(23,59,59,999);return Math.floor((e-n)/1000);};
  const [s,setS]=useState(getSecs);
  useEffect(()=>{const iv=setInterval(()=>setS(getSecs()),1000);return()=>clearInterval(iv);},[]);
  return{h:String(Math.floor(s/3600)).padStart(2,"0"),m:String(Math.floor((s%3600)/60)).padStart(2,"0"),s:String(s%60).padStart(2,"0")};
}
function useSlots(max=10){
  const key=`psx_slots_${new Date().toDateString()}`;
  const get=()=>{try{return parseInt(localStorage.getItem(key)||"0",10);}catch{return 0;}};
  const [used,setUsed]=useState(get);
  const consume=useCallback(()=>{const n=get()+1;try{localStorage.setItem(key,String(n));}catch{}setUsed(n);},[key]);
  return{slots:Math.max(0,max-used),consume};
}
function useScrolled(t=60){
  const [s,setS]=useState(false);
  useEffect(()=>{const fn=()=>setS(window.scrollY>t);fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[t]);
  return s;
}

/* ─── PROPER COMPONENTS (hooks at top-level only) ───────────── */

/* Thumbnail Card */
function ThumbCard({t,onOrder}){
  const [hov,setHov]=useState(false);
  return(
    <div className="thc" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:`linear-gradient(145deg,${t.bg[0]},${t.bg[1]})`,borderColor:hov?t.ac:"transparent",boxShadow:hov?`0 14px 44px ${t.ac}2a`:"0 2px 12px rgba(0,0,0,.55)"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(255,255,255,.02) 22px,rgba(255,255,255,.02) 23px),repeating-linear-gradient(90deg,transparent,transparent 22px,rgba(255,255,255,.02) 22px,rgba(255,255,255,.02) 23px)"}}/>
      <div style={{position:"absolute",width:88,height:88,borderRadius:"50%",background:`radial-gradient(circle,${t.ac}66,transparent)`,top:"40%",left:"35%",transform:"translate(-50%,-50%)",filter:"blur(22px)",opacity:hov?1:.55,transition:"opacity .3s"}}/>
      <div style={{position:"absolute",bottom:6,left:9,fontSize:34,filter:"drop-shadow(0 3px 8px rgba(0,0,0,.9))",transform:hov?"scale(1.18)":"scale(1)",transition:"transform .3s"}}>{t.e}</div>
      <div style={{position:"absolute",top:7,right:7,textAlign:"right",maxWidth:"62%"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:"clamp(11px,2.5vw,17px)",color:"#fff",lineHeight:1.05,letterSpacing:1.5,textShadow:`-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0 0 16px ${t.ac}`}}>{t.text}</div>
        <div style={{fontSize:9,color:t.ac,fontWeight:700,letterSpacing:1.5,marginTop:3,textShadow:`0 0 7px ${t.ac}`}}>{t.sub}</div>
      </div>
      <div style={{position:"absolute",top:7,left:7,background:"rgba(6,6,16,.84)",border:`1px solid ${t.ac}33`,borderRadius:5,padding:"2px 7px",fontSize:9,color:t.ac,fontWeight:700}}>👁 {t.v}</div>
      <div className="thc-ov">
        <div style={{fontFamily:"var(--fd)",fontSize:12,letterSpacing:3,color:"#fff"}}>ORDER THIS STYLE</div>
        <button className="btn btn-red btn-sm" onClick={e=>{e.stopPropagation();onOrder();}}>GET IT →</button>
      </div>
    </div>
  );
}

/* Package Card */
function PkgCard({pkg,onOrder}){
  const [hov,setHov]=useState(false);
  const rev=pkg.rev===-1?"Unlimited":`${pkg.rev} revision${pkg.rev!==1?"s":""}`;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"relative",borderRadius:"var(--r4)",padding:"26px 22px",transition:"transform .32s var(--ease),box-shadow .32s",transform:hov?"translateY(-9px)":"none",background:pkg.pop?"linear-gradient(145deg,#1a0308,#0d0000)":"linear-gradient(145deg,var(--card),var(--surface))",border:`2px solid ${hov||pkg.pop?pkg.c:"var(--b1)"}`,boxShadow:hov||pkg.pop?`0 0 32px ${pkg.c}14,0 20px 55px rgba(0,0,0,.4)`:"none"}}>
      {pkg.badge&&<div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(90deg,${pkg.c},${pkg.c}bb)`,color:"#000",padding:"4px 20px",borderRadius:99,fontSize:9,fontWeight:900,letterSpacing:2.5,whiteSpace:"nowrap",boxShadow:`0 4px 18px ${pkg.c}44`}}>{pkg.ic} {pkg.badge}</div>}
      <div style={{fontSize:34,marginBottom:10}}>{pkg.ic}</div>
      <div style={{fontFamily:"var(--fd)",fontSize:22,letterSpacing:3,color:pkg.c,marginBottom:3}}>{pkg.n}</div>
      <div style={{fontSize:12,color:"var(--t4)",marginBottom:14,lineHeight:1.5}}>{pkg.desc}</div>
      <div style={{fontFamily:"var(--fd)",fontSize:46,letterSpacing:-1,marginBottom:3}}>₹{pkg.p}</div>
      <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:20}}>{pkg.del} · {rev}</div>
      <div style={{marginBottom:22,display:"flex",flexDirection:"column",gap:8}}>
        {pkg.feats.map(f=>(
          <div key={f} style={{display:"flex",alignItems:"center",gap:9,fontSize:12,color:"var(--t2)"}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:`${pkg.c}14`,border:`1px solid ${pkg.c}2a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:pkg.c,flexShrink:0}}>✓</div>{f}
          </div>
        ))}
        {pkg.noInc&&pkg.noInc.map(f=>(
          <div key={f} style={{display:"flex",alignItems:"center",gap:9,fontSize:11,color:"var(--t4)"}}>
            <div style={{width:16,height:16,borderRadius:"50%",border:"1px solid var(--b2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,flexShrink:0}}>✕</div>
            <span style={{textDecoration:"line-through"}}>{f}</span>
          </div>
        ))}
      </div>
      <button className={`btn ${pkg.pop?"btn-red":"btn-outline"} btn-lg`}
        style={{width:"100%",justifyContent:"center",borderColor:!pkg.pop?pkg.c:undefined,color:!pkg.pop?pkg.c:undefined}}
        onClick={()=>onOrder(pkg)}>ORDER {pkg.n}</button>
    </div>
  );
}

/* Style Card */
function StyleCard({s,onOrder}){
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onOrder}
      style={{background:"var(--card)",border:`1px solid ${hov?s.c+"44":"var(--b1)"}`,borderRadius:"var(--r3)",padding:22,cursor:"pointer",transition:"all .3s var(--ease)",transform:hov?"translateY(-6px)":"none",boxShadow:hov?`0 16px 44px ${s.c}14`:"none"}}>
      <div style={{width:48,height:48,borderRadius:"var(--r2)",background:`${s.c}12`,border:`1px solid ${s.c}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:14,boxShadow:`0 0 18px ${s.c}14`}}>{s.i}</div>
      <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:1.5,color:s.c,marginBottom:6}}>{s.n}</div>
      <div style={{fontSize:12,color:"var(--t3)",lineHeight:1.7,marginBottom:14}}>{s.d}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
        {s.k.map(k=><span key={k} style={{padding:"3px 9px",borderRadius:99,fontSize:9,background:`${s.c}0e`,color:s.c,border:`1px solid ${s.c}22`,fontWeight:600}}>{k}</span>)}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"var(--fd)",fontSize:16,color:s.c,letterSpacing:1}}>{s.p}</div>
        <div style={{fontSize:10,color:"var(--t4)"}}>Best: {s.bf.slice(0,2).join(", ")}</div>
      </div>
    </div>
  );
}

/* Review Card */
function ReviewCard({r,delay}){
  return(
    <div className={`card fu d${delay}`} style={{padding:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
        <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:"var(--gold)",fontSize:13}}>★</span>)}</div>
        <div style={{background:"rgba(0,255,122,.08)",border:"1px solid rgba(0,255,122,.2)",borderRadius:99,padding:"2px 9px",fontSize:10,color:"var(--lime)",fontWeight:700}}>{r.ctr} CTR</div>
      </div>
      <p style={{color:"var(--t2)",fontSize:13,lineHeight:1.8,marginBottom:14,fontStyle:"italic"}}>"{r.txt}"</p>
      <div style={{display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:34,height:34,borderRadius:"50%",background:"var(--deep)",border:"1px solid var(--b2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>{r.av}</div>
        <div>
          <div style={{fontWeight:700,fontSize:13}}>{r.n}</div>
          <div style={{fontSize:10,color:"var(--t4)"}}>{r.h} · {r.pkg}</div>
        </div>
        <span className="badge bl" style={{marginLeft:"auto",fontSize:8}}>VERIFIED</span>
      </div>
    </div>
  );
}

/* FAQ Item */
function FaqItem({q,a,open,onToggle}){
  return(
    <div style={{background:"var(--card)",border:`1px solid ${open?"rgba(255,31,78,.3)":"var(--b1)"}`,borderRadius:"var(--r2)",overflow:"hidden",marginBottom:9,transition:"border-color .18s"}}>
      <button onClick={onToggle} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px 18px",background:"none",border:"none",color:"#fff",width:"100%",textAlign:"left",fontSize:14,fontWeight:700,cursor:"pointer",gap:12}}>
        <span>{q}</span>
        <span style={{color:"var(--red)",fontSize:16,flexShrink:0,transition:"transform .28s",transform:open?"rotate(180deg)":"none"}}>▾</span>
      </button>
      {open&&<div style={{padding:"0 18px 15px",fontSize:13,color:"var(--t3)",lineHeight:1.85,animation:"slideDown .22s var(--ease)"}}>{a}</div>}
    </div>
  );
}

/* Section Heading */
function SH({over,title,hl,sub,center=true}){
  return(
    <div style={{textAlign:center?"center":"left",marginBottom:44}}>
      <div style={{fontSize:10,color:"var(--red)",letterSpacing:4,fontWeight:700,marginBottom:12}}>{over}</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(30px,5vw,52px)",lineHeight:1,marginBottom:12}}>
        {title}{" "}<span className="t-red">{hl}</span>
      </h2>
      {sub&&<p style={{color:"var(--t3)",fontSize:14,maxWidth:500,margin:center?"0 auto":"0",lineHeight:1.7}}>{sub}</p>}
    </div>
  );
}

/* Notif List */
function NList({list}){
  return<>{list.map((n,i)=><div key={n.id} className={`notif${n.type==="err"?" notif-err":n.type==="info"?" notif-info":""}`} style={{top:74+i*70}}>{n.msg}</div>)}</>;
}

/* ─── ORDER MODAL ────────────────────────────────────────────── */
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function OrderModal({initPkg,onClose,onSuccess}){
  const [step,setStep]=useState(1);
  const [pkg,setPkg]=useState(initPkg||PKGS[1]);
  const [addons,setAddons]=useState([]);
  const [coupon,setCoupon]=useState("");
  const [applied,setApplied]=useState(null);
  const [cpnErr,setCpnErr]=useState("");
  const [errs,setErrs]=useState({});
  const [busy,setBusy]=useState(false);
  const [form,setForm]=useState({name:"",email:"",phone:"",platform:PLATS[0],title:"",thumbText:"",ref:"",note:"",style:STLS[0],emotion:EMOTS[0],audience:AUDS[0]});
  const sf=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:""}));};
  const tog=useCallback(id=>setAddons(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]),[]);
  const addonTotal=ADDONS.filter(a=>addons.includes(a.id)).reduce((s,a)=>s+a.p,0);
  const sub=pkg.p+addonTotal;
  const disc=applied?Math.round(sub*applied.pct/100):0;
  const total=sub-disc;
  const applyCoupon=()=>{const c=COUPONS[coupon.trim().toUpperCase()];if(c){setApplied(c);setCpnErr("");}else{setApplied(null);setCpnErr("Invalid coupon code");}};
  const validate=()=>{
    if(step===2){const e={};if(!form.name.trim())e.name="Full name required";if(!emailRe.test(form.email))e.email="Valid email required";if(form.phone.replace(/\D/g,"").length<10)e.phone="Valid 10-digit phone required";setErrs(e);return!Object.keys(e).length;}
    if(step===3){const e={};if(!form.title.trim())e.title="Video title required";if(!form.thumbText.trim())e.thumbText="Thumbnail text required";setErrs(e);return!Object.keys(e).length;}
    return true;
  };
  const next=()=>{if(validate())setStep(s=>s+1);};
  const submit=async()=>{setBusy(true);await new Promise(r=>setTimeout(r,1600));setBusy(false);onSuccess({oid:`TH-${Math.floor(Math.random()*90000+10000)}`,pkg,total,email:form.email,name:form.name});};
  const STEPS=["Package","Your Info","Video Details","Style & Mood","Review & Pay"];
  const pct=Math.round((step/STEPS.length)*100);

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(6,6,16,.93)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16,backdropFilter:"blur(12px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
      <div style={{background:"var(--card2)",border:"1px solid var(--b3)",borderRadius:"var(--r4)",padding:26,width:"100%",maxWidth:515,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontFamily:"var(--fd)",fontSize:22,letterSpacing:2}}>ORDER THUMBNAIL</div>
            <div style={{fontSize:12,color:pkg.c,fontWeight:700,marginTop:2}}>{pkg.ic} {pkg.n} · ₹{total}{disc>0&&<span style={{color:"var(--lime)",marginLeft:6}}>(-₹{disc})</span>}</div>
          </div>
          <button onClick={onClose} style={{background:"var(--deep)",border:"1px solid var(--b2)",color:"var(--t3)",width:32,height:32,borderRadius:"50%",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
        </div>
        <div className="pbar" style={{marginBottom:4}}><div className="pfill" style={{width:`${pct}%`}}/></div>
        <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:22}}>STEP {step} OF {STEPS.length} — {STEPS[step-1].toUpperCase()}</div>

        {/* Step 1 */}
        {step===1&&<div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {PKGS.map(p=>(
              <div key={p.id} onClick={()=>setPkg(p)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 15px",borderRadius:"var(--r3)",cursor:"pointer",background:pkg.id===p.id?`${p.c}0d`:"var(--deep)",border:`1.5px solid ${pkg.id===p.id?p.c:"var(--b1)"}`,transition:"all .18s"}}>
                <div style={{fontSize:22}}>{p.ic}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:1,color:pkg.id===p.id?p.c:"#fff"}}>{p.n}</span>
                    {p.badge&&<span className="badge br" style={{fontSize:8}}>{p.badge}</span>}
                  </div>
                  <div style={{fontSize:11,color:"var(--t4)",marginTop:1}}>{p.del} · {p.rev===-1?"Unlimited":p.rev} rev</div>
                </div>
                <div style={{fontFamily:"var(--fd)",fontSize:22,color:pkg.id===p.id?p.c:"#fff"}}>₹{p.p}</div>
                {pkg.id===p.id&&<span style={{color:"var(--lime)",fontSize:16}}>✓</span>}
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <label className="ilabel">OPTIONAL ADD-ONS</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {ADDONS.map(a=>(
                <button key={a.id} onClick={()=>tog(a.id)} className={`chip ${addons.includes(a.id)?"on":""}`}>
                  {addons.includes(a.id)?"✓ ":""}{a.l} <span style={{opacity:.6}}>+₹{a.p}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="ilabel">COUPON CODE</label>
            <div style={{display:"flex",gap:8}}>
              <input className="ifield" placeholder="e.g. PANDA10" style={{flex:1}} value={coupon} onChange={e=>setCoupon(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&applyCoupon()}/>
              <button className="btn btn-ghost btn-sm" onClick={applyCoupon}>APPLY</button>
            </div>
            {applied&&<div style={{fontSize:11,color:"var(--lime)",marginTop:5}}>✓ {applied.label} — saving ₹{disc}</div>}
            {cpnErr&&<div className="ierr">✗ {cpnErr}</div>}
            <div style={{fontSize:10,color:"var(--t4)",marginTop:4}}>Try: PANDA10 · FIRST20 · GAMING15 · BULK30</div>
          </div>
        </div>}

        {/* Step 2 */}
        {step===2&&<div>
          {[{l:"Full Name *",k:"name",t:"text",p:"e.g. Arjun Sharma"},{l:"Email Address *",k:"email",t:"email",p:"you@example.com"},{l:"Phone Number *",k:"phone",t:"tel",p:"+91 9876543210"}].map(f=>(
            <div key={f.k} className="igroup">
              <label className="ilabel">{f.l}</label>
              <input type={f.t} className={`ifield${errs[f.k]?" err":""}`} placeholder={f.p} value={form[f.k]} onChange={e=>sf(f.k,e.target.value)}/>
              {errs[f.k]&&<div className="ierr">⚠ {errs[f.k]}</div>}
            </div>
          ))}
          <div className="igroup">
            <label className="ilabel">Platform *</label>
            <select className="isel" value={form.platform} onChange={e=>sf("platform",e.target.value)} style={{padding:"12px 14px"}}>
              {PLATS.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={{background:"rgba(0,207,255,.06)",border:"1px solid rgba(0,207,255,.15)",borderRadius:"var(--r2)",padding:11,fontSize:12,color:"var(--cyan)"}}>
            📧 Thumbnail delivered to this email via Google Drive link.
          </div>
        </div>}

        {/* Step 3 */}
        {step===3&&<div>
          {[{l:"Video Title *",k:"title",big:false,p:"e.g. I Became RICHEST in Minecraft SMP"},{l:"Thumbnail Text (1–4 words) *",k:"thumbText",big:false,p:"e.g. RICHEST PLAYER"},{l:"Style Reference Link",k:"ref",big:false,p:"https://youtube.com/..."},{l:"Additional Notes",k:"note",big:true,p:"Characters, colours, special requests…"}].map(f=>(
            <div key={f.k} className="igroup">
              <label className="ilabel">{f.l}</label>
              {f.big
                ?<textarea className={`iarea${errs[f.k]?" err":""}`} placeholder={f.p} value={form[f.k]} onChange={e=>sf(f.k,e.target.value)}/>
                :<input className={`ifield${errs[f.k]?" err":""}`} placeholder={f.p} value={form[f.k]} onChange={e=>sf(f.k,e.target.value)}/>}
              {errs[f.k]&&<div className="ierr">⚠ {errs[f.k]}</div>}
            </div>
          ))}
          <div style={{background:"rgba(255,186,0,.06)",border:"1px solid rgba(255,186,0,.15)",borderRadius:"var(--r2)",padding:11,fontSize:12,color:"var(--gold)"}}>
            💡 More detail = better first draft = fewer revisions.
          </div>
        </div>}

        {/* Step 4 */}
        {step===4&&<div>
          <div className="igroup">
            <label className="ilabel">Thumbnail Style *</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {STLS.map(s=><button key={s} onClick={()=>sf("style",s)} className={`chip ${form.style===s?"on":""}`} style={{textAlign:"left",borderRadius:"var(--r2)",padding:"9px 10px"}}>{s}</button>)}
            </div>
          </div>
          <div className="igroup">
            <label className="ilabel">Emotion / Mood *</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {EMOTS.map(e=><button key={e} onClick={()=>sf("emotion",e)} className={`chip ${form.emotion===e?"on2":""}`} style={{textAlign:"left",borderRadius:"var(--r2)",padding:"8px 10px"}}>{e}</button>)}
            </div>
          </div>
          <div className="igroup">
            <label className="ilabel">Target Audience</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {AUDS.map(a=><button key={a} onClick={()=>sf("audience",a)} className={`chip ${form.audience===a?"on3":""}`}>{a}</button>)}
            </div>
          </div>
        </div>}

        {/* Step 5 */}
        {step===5&&<div>
          <div style={{background:"var(--deep)",borderRadius:"var(--r3)",padding:"14px 17px",marginBottom:13}}>
            <label className="ilabel" style={{marginBottom:10}}>ORDER SUMMARY</label>
            {[["Package",`${pkg.ic} ${pkg.n}`],["Base Price",`₹${pkg.p}`],["Platform",form.platform],["Style",form.style],["Mood",form.emotion],["Delivery",pkg.del],["Revisions",pkg.rev===-1?"Unlimited":String(pkg.rev)],["Video",form.title||"—"],["Text",form.thumbText||"—"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:12}}>
                <span style={{color:"var(--t3)"}}>{k}</span>
                <span style={{color:"#fff",fontWeight:600,maxWidth:230,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
              </div>
            ))}
            {ADDONS.filter(a=>addons.includes(a.id)).map(a=>(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:12}}>
                <span style={{color:"var(--lime)"}}>+ {a.l}</span><span style={{color:"var(--lime)",fontWeight:700}}>+₹{a.p}</span>
              </div>
            ))}
            {applied&&<div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.04)",fontSize:12}}>
              <span style={{color:"var(--lime)"}}>🎟 {applied.label}</span><span style={{color:"var(--lime)",fontWeight:700}}>-₹{disc}</span>
            </div>}
            <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,fontSize:17,fontWeight:800}}>
              <span style={{fontFamily:"var(--fd)",color:"var(--gold)",letterSpacing:1}}>TOTAL</span>
              <span style={{fontFamily:"var(--fd)",fontSize:24,color:"var(--lime)"}}>₹{total}</span>
            </div>
          </div>
          <div style={{background:"rgba(255,186,0,.06)",border:"1px solid rgba(255,186,0,.18)",borderRadius:"var(--r2)",padding:12,marginBottom:12,fontSize:12,color:"var(--gold)"}}>
            💳 Pay ₹{total} via UPI: <strong>pandaankit@upi</strong><br/>
            <span style={{color:"var(--t3)"}}>Include your Order ID in the note. Work starts within 1hr of payment.</span>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:12}}>
            {["🔒 Secure","⚡ Fast","🔄 Revisions","✅ 100% Custom","🚫 No Watermark"].map(t=><div key={t} style={{fontSize:11,color:"var(--t4)"}}>{t}</div>)}
          </div>
          <div style={{fontSize:10,color:"var(--t4)",lineHeight:1.9}}>
            By ordering you agree to our <span style={{color:"var(--red)",cursor:"pointer",textDecoration:"underline"}}>Terms</span> & <span style={{color:"var(--red)",cursor:"pointer",textDecoration:"underline"}}>Refund Policy</span>.
          </div>
        </div>}

        {/* Nav buttons */}
        <div style={{display:"flex",gap:10,marginTop:22}}>
          {step>1&&<button className="btn btn-ghost" onClick={()=>setStep(s=>s-1)} style={{flex:1}}>← BACK</button>}
          <button className={`btn ${step===5?"btn-gold":"btn-red"}`} style={{flex:2,justifyContent:"center"}} disabled={busy} onClick={step<5?next:submit}>
            {busy?<><div style={{width:15,height:15,border:"2px solid rgba(0,0,0,.3)",borderTopColor:"#000",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>PLACING…</>:step<5?"CONTINUE →":"🛒 PLACE ORDER NOW"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── ORDER SUCCESS ──────────────────────────────────────────── */
function OrderSuccess({data,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(6,6,16,.96)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1001,padding:20,backdropFilter:"blur(14px)",animation:"fadeIn .3s ease"}} onClick={onClose}>
      <div style={{background:"var(--card)",border:"1.5px solid rgba(0,255,122,.25)",borderRadius:"var(--r4)",padding:"36px 30px",width:"100%",maxWidth:450,textAlign:"center",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:78,height:78,borderRadius:"50%",background:"rgba(0,255,122,.1)",border:"2px solid rgba(0,255,122,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:38}}>✅</div>
        <div style={{fontFamily:"var(--fd)",fontSize:30,letterSpacing:2,marginBottom:6}}>ORDER PLACED!</div>
        <div style={{color:"var(--t3)",fontSize:14,marginBottom:22,lineHeight:1.85}}>
          Your <span style={{color:"var(--red)",fontWeight:700}}>{data.pkg.n}</span> order is confirmed, <span style={{color:"#fff"}}>{data.name}</span>.<br/>Confirmation sent to <span style={{color:"var(--gold)"}}>{data.email}</span>.
        </div>
        <div style={{background:"var(--deep)",borderRadius:"var(--r3)",padding:"14px 18px",marginBottom:18}}>
          <div style={{fontSize:9,color:"var(--t4)",letterSpacing:3,marginBottom:4}}>ORDER ID</div>
          <div style={{fontFamily:"var(--fd)",fontSize:28,color:"var(--cyan)",letterSpacing:4}}>{data.oid}</div>
          <div style={{fontSize:11,color:"var(--t3)",marginTop:3}}>Delivery in {data.pkg.del}</div>
        </div>
        <div style={{background:"rgba(255,186,0,.06)",border:"1px solid rgba(255,186,0,.2)",borderRadius:"var(--r2)",padding:"13px 16px",marginBottom:16,textAlign:"left"}}>
          <div style={{fontSize:10,color:"var(--gold)",fontWeight:700,letterSpacing:2,marginBottom:9}}>NEXT STEPS</div>
          {[["💳",`Pay ₹${data.total} · UPI: pandaankit@upi`],["📝","Add Order ID in payment note"],["🎨","Work starts within 1hr of payment"],["📦",`Delivered in ${data.pkg.del} to your email`]].map(([ic,t])=>(
            <div key={t} style={{display:"flex",gap:10,fontSize:13,color:"var(--t2)",marginBottom:7}}><span style={{flexShrink:0}}>{ic}</span><span>{t}</span></div>
          ))}
        </div>
        <a href="https://wa.me/918082646863" target="_blank" rel="noopener" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"var(--r2)",padding:"11px 18px",color:"#25D366",fontWeight:700,fontSize:13,marginBottom:12,textDecoration:"none"}}>
          💬 Send payment screenshot on WhatsApp
        </a>
        <button className="btn btn-ghost" style={{width:"100%",justifyContent:"center"}} onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}

/* ─── ADMIN PANEL ────────────────────────────────────────────── */
function AdminPanel({onBack}){
  const [tab,setTab]=useState("overview");
  const [orders,setOrders]=useState(MOCK_ORDERS);
  const [search,setSearch]=useState("");
  const [sf2,setSf2]=useState("all");
  const {list:notifs,push}=useNotif();
  const stats={total:orders.length,pending:orders.filter(o=>o.status==="pending").length,working:orders.filter(o=>o.status==="working").length,delivered:orders.filter(o=>o.status==="delivered").length,rev:orders.reduce((s,o)=>s+o.amt,0)};
  const updO=(id,status)=>{setOrders(p=>p.map(o=>o.id===id?{...o,status}:o));push(`Order #${id} → ${status}`);};
  const delO=(id)=>{setOrders(p=>p.filter(o=>o.id!==id));push(`Order #${id} deleted`,"err");};
  const mxRev=Math.max(...REV_DATA.map(d=>d.v));
  const sc={pending:"var(--gold)",working:"var(--cyan)",delivered:"var(--lime)",cancelled:"var(--red)"};
  const filt=orders.filter(o=>{const q=search.toLowerCase();return(o.n.toLowerCase().includes(q)||o.id.toLowerCase().includes(q)||o.title.toLowerCase().includes(q))&&(sf2==="all"||o.status===sf2);});

  return(
    <div style={{minHeight:"100vh",background:"var(--ink)",color:"#fff",fontFamily:"'Outfit',sans-serif"}}>
      <div style={{background:"linear-gradient(90deg,#0d0000,var(--card))",borderBottom:"1px solid rgba(255,31,78,.18)",padding:"0 22px",display:"flex",alignItems:"center",gap:12,height:54,position:"sticky",top:0,zIndex:100}}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← BACK TO SITE</button>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:6,background:"linear-gradient(135deg,var(--red),var(--red2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🐼</div>
          <span style={{fontFamily:"var(--fd)",fontSize:14,letterSpacing:4,color:"var(--red)"}}>ADMIN PANEL</span>
        </div>
        <div style={{display:"flex",gap:4,marginLeft:14,flex:1,overflowX:"auto"}}>
          {[["overview","📊"],["orders","📦"],["analytics","📈"],["audit","✅"],["settings","⚙️"]].map(([id,ic])=>(
            <button key={id} onClick={()=>setTab(id)} style={{padding:"5px 13px",borderRadius:"var(--r1)",whiteSpace:"nowrap",background:tab===id?"var(--red-sm)":"transparent",border:`1px solid ${tab===id?"var(--red)":"transparent"}`,color:tab===id?"var(--red)":"var(--t3)",fontSize:11,fontWeight:700,letterSpacing:1,cursor:"pointer",textTransform:"capitalize"}}>{ic} {id}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"var(--lime)",animation:"pulseDot 1.5s infinite"}}/>
          <span style={{fontSize:11,color:"var(--lime)"}}>LIVE</span>
        </div>
      </div>

      <div style={{padding:22,maxWidth:1220,margin:"0 auto"}}>
        {/* Overview */}
        {tab==="overview"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))",gap:12,marginBottom:22}}>
            {[{i:"📦",l:"TOTAL",v:stats.total,c:"var(--cyan)"},{i:"⏳",l:"PENDING",v:stats.pending,c:"var(--gold)"},{i:"🔨",l:"WORKING",v:stats.working,c:"var(--cyan)"},{i:"✅",l:"DELIVERED",v:stats.delivered,c:"var(--lime)"},{i:"💰",l:"REVENUE",v:`₹${stats.rev.toLocaleString()}`,c:"var(--gold)"}].map((s,i)=>(
              <div key={s.l} className={`card fu d${i+1}`} style={{padding:"16px 18px",border:`1px solid ${s.c}16`}}>
                <div style={{fontSize:20,marginBottom:6}}>{s.i}</div>
                <div style={{fontFamily:"var(--fd)",fontSize:28,color:s.c}}>{s.v}</div>
                <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:16,marginBottom:20}}>
            <div className="card" style={{padding:20}}>
              <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:4}}>REVENUE TREND</div>
              <div style={{fontFamily:"var(--fd)",fontSize:24,color:"var(--gold)",marginBottom:16}}>₹{(stats.rev/1000).toFixed(1)}K</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:7,height:64}}>
                {REV_DATA.map((d,i)=>(
                  <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{width:"100%",height:`${(d.v/mxRev)*56}px`,background:i===REV_DATA.length-1?"linear-gradient(180deg,var(--red),var(--red2))":"rgba(255,31,78,.28)",borderRadius:"3px 3px 0 0"}}/>
                    <div style={{fontSize:8,color:"var(--t4)"}}>{d.m}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,fontSize:11,color:"var(--lime)"}}>↑ 24% vs last month</div>
            </div>
            <div className="card" style={{padding:20}}>
              <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:14}}>PACKAGE BREAKDOWN</div>
              {PKGS.map(p=>{const cnt=orders.filter(o=>o.pkg===p.n).length;const pct=stats.total?Math.max(4,(cnt/stats.total)*100):4;return(
                <div key={p.id} style={{marginBottom:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}>
                    <span style={{color:p.c,fontWeight:600}}>{p.ic} {p.n}</span>
                    <span style={{color:"var(--t3)"}}>{cnt} order{cnt!==1?"s":""}</span>
                  </div>
                  <div className="pbar"><div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${p.c},${p.c}88)`}}/></div>
                </div>
              );})}
            </div>
          </div>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:"1px solid var(--b1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontFamily:"var(--fd)",fontSize:13,letterSpacing:2,color:"var(--red)"}}>RECENT ORDERS</div>
              <button onClick={()=>setTab("orders")} className="btn btn-ghost btn-sm">View All →</button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table className="dt">
                <thead><tr>{["ID","Customer","Package","Status","Amount","Date"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>{orders.slice(0,4).map(o=>(
                  <tr key={o.id}>
                    <td style={{color:"var(--cyan)",fontFamily:"var(--fd)",letterSpacing:1}}>#{o.id}</td>
                    <td><div style={{fontWeight:700}}>{o.n}</div><div style={{fontSize:10,color:"var(--t4)"}}>{o.e}</div></td>
                    <td style={{color:"var(--gold)",fontWeight:600}}>{o.pkg}</td>
                    <td><span style={{padding:"3px 9px",borderRadius:99,fontSize:9,fontWeight:700,background:`${sc[o.status]||"#fff"}14`,color:sc[o.status]||"#fff",border:`1px solid ${sc[o.status]||"#fff"}33`,letterSpacing:1.5,textTransform:"uppercase"}}>{o.status}</span></td>
                    <td style={{color:"var(--lime)",fontFamily:"var(--fd)",fontSize:15}}>₹{o.amt}</td>
                    <td style={{color:"var(--t4)",fontSize:11}}>{o.date}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>}

        {/* Orders */}
        {tab==="orders"&&<div>
          <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
            <input className="ifield" placeholder="Search name, ID or title…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:260}}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["all","pending","working","delivered","cancelled"].map(s=>(
                <button key={s} onClick={()=>setSf2(s)} className={`chip ${sf2===s?"on":""}`} style={{textTransform:"capitalize"}}>{s}</button>
              ))}
            </div>
            <span style={{fontSize:11,color:"var(--t4)"}}>{filt.length} result{filt.length!==1?"s":""}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filt.map(o=>(
              <div key={o.id} style={{background:"var(--card)",border:`1px solid ${sc[o.status]||"var(--b1)"}18`,borderRadius:"var(--r2)",padding:"12px 15px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <div style={{color:"var(--cyan)",fontFamily:"var(--fd)",letterSpacing:1,minWidth:70,fontSize:12}}>#{o.id}</div>
                <div style={{flex:1,minWidth:110}}><div style={{fontWeight:700,fontSize:13}}>{o.n}</div><div style={{fontSize:10,color:"var(--t4)"}}>{o.e}</div></div>
                <div style={{color:"var(--gold)",fontWeight:700,fontSize:12}}>{o.pkg}</div>
                <div style={{flex:2,color:"var(--t3)",fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:175}}>{o.title}</div>
                <select value={o.status} onChange={e=>updO(o.id,e.target.value)} style={{background:`${sc[o.status]||"#fff"}12`,color:sc[o.status]||"#fff",border:`1px solid ${sc[o.status]||"#fff"}33`,padding:"4px 10px",borderRadius:99,fontSize:9,fontWeight:700,letterSpacing:1.5,cursor:"pointer",textTransform:"uppercase"}}>
                  {["pending","working","delivered","cancelled"].map(s=><option key={s} value={s}>{s.toUpperCase()}</option>)}
                </select>
                <div style={{color:"var(--lime)",fontFamily:"var(--fd)",fontSize:14,fontWeight:700}}>₹{o.amt}</div>
                <div style={{display:"flex",gap:6}}>
                  <button className="btn btn-red btn-sm">📁 Upload</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>delO(o.id)} style={{color:"var(--red)"}}>🗑</button>
                </div>
              </div>
            ))}
            {filt.length===0&&<div style={{textAlign:"center",padding:40,color:"var(--t4)"}}>📭 No orders match your search</div>}
          </div>
        </div>}

        {/* Analytics */}
        {tab==="analytics"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginBottom:20}}>
            {[{t:"Top Niches",items:[["Minecraft","40","var(--lime)"],["GTA 5","22","var(--red)"],["BGMI","18","var(--cyan)"],["Free Fire","12","var(--gold)"]]},
              {t:"Style Breakdown",items:[["Gaming/Dark","48","var(--cyan)"],["Cinematic","31","var(--gold)"],["Clean","21","var(--t2)"]]},
              {t:"Platform Split",items:[["YouTube 16:9","62","var(--red)"],["Shorts 9:16","24","var(--gold)"],["Instagram","14","var(--purp)"]]},
              {t:"Delivery Speed",items:[["Standard","55","var(--t3)"],["Express 12h","28","var(--gold)"],["Urgent 6h","17","var(--lime)"]]}
            ].map(({t,items})=>(
              <div key={t} className="card" style={{padding:20}}>
                <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:14}}>{t.toUpperCase()}</div>
                {items.map(([name,pct,col])=>(
                  <div key={name} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}>
                      <span style={{color:"var(--t2)"}}>{name}</span>
                      <span style={{color:col,fontWeight:700}}>{pct}%</span>
                    </div>
                    <div className="pbar"><div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${col},${col}88)`}}/></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>}

        {/* Audit */}
        {tab==="audit"&&<div>
          <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:2,color:"var(--red)",marginBottom:22}}>🚀 PRE-LAUNCH AUDIT</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
            {[{cat:"✅ FRONTEND DONE",c:"var(--lime)",items:["5-step order form","Form validation","Coupon code system","Admin panel","Mobile responsive","Before/After comparison","FAQ accordion","Testimonials + CTR proof","Live countdown timer","WhatsApp float button","Lead magnet capture","Contact form","Daily slot tracker","Order success screen"]},
              {cat:"⏳ TODO — Integration",c:"var(--gold)",items:["Razorpay live API key","EmailJS order confirmation","EmailJS delivery email","Firebase Firestore orders","Google Sheets backup","Google Analytics GA4","Domain name setup","SSL certificate","Test full order flow","Test payment failure","WhatsApp number verified","UPI ₹1 test payment"]},
              {cat:"🚀 LAUNCH — Marketing",c:"var(--cyan)",items:["DM 10 small YouTubers","Before/after Instagram reels","YouTube redesign video","Post 3x/week on Instagram","Share in Discord servers","First 10 orders coupon","Ask for reviews","Track CTR results"]}
            ].map(({cat,c,items})=>(
              <div key={cat} className="card" style={{padding:20,border:`1px solid ${c}18`}}>
                <div style={{fontSize:10,color:c,letterSpacing:2,fontWeight:700,marginBottom:14}}>{cat}</div>
                {items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,padding:"5px 8px",borderRadius:"var(--r1)",marginBottom:4,background:cat.startsWith("✅")?"rgba(0,255,122,.04)":"rgba(255,255,255,.02)"}}>
                    <span style={{color:c,flexShrink:0,marginTop:1}}>{cat.startsWith("✅")?"✓":cat.startsWith("⏳")?"○":"→"}</span>
                    <span style={{color:cat.startsWith("✅")?"var(--t2)":"var(--t3)"}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>}

        {/* Settings */}
        {tab==="settings"&&<div style={{maxWidth:580}}>
          <div style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:2,color:"var(--red)",marginBottom:20}}>SITE SETTINGS</div>
          <div className="card" style={{padding:22,marginBottom:14}}>
            <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:14}}>BRAND DETAILS</div>
            {[["Brand Name","PandaStudioX"],["Email","pandaankit2007@gmail.com"],["Phone","+91 8082646863"],["UPI ID","pandaankit@upi"],["WhatsApp No.","918082646863"],["Max Orders/Day","10"]].map(([l,v])=>(
              <div key={l} className="igroup"><label className="ilabel">{l}</label><input className="ifield" defaultValue={v}/></div>
            ))}
          </div>
          <div className="card" style={{padding:22,marginBottom:14}}>
            <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2,marginBottom:12}}>ACTIVE COUPONS</div>
            {Object.entries(COUPONS).map(([code,d])=>(
              <div key={code} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 13px",background:"var(--deep)",borderRadius:"var(--r1)",marginBottom:8,fontSize:12}}>
                <span style={{fontFamily:"var(--fd)",color:"var(--gold)",letterSpacing:2,fontSize:14}}>{code}</span>
                <span style={{color:"var(--t2)"}}>{d.label}</span>
                <span style={{color:"var(--lime)",fontWeight:700}}>{d.pct}% OFF</span>
                <span className="badge bl" style={{fontSize:8}}>ACTIVE</span>
              </div>
            ))}
          </div>
          <button className="btn btn-red" onClick={()=>push("Settings saved ✓")}>SAVE ALL CHANGES</button>
        </div>}
      </div>
      <NList list={notifs}/>
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
export default function App(){
  const [page,setPage]=useState("home");
  const [orderPkg,setOrderPkg]=useState(null);
  const [orderSuccess,setOrderSuccess]=useState(null);
  const [adminAuth,setAdminAuth]=useState(false);
  const [adminPw,setAdminPw]=useState("");
  const [cat,setCat]=useState("all");
  const [faqOpen,setFaqOpen]=useState(null);
  const [emailDone,setEmailDone]=useState(false);
  const [emailVal,setEmailVal]=useState("");
  const [emailErr,setEmailErr]=useState("");
  const [contactDone,setContactDone]=useState(false);
  const [contactForm,setContactForm]=useState({name:"",email:"",msg:""});
  const scrolled=useScrolled(56);
  const {list:notifs,push}=useNotif();
  const {slots,consume}=useSlots(10);
  const {h,m,s}=useCountdown();
  const filteredThumbs=cat==="all"?THUMBS:THUMBS.filter(t=>t.cat===cat);

  /* Live activity toasts */
  useEffect(()=>{
    const msgs=[{m:"🎉 Rahul just ordered Standard — Gaming style!",t:"info"},{m:"🔥 Priya ordered Premium — Express delivery!",t:"info"},{m:"⚡ New order: BGMI thumbnail — Starter plan",t:"info"}];
    let i=0;
    let iv=null;
    const timer=setTimeout(()=>{
      iv=setInterval(()=>{
        if(i<msgs.length){push(msgs[i].m,msgs[i].t);i++;}
        else{clearInterval(iv);iv=null;}
      },10000);
    },7000);
    return()=>{clearTimeout(timer);if(iv)clearInterval(iv);};
  },[push]);

  const handleOrder=useCallback(pkg=>setOrderPkg(pkg||PKGS[1]),[]);
  const handleSuccess=useCallback(data=>{setOrderPkg(null);setOrderSuccess(data);consume();},[consume]);

  /* Admin gate */
  if(page==="admin"){
    if(!adminAuth)return(
      <div style={{minHeight:"100vh",background:"var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif"}}>
        <style>{`@import url('${FONT_URL}');${G}`}</style>
        <div style={{background:"var(--card)",border:"1px solid rgba(255,31,78,.22)",borderRadius:"var(--r4)",padding:42,width:350,textAlign:"center"}}>
          <div style={{fontSize:50,marginBottom:12}}>🔐</div>
          <div style={{fontFamily:"var(--fd)",fontSize:24,letterSpacing:3,marginBottom:4}}>ADMIN ACCESS</div>
          <div style={{fontSize:12,color:"var(--t4)",marginBottom:24}}>PandaStudioX Control Panel</div>
          <input type="password" className="ifield" placeholder="Enter admin password" value={adminPw} onChange={e=>setAdminPw(e.target.value)} style={{marginBottom:12}} onKeyDown={e=>e.key==="Enter"&&(adminPw===BRAND.adminPass?setAdminAuth(true):push("Wrong password","err"))}/>
          <button className="btn btn-red" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={()=>adminPw===BRAND.adminPass?setAdminAuth(true):push("Wrong password","err")}>ENTER DASHBOARD</button>
          <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"var(--t4)",cursor:"pointer",fontSize:12}}>← Back to site</button>
          <div style={{marginTop:14,fontSize:10,color:"var(--t4)",opacity:.5}}>Demo: admin123</div>
        </div>
        <NList list={notifs}/>
      </div>
    );
    return<><style>{`@import url('${FONT_URL}');${G}`}</style><AdminPanel onBack={()=>{setPage("home");setAdminAuth(false);}}/></>;
  }

  /* ── MAIN SITE ── */
  return(
    <div style={{background:"var(--ink)",minHeight:"100vh",color:"#fff",fontFamily:"'Outfit',sans-serif"}}>
      <style>{`@import url('${FONT_URL}');${G}`}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:scrolled?"rgba(6,6,16,.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,31,78,.1)":"none",transition:"all .32s",padding:"0 26px",display:"flex",alignItems:"center",height:62}}>
        <a href="#" style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:38,height:38,borderRadius:9,background:"linear-gradient(135deg,var(--red),var(--red2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 0 16px var(--red-g)",flexShrink:0}}>🐼</div>
          <div><div style={{fontFamily:"var(--fd)",fontSize:17,letterSpacing:3,lineHeight:1}}>{BRAND.name}</div><div style={{fontSize:8,color:"var(--red)",letterSpacing:3,lineHeight:1,marginTop:2}}>CUSTOM THUMBNAILS</div></div>
        </a>
        <div className="hm" style={{display:"flex",gap:22,marginLeft:36,flex:1}}>
          {[["Portfolio","#portfolio"],["Styles","#styles"],["Packages","#packages"],["Reviews","#reviews"],["FAQ","#faq"],["Contact","#contact"]].map(([l,href])=>(
            <a key={href} href={href} style={{color:"var(--t4)",fontSize:13,fontWeight:600,textDecoration:"none",transition:"color .18s"}} onMouseEnter={e=>e.target.style.color="var(--red)"} onMouseLeave={e=>e.target.style.color="var(--t4)"}>{l}</a>
          ))}
        </div>
        <button className="hm" onClick={()=>setPage("admin")} style={{background:"transparent",border:"1px solid rgba(255,31,78,.2)",color:"rgba(255,31,78,.65)",padding:"6px 12px",borderRadius:"var(--r1)",fontSize:10,fontWeight:700,letterSpacing:1,cursor:"pointer",marginRight:10,transition:"all .18s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--red)";e.currentTarget.style.color="var(--red)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,31,78,.2)";e.currentTarget.style.color="rgba(255,31,78,.65)";}}>⚙ ADMIN</button>
        <button className="btn btn-red rg" onClick={()=>handleOrder(PKGS[1])} style={{fontSize:12}}>🛒 ORDER NOW</button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:"var(--ink)",paddingTop:62}}>
        <div style={{position:"absolute",inset:0}}>
          <div style={{position:"absolute",width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,31,78,.07) 0%,transparent 68%)",top:"50%",left:"22%",transform:"translate(-50%,-50%)"}}/>
          <div style={{position:"absolute",width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,186,0,.04) 0%,transparent 68%)",top:"10%",right:"6%"}}/>
          <div className="gbg" style={{position:"absolute",inset:0,opacity:.5}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:200,background:"linear-gradient(transparent,var(--ink))"}}/>
        </div>
        <div className="wrap" style={{padding:"80px 26px",position:"relative",zIndex:1,width:"100%"}}>
          <div className="hgrid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div className="fu">
              {/* Live badges */}
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:22}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,31,78,.07)",border:"1px solid rgba(255,31,78,.2)",borderRadius:99,padding:"6px 14px"}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:"var(--red)",animation:"pulseDot 1.2s infinite"}}/>
                  <span style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--red)"}}>🔥 {slots} SLOT{slots!==1?"S":""} LEFT TODAY</span>
                </div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,186,0,.07)",border:"1px solid rgba(255,186,0,.2)",borderRadius:99,padding:"6px 14px"}}>
                  <span style={{fontSize:10,fontWeight:700,color:"var(--gold)"}}>⏱ RESETS IN</span>
                  <span style={{fontFamily:"var(--fd)",fontSize:14,color:"var(--gold)",letterSpacing:2}}>{h}:{m}:{s}</span>
                </div>
              </div>
              <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(38px,5.8vw,70px)",lineHeight:.96,marginBottom:20,letterSpacing:1.5}}>
                <span className="shimmer">HIGH CTR</span><br/>
                <span>THUMBNAILS</span><br/>
                <span>THAT GET</span><br/>
                <span className="t-red">10X MORE VIEWS</span>
              </h1>
              <p style={{color:"var(--t3)",fontSize:15,lineHeight:1.85,marginBottom:28,maxWidth:450}}>
                Custom-designed for YouTube, Shorts & Instagram. Built for <strong style={{color:"#fff"}}>gaming creators & streamers.</strong>{" "}
                <span style={{color:"var(--gold)"}}>Not templates — 100% original every time.</span>
              </p>
              <div style={{display:"flex",gap:18,flexWrap:"wrap",marginBottom:28}}>
                {[["⚡","6-hr Express"],["🔄","Free Revisions"],["💯","100% Custom"],["🎯","CTR Focused"],["🔒","Secure Payment"]].map(([ic,l])=>(
                  <div key={l} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{ic}</span><span style={{fontSize:11,color:"var(--t3)",fontWeight:600}}>{l}</span></div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:22}}>
                <button className="btn btn-red btn-xl rg" onClick={()=>handleOrder(PKGS[1])}>🛒 ORDER — FROM ₹99</button>
                <a href="#portfolio" className="btn btn-ghost btn-lg">👁 VIEW PORTFOLIO</a>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                <div style={{display:"flex"}}>{["🎮","📸","⚡","🌟","🔥"].map((a,i)=><div key={i} style={{width:28,height:28,borderRadius:"50%",background:"var(--card)",border:"2px solid var(--ink)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginLeft:i?-8:0,zIndex:5-i}}>{a}</div>)}</div>
                <span style={{fontSize:12,color:"var(--t3)"}}><strong style={{color:"#fff"}}>500+ thumbnails</strong> delivered to 200+ creators</span>
                <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:"var(--gold)",fontSize:12}}>★</span>)}</div>
                <span style={{fontSize:11,color:"var(--t3)"}}>4.9/5</span>
              </div>
            </div>
            {/* Hero visuals */}
            <div className="hvis" style={{position:"relative",height:480}}>
              <div className="fl" style={{position:"absolute",top:14,left:0,right:52,borderRadius:"var(--r4)",overflow:"hidden",aspectRatio:"16/9",background:"linear-gradient(145deg,#0a1d0a,#124f12)",border:"2px solid rgba(255,186,0,.42)",boxShadow:"0 20px 60px rgba(255,186,0,.12),0 4px 20px rgba(0,0,0,.6)"}}>
                <div className="gbg" style={{position:"absolute",inset:0,opacity:.3}}/>
                <div style={{position:"absolute",width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,186,0,.55),transparent)",top:"38%",left:"34%",transform:"translate(-50%,-50%)",filter:"blur(24px)"}}/>
                <div style={{position:"absolute",bottom:10,left:13,fontSize:50,filter:"drop-shadow(0 4px 12px rgba(0,0,0,.9))"}}>⛏️</div>
                <div style={{position:"absolute",top:13,right:13,textAlign:"right"}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:28,color:"#fff",textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000,0 0 28px #FFBA00",lineHeight:1,letterSpacing:1.5}}>RICHEST</div>
                  <div style={{fontSize:11,color:"#FFBA00",fontWeight:700,letterSpacing:2,marginTop:3,textShadow:"0 0 10px #FFBA00"}}>MINECRAFT SMP</div>
                </div>
                <div style={{position:"absolute",top:13,left:13,background:"rgba(6,6,16,.84)",borderRadius:5,padding:"3px 9px",fontSize:9,color:"#FFBA00",fontWeight:700}}>👁 2.4M VIEWS</div>
              </div>
              <div className="fl2" style={{position:"absolute",bottom:18,right:0,width:190,borderRadius:"var(--r3)",overflow:"hidden",aspectRatio:"16/9",background:"linear-gradient(145deg,#04040e,#0c0c26)",border:"2px solid rgba(255,31,78,.42)",boxShadow:"0 12px 36px rgba(255,31,78,.16)"}}>
                <div style={{position:"absolute",bottom:5,left:7,fontSize:24}}>🔫</div>
                <div style={{position:"absolute",top:7,right:7,fontFamily:"var(--fd)",fontSize:12,color:"#fff",textShadow:"-1px -1px 0 #000,1px 1px 0 #000",lineHeight:1.25,textAlign:"right",letterSpacing:1}}>HEIST GONE<br/><span style={{color:"#FF1F4E"}}>WRONG 💀</span></div>
                <div style={{position:"absolute",top:7,left:7,background:"rgba(6,6,16,.84)",borderRadius:4,padding:"2px 6px",fontSize:8,color:"#FF1F4E",fontWeight:700}}>👁 5.1M</div>
              </div>
              <div style={{position:"absolute",bottom:2,left:16,width:148,borderRadius:"var(--r2)",overflow:"hidden",aspectRatio:"16/9",background:"linear-gradient(145deg,#020610,#081424)",border:"2px solid rgba(0,207,255,.38)"}}>
                <div style={{position:"absolute",bottom:4,left:6,fontSize:20}}>🎯</div>
                <div style={{position:"absolute",top:5,right:5,fontFamily:"var(--fd)",fontSize:10,color:"#00CFFF",textShadow:"0 0 9px #00CFFF",lineHeight:1.3,textAlign:"right",letterSpacing:1}}>SOLO<br/>vs SQUAD</div>
                <div style={{position:"absolute",top:5,left:5,background:"rgba(6,6,16,.84)",borderRadius:3,padding:"2px 5px",fontSize:7,color:"#00CFFF",fontWeight:700}}>👁 1.8M</div>
              </div>
              <div className="fl2" style={{position:"absolute",top:0,right:0,background:"var(--card)",border:"1px solid var(--b3)",borderRadius:"var(--r3)",padding:"10px 15px",boxShadow:"0 8px 28px rgba(0,0,0,.45)"}}>
                <div style={{fontSize:8,color:"var(--t4)",letterSpacing:2,marginBottom:2}}>AVG CTR BOOST</div>
                <div style={{fontFamily:"var(--fd)",fontSize:26,color:"var(--lime)"}}>+148%</div>
              </div>
              <div className="fl" style={{position:"absolute",top:"46%",right:-10,background:"var(--card)",border:"1px solid rgba(255,31,78,.3)",borderRadius:"var(--r2)",padding:"9px 13px"}}>
                <div style={{fontSize:8,color:"var(--t4)",letterSpacing:2,marginBottom:1}}>EXPRESS</div>
                <div style={{fontFamily:"var(--fd)",fontSize:18,color:"var(--red)"}}>6 HRS ⚡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <div style={{background:"var(--ink2)",borderTop:"1px solid var(--b1)",borderBottom:"1px solid var(--b1)",padding:"20px 26px"}}>
        <div className="srow" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14,textAlign:"center"}}>
          {[["🖼️","500+","Thumbnails"],["😊","200+","Creators"],["⚡","6hr","Express"],["⭐","4.9","Rating"],["📈","+148%","CTR Boost"],["🔄","∞","Revisions"]].map(([ic,n,l],i)=>(
            <div key={l} className={`fu d${Math.min(i+1,5)}`}>
              <div style={{fontSize:16,marginBottom:2}}>{ic}</div>
              <div style={{fontFamily:"var(--fd)",fontSize:24,color:"var(--red)"}}>{n}</div>
              <div style={{fontSize:9,color:"var(--t4)",letterSpacing:2}}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="sec">
        <div className="wrap">
          <SH over="🎨 OUR WORK" title="Thumbnail" hl="Portfolio" sub="Click any thumbnail to order that exact style. All 100% custom — never templates."/>
          <div style={{display:"flex",gap:7,marginBottom:28,flexWrap:"wrap",justifyContent:"center"}}>
            {CATS.map(c=><button key={c.id} onClick={()=>setCat(c.id)} className={`chip ${cat===c.id?"on":""}`}>{c.i} {c.l}</button>)}
          </div>
          <div className="tgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))",gap:13}}>
            {filteredThumbs.map(t=><ThumbCard key={t.id} t={t} onOrder={()=>handleOrder(PKGS[1])}/>)}
          </div>
        </div>
      </section>

      {/* ═══ BEFORE / AFTER ═══ */}
      <section style={{padding:"60px 24px",background:"var(--ink2)"}}>
        <div className="wrap">
          <SH over="📊 PROOF" title="Before vs" hl="After" sub="Real thumbnails we transformed. The numbers speak for themselves."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:20}}>
            {[{b:{bg:["#222","#333"],text:"MINECRAFT DAY 1",ac:"#fff",e:"⛏️"},a:{bg:["#0a1d0a","#124f12"],text:"RICHEST",ac:"#FFBA00",e:"⛏️"},r:"+218% CTR"},
              {b:{bg:["#111","#222"],text:"BGMI GAMEPLAY",ac:"#fff",e:"🎯"},a:{bg:["#020610","#081424"],text:"SOLO vs SQUAD",ac:"#00CFFF",e:"🎯"},r:"+144% CTR"}
            ].map((pair,i)=>(
              <div key={i} className="card" style={{padding:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 40px 1fr",gap:10,alignItems:"center",marginBottom:14}}>
                  <div>
                    <div style={{fontSize:10,color:"var(--t4)",letterSpacing:2,marginBottom:6}}>BEFORE</div>
                    <div style={{borderRadius:"var(--r2)",overflow:"hidden",aspectRatio:"16/9",background:`linear-gradient(145deg,${pair.b.bg[0]},${pair.b.bg[1]})`,position:"relative",border:"1px solid var(--b2)"}}>
                      <div style={{position:"absolute",bottom:5,left:7,fontSize:22}}>{pair.b.e}</div>
                      <div style={{position:"absolute",top:5,right:5,fontFamily:"var(--fd)",fontSize:10,color:pair.b.ac,textAlign:"right",letterSpacing:1,lineHeight:1.2}}>{pair.b.text}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"center",color:"var(--red)",fontSize:22}}>→</div>
                  <div>
                    <div style={{fontSize:10,color:"var(--lime)",letterSpacing:2,marginBottom:6}}>AFTER</div>
                    <div style={{borderRadius:"var(--r2)",overflow:"hidden",aspectRatio:"16/9",background:`linear-gradient(145deg,${pair.a.bg[0]},${pair.a.bg[1]})`,position:"relative",border:`1px solid ${pair.a.ac}44`,boxShadow:`0 4px 16px ${pair.a.ac}22`}}>
                      <div style={{position:"absolute",width:60,height:60,borderRadius:"50%",background:`radial-gradient(circle,${pair.a.ac}66,transparent)`,top:"35%",left:"30%",transform:"translate(-50%,-50%)",filter:"blur(16px)"}}/>
                      <div style={{position:"absolute",bottom:5,left:7,fontSize:22}}>{pair.a.e}</div>
                      <div style={{position:"absolute",top:5,right:5,fontFamily:"var(--fd)",fontSize:11,color:pair.a.ac,textShadow:`0 0 8px ${pair.a.ac}`,textAlign:"right",letterSpacing:1,lineHeight:1.2}}>{pair.a.text}</div>
                    </div>
                  </div>
                </div>
                <div style={{textAlign:"center",padding:"8px 14px",background:"rgba(0,255,122,.08)",border:"1px solid rgba(0,255,122,.2)",borderRadius:"var(--r2)",fontSize:14,fontWeight:800,color:"var(--lime)"}}>
                  Result: <strong style={{fontFamily:"var(--fd)",fontSize:18}}>{pair.r}</strong> increase
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STYLES ═══ */}
      <section id="styles" className="sec">
        <div className="wrap">
          <SH over="🎨 DESIGN STYLES" title="Choose Your" hl="Style" sub="6 distinct visual styles, each optimised for a specific audience and emotion."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:14}}>
            {STYLE_CATS.map(s=><StyleCard key={s.id} s={s} onOrder={()=>handleOrder(PKGS[1])}/>)}
          </div>
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      <section id="packages" style={{padding:"96px 24px",background:"var(--ink2)"}}>
        <div className="wrap">
          <SH over="💰 PRICING" title="Pick Your" hl="Plan" sub="No templates. No shortcuts. 100% custom every time."/>
          <div className="pgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(228px,1fr))",gap:18,marginBottom:22}}>
            {PKGS.map(p=><PkgCard key={p.id} pkg={p} onOrder={handleOrder}/>)}
          </div>
          <div style={{background:"var(--surface)",border:"1px solid rgba(255,186,0,.12)",borderRadius:"var(--r3)",padding:"18px 22px",marginBottom:16}}>
            <div style={{fontSize:9,color:"var(--gold)",letterSpacing:3,fontWeight:700,marginBottom:12}}>⚡ POWER ADD-ONS</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
              {ADDONS.map(a=>(
                <div key={a.id} style={{background:"var(--card)",border:"1px solid var(--b2)",borderRadius:"var(--r1)",padding:"8px 14px",display:"flex",alignItems:"center",gap:10}}>
                  <div><div style={{fontSize:12,color:"var(--t2)",fontWeight:600}}>{a.l}</div><div style={{fontSize:10,color:"var(--t4)"}}>{a.d}</div></div>
                  <div style={{fontFamily:"var(--fd)",fontSize:16,color:"var(--gold)",marginLeft:6}}>+₹{a.p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="sec">
        <div className="wrap">
          <SH over="⚙️ PROCESS" title="How It" hl="Works" sub="From order to delivery in as little as 6 hours."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(152px,1fr))",gap:26}}>
            {[["01","🛒","Pick a Plan","Choose package + add-ons","var(--red)"],["02","📝","Fill Form","Title, style, emotion, refs","var(--gold)"],["03","💳","Pay Securely","UPI, Card or Net Banking","var(--cyan)"],["04","🎨","We Design","100% custom from scratch","var(--purp)"],["05","📦","Get Delivered","PNG via email & Drive link","var(--lime)"],["06","🔄","Revisions","Until you're 100% happy","#FF8C00"]].map(([step,ic,title,desc,col],i)=>(
              <div key={step} className={`fu d${Math.min(i+1,5)}`} style={{textAlign:"center"}}>
                <div style={{width:66,height:66,margin:"0 auto 14px",borderRadius:"50%",background:`${col}0e`,border:`2px solid ${col}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,position:"relative",boxShadow:`0 0 20px ${col}12`}}>
                  {ic}
                  <div style={{position:"absolute",top:-7,right:-7,width:22,height:22,borderRadius:"50%",background:`linear-gradient(135deg,${col},${col}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:10,color:"#000"}}>{step}</div>
                </div>
                <div style={{fontFamily:"var(--fd)",fontSize:15,letterSpacing:1.5,color:col,marginBottom:6}}>{title}</div>
                <div style={{fontSize:12,color:"var(--t3)",lineHeight:1.7,maxWidth:152,margin:"0 auto"}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" style={{padding:"96px 24px",background:"var(--ink2)"}}>
        <div className="wrap">
          <SH over="❤️ REVIEWS" title="What Creators" hl="Say" sub="Real results from real channels. No fake reviews, no fake numbers."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:13,marginBottom:28}}>
            {REVIEWS.map((r,i)=><ReviewCard key={i} r={r} delay={Math.min(i+1,5)}/>)}
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:52,color:"var(--gold)"}}>4.9</div>
            <div style={{display:"flex",gap:3,justifyContent:"center",margin:"6px 0"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:"var(--gold)",fontSize:22}}>★</span>)}</div>
            <div style={{fontSize:12,color:"var(--t4)"}}>Based on 200+ verified orders</div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="sec">
        <div className="wrap">
          <SH over="❓ SUPPORT" title="Frequently Asked" hl="Questions" sub="Everything you need to know before ordering."/>
          <div style={{maxWidth:740,margin:"0 auto"}}>
            {FAQS.map((f,i)=><FaqItem key={i} q={f.q} a={f.a} open={faqOpen===i} onToggle={()=>setFaqOpen(faqOpen===i?null:i)}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <div style={{fontSize:14,color:"var(--t3)",marginBottom:12}}>Still have questions?</div>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener" className="btn btn-ghost">💬 Ask on WhatsApp →</a>
          </div>
        </div>
      </section>

      {/* ═══ LEAD MAGNET ═══ */}
      <section className="sec-sm" style={{background:"var(--ink2)"}}>
        <div className="wrap">
          <div style={{maxWidth:640,margin:"0 auto",background:"linear-gradient(135deg,var(--card),var(--surface))",border:"1px solid var(--b3)",borderRadius:"var(--r4)",padding:"34px 38px"}}>
            {emailDone?(
              <div style={{textAlign:"center"}}><div style={{fontSize:50,marginBottom:10}}>✅</div>
                <div style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--lime)",letterSpacing:2}}>YOU'RE IN!</div>
                <div style={{fontSize:13,color:"var(--t3)",marginTop:8}}>Check your email for the free CTR guide + bonus tips.</div>
              </div>
            ):(
              <div>
                <div style={{fontSize:10,color:"var(--red)",letterSpacing:4,fontWeight:700,marginBottom:8}}>🎁 FREE RESOURCE</div>
                <div style={{fontFamily:"var(--fd)",fontSize:22,marginBottom:8}}>Get Our <span className="t-gold">CTR Thumbnail Guide</span> Free</div>
                <div style={{fontSize:13,color:"var(--t3)",marginBottom:18,lineHeight:1.75}}>7 proven tricks top gaming channels use to 10× their click-through rate. PDF sent instantly.</div>
                <div style={{display:"flex",gap:9}}>
                  <input type="email" className="ifield" placeholder="your@email.com" style={{flex:1}} value={emailVal} onChange={e=>{setEmailVal(e.target.value);setEmailErr("");}} onKeyDown={e=>e.key==="Enter"&&(emailVal.includes("@")?setEmailDone(true):setEmailErr("Enter a valid email"))}/>
                  <button className="btn btn-gold" onClick={()=>emailVal.includes("@")?setEmailDone(true):setEmailErr("Enter a valid email")}>GET FREE PDF</button>
                </div>
                {emailErr&&<div className="ierr" style={{marginTop:5}}>⚠ {emailErr}</div>}
                <div style={{fontSize:10,color:"var(--t4)",marginTop:9}}>No spam. 200+ creators grabbed it. Unsubscribe anytime.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="sec">
        <div className="wrap">
          <SH over="📞 CONTACT" title="Get in" hl="Touch" sub="Have a question? We reply within 6 hours."/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,maxWidth:900,margin:"0 auto"}}>
            <div>
              {[{i:"📧",l:"Email",v:BRAND.email,href:`mailto:${BRAND.email}`},{i:"📱",l:"WhatsApp",v:BRAND.phone,href:`https://wa.me/${BRAND.whatsapp}`},{i:"📸",l:"Instagram",v:"@pandastudiox",href:"https://instagram.com/pandastudiox"}].map(({i,l,v,href})=>(
                <a key={l} href={href} target="_blank" rel="noopener" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"var(--card)",border:"1px solid var(--b1)",borderRadius:"var(--r2)",marginBottom:10,textDecoration:"none",transition:"border-color .18s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--b3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--b1)"}>
                  <span style={{fontSize:22}}>{i}</span>
                  <div>
                    <div style={{fontSize:10,color:"var(--t4)",letterSpacing:2}}>{l.toUpperCase()}</div>
                    <div style={{fontSize:13,color:"var(--t2)",fontWeight:600}}>{v}</div>
                  </div>
                </a>
              ))}
              <div style={{background:"rgba(0,207,255,.06)",border:"1px solid rgba(0,207,255,.15)",borderRadius:"var(--r2)",padding:14,fontSize:12,color:"var(--cyan)"}}>
                ⚡ Average response: <strong>under 6 hours</strong><br/>For urgent orders use WhatsApp.
              </div>
            </div>
            {contactDone?(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                <div style={{fontSize:48}}>✅</div>
                <div style={{fontFamily:"var(--fd)",fontSize:20,color:"var(--lime)",letterSpacing:2}}>MESSAGE SENT!</div>
                <div style={{fontSize:13,color:"var(--t3)"}}>We'll reply within 6 hours.</div>
              </div>
            ):(
              <div>
                <div className="igroup"><label className="ilabel">Your Name</label><input className="ifield" placeholder="Arjun Sharma" value={contactForm.name} onChange={e=>setContactForm(f=>({...f,name:e.target.value}))}/></div>
                <div className="igroup"><label className="ilabel">Email Address</label><input type="email" className="ifield" placeholder="you@example.com" value={contactForm.email} onChange={e=>setContactForm(f=>({...f,email:e.target.value}))}/></div>
                <div className="igroup"><label className="ilabel">Message</label><textarea className="iarea" placeholder="Tell us about your channel or ask any questions…" value={contactForm.msg} onChange={e=>setContactForm(f=>({...f,msg:e.target.value}))}/></div>
                <button className="btn btn-red btn-lg" style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(contactForm.name&&contactForm.email&&contactForm.msg)setContactDone(true);else push("Please fill all fields","err");}}>SEND MESSAGE →</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{padding:"96px 24px",textAlign:"center",background:"linear-gradient(180deg,var(--ink),#0e0002,var(--ink))",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0}}>
          <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,31,78,.06) 0%,transparent 68%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
          <div className="gbg" style={{position:"absolute",inset:0,opacity:.38}}/>
        </div>
        <div style={{position:"relative",zIndex:1,maxWidth:660,margin:"0 auto"}}>
          <div style={{fontSize:68,marginBottom:14,animation:"floatA 4s ease-in-out infinite"}}>🚀</div>
          <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(30px,5vw,54px)",lineHeight:.98,marginBottom:14}}>
            Ready to Get <span className="t-red">More Views?</span>
          </h2>
          <p style={{color:"var(--t3)",fontSize:15,marginBottom:28,lineHeight:1.85}}>
            Join 200+ creators who've doubled their CTR with {BRAND.name}.<br/>
            Starting at just <span style={{color:"var(--gold)",fontWeight:700}}>₹99</span>. No templates. 100% original.
          </p>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              {[[h,"HRS"],[m,"MIN"],[s,"SEC"]].map(([val,lbl],i)=>(
                <span key={lbl} style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{background:"var(--card)",border:"1px solid var(--b2)",borderRadius:"var(--r2)",padding:"8px 14px",textAlign:"center",minWidth:54}}>
                    <div style={{fontFamily:"var(--fd)",fontSize:26,color:"var(--red)",lineHeight:1,letterSpacing:2}}>{val}</div>
                    <div style={{fontSize:8,color:"var(--t4)",letterSpacing:2,textTransform:"uppercase",marginTop:2}}>{lbl}</div>
                  </span>
                  {i<2&&<span style={{fontFamily:"var(--fd)",fontSize:22,color:"var(--red)"}}>:</span>}
                </span>
              ))}
            </div>
          </div>
          <div style={{fontSize:10,color:"var(--t4)",marginBottom:22}}>Until daily slots reset</div>
          <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"rgba(255,31,78,.07)",border:"1px solid rgba(255,31,78,.18)",borderRadius:"var(--r2)",padding:"9px 18px",marginBottom:26,fontSize:13}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"var(--red)",animation:"pulseDot 1.2s infinite"}}/>
            <span style={{color:"var(--t2)"}}>Only <strong style={{color:"var(--red)"}}>{slots}</strong> slot{slots!==1?"s":""} left today</span>
            <span className="badge br" style={{fontSize:8}}>LIVE</span>
          </div>
          <div><button className="btn btn-red btn-xl rg" onClick={()=>handleOrder(PKGS[1])} style={{fontSize:17}}>🛒 ORDER YOUR THUMBNAIL NOW</button></div>
          <div style={{marginTop:14,fontSize:12,color:"var(--t4)"}}>⚡ Express 6-hr · 🔒 Secure payment · 🔄 Revisions · 🚫 No watermark</div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{background:"var(--ink2)",borderTop:"1px solid var(--b1)",padding:"52px 26px 28px"}}>
        <div className="wrap">
          <div className="fgrid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:38,marginBottom:40}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,var(--red),var(--red2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🐼</div>
                <div><div style={{fontFamily:"var(--fd)",fontSize:16,letterSpacing:3}}>{BRAND.name}</div><div style={{fontSize:8,color:"var(--red)",letterSpacing:3}}>TURN VIEWS INTO CLICKS</div></div>
              </div>
              <p style={{color:"var(--t4)",fontSize:12,lineHeight:1.9,maxWidth:230,marginBottom:16}}>Professional custom thumbnail design for YouTube, Shorts & Instagram. Gaming specialists.</p>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {["📸 Instagram","💬 Discord","🎥 YouTube","💬 WhatsApp"].map(s=><div key={s} style={{padding:"4px 10px",borderRadius:"var(--r1)",fontSize:10,cursor:"pointer",background:"var(--surface)",border:"1px solid var(--b2)",color:"var(--t3)"}}>{s}</div>)}
              </div>
            </div>
            {[{t:"SERVICES",ls:["YouTube Thumbnails","Shorts Covers","Instagram Covers","Gaming Style","Vlog Style","Course Style"]},{t:"COMPANY",ls:["Portfolio","Packages","How It Works","Reviews","FAQ","Contact"]},{t:"LEGAL",ls:["Terms & Conditions","Privacy Policy","Refund Policy","Cookie Policy"]}].map(col=>(
              <div key={col.t}>
                <div style={{fontSize:9,color:"var(--red)",letterSpacing:3,fontWeight:700,marginBottom:14}}>{col.t}</div>
                {col.ls.map(l=><div key={l} style={{padding:"4px 0",fontSize:12,color:"var(--t4)",cursor:"pointer",transition:"color .18s"}} onMouseEnter={e=>e.currentTarget.style.color="var(--t2)"} onMouseLeave={e=>e.currentTarget.style.color="var(--t4)"}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{background:"rgba(255,31,78,.05)",border:"1px solid rgba(255,31,78,.12)",borderRadius:"var(--r3)",padding:"20px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:26}}>
            <div>
              <div style={{fontFamily:"var(--fd)",fontSize:18,letterSpacing:2,marginBottom:2}}>Ready to <span className="t-red">10X your CTR?</span></div>
              <div style={{fontSize:12,color:"var(--t3)"}}>200+ creators already growing with {BRAND.name}</div>
            </div>
            <button className="btn btn-red rg" onClick={()=>handleOrder(PKGS[1])}>🛒 ORDER — FROM ₹99</button>
          </div>
          <div className="divider" style={{marginBottom:18}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:9}}>
            <div style={{fontSize:11,color:"var(--t4)"}}>© 2026 {BRAND.name} · All rights reserved</div>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"var(--lime)",animation:"pulseDot 2s infinite"}}/>
              <span style={{fontSize:10,color:"var(--t4)"}}>{BRAND.email}</span>
            </div>
            <div style={{fontFamily:"var(--fd)",fontSize:11,color:"var(--red)",letterSpacing:2}}>HIGH CTR. REAL RESULTS.</div>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING BUTTONS ═══ */}
      <button className="fab" onClick={()=>handleOrder(PKGS[1])}>🛒</button>
      <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener" className="wabtn">💬</a>

      {/* ═══ MODALS ═══ */}
      {orderPkg&&!orderSuccess&&<OrderModal initPkg={orderPkg} onClose={()=>setOrderPkg(null)} onSuccess={handleSuccess}/>}
      {orderSuccess&&<OrderSuccess data={orderSuccess} onClose={()=>setOrderSuccess(null)}/>}

      {/* ═══ NOTIFICATIONS ═══ */}
      <NList list={notifs}/>
    </div>
  );
}
