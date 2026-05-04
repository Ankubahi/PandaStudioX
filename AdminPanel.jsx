// components/AdminPanel.jsx
import { useState } from "react";
import { BRAND, MOCK_ORDERS, PKGS, COUPONS, REVENUE_MONTHLY } from "../data.js";
import { useNotif } from "../hooks.js";
import { NotifList } from "./UI.jsx";

/* ── Stat card ────────────────────────────────────────────── */
function StatCard({ icon, label, value, color, delay }) {
  return (
    <div className={`card fu d${delay}`} style={{
      padding:"16px 18px", border:`1px solid ${color}16`,
    }}>
      <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
      <div style={{ fontFamily:"var(--fd)", fontSize:28, color, letterSpacing:1 }}>{value}</div>
      <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2 }}>{label}</div>
    </div>
  );
}

/* ── Mini bar chart ───────────────────────────────────────── */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.amt));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:7, height:72 }}>
      {data.map((d, i) => (
        <div key={d.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <div style={{
            width:"100%",
            height:`${(d.amt / max) * 62}px`,
            background: i === data.length - 1
              ? "linear-gradient(180deg, var(--red), var(--red2))"
              : "rgba(255,31,78,.28)",
            borderRadius:"3px 3px 0 0",
            transition:"height .4s var(--ease)",
          }} />
          <div style={{ fontSize:8, color:"var(--t4)" }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Order row ────────────────────────────────────────────── */
function OrderRow({ order, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const sc = {
    pending:   "var(--gold)", working:   "var(--cyan)",
    delivered: "var(--lime)", cancelled: "var(--red)",
  };
  return (
    <>
      <tr style={{ cursor:"pointer" }} onClick={() => setExpanded(e => !e)}>
        <td style={{ color:"var(--cyan)", fontFamily:"var(--fd)", letterSpacing:1 }}>
          #{order.id}
        </td>
        <td>
          <div style={{ fontWeight:700 }}>{order.n}</div>
          <div style={{ fontSize:10, color:"var(--t4)" }}>{order.e}</div>
        </td>
        <td>
          <span style={{
            padding:"3px 9px", borderRadius:99, fontSize:10, fontWeight:700,
            background:`${sc[order.status] || "#fff"}14`,
            color: sc[order.status] || "#fff",
            border:`1px solid ${sc[order.status] || "#fff"}33`,
          }}>{order.pkg}</span>
        </td>
        <td style={{ color:"var(--t3)", maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {order.title}
        </td>
        <td>
          <select
            value={order.status}
            onChange={e => { e.stopPropagation(); onUpdate(order.id, e.target.value); }}
            onClick={e => e.stopPropagation()}
            style={{
              background:`${sc[order.status] || "#fff"}14`,
              color: sc[order.status] || "#fff",
              border:`1px solid ${sc[order.status] || "#fff"}33`,
              padding:"4px 10px", borderRadius:99,
              fontSize:9, fontWeight:700, letterSpacing:1.5,
              cursor:"pointer", textTransform:"uppercase",
            }}
          >
            {["pending","working","delivered","cancelled"].map(s => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </td>
        <td style={{ color:"var(--lime)", fontFamily:"var(--fd)", fontSize:15 }}>₹{order.amt}</td>
        <td style={{ color:"var(--t4)", fontSize:11 }}>{order.date}</td>
        <td style={{ color:"var(--t4)", fontSize:14 }}>{expanded ? "▲" : "▼"}</td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} style={{ padding:"0 14px 14px" }}>
            <div style={{
              background:"var(--deep)", borderRadius:"var(--r2)", padding:"14px 18px",
              display:"flex", alignItems:"center", gap:12, flexWrap:"wrap",
            }}>
              {[
                ["Style",    order.style || "—"],
                ["Delivery", order.del   || "—"],
                ["Email",    order.e],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2 }}>{k.toUpperCase()}</div>
                  <div style={{ fontSize:12, color:"var(--t2)", fontWeight:600, marginTop:2 }}>{v}</div>
                </div>
              ))}
              <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
                <button className="btn btn-red btn-sm">📁 Upload File</button>
                <button className="btn btn-ghost btn-sm">✉️ Email Client</button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={e => { e.stopPropagation(); onDelete(order.id); }}
                  style={{ color:"var(--red)" }}
                >🗑 Delete</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ── Main AdminPanel ──────────────────────────────────────── */
export default function AdminPanel({ onBack }) {
  const [tab,    setTab]    = useState("overview");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [sFilter,setSFilter]= useState("all");
  const [settings, setSettings] = useState({ ...BRAND });
  const { list: notifs, push } = useNotif();

  /* Stats */
  const stats = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === "pending").length,
    working:   orders.filter(o => o.status === "working").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    revenue:   orders.reduce((s, o) => s + o.amt, 0),
  };

  /* Order actions */
  const updateStatus = (id, status) => {
    setOrders(p => p.map(o => o.id === id ? { ...o, status } : o));
    push(`Order #${id} → ${status}`);
  };
  const deleteOrder = id => {
    setOrders(p => p.filter(o => o.id !== id));
    push(`Order #${id} deleted`, "err");
  };

  /* Filtered orders */
  const filtered = orders.filter(o => {
    const q  = search.toLowerCase();
    const matchQ = o.n.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.title.toLowerCase().includes(q);
    const matchS = sFilter === "all" || o.status === sFilter;
    return matchQ && matchS;
  });

  const TABS = [
    ["overview","📊","Overview"],
    ["orders",  "📦","Orders"  ],
    ["analytics","📈","Analytics"],
    ["audit",   "✅","Audit"   ],
    ["settings","⚙️","Settings"],
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--ink)", color:"#fff", fontFamily:"var(--fb)" }}>
      {/* Admin Nav */}
      <div style={{
        background:"linear-gradient(90deg, #0d0000, var(--card))",
        borderBottom:"1px solid rgba(255,31,78,.18)", padding:"0 22px",
        display:"flex", alignItems:"center", gap:12, height:54,
        position:"sticky", top:0, zIndex:100,
      }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← BACK TO SITE</button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:26, height:26, borderRadius:6, flexShrink:0,
            background:"linear-gradient(135deg, var(--red), var(--red2))",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:13,
          }}>🐼</div>
          <span style={{ fontFamily:"var(--fd)", fontSize:14, letterSpacing:4, color:"var(--red)" }}>ADMIN PANEL</span>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, marginLeft:14, flex:1, overflowX:"auto" }}>
          {TABS.map(([id, ic, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding:"5px 13px", borderRadius:"var(--r1)", whiteSpace:"nowrap",
              background: tab === id ? "var(--red-sm)" : "transparent",
              border:`1px solid ${tab === id ? "var(--red)" : "transparent"}`,
              color: tab === id ? "var(--red)" : "var(--t3)",
              fontSize:11, fontWeight:700, letterSpacing:1, cursor:"pointer",
            }}>
              {ic} {label}
            </button>
          ))}
        </div>

        {/* Live indicator */}
        <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--lime)", animation:"pulseDot 1.5s infinite" }} />
          <span style={{ fontSize:11, color:"var(--lime)" }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding:22, maxWidth:1220, margin:"0 auto" }}>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            {/* Stats grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(148px,1fr))", gap:12, marginBottom:22 }}>
              <StatCard icon="📦" label="TOTAL ORDERS"  value={stats.total}      color="var(--cyan)"  delay={1} />
              <StatCard icon="⏳" label="PENDING"       value={stats.pending}    color="var(--gold)"  delay={2} />
              <StatCard icon="🔨" label="IN PROGRESS"   value={stats.working}    color="var(--cyan)"  delay={3} />
              <StatCard icon="✅" label="DELIVERED"     value={stats.delivered}  color="var(--lime)"  delay={4} />
              <StatCard icon="💰" label="TOTAL REVENUE" value={`₹${stats.revenue.toLocaleString()}`} color="var(--gold)" delay={5} />
            </div>

            {/* Charts */}
            <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16, marginBottom:20 }}>
              {/* Revenue chart */}
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:4 }}>REVENUE TREND</div>
                <div style={{ fontFamily:"var(--fd)", fontSize:24, color:"var(--gold)", marginBottom:16 }}>
                  ₹{(stats.revenue / 1000).toFixed(1)}K
                </div>
                <BarChart data={REVENUE_MONTHLY} />
                <div style={{ marginTop:10, fontSize:11, color:"var(--lime)" }}>↑ 24% vs last month</div>
              </div>
              {/* Package breakdown */}
              <div className="card" style={{ padding:20 }}>
                <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:14 }}>PACKAGE BREAKDOWN</div>
                {PKGS.map(p => {
                  const cnt = orders.filter(o => o.pkg === p.n).length;
                  const pct = stats.total ? Math.max(4, (cnt / stats.total) * 100) : 4;
                  return (
                    <div key={p.id} style={{ marginBottom:13 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:12 }}>
                        <span style={{ color:p.c, fontWeight:600 }}>{p.ic} {p.n}</span>
                        <span style={{ color:"var(--t3)" }}>
                          {cnt} order{cnt !== 1 ? "s" : ""} ·{" "}
                          <span style={{ color:p.c }}>₹{orders.filter(o=>o.pkg===p.n).reduce((s,o)=>s+o.amt,0)}</span>
                        </span>
                      </div>
                      <div className="pbar">
                        <div className="pfill" style={{ width:`${pct}%`, background:`linear-gradient(90deg, ${p.c}, ${p.c}88)` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent orders table */}
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{
                padding:"12px 18px", borderBottom:"1px solid var(--b1)",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div style={{ fontFamily:"var(--fd)", fontSize:13, letterSpacing:2, color:"var(--red)" }}>
                  RECENT ORDERS
                </div>
                <button onClick={() => setTab("orders")} className="btn btn-ghost btn-sm">View All →</button>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table className="dt">
                  <thead>
                    <tr>{["ID","Customer","Package","Title","Status","Amount","Date",""].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 4).map(o => (
                      <OrderRow key={o.id} order={o} onUpdate={updateStatus} onDelete={deleteOrder} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === "orders" && (
          <div>
            {/* Filters */}
            <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
              <input
                className="ifield" placeholder="Search by name, ID or title…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ width:260 }}
              />
              <div style={{ display:"flex", gap:6 }}>
                {["all","pending","working","delivered","cancelled"].map(s => (
                  <button key={s} onClick={() => setSFilter(s)}
                    className={`chip ${sFilter === s ? "active" : ""}`}
                    style={{ textTransform:"capitalize" }}>{s}</button>
                ))}
              </div>
              <span style={{ fontSize:11, color:"var(--t4)" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
              <button className="btn btn-red btn-sm" style={{ marginLeft:"auto" }}>+ New Order</button>
            </div>
            <div className="card" style={{ overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table className="dt">
                  <thead>
                    <tr>{["ID","Customer","Package","Title","Status","Amount","Date",""].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {filtered.map(o => (
                      <OrderRow key={o.id} order={o} onUpdate={updateStatus} onDelete={deleteOrder} />
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={8} style={{ textAlign:"center", padding:40, color:"var(--t4)" }}>
                        📭 No orders match your search
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {tab === "analytics" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16, marginBottom:20 }}>
              {[
                { t:"Top Niches",      items:[["Minecraft","40","var(--lime)"],["GTA 5","22","var(--red)"],["BGMI","18","var(--cyan)"],["Free Fire","12","var(--gold)"],["Other","8","var(--t3)"]] },
                { t:"Style Breakdown", items:[["Gaming/Dark","48","var(--cyan)"],["Cinematic","31","var(--gold)"],["Clean/Min","21","var(--t2)"]] },
                { t:"Platform Split",  items:[["YouTube 16:9","62","var(--red)"],["Shorts 9:16","24","var(--gold)"],["Instagram","14","var(--purp)"]] },
                { t:"Delivery Speed",  items:[["Standard","55","var(--t3)"],["Express 12h","28","var(--gold)"],["Urgent 6h","17","var(--lime)"]] },
              ].map(({ t, items }) => (
                <div key={t} className="card" style={{ padding:20 }}>
                  <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:14 }}>
                    {t.toUpperCase()}
                  </div>
                  {items.map(([name, pct, col]) => (
                    <div key={name} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:12 }}>
                        <span style={{ color:"var(--t2)" }}>{name}</span>
                        <span style={{ color:col, fontWeight:700 }}>{pct}%</span>
                      </div>
                      <div className="pbar">
                        <div className="pfill" style={{ width:`${pct}%`, background:`linear-gradient(90deg, ${col}, ${col}88)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Revenue full */}
            <div className="card" style={{ padding:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2 }}>ANNUAL REVENUE</div>
                  <div style={{ fontFamily:"var(--fd)", fontSize:28, color:"var(--gold)", marginTop:3 }}>
                    ₹{REVENUE_MONTHLY.reduce((s,d)=>s+d.amt,0).toLocaleString()}
                  </div>
                </div>
                <span className="badge badge-lime">↑ 24% GROWTH</span>
              </div>
              <BarChart data={REVENUE_MONTHLY} />
            </div>
          </div>
        )}

        {/* ── PRE-LAUNCH AUDIT ── */}
        {tab === "audit" && (
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:20, letterSpacing:2, color:"var(--red)", marginBottom:22 }}>
              🚀 PRE-LAUNCH AUDIT CHECKLIST
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px,1fr))", gap:14 }}>
              {[
                {
                  cat:"✅ DONE — Frontend",
                  col:"var(--lime)",
                  items:[
                    "Order form with 5-step flow",
                    "Form validation on all fields",
                    "Coupon code system (4 codes)",
                    "Admin panel with order management",
                    "Mobile responsive layout",
                    "Before/After comparison section",
                    "FAQ accordion",
                    "Testimonials with CTR proof",
                    "Live countdown + slot tracker",
                    "WhatsApp floating button",
                    "Lead magnet email capture",
                    "Contact form",
                    "Order success screen with next steps",
                    "Daily countdown timer",
                  ],
                },
                {
                  cat:"⏳ TODO — Integration",
                  col:"var(--gold)",
                  items:[
                    "Razorpay live mode API key",
                    "EmailJS order confirmation email",
                    "EmailJS delivery email template",
                    "Firebase Firestore for orders",
                    "Google Sheets backup webhook",
                    "Google Analytics GA4 tag",
                    "Domain name setup",
                    "SSL certificate (auto with Vercel)",
                    "Test dummy order end-to-end",
                    "Test payment failure scenario",
                    "WhatsApp number verified",
                    "UPI ID tested with ₹1 payment",
                  ],
                },
                {
                  cat:"🚀 LAUNCH — Marketing",
                  col:"var(--cyan)",
                  items:[
                    "First 10 customers: DM small creators",
                    "Before/after Instagram reels",
                    "YouTube video: redesigned thumbnails",
                    "Post 3x/week on Instagram",
                    "Share in gaming Discord servers",
                    "Coupon code for first 10 orders",
                    "Ask for reviews after delivery",
                    "Track CTR results from clients",
                  ],
                },
              ].map(({ cat, col, items }) => (
                <div key={cat} className="card" style={{ padding:20, border:`1px solid ${col}18` }}>
                  <div style={{ fontSize:10, color:col, letterSpacing:2, fontWeight:700, marginBottom:14 }}>{cat}</div>
                  {items.map(item => (
                    <div key={item} style={{
                      display:"flex", alignItems:"flex-start", gap:8,
                      fontSize:12, padding:"5px 8px", borderRadius:"var(--r1)",
                      marginBottom:4,
                      background: cat.startsWith("✅") ? "rgba(0,255,122,.04)" : "rgba(255,255,255,.02)",
                    }}>
                      <span style={{ color:col, flexShrink:0, marginTop:1 }}>
                        {cat.startsWith("✅") ? "✓" : cat.startsWith("⏳") ? "○" : "→"}
                      </span>
                      <span style={{ color: cat.startsWith("✅") ? "var(--t2)" : "var(--t3)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === "settings" && (
          <div style={{ maxWidth:640 }}>
            <div style={{ fontFamily:"var(--fd)", fontSize:18, letterSpacing:2, color:"var(--red)", marginBottom:22 }}>
              SITE SETTINGS
            </div>

            {/* Brand */}
            <div className="card" style={{ padding:22, marginBottom:16 }}>
              <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:16 }}>BRAND DETAILS</div>
              {[
                ["Brand Name",     settings.name],
                ["Email",          settings.email],
                ["Phone",          settings.phone],
                ["WhatsApp No.",   settings.whatsapp],
                ["UPI ID",         settings.upi],
                ["Instagram",      settings.instagram],
                ["Max Orders/Day", String(settings.maxOrders)],
              ].map(([l, v]) => (
                <div key={l} className="igroup">
                  <label className="ilabel">{l}</label>
                  <input
                    className="ifield"
                    defaultValue={v}
                    onChange={e => setSettings(s => ({ ...s, [l.toLowerCase().replace(/[^a-z]/g,"")]:e.target.value }))}
                  />
                </div>
              ))}
            </div>

            {/* Coupons */}
            <div className="card" style={{ padding:22, marginBottom:16 }}>
              <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:14 }}>ACTIVE COUPONS</div>
              {Object.entries(COUPONS).map(([code, d]) => (
                <div key={code} style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"9px 13px", background:"var(--deep)", borderRadius:"var(--r1)",
                  marginBottom:8, fontSize:12,
                }}>
                  <span style={{ fontFamily:"var(--fd)", color:"var(--gold)", letterSpacing:2, fontSize:14 }}>{code}</span>
                  <span style={{ color:"var(--t2)" }}>{d.label}</span>
                  <span style={{ color:"var(--lime)", fontWeight:700 }}>{d.pct}% OFF</span>
                  <span className="badge badge-lime" style={{ fontSize:8 }}>ACTIVE</span>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" style={{ marginTop:8 }}>+ Add New Coupon</button>
            </div>

            {/* Accept orders toggle */}
            <div className="card" style={{ padding:22, marginBottom:16 }}>
              <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:14 }}>BUSINESS CONTROLS</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div>
                  <div style={{ fontWeight:600 }}>Accept New Orders</div>
                  <div style={{ fontSize:11, color:"var(--t4)", marginTop:2 }}>Toggle to pause order intake</div>
                </div>
                <div style={{
                  width:46, height:26, borderRadius:13,
                  background:"var(--lime)", cursor:"pointer",
                  position:"relative", transition:"background .2s",
                }}>
                  <div style={{
                    position:"absolute", right:3, top:3,
                    width:20, height:20, borderRadius:"50%", background:"#fff",
                  }} />
                </div>
              </div>
              <div className="igroup">
                <label className="ilabel">Admin Password</label>
                <input type="password" className="ifield" defaultValue={settings.adminPass} />
                <div style={{ fontSize:10, color:"var(--gold)", marginTop:4 }}>⚠ Change this before going live!</div>
              </div>
            </div>

            <button className="btn btn-red" onClick={() => push("Settings saved successfully ✓")}>
              SAVE ALL CHANGES
            </button>
          </div>
        )}
      </div>

      <NotifList list={notifs} />
    </div>
  );
}
