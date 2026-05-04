// App.jsx — PandaStudioX Root Component
// ✅ All hooks at top-level only
// ✅ All components properly imported
// ✅ No useState inside .map()

import { useState, useEffect, useCallback } from "react";
import { THUMBS, CATS, PKGS, ADDONS, STYLE_CATS, REVIEWS, FAQS, BRAND } from "./data.js";
import { useScrolled, useNotif, useOrderSlots } from "./hooks.js";

import Navbar       from "./components/Navbar.jsx";
import Hero         from "./components/Hero.jsx";
import OrderModal   from "./components/OrderModal.jsx";
import AdminPanel   from "./components/AdminPanel.jsx";

import {
  OrderSuccess,
  ThumbCard, PkgCard, StyleCard, ReviewCard, FaqItem,
  ScarcityBanner, CountdownDisplay,
  SectionHead, Footer, NotifList,
  BeforeAfter, LeadMagnet, ContactSection,
} from "./components/UI.jsx";

import { useCountdown } from "./hooks.js";

/* ─── Portfolio section (uses ThumbCard properly) ─────────── */
function PortfolioSection({ onOrder }) {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? THUMBS : THUMBS.filter(t => t.cat === cat);

  return (
    <section id="portfolio" className="sec" style={{ background:"var(--ink)" }}>
      <div className="wrap">
        <SectionHead
          over="🎨 OUR WORK"
          title="Thumbnail"
          highlight="Portfolio"
          sub="Click any thumbnail to order that exact style. All 100% custom — never templates."
        />
        {/* Category filters */}
        <div style={{ display:"flex", gap:7, marginBottom:28, flexWrap:"wrap", justifyContent:"center" }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`chip ${cat === c.id ? "active" : ""}`}
            >
              {c.i} {c.l}
              <span style={{ opacity:.5, marginLeft:4, fontSize:9 }}>({c.count})</span>
            </button>
          ))}
        </div>
        {/* Thumbnail grid — ThumbCard extracted so no hook-in-map */}
        <div className="tg" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(268px,1fr))", gap:13 }}>
          {filtered.map(t => (
            <ThumbCard key={t.id} t={t} onOrder={() => onOrder(PKGS[1])} />
          ))}
        </div>
        {/* Before/After strip */}
        <div style={{
          marginTop:40, background:"var(--surface)",
          border:"1px solid var(--b2)", borderRadius:"var(--r3)",
          padding:"22px 28px",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16,
        }}>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:20, letterSpacing:2, marginBottom:4 }}>
              See the <span className="t-gold">BEFORE vs AFTER</span> difference
            </div>
            <div style={{ fontSize:13, color:"var(--t3)" }}>Real thumbnails transformed with proven CTR design.</div>
          </div>
          <a href="#before-after" className="btn btn-ghost">View Case Studies →</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Styles section (uses StyleCard properly) ─────────────── */
