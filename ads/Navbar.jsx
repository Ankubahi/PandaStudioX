// components/Navbar.jsx
import { useState } from "react";
import { BRAND } from "../data.js";

const NAV_LINKS = [
  { l:"Portfolio",  h:"#portfolio"  },
  { l:"Styles",     h:"#styles"     },
  { l:"Packages",   h:"#packages"   },
  { l:"How it Works",h:"#how"       },
  { l:"Reviews",    h:"#reviews"    },
  { l:"FAQ",        h:"#faq"        },
];

export default function Navbar({ scrolled, onOrder, onAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(6,6,16,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,31,78,.1)" : "none",
        transition: "all .32s var(--ease)",
        padding: "0 26px",
        display: "flex", alignItems: "center", height: 62,
      }}>
        {/* Logo */}
        <a href="#" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9, flexShrink: 0,
            background: "linear-gradient(135deg, var(--red), var(--red2))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 0 16px var(--red-g)",
          }}>🐼</div>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:17, letterSpacing:3, lineHeight:1 }}>
              {BRAND.name}
            </div>
            <div style={{ fontSize:8, color:"var(--red)", letterSpacing:3, lineHeight:1, marginTop:2 }}>
              CUSTOM THUMBNAILS
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display:"flex", gap:22, marginLeft:36, flex:1 }}>
          {NAV_LINKS.map(({ l, h }) => (
            <a key={h} href={h} style={{
              color: "var(--t4)", fontSize: 13, fontWeight: 600,
              textDecoration: "none", transition: "color .18s",
              letterSpacing: ".2px",
            }}
            onMouseEnter={e => e.target.style.color = "var(--red)"}
            onMouseLeave={e => e.target.style.color = "var(--t4)"}
            >{l}</a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display:"flex", gap:9, alignItems:"center", marginLeft:"auto" }}>
          <button className="hide-mobile" onClick={onAdmin} style={{
            background: "transparent",
            border: "1px solid rgba(255,31,78,.2)",
            color: "rgba(255,31,78,.65)", padding: "6px 12px",
            borderRadius: "var(--r1)", fontSize: 10, fontWeight: 700,
            letterSpacing: 1, cursor: "pointer", transition: "all .18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.color="var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,31,78,.2)"; e.currentTarget.style.color="rgba(255,31,78,.65)"; }}
          >⚙ ADMIN</button>

          <button className="btn btn-red rg" onClick={onOrder} style={{ fontSize:12 }}>
            🛒 ORDER NOW
          </button>

          {/* Mobile menu toggle */}
          <button
            style={{ background:"none", border:"none", color:"var(--t2)", fontSize:22, cursor:"pointer", display:"none" }}
            className="show-mobile-flex"
            onClick={() => setMenuOpen(o => !o)}
          >☰</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 62, left: 0, right: 0, zIndex: 190,
          background: "rgba(6,6,16,.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--b2)",
          padding: "16px 24px", animation: "slideDown .22s var(--ease)",
        }}>
          {NAV_LINKS.map(({ l, h }) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "11px 0",
              borderBottom: "1px solid var(--b1)",
              color: "var(--t2)", fontSize: 15, fontWeight: 600,
            }}>{l}</a>
          ))}
          <div style={{ display:"flex", gap:9, marginTop:14 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { onAdmin(); setMenuOpen(false); }} style={{ flex:1, justifyContent:"center" }}>⚙ Admin</button>
            <button className="btn btn-red btn-sm" onClick={() => { onOrder(); setMenuOpen(false); }} style={{ flex:2, justifyContent:"center" }}>🛒 Order Now</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .show-mobile-flex { display: flex !important; }
        }
      `}</style>
    </>
  );
      }

