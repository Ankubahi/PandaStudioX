// components/Hero.jsx
import { useCountdown, useOrderSlots } from "../hooks.js";
import { PKGS } from "../data.js";

export default function Hero({ onOrder }) {
  const { h, m, s }     = useCountdown();
  const { slots }       = useOrderSlots(10);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      background: "var(--ink)", paddingTop: 62,
    }}>
      {/* Background layers */}
      <div style={{ position:"absolute", inset:0 }}>
        <div style={{ position:"absolute", width:800, height:800, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,31,78,.07) 0%, transparent 68%)",
          top:"50%", left:"22%", transform:"translate(-50%,-50%)" }} />
        <div style={{ position:"absolute", width:450, height:450, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,186,0,.04) 0%, transparent 68%)",
          top:"10%", right:"6%" }} />
        <div className="gbg" style={{ position:"absolute", inset:0, opacity:.5 }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:200,
          background:"linear-gradient(transparent, var(--ink))" }} />
      </div>

      <div className="wrap" style={{ padding:"80px 26px", position:"relative", zIndex:1, width:"100%" }}>
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>

          {/* ── Left copy ── */}
          <div className="fu">
            {/* Live slot + countdown banner */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:22 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(255,31,78,.07)", border:"1px solid rgba(255,31,78,.2)",
                borderRadius:99, padding:"6px 14px",
              }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--red)", animation:"pulseDot 1.2s infinite" }} />
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:"var(--red)" }}>
                  🔥 {slots} SLOT{slots !== 1 ? "S" : ""} LEFT TODAY
                </span>
              </div>
              {/* Daily countdown */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:7,
                background:"rgba(255,186,0,.07)", border:"1px solid rgba(255,186,0,.2)",
                borderRadius:99, padding:"6px 14px",
              }}>
                <span style={{ fontSize:10, fontWeight:700, color:"var(--gold)" }}>⏱</span>
                <span style={{ fontFamily:"var(--fd)", fontSize:14, color:"var(--gold)", letterSpacing:2 }}>
                  {h}:{m}:{s}
                </span>
                <span style={{ fontSize:10, color:"var(--t4)" }}>SLOTS RESET</span>
              </div>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(38px, 5.8vw, 70px)",
              lineHeight: .96, marginBottom: 20, letterSpacing: 1.5,
            }}>
              <span className="shimmer">HIGH CTR</span><br />
              <span>THUMBNAILS</span><br />
              <span>THAT GET</span><br />
              <span className="t-red">10X MORE VIEWS</span>
            </h1>

            {/* Sub-copy */}
            <p style={{ color:"var(--t3)", fontSize:15, lineHeight:1.85, marginBottom:28, maxWidth:450 }}>
              Custom-designed for YouTube, Shorts & Instagram. Built for{" "}
              <strong style={{ color:"#fff" }}>gaming creators & streamers.</strong>{" "}
              <span style={{ color:"var(--gold)" }}>Not templates — 100% original every time.</span>
            </p>

            {/* Trust bullets */}
            <div style={{ display:"flex", gap:18, flexWrap:"wrap", marginBottom:30 }}>
              {[["⚡","6-hr Express"],["🔄","Free Revisions"],["💯","100% Custom"],["🎯","CTR Focused"],["🔒","Secure Payment"]].map(([ic, l]) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:14 }}>{ic}</span>
                  <span style={{ fontSize:12, color:"var(--t3)", fontWeight:600 }}>{l}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:26 }}>
              <button className="btn btn-red btn-xl rg" onClick={() => onOrder(PKGS[1])}>
                🛒 ORDER — FROM ₹99
              </button>
              <a href="#portfolio" className="btn btn-ghost btn-lg">👁 VIEW PORTFOLIO</a>
            </div>

            {/* Social proof row */}
            <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
              <div style={{ display:"flex" }}>
                {["🎮","📸","⚡","🌟","🔥"].map((a, i) => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "var(--card)", border: "2px solid var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, marginLeft: i ? -8 : 0, zIndex: 5 - i,
                  }}>{a}</div>
                ))}
              </div>
              <span style={{ fontSize:12, color:"var(--t3)" }}>
                <strong style={{ color:"#fff" }}>500+ thumbnails</strong> delivered to 200+ creators
              </span>
              <div style={{ display:"flex", gap:2 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color:"var(--gold)", fontSize:12 }}>★</span>)}
              </div>
              <span style={{ fontSize:11, color:"var(--t3)" }}>4.9/5</span>
            </div>
          </div>

          {/* ── Right visuals ── */}
          <div className="hero-vis" style={{ position:"relative", height:480 }}>
            {/* Main Minecraft thumbnail */}
            <div className="fl" style={{
              position:"absolute", top:14, left:0, right:52,
              borderRadius:"var(--r4)", overflow:"hidden", aspectRatio:"16/9",
              background:"linear-gradient(145deg, #0a1d0a, #124f12)",
              border:"2px solid rgba(255,186,0,.42)",
              boxShadow:"0 20px 60px rgba(255,186,0,.12), 0 4px 20px rgba(0,0,0,.6)",
            }}>
              <div className="gbg" style={{ position:"absolute", inset:0, opacity:.3 }} />
              <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%",
                background:"radial-gradient(circle, rgba(255,186,0,.55), transparent)",
                top:"38%", left:"34%", transform:"translate(-50%,-50%)", filter:"blur(24px)" }} />
              <div style={{ position:"absolute", bottom:10, left:13, fontSize:50,
                filter:"drop-shadow(0 4px 12px rgba(0,0,0,.9))" }}>⛏️</div>
              <div style={{ position:"absolute", top:13, right:13, textAlign:"right" }}>
                <div style={{ fontFamily:"var(--fd)", fontSize:28, color:"#fff",
                  textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000,0 0 28px #FFBA00",
                  lineHeight:1, letterSpacing:1.5 }}>RICHEST</div>
                <div style={{ fontSize:11, color:"#FFBA00", fontWeight:700, letterSpacing:2, marginTop:3,
                  textShadow:"0 0 10px #FFBA00" }}>MINECRAFT SMP</div>
              </div>
              <div style={{ position:"absolute", top:13, left:13,
                background:"rgba(6,6,16,.84)", borderRadius:5,
                padding:"3px 9px", fontSize:9, color:"#FFBA00", fontWeight:700 }}>👁 2.4M VIEWS</div>
            </div>
            {/* GTA 5 mini */}
            <div className="fl2" style={{
              position:"absolute", bottom:18, right:0, width:190,
              borderRadius:"var(--r3)", overflow:"hidden", aspectRatio:"16/9",
              background:"linear-gradient(145deg, #04040e, #0c0c26)",
              border:"2px solid rgba(255,31,78,.42)",
              boxShadow:"0 12px 36px rgba(255,31,78,.16)",
            }}>
              <div style={{ position:"absolute", bottom:5, left:7, fontSize:24 }}>🔫</div>
              <div style={{ position:"absolute", top:7, right:7,
                fontFamily:"var(--fd)", fontSize:12, color:"#fff",
                textShadow:"-1px -1px 0 #000,1px 1px 0 #000", lineHeight:1.25,
                textAlign:"right", letterSpacing:1 }}>
                HEIST GONE<br /><span style={{ color:"#FF1F4E" }}>WRONG 💀</span>
              </div>
              <div style={{ position:"absolute", top:7, left:7,
                background:"rgba(6,6,16,.84)", borderRadius:4,
                padding:"2px 6px", fontSize:8, color:"#FF1F4E", fontWeight:700 }}>👁 5.1M</div>
            </div>
            {/* BGMI mini */}
            <div style={{
              position:"absolute", bottom:2, left:16, width:148,
              borderRadius:"var(--r2)", overflow:"hidden", aspectRatio:"16/9",
              background:"linear-gradient(145deg, #02060c, #081424)",
              border:"2px solid rgba(0,207,255,.38)",
            }}>
              <div style={{ position:"absolute", bottom:4, left:6, fontSize:20 }}>🎯</div>
              <div style={{ position:"absolute", top:5, right:5,
                fontFamily:"var(--fd)", fontSize:10, color:"#00CFFF",
                textShadow:"0 0 9px #00CFFF", lineHeight:1.3,
                textAlign:"right", letterSpacing:1 }}>SOLO<br />vs SQUAD</div>
              <div style={{ position:"absolute", top:5, left:5,
                background:"rgba(6,6,16,.84)", borderRadius:3,
                padding:"2px 5px", fontSize:7, color:"#00CFFF", fontWeight:700 }}>👁 1.8M</div>
            </div>
            {/* CTR stat bubble */}
            <div className="fl2" style={{
              position:"absolute", top:0, right:0,
              background:"var(--card)", border:"1px solid var(--b3)",
              borderRadius:"var(--r3)", padding:"10px 15px",
              boxShadow:"0 8px 28px rgba(0,0,0,.45)",
            }}>
              <div style={{ fontSize:8, color:"var(--t4)", letterSpacing:2, marginBottom:2 }}>AVG CTR BOOST</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:26, color:"var(--lime)" }}>+148%</div>
            </div>
            {/* Express badge */}
            <div className="fl" style={{
              position:"absolute", top:"46%", right:-10,
              background:"var(--card)", border:"1px solid rgba(255,31,78,.3)",
              borderRadius:"var(--r2)", padding:"9px 13px",
            }}>
              <div style={{ fontSize:8, color:"var(--t4)", letterSpacing:2, marginBottom:1 }}>EXPRESS</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:18, color:"var(--red)" }}>6 HRS ⚡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
