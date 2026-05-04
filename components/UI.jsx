// components/UI.jsx — All remaining reusable components
// ✅ NO hooks inside .map() — every card is a proper component

import { useState } from "react";
import { BRAND, PKGS } from "../data.js";

/* ═══════════════════════════════════════════════════════════
   ORDER SUCCESS MODAL
   ═══════════════════════════════════════════════════════════ */
export function OrderSuccess({ data, onClose }) {
  return (
    <div
      style={{
        position:"fixed", inset:0, background:"rgba(6,6,16,.96)",
        display:"flex", alignItems:"center", justifyContent:"center",
        zIndex:1001, padding:20, backdropFilter:"blur(14px)",
        animation:"fadeIn .3s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background:"var(--card)", border:"1.5px solid rgba(0,255,122,.25)",
          borderRadius:"var(--r4)", padding:"36px 30px", width:"100%", maxWidth:450,
          textAlign:"center",
          boxShadow:"0 32px 80px rgba(0,0,0,.9), 0 0 80px rgba(0,255,122,.07)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Checkmark */}
        <div style={{
          width:78, height:78, borderRadius:"50%",
          background:"rgba(0,255,122,.1)", border:"2px solid rgba(0,255,122,.3)",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 18px", fontSize:38,
        }}>✅</div>

        <div style={{ fontFamily:"var(--fd)", fontSize:30, letterSpacing:2, marginBottom:6 }}>ORDER PLACED!</div>
        <div style={{ color:"var(--t3)", fontSize:14, marginBottom:22, lineHeight:1.85 }}>
          Your <span style={{ color:"var(--red)", fontWeight:700 }}>{data.pkg.n}</span> order is confirmed,{" "}
          <span style={{ color:"#fff" }}>{data.name}</span>.<br />
          Receipt sent to <span style={{ color:"var(--gold)" }}>{data.email}</span>.
        </div>

        {/* Order ID */}
        <div style={{ background:"var(--deep)", borderRadius:"var(--r3)", padding:"14px 18px", marginBottom:18 }}>
          <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:3, marginBottom:4 }}>YOUR ORDER ID</div>
          <div style={{ fontFamily:"var(--fd)", fontSize:28, color:"var(--cyan)", letterSpacing:4 }}>{data.oid}</div>
          <div style={{ fontSize:11, color:"var(--t3)", marginTop:3 }}>Estimated delivery: {data.pkg.del}</div>
        </div>

        {/* Next steps */}
        <div style={{
          background:"rgba(255,186,0,.06)", border:"1px solid rgba(255,186,0,.2)",
          borderRadius:"var(--r2)", padding:"13px 16px", marginBottom:16, textAlign:"left",
        }}>
          <div style={{ fontSize:10, color:"var(--gold)", fontWeight:700, letterSpacing:2, marginBottom:9 }}>
            NEXT STEPS
          </div>
          {[
            ["💳", `Pay ₹${data.total} · UPI: ${BRAND.upi}`],
            ["📝", "Add your Order ID in the payment note"],
            ["🎨", "Work starts within 1hr of confirmation"],
            ["📦", `Delivered in ${data.pkg.del} to your email`],
          ].map(([ic, t]) => (
            <div key={t} style={{ display:"flex", gap:10, fontSize:13, color:"var(--t2)", marginBottom:7 }}>
              <span style={{ flexShrink:0 }}>{ic}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank" rel="noopener"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            background:"rgba(37,211,102,.1)", border:"1px solid rgba(37,211,102,.25)",
            borderRadius:"var(--r2)", padding:"11px 18px", color:"#25D366",
            fontWeight:700, fontSize:13, marginBottom:12, textDecoration:"none",
          }}
        >💬 Send payment screenshot on WhatsApp</a>

        <button className="btn btn-ghost" style={{ width:"100%", justifyContent:"center" }} onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   THUMBNAIL CARD — proper component, hooks at top-level
   ═══════════════════════════════════════════════════════════ */
export function ThumbCard({ t, onOrder }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="thc"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   `linear-gradient(145deg, ${t.bg[0]}, ${t.bg[1]})`,
        borderColor:  hov ? t.ac : "transparent",
        boxShadow:    hov ? `0 14px 44px ${t.ac}2a` : "0 2px 12px rgba(0,0,0,.55)",
      }}
    >
      {/* Grid lines */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(255,255,255,.02) 22px,rgba(255,255,255,.02) 23px),repeating-linear-gradient(90deg,transparent,transparent 22px,rgba(255,255,255,.02) 22px,rgba(255,255,255,.02) 23px)",
      }} />
      {/* Glow orb */}
      <div style={{
        position:"absolute", width:88, height:88, borderRadius:"50%",
        background:`radial-gradient(circle, ${t.ac}66, transparent)`,
        top:"40%", left:"35%", transform:"translate(-50%,-50%)",
        filter:"blur(22px)", opacity: hov ? 1 : .55, transition:"opacity .3s",
      }} />
      {/* Emoji */}
      <div style={{
        position:"absolute", bottom:6, left:9, fontSize:34, lineHeight:1,
        filter:"drop-shadow(0 3px 8px rgba(0,0,0,.9))",
        transform: hov ? "scale(1.18)" : "scale(1)", transition:"transform .3s",
      }}>{t.e}</div>
      {/* Main text */}
      <div style={{ position:"absolute", top:7, right:7, textAlign:"right", maxWidth:"62%" }}>
        <div style={{
          fontFamily:"var(--fd)",
          fontSize:"clamp(11px, 2.5vw, 17px)",
          color:"#fff", lineHeight:1.05, letterSpacing:1.5,
          textShadow:`-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0 0 16px ${t.ac}`,
        }}>{t.text}</div>
        <div style={{ fontSize:9, color:t.ac, fontWeight:700, letterSpacing:1.5, marginTop:3,
          textShadow:`0 0 7px ${t.ac}` }}>{t.sub}</div>
      </div>
      {/* Views badge */}
      <div style={{
        position:"absolute", top:7, left:7,
        background:"rgba(6,6,16,.84)", border:`1px solid ${t.ac}33`,
        borderRadius:5, padding:"2px 7px", fontSize:9, color:t.ac, fontWeight:700,
      }}>👁 {t.v}</div>
      {/* Hover overlay */}
      <div className="thc-ov">
        <div style={{ fontFamily:"var(--fd)", fontSize:12, letterSpacing:3, color:"#fff" }}>ORDER THIS STYLE</div>
        <button className="btn btn-red btn-sm" onClick={e => { e.stopPropagation(); onOrder(); }}>
          GET IT →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PACKAGE CARD — proper component
   ═══════════════════════════════════════════════════════════ */