function StylesSection({ onOrder }) {
  return (
    <section id="styles" style={{ padding:"96px 24px", background:"var(--ink2)" }}>
      <div className="wrap">
        <SectionHead
          over="🎨 DESIGN STYLES"
          title="Choose Your"
          highlight="Style"
          sub="6 distinct visual styles, each optimised for a different audience and emotion."
        />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(255px,1fr))", gap:14 }}>
          {STYLE_CATS.map(s => (
            <StyleCard key={s.id} s={s} onOrder={() => onOrder(PKGS[1])} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Packages section (uses PkgCard properly) ─────────────── */
function PackagesSection({ onOrder }) {
  return (
    <section id="packages" className="sec" style={{ background:"var(--ink)" }}>
      <div className="wrap">
        <SectionHead
          over="💰 PRICING"
          title="Pick Your"
          highlight="Plan"
          sub="No templates. No shortcuts. 100% custom every time. Pricing reflects real quality."
        />
        <div className="pkg-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(228px,1fr))", gap:18, marginBottom:22 }}>
          {PKGS.map(p => (
            <PkgCard key={p.id} pkg={p} onOrder={onOrder} />
          ))}
        </div>

        {/* Add-ons strip */}
        <div style={{
          background:"var(--surface)", border:"1px solid rgba(255,186,0,.12)",
          borderRadius:"var(--r3)", padding:"18px 22px", marginBottom:16,
        }}>
          <div style={{ fontSize:9, color:"var(--gold)", letterSpacing:3, fontWeight:700, marginBottom:12 }}>⚡ POWER ADD-ONS</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>
            {ADDONS.map(a => (
              <div key={a.id} style={{
                background:"var(--card)", border:"1px solid var(--b2)",
                borderRadius:"var(--r1)", padding:"8px 14px",
                display:"flex", alignItems:"center", gap:10,
              }}>
                <div>
                  <div style={{ fontSize:12, color:"var(--t2)", fontWeight:600 }}>{a.l}</div>
                  <div style={{ fontSize:10, color:"var(--t4)" }}>{a.desc}</div>
                </div>
                <div style={{ fontFamily:"var(--fd)", fontSize:16, color:"var(--gold)", marginLeft:6 }}>+₹{a.p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revision policy */}
        <div style={{
          background:"var(--surface)", border:"1px solid rgba(0,207,255,.1)",
          borderRadius:"var(--r2)", padding:"16px 22px",
          display:"flex", gap:28, flexWrap:"wrap", alignItems:"center",
        }}>
          <div style={{ fontSize:9, color:"var(--cyan)", letterSpacing:3, fontWeight:700 }}>📋 REVISION POLICY</div>
          {PKGS.map(p => (
            <div key={p.id} style={{ fontSize:13 }}>
              <span style={{ color:p.c, fontWeight:700 }}>{p.n}</span>
              <span style={{ color:"var(--t3)" }}>: {p.rev === -1 ? "Unlimited" : `${p.rev} revision${p.rev !== 1 ? "s" : ""}`}</span>
            </div>
          ))}
          <div style={{ fontSize:11, color:"var(--t4)" }}>* Major concept changes = new order</div>
        </div>
      </div>
    </section>
  );
}

/* ─── How it works section ─────────────────────────────────── */
function HowSection() {
  const steps = [
    ["01","🛒","Pick a Plan",      "Choose your package + add-ons",     "var(--red)"  ],
    ["02","📝","Fill Form",        "Title, style, emotion, references",  "var(--gold)" ],
    ["03","💳","Pay Securely",     "UPI, Card or Net Banking",           "var(--cyan)" ],
    ["04","🎨","We Design",        "100% custom artwork from scratch",   "var(--purp)" ],
    ["05","📦","Get Delivered",    "PNG via email & Google Drive link",  "var(--lime)" ],
    ["06","🔄","Free Revisions",   "Until you're 100% satisfied",        "#FF8C00"     ],
  ];

  return (
    <section id="how" style={{ padding:"96px 24px", background:"var(--ink2)" }}>
      <div className="wrap">
        <SectionHead over="⚙️ PROCESS" title="How It" highlight="Works" sub="From order to delivery in as little as 6 hours." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(152px,1fr))", gap:26 }}>
          {steps.map(([step, ic, title, desc, col], i) => (
            <div key={step} className={`fu d${Math.min(i + 1, 6)}`} style={{ textAlign:"center" }}>
              <div style={{
                width:66, height:66, margin:"0 auto 14px", borderRadius:"50%",
                background:`${col}0e`, border:`2px solid ${col}28`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:26, position:"relative", boxShadow:`0 0 20px ${col}12`,
              }}>
                {ic}
                <div style={{
                  position:"absolute", top:-7, right:-7,
                  width:22, height:22, borderRadius:"50%",
                  background:`linear-gradient(135deg, ${col}, ${col}bb)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"var(--fd)", fontSize:10, fontWeight:700, color:"#000",
                }}>{step}</div>
              </div>
              <div style={{ fontFamily:"var(--fd)", fontSize:15, letterSpacing:1.5, color:col, marginBottom:6 }}>{title}</div>
              <div style={{ fontSize:12, color:"var(--t3)", lineHeight:1.7, maxWidth:152, margin:"0 auto" }}>{desc}</div>
            </div>
          ))}
        </div>
        {/* Connector */}
        <div style={{
          height:2, marginTop:40, opacity:.25,
          background:"linear-gradient(90deg, var(--red), var(--gold), var(--lime))",
          borderRadius:1,
        }} />
      </div>
    </section>
  );
}

/* ─── Reviews section (uses ReviewCard properly) ──────────── */
function ReviewsSection() {
  return (
    <section id="reviews" className="sec" style={{ background:"var(--ink)" }}>
      <div className="wrap">
        <SectionHead
          over="❤️ REVIEWS"
          title="What Creators"
          highlight="Say"
          sub="Real results from real channels. No fake reviews, no fake numbers."
        />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(265px,1fr))", gap:13, marginBottom:28 }}>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} r={r} delay={Math.min(i + 1, 5)} />
          ))}
        </div>
        {/* Rating summary */}
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"var(--fd)", fontSize:52, color:"var(--gold)" }}>4.9</div>
          <div style={{ display:"flex", gap:3, justifyContent:"center", margin:"6px 0" }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ color:"var(--gold)", fontSize:22 }}>★</span>)}
          </div>
          <div style={{ fontSize:12, color:"var(--t4)" }}>Based on 200+ verified orders</div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ section (uses FaqItem properly) ─────────────────── */
function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding:"96px 24px", background:"var(--ink2)" }}>
      <div className="wrap">
        <SectionHead
          over="❓ SUPPORT"
          title="Frequently Asked"
          highlight="Questions"
          sub="Everything you need to know before ordering."
        />
        <div style={{ maxWidth:740, margin:"0 auto" }}>
          {FAQS.map((f, i) => (
            <FaqItem
              key={i}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
        {/* Still have questions */}
        <div style={{ textAlign:"center", marginTop:36 }}>
          <div style={{ fontSize:14, color:"var(--t3)", marginBottom:14 }}>Still have questions?</div>
          <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener"
            className="btn btn-ghost">
            💬 Ask us on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats strip ──────────────────────────────────────────── */
function StatsStrip() {
  const items = [
    ["🖼️","500+","Thumbnails"],
    ["😊","200+","Creators"  ],
    ["⚡","6hr", "Express"   ],
    ["⭐","4.9", "Rating"    ],
    ["📈","+148%","CTR Boost"],
    ["🔄","∞",   "Revisions" ],
  ];
  return (
    <div style={{
      background:"var(--ink2)", borderTop:"1px solid var(--b1)", borderBottom:"1px solid var(--b1)",
      padding:"20px 26px",
    }}>
      <div className="stats-row" style={{
        maxWidth:1100, margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:14, textAlign:"center",
      }}>
        {items.map(([ic, n, l], i) => (
          <div key={l} className={`cu d${Math.min(i+1,5)}`}>
            <div style={{ fontSize:16, marginBottom:2 }}>{ic}</div>
            <div style={{ fontFamily:"var(--fd)", fontSize:24, color:"var(--red)" }}>{n}</div>
            <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Final CTA section ────────────────────────────────────── */
function FinalCTA({ onOrder, slots }) {
  const { h, m, s } = useCountdown();
  return (
    <section style={{
      padding:"96px 24px", textAlign:"center",
      background:"linear-gradient(180deg, var(--ink), #0e0002, var(--ink))",
      position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", inset:0 }}>
        <div style={{
          position:"absolute", width:600, height:600, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,31,78,.06) 0%, transparent 68%)",
          top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        }} />
        <div className="gbg" style={{ position:"absolute", inset:0, opacity:.38 }} />
      </div>
      <div style={{ position:"relative", zIndex:1, maxWidth:660, margin:"0 auto" }}>
        <div style={{ fontSize:68, marginBottom:14, animation:"floatA 4s ease-in-out infinite" }}>🚀</div>
        <h2 style={{
          fontFamily:"var(--fd)", fontSize:"clamp(30px,5vw,54px)",
          lineHeight:.98, marginBottom:14,
        }}>
          Ready to Get <span className="t-red">More Views?</span>
        </h2>
        <p style={{ color:"var(--t3)", fontSize:15, marginBottom:28, lineHeight:1.85 }}>
          Join 200+ creators who've doubled their CTR with {BRAND.name}.<br />
          Starting at just <span style={{ color:"var(--gold)", fontWeight:700 }}>₹99</span>.
          No templates. 100% original.
        </p>

        {/* Countdown */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
          <CountdownDisplay h={h} m={m} s={s} />
        </div>
        <div style={{ fontSize:11, color:"var(--t4)", marginBottom:24 }}>Until daily slots reset</div>

        {/* Scarcity */}
        <div style={{ marginBottom:26 }}>
          <ScarcityBanner slots={slots} />
        </div>

        <button className="btn btn-red btn-xl rg" onClick={() => onOrder(PKGS[1])} style={{ fontSize:17 }}>
          🛒 ORDER YOUR THUMBNAIL NOW
        </button>
        <div style={{ marginTop:14, fontSize:12, color:"var(--t4)" }}>
          ⚡ Express 6-hr available · 🔒 Secure UPI/Card · 🔄 Revisions included · 🚫 No watermark
        </div>
      </div>
    </section>
  );
}

/* ─── Lead magnet section ──────────────────────────────────── */
function LeadSection() {
  return (
    <section className="sec-sm" style={{ background:"var(--ink)" }}>
      <div className="wrap">
        <div style={{
          maxWidth:640, margin:"0 auto",
          background:"linear-gradient(135deg, var(--card), var(--surface))",
          border:"1px solid var(--b3)", borderRadius:"var(--r4)", padding:"34px 38px",
        }}>
          <LeadMagnet />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  /* ─ State ─ */
  const [page,         setPage]         = useState("home"); // "home" | "admin"
  const [orderPkg,     setOrderPkg]     = useState(null);   // triggers OrderModal
  const [orderSuccess, setOrderSuccess] = useState(null);   // triggers OrderSuccess
  const [adminAuth,    setAdminAuth]    = useState(false);
  const [adminPw,      setAdminPw]      = useState("");

  /* ─ Hooks ─ */
  const scrolled           = useScrolled(56);
  const { list: notifs, push } = useNotif();
  const { slots, consume } = useOrderSlots(10);

  /* Live activity toasts */
  useEffect(() => {
    const msgs = [
      { m:"🎉 Rahul just ordered Standard — Gaming style!",   t:"info" },
      { m:"🔥 Priya ordered Premium — Express delivery!",      t:"info" },
      { m:"⚡ New order: BGMI thumbnail — Starter plan",       t:"info" },
    ];
    let i = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < msgs.length) { push(msgs[i].m, msgs[i].t); i++; }
        else clearInterval(iv);
      }, 10000);
      return () => clearInterval(iv);
    }, 7000);
    return () => clearTimeout(timer);
  }, [push]);

  /* Callbacks */
  const handleOrder   = useCallback(pkg => setOrderPkg(pkg || PKGS[1]), []);
  const handleSuccess = useCallback(data => { setOrderPkg(null); setOrderSuccess(data); consume(); }, [consume]);
  const handleClose   = useCallback(() => setOrderSuccess(null), []);

  /* ── ADMIN GATE ── */
  if (page === "admin") {
    if (!adminAuth) return (
      <div style={{
        minHeight:"100vh", background:"var(--ink)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"var(--fb)",
      }}>
        <div style={{
          background:"var(--card)", border:"1px solid rgba(255,31,78,.22)",
          borderRadius:"var(--r4)", padding:42, width:350, textAlign:"center",
        }}>
          <div style={{ fontSize:50, marginBottom:12 }}>🔐</div>
          <div style={{ fontFamily:"var(--fd)", fontSize:24, letterSpacing:3, marginBottom:4 }}>ADMIN ACCESS</div>
          <div style={{ fontSize:12, color:"var(--t4)", marginBottom:24 }}>{BRAND.name} Control Panel</div>
          <input
            type="password"
            className="ifield"
            placeholder="Enter admin password"
            value={adminPw}
            onChange={e => setAdminPw(e.target.value)}
            style={{ marginBottom:12 }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                adminPw === BRAND.adminPass ? setAdminAuth(true) : push("Wrong password", "err");
              }
            }}
          />
          <button
            className="btn btn-red"
            style={{ width:"100%", justifyContent:"center", marginBottom:12 }}
            onClick={() => adminPw === BRAND.adminPass ? setAdminAuth(true) : push("Wrong password", "err")}
          >ENTER DASHBOARD</button>
          <button
            onClick={() => setPage("home")}
            style={{ background:"none", border:"none", color:"var(--t4)", cursor:"pointer", fontSize:12 }}
          >← Back to site</button>
          <div style={{ marginTop:14, fontSize:10, color:"var(--t4)", opacity:.5 }}>Demo password: admin123</div>
        </div>
        <NotifList list={notifs} />
      </div>
    );
    return <AdminPanel onBack={() => { setPage("home"); setAdminAuth(false); }} />;
  }

  /* ── MAIN SITE ── */
  return (
    <div style={{ background:"var(--ink)", minHeight:"100vh", color:"#fff", fontFamily:"var(--fb)" }}>

      {/* Navbar */}
      <Navbar
        scrolled={scrolled}
        onOrder={() => handleOrder(PKGS[1])}
        onAdmin={() => setPage("admin")}
      />

      {/* All page sections */}
      <Hero         onOrder={handleOrder} />
      <StatsStrip />
      <PortfolioSection onOrder={handleOrder} />
      <StylesSection    onOrder={handleOrder} />
      <PackagesSection  onOrder={handleOrder} />
      <HowSection />
      <BeforeAfter />
      <ReviewsSection />
      <FaqSection />
      <LeadSection />
      <ContactSection />
      <FinalCTA onOrder={handleOrder} slots={slots} />
      <Footer   onOrder={() => handleOrder(PKGS[1])} />

      {/* Floating buttons */}
      <button className="fab" onClick={() => handleOrder(PKGS[1])} title="Order Now">🛒</button>
      <a
        href={`https://wa.me/${BRAND.whatsapp}`}
        target="_blank" rel="noopener"
        className="wabtn"
        title="Chat on WhatsApp"
      >💬</a>

      {/* Modals */}
      {orderPkg && !orderSuccess && (
        <OrderModal
          initPkg={orderPkg}
          onClose={() => setOrderPkg(null)}
          onSuccess={handleSuccess}
          onSlotConsume={consume}
        />
      )}
      {orderSuccess && (
        <OrderSuccess data={orderSuccess} onClose={handleClose} />
      )}

      {/* Notification toasts */}
      <NotifList list={notifs} />
    </div>
  );
}