export function PkgCard({ pkg, onOrder }) {
  const [hov, setHov] = useState(false);
  const revText = pkg.rev === -1 ? "Unlimited" : `${pkg.rev} revision${pkg.rev !== 1 ? "s" : ""}`;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", borderRadius:"var(--r4)", padding:"26px 22px",
        transition:"transform .32s var(--ease), box-shadow .32s var(--ease)",
        transform: hov ? "translateY(-9px)" : "none",
        background: pkg.pop
          ? "linear-gradient(145deg, #1a0308, #0d0000)"
          : "linear-gradient(145deg, var(--card), var(--surface))",
        border:`2px solid ${hov || pkg.pop ? pkg.c : "var(--b1)"}`,
        boxShadow: hov || pkg.pop
          ? `0 0 32px ${pkg.c}14, 0 20px 55px rgba(0,0,0,.4)`
          : "none",
      }}
    >
      {/* Popular badge */}
      {pkg.badge && (
        <div style={{
          position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)",
          background:`linear-gradient(90deg, ${pkg.c}, ${pkg.c}bb)`,
          color:"#000", padding:"4px 20px", borderRadius:99,
          fontSize:9, fontWeight:900, letterSpacing:2.5, whiteSpace:"nowrap",
          boxShadow:`0 4px 18px ${pkg.c}44`,
        }}>{pkg.ic} {pkg.badge}</div>
      )}

      <div style={{ fontSize:34, marginBottom:10 }}>{pkg.ic}</div>
      <div style={{ fontFamily:"var(--fd)", fontSize:22, letterSpacing:3, color:pkg.c, marginBottom:3 }}>{pkg.n}</div>
      <div style={{ fontSize:12, color:"var(--t4)", marginBottom:14, lineHeight:1.5 }}>{pkg.desc}</div>

      <div style={{ fontFamily:"var(--fd)", fontSize:46, letterSpacing:-1, marginBottom:3 }}>₹{pkg.p}</div>
      <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:20 }}>
        {pkg.del} · {revText}
      </div>

      <div style={{ marginBottom:22, display:"flex", flexDirection:"column", gap:8 }}>
        {pkg.feats.map(f => (
          <div key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:12, color:"var(--t2)" }}>
            <div style={{
              width:16, height:16, borderRadius:"50%",
              background:`${pkg.c}14`, border:`1px solid ${pkg.c}2a`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:8, color:pkg.c, flexShrink:0,
            }}>✓</div>
            {f}
          </div>
        ))}
        {pkg.notIncluded && pkg.notIncluded.length > 0 && pkg.notIncluded.map(f => (
          <div key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:11, color:"var(--t4)" }}>
            <div style={{
              width:16, height:16, borderRadius:"50%",
              border:"1px solid var(--b2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:8, flexShrink:0,
            }}>✕</div>
            <span style={{ textDecoration:"line-through" }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        className={`btn ${pkg.pop ? "btn-red" : "btn-outline-red"} btn-lg`}
        style={{
          width:"100%", justifyContent:"center",
          borderColor: !pkg.pop ? pkg.c : undefined,
          color:        !pkg.pop ? pkg.c : undefined,
        }}
        onClick={() => onOrder(pkg)}
      >
        ORDER {pkg.n}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STYLE CATEGORY CARD — proper component
   ═══════════════════════════════════════════════════════════ */
export function StyleCard({ s, onOrder }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onOrder}
      style={{
        background:"var(--card)", border:`1px solid ${hov ? s.c + "44" : "var(--b1)"}`,
        borderRadius:"var(--r3)", padding:22, cursor:"pointer",
        transition:"all .3s var(--ease)",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 16px 44px ${s.c}14` : "none",
      }}
    >
      <div style={{
        width:48, height:48, borderRadius:"var(--r2)",
        background:`${s.c}12`, border:`1px solid ${s.c}28`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:24, marginBottom:14, boxShadow:`0 0 18px ${s.c}14`,
      }}>{s.i}</div>
      <div style={{ fontFamily:"var(--fd)", fontSize:18, letterSpacing:1.5, color:s.c, marginBottom:6 }}>{s.n}</div>
      <div style={{ fontSize:12, color:"var(--t3)", lineHeight:1.7, marginBottom:14 }}>{s.d}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
        {s.k.map(k => (
          <span key={k} style={{
            padding:"3px 9px", borderRadius:99, fontSize:9,
            background:`${s.c}0e`, color:s.c, border:`1px solid ${s.c}22`, fontWeight:600,
          }}>{k}</span>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontFamily:"var(--fd)", fontSize:16, color:s.c, letterSpacing:1 }}>{s.p}</div>
        <div style={{ fontSize:11, color:"var(--t4)" }}>Best: {s.bestFor.slice(0,2).join(", ")}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REVIEW CARD — proper component
   ═══════════════════════════════════════════════════════════ */
export function ReviewCard({ r, delay }) {
  return (
    <div className={`card fu d${delay}`} style={{ padding:22 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:9 }}>
        <div style={{ display:"flex", gap:2 }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ color:"var(--gold)", fontSize:13 }}>★</span>
          ))}
        </div>
        <div style={{
          background:"rgba(0,255,122,.08)", border:"1px solid rgba(0,255,122,.2)",
          borderRadius:99, padding:"2px 9px", fontSize:10, color:"var(--lime)", fontWeight:700,
        }}>{r.ctr} CTR</div>
      </div>
      <p style={{ color:"var(--t2)", fontSize:13, lineHeight:1.8, marginBottom:14, fontStyle:"italic" }}>
        "{r.txt}"
      </p>
      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
        <div style={{
          width:34, height:34, borderRadius:"50%",
          background:"var(--deep)", border:"1px solid var(--b2)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:17,
        }}>{r.av}</div>
        <div>
          <div style={{ fontWeight:700, fontSize:13 }}>{r.n}</div>
          <div style={{ fontSize:10, color:"var(--t4)" }}>{r.h} · {r.pkg}</div>
        </div>
        <span className="badge badge-lime" style={{ marginLeft:"auto", fontSize:8 }}>VERIFIED</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ ITEM — proper component
   ═══════════════════════════════════════════════════════════ */
export function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{
      background:"var(--card)",
      border:`1px solid ${open ? "rgba(255,31,78,.3)" : "var(--b1)"}`,
      borderRadius:"var(--r2)", overflow:"hidden",
      marginBottom:9, transition:"border-color .18s",
    }}>
      <button
        onClick={onToggle}
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"15px 18px", background:"none", border:"none", color:"#fff",
          width:"100%", textAlign:"left", fontSize:14, fontWeight:700,
          cursor:"pointer", gap:12,
        }}
      >
        <span>{q}</span>
        <span style={{
          color:"var(--red)", fontSize:16, flexShrink:0,
          transition:"transform .28s",
          transform: open ? "rotate(180deg)" : "none",
        }}>▾</span>
      </button>
      {open && (
        <div style={{
          padding:"0 18px 15px", fontSize:13, color:"var(--t3)",
          lineHeight:1.85, animation:"slideDown .22s var(--ease)",
        }}>{a}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCARCITY BANNER
   ═══════════════════════════════════════════════════════════ */
export function ScarcityBanner({ slots }) {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:9,
      background:"rgba(255,31,78,.07)", border:"1px solid rgba(255,31,78,.18)",
      borderRadius:"var(--r2)", padding:"9px 18px", fontSize:13,
    }}>
      <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--red)", animation:"pulseDot 1.2s infinite" }} />
      <span style={{ color:"var(--t2)" }}>
        Only <strong style={{ color:"var(--red)" }}>{slots}</strong> order slot{slots !== 1 ? "s" : ""} left today
      </span>
      <span className="badge badge-red" style={{ fontSize:8 }}>LIVE</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COUNTDOWN SEGMENTS
   ═══════════════════════════════════════════════════════════ */
export function CountdownDisplay({ h, m, s }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      {[[h,"HRS"],[m,"MIN"],[s,"SEC"]].map(([val, lbl], i) => (
        <span key={lbl} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="cd-seg">
            <div className="cd-num">{val}</div>
            <div className="cd-lbl">{lbl}</div>
          </span>
          {i < 2 && <span style={{ fontFamily:"var(--fd)", fontSize:22, color:"var(--red)", lineHeight:1 }}>:</span>}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NOTIFICATION TOASTS
   ═══════════════════════════════════════════════════════════ */
export function NotifList({ list }) {
  return (
    <>
      {list.map((n, i) => (
        <div
          key={n.id}
          className={`notif ${n.type === "err" ? "notif-err" : n.type === "info" ? "notif-info" : ""}`}
          style={{ top: 74 + i * 68 }}
        >{n.msg}</div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════ */
export function SectionHead({ over, title, highlight, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 44 }}>
      <div style={{ fontSize:10, color:"var(--red)", letterSpacing:4, fontWeight:700, marginBottom:12 }}>{over}</div>
      <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(30px,5vw,52px)", lineHeight:1, marginBottom:12 }}>
        {title}{" "}<span className="t-red">{highlight}</span>
      </h2>
      {sub && (
        <p style={{ color:"var(--t3)", fontSize:14, maxWidth:500, margin: center ? "0 auto" : "0", lineHeight:1.7 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
export function Footer({ onOrder }) {
  return (
    <footer style={{ background:"var(--ink2)", borderTop:"1px solid var(--b1)", padding:"52px 26px 28px" }}>
      <div className="wrap">
        <div className="foot-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{
                width:36, height:36, borderRadius:8, flexShrink:0,
                background:"linear-gradient(135deg, var(--red), var(--red2))",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
              }}>🐼</div>
              <div>
                <div style={{ fontFamily:"var(--fd)", fontSize:16, letterSpacing:3 }}>{BRAND.name}</div>
                <div style={{ fontSize:8, color:"var(--red)", letterSpacing:3 }}>TURN VIEWS INTO CLICKS</div>
              </div>
            </div>
            <p style={{ color:"var(--t4)", fontSize:12, lineHeight:1.9, maxWidth:235, marginBottom:16 }}>
              Professional custom thumbnail design for YouTube, Shorts & Instagram. Gaming specialists.
            </p>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {[
                { l:"📸 Instagram", href:`https://instagram.com/${BRAND.instagram}` },
                { l:"💬 Discord",   href:`https://discord.gg/pandastudiox`          },
                { l:"🎥 YouTube",   href:`https://youtube.com/${BRAND.youtube}`      },
                { l:"💬 WhatsApp",  href:`https://wa.me/${BRAND.whatsapp}`           },
              ].map(({ l, href }) => (
                <a key={l} href={href} target="_blank" rel="noopener" style={{
                  padding:"4px 10px", borderRadius:"var(--r1)", fontSize:10, cursor:"pointer",
                  background:"var(--surface)", border:"1px solid var(--b2)", color:"var(--t3)",
                  transition:"color .18s, border-color .18s", textDecoration:"none",
                }}
                onMouseEnter={e => { e.currentTarget.style.color="var(--t1)"; e.currentTarget.style.borderColor="var(--b3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="var(--t3)"; e.currentTarget.style.borderColor="var(--b2)"; }}
                >{l}</a>
              ))}
            </div>
          </div>

          {/* Column links */}
          {[
            { t:"SERVICES",  ls:["YouTube Thumbnails","Shorts Covers","Instagram Covers","Gaming Style","Vlog Style","Course Style"] },
            { t:"COMPANY",   ls:["Portfolio","Packages","How It Works","Reviews","FAQ","Contact Us"] },
            { t:"LEGAL",     ls:["Terms & Conditions","Privacy Policy","Refund Policy","Cookie Policy"] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontSize:9, color:"var(--red)", letterSpacing:3, fontWeight:700, marginBottom:14 }}>{col.t}</div>
              {col.ls.map(l => (
                <div key={l} style={{
                  padding:"4px 0", fontSize:12, color:"var(--t4)", cursor:"pointer",
                  transition:"color .18s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--t2)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--t4)"}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer CTA strip */}
        <div style={{
          background:"rgba(255,31,78,.05)", border:"1px solid rgba(255,31,78,.12)",
          borderRadius:"var(--r3)", padding:"20px 26px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:14, marginBottom:26,
        }}>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:18, letterSpacing:2, marginBottom:2 }}>
              Ready to <span className="t-red">10X your CTR?</span>
            </div>
            <div style={{ fontSize:12, color:"var(--t3)" }}>200+ creators already growing with {BRAND.name}</div>
          </div>
          <button className="btn btn-red rg" onClick={onOrder}>🛒 ORDER — FROM ₹99</button>
        </div>

        {/* Bottom bar */}
        <div className="divider" style={{ marginBottom:18 }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:9 }}>
          <div style={{ fontSize:11, color:"var(--t4)" }}>© 2026 {BRAND.name} · All rights reserved</div>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--lime)", animation:"pulseDot 2s infinite" }} />
            <span style={{ fontSize:10, color:"var(--t4)" }}>{BRAND.email}</span>
          </div>
          <div style={{ fontFamily:"var(--fd)", fontSize:11, color:"var(--red)", letterSpacing:2 }}>
            HIGH CTR. REAL RESULTS.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   BEFORE / AFTER COMPARISON SECTION
   ═══════════════════════════════════════════════════════════ */
export function BeforeAfter() {
  const pairs = [
    {
      before: { bg:["#222","#333"], text:"MINECRAFT DAY 1", ac:"#fff", e:"⛏️" },
      after:  { bg:["#0a1d0a","#124f12"], text:"RICHEST",   ac:"#FFB700", e:"⛏️" },
      result: "+218% CTR",
    },
    {
      before: { bg:["#111","#222"], text:"BGMI GAMEPLAY", ac:"#fff", e:"🎯" },
      after:  { bg:["#02060c","#081424"], text:"SOLO vs SQUAD", ac:"#00D4FF", e:"🎯" },
      result: "+144% CTR",
    },
  ];

  return (
    <section className="sec-sm" style={{ background:"var(--ink2)" }}>
      <div className="wrap">
        <SectionHead
          over="📊 PROOF"
          title="Before vs"
          highlight="After"
          sub="Real thumbnails we transformed. The numbers speak for themselves."
        />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))", gap:20 }}>
          {pairs.map((pair, i) => (
            <div key={i} style={{
              background:"var(--card)", border:"1px solid var(--b2)",
              borderRadius:"var(--r3)", padding:20,
            }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 40px 1fr", gap:10, alignItems:"center", marginBottom:14 }}>
                {/* Before */}
                <div>
                  <div style={{ fontSize:10, color:"var(--t4)", letterSpacing:2, marginBottom:6 }}>BEFORE</div>
                  <div style={{
                    borderRadius:"var(--r2)", overflow:"hidden", aspectRatio:"16/9",
                    background:`linear-gradient(145deg, ${pair.before.bg[0]}, ${pair.before.bg[1]})`,
                    position:"relative", border:"1px solid var(--b2)",
                  }}>
                    <div style={{ position:"absolute", bottom:5, left:7, fontSize:22 }}>{pair.before.e}</div>
                    <div style={{
                      position:"absolute", top:5, right:5,
                      fontFamily:"var(--fd)", fontSize:10, color:pair.before.ac,
                      textAlign:"right", letterSpacing:1, lineHeight:1.2,
                    }}>{pair.before.text}</div>
                  </div>
                </div>
                {/* Arrow */}
                <div style={{ textAlign:"center", color:"var(--red)", fontSize:22 }}>→</div>
                {/* After */}
                <div>
                  <div style={{ fontSize:10, color:"var(--lime)", letterSpacing:2, marginBottom:6 }}>AFTER</div>
                  <div style={{
                    borderRadius:"var(--r2)", overflow:"hidden", aspectRatio:"16/9",
                    background:`linear-gradient(145deg, ${pair.after.bg[0]}, ${pair.after.bg[1]})`,
                    position:"relative", border:`1px solid ${pair.after.ac}44`,
                    boxShadow:`0 4px 16px ${pair.after.ac}22`,
                  }}>
                    <div style={{ position:"absolute", width:60, height:60, borderRadius:"50%",
                      background:`radial-gradient(circle, ${pair.after.ac}66, transparent)`,
                      top:"35%", left:"30%", transform:"translate(-50%,-50%)", filter:"blur(16px)" }} />
                    <div style={{ position:"absolute", bottom:5, left:7, fontSize:22 }}>{pair.after.e}</div>
                    <div style={{
                      position:"absolute", top:5, right:5,
                      fontFamily:"var(--fd)", fontSize:11, color:pair.after.ac,
                      textShadow:`0 0 8px ${pair.after.ac}`, textAlign:"right",
                      letterSpacing:1, lineHeight:1.2,
                    }}>{pair.after.text}</div>
                  </div>
                </div>
              </div>
              {/* Result */}
              <div style={{
                textAlign:"center", padding:"8px 14px",
                background:"rgba(0,255,122,.08)", border:"1px solid rgba(0,255,122,.2)",
                borderRadius:"var(--r2)", fontSize:14, fontWeight:800, color:"var(--lime)",
              }}>
                Result: <strong style={{ fontFamily:"var(--fd)", fontSize:18, letterSpacing:1 }}>{pair.result}</strong> increase
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LEAD MAGNET / EMAIL CAPTURE
   ═══════════════════════════════════════════════════════════ */
export function LeadMagnet() {
  const [email, setEmail]   = useState("");
  const [done,  setDone]    = useState(false);
  const [err,   setErr]     = useState("");

  const submit = () => {
    if (!email.includes("@")) { setErr("Please enter a valid email"); return; }
    setDone(true);
    /* REAL: emailjs.send("service_id","template_id",{email}) */
  };

  if (done) return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:50, marginBottom:10 }}>✅</div>
      <div style={{ fontFamily:"var(--fd)", fontSize:22, color:"var(--lime)", letterSpacing:2 }}>YOU'RE IN!</div>
      <div style={{ fontSize:13, color:"var(--t3)", marginTop:8 }}>Check your email for the free CTR guide + bonus tips.</div>
    </div>
  );

  return (
    <div>
      <div style={{ fontSize:10, color:"var(--red)", letterSpacing:4, fontWeight:700, marginBottom:8 }}>🎁 FREE RESOURCE</div>
      <div style={{ fontFamily:"var(--fd)", fontSize:22, marginBottom:8 }}>
        Get Our <span className="t-gold">CTR Thumbnail Guide</span> Free
      </div>
      <div style={{ fontSize:13, color:"var(--t3)", marginBottom:18, lineHeight:1.75 }}>
        7 proven tricks top gaming channels use to 10× their click-through rate.
        PDF sent instantly to your inbox.
      </div>
      <div style={{ display:"flex", gap:9 }}>
        <input
          type="email" className="ifield" placeholder="your@email.com" style={{ flex:1 }}
          value={email}
          onChange={e => { setEmail(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && submit()}
        />
        <button className="btn btn-gold" onClick={submit}>GET FREE PDF</button>
      </div>
      {err && <div className="ierr" style={{ marginTop:5 }}>⚠ {err}</div>}
      <div style={{ fontSize:10, color:"var(--t4)", marginTop:9 }}>
        No spam. 200+ creators grabbed it. Unsubscribe anytime.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════════ */
export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", msg:"" });

  const submit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    /* REAL: emailjs.send(...) */
  };

  return (
    <section id="contact" className="sec" style={{ background:"var(--ink2)" }}>
      <div className="wrap">
        <SectionHead over="📞 CONTACT" title="Get in" highlight="Touch" sub="Have a question? We reply within 6 hours." />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, maxWidth:900, margin:"0 auto" }}>
          {/* Info */}
          <div>
            <div style={{ marginBottom:24 }}>
              {[
                { i:"📧", l:"Email",     v:BRAND.email,  href:`mailto:${BRAND.email}` },
                { i:"📱", l:"WhatsApp",  v:BRAND.phone,  href:`https://wa.me/${BRAND.whatsapp}` },
                { i:"📸", l:"Instagram", v:BRAND.instagram, href:`https://instagram.com/${BRAND.instagram}` },
              ].map(({ i, l, v, href }) => (
                <a key={l} href={href} target="_blank" rel="noopener" style={{
                  display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                  background:"var(--card)", border:"1px solid var(--b1)",
                  borderRadius:"var(--r2)", marginBottom:10, textDecoration:"none",
                  transition:"border-color .18s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--b3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--b1)"}
                >
                  <span style={{ fontSize:22 }}>{i}</span>
                  <div>
                    <div style={{ fontSize:10, color:"var(--t4)", letterSpacing:2 }}>{l.toUpperCase()}</div>
                    <div style={{ fontSize:13, color:"var(--t2)", fontWeight:600 }}>{v}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{
              background:"rgba(0,207,255,.06)", border:"1px solid rgba(0,207,255,.15)",
              borderRadius:"var(--r2)", padding:14, fontSize:12, color:"var(--cyan)",
            }}>
              ⚡ Average response time: <strong>under 6 hours</strong><br />
              For urgent orders use WhatsApp.
            </div>
          </div>
          {/* Form */}
          {sent ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
              <div style={{ fontSize:48 }}>✅</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:20, color:"var(--lime)", letterSpacing:2 }}>MESSAGE SENT!</div>
              <div style={{ fontSize:13, color:"var(--t3)" }}>We'll reply within 6 hours.</div>
            </div>
          ) : (
            <div>
              <div className="igroup">
                <label className="ilabel">Your Name</label>
                <input className="ifield" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
              </div>
              <div className="igroup">
                <label className="ilabel">Email Address</label>
                <input type="email" className="ifield" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} />
              </div>
              <div className="igroup">
                <label className="ilabel">Message</label>
                <textarea className="iarea" placeholder="Tell us about your channel, your video idea, or any questions…" value={form.msg} onChange={e => setForm(f => ({ ...f, msg:e.target.value }))} />
              </div>
              <button className="btn btn-red btn-lg" style={{ width:"100%", justifyContent:"center" }} onClick={submit}>
                SEND MESSAGE →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
