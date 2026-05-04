// components/OrderModal.jsx
import { useState, useCallback } from "react";
import { PKGS, ADDONS, COUPONS, PLATFORMS, STYLES_OPT, EMOTIONS, AUDIENCES } from "../data.js";

/* ── helpers ─────────────────────────────────────────────── */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Sub-components (no hooks, pure presentational) ─────── */
function SummaryRow({ k, v, col }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between",
      padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,.04)", fontSize:12 }}>
      <span style={{ color:"var(--t3)" }}>{k}</span>
      <span style={{ color: col || "#fff", fontWeight:600,
        maxWidth:230, textAlign:"right", overflow:"hidden",
        textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v}</span>
    </div>
  );
}

export default function OrderModal({ initPkg, onClose, onSuccess, onSlotConsume }) {
  const [step,    setStep]    = useState(1);
  const [pkg,     setPkg]     = useState(initPkg || PKGS[1]);
  const [addons,  setAddons]  = useState([]);
  const [coupon,  setCoupon]  = useState("");
  const [applied, setApplied] = useState(null);
  const [cpnErr,  setCpnErr]  = useState("");
  const [errs,    setErrs]    = useState({});
  const [busy,    setBusy]    = useState(false);
  const [form,    setForm]    = useState({
    name:"", email:"", phone:"",
    platform:PLATFORMS[0],
    title:"", thumbText:"", ref:"", note:"",
    style:STYLES_OPT[0], emotion:EMOTIONS[0], audience:AUDIENCES[0],
  });

  /* helpers */
  const sf  = (k, v) => { setForm(f => ({ ...f, [k]:v })); setErrs(e => ({ ...e, [k]:"" })); };
  const tog = useCallback(id => setAddons(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), []);

  /* pricing */
  const addonTotal = ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.p, 0);
  const sub        = pkg.p + addonTotal;
  const disc       = applied ? Math.round(sub * applied.pct / 100) : 0;
  const total      = sub - disc;

  const applyCoupon = () => {
    const c = COUPONS[coupon.trim().toUpperCase()];
    if (c) { setApplied(c); setCpnErr(""); }
    else   { setApplied(null); setCpnErr("Invalid coupon code"); }
  };

  /* validation */
  const validate = () => {
    if (step === 2) {
      const e = {};
      if (!form.name.trim())         e.name      = "Full name is required";
      if (!emailRe.test(form.email)) e.email     = "Valid email required";
      if (form.phone.replace(/\D/g,"").length < 10) e.phone = "Valid 10-digit phone required";
      setErrs(e);
      return Object.keys(e).length === 0;
    }
    if (step === 3) {
      const e = {};
      if (!form.title.trim())     e.title     = "Video title is required";
      if (!form.thumbText.trim()) e.thumbText = "Thumbnail text is required (1–4 words)";
      setErrs(e);
      return Object.keys(e).length === 0;
    }
    return true;
  };

  const next   = () => { if (validate()) setStep(s => s + 1); };
  const back   = () => setStep(s => s - 1);

  /* submit */
  const submit = async () => {
    setBusy(true);
    /* 
      REAL INTEGRATION: replace with Razorpay
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: total * 100,
        currency: "INR",
        name: "PandaStudioX",
        description: `${pkg.n} Thumbnail`,
        handler: function(response) {
          // ✅ Only create order AFTER payment success
          saveOrderToFirebase({ ...form, pkg, total, addons, paymentId: response.razorpay_payment_id });
          onSuccess({ oid: generateOrderId(), pkg, total, email: form.email, name: form.name });
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#FF1F4E" }
      };
      new window.Razorpay(options).open();
    */
    await new Promise(r => setTimeout(r, 1700));
    setBusy(false);
    onSlotConsume?.();
    const oid = `TH-${Math.floor(Math.random() * 90000 + 10000)}`;
    onSuccess({ oid, pkg, total, email: form.email, name: form.name });
  };

  const STEPS = ["Package","Your Info","Video Details","Style & Mood","Review & Pay"];
  const pct   = Math.round((step / STEPS.length) * 100);

  /* ── render ── */
  return (
    <div
      style={{
        position:"fixed", inset:0, background:"rgba(6,6,16,.93)",
        display:"flex", alignItems:"center", justifyContent:"center",
        zIndex:1000, padding:16, backdropFilter:"blur(12px)",
        animation:"fadeIn .2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background:"var(--card)", border:"1px solid var(--b3)",
          borderRadius:"var(--r4)", padding:26, width:"100%", maxWidth:515,
          maxHeight:"92vh", overflowY:"auto",
          boxShadow:"0 32px 80px rgba(0,0,0,.9)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:22, letterSpacing:2 }}>ORDER THUMBNAIL</div>
            <div style={{ fontSize:12, color:pkg.c, fontWeight:700, marginTop:2 }}>
              {pkg.ic} {pkg.n} · ₹{total}
              {disc > 0 && <span style={{ color:"var(--lime)", marginLeft:6 }}>(-₹{disc} saved)</span>}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"var(--deep)", border:"1px solid var(--b2)",
            color:"var(--t3)", width:32, height:32, borderRadius:"50%",
            fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}>✕</button>
        </div>

        {/* Progress bar */}
        <div className="pbar" style={{ marginBottom:4 }}>
          <div className="pfill" style={{ width:`${pct}%`, background:"linear-gradient(90deg, var(--red), var(--gold))" }} />
        </div>
        <div style={{ fontSize:9, color:"var(--t4)", letterSpacing:2, marginBottom:22 }}>
          STEP {step} OF {STEPS.length} — {STEPS[step - 1].toUpperCase()}
        </div>

        {/* ── STEP 1: Package ── */}
        {step === 1 && (
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
              {PKGS.map(p => (
                <div key={p.id} onClick={() => setPkg(p)} style={{
                  display:"flex", alignItems:"center", gap:14, padding:"12px 15px",
                  borderRadius:"var(--r3)", cursor:"pointer",
                  background: pkg.id === p.id ? `${p.c}0d` : "var(--deep)",
                  border: `1.5px solid ${pkg.id === p.id ? p.c : "var(--b1)"}`,
                  transition:"all .18s",
                }}>
                  <div style={{ fontSize:22 }}>{p.ic}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{
                        fontFamily:"var(--fd)", fontSize:16, letterSpacing:1,
                        color: pkg.id === p.id ? p.c : "#fff",
                      }}>{p.n}</span>
                      {p.badge && <span className="badge badge-red" style={{ fontSize:8 }}>{p.badge}</span>}
                    </div>
                    <div style={{ fontSize:11, color:"var(--t4)", marginTop:1 }}>
                      {p.del} · {p.rev === -1 ? "Unlimited" : p.rev} rev{p.rev !== 1 && p.rev !== -1 ? "s" : ""}
                    </div>
                  </div>
                  <div style={{ fontFamily:"var(--fd)", fontSize:22, color: pkg.id === p.id ? p.c : "#fff" }}>
                    ₹{p.p}
                  </div>
                  {pkg.id === p.id && <span style={{ color:"var(--lime)", fontSize:16 }}>✓</span>}
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div style={{ marginBottom:14 }}>
              <label className="ilabel">OPTIONAL ADD-ONS</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {ADDONS.map(a => (
                  <button key={a.id} onClick={() => tog(a.id)}
                    className={`chip ${addons.includes(a.id) ? "active" : ""}`}>
                    {addons.includes(a.id) ? "✓ " : ""}{a.l}
                    <span style={{ opacity:.6, marginLeft:4 }}>+₹{a.p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div>
              <label className="ilabel">COUPON CODE</label>
              <div style={{ display:"flex", gap:8 }}>
                <input className="ifield" placeholder="e.g. PANDA10" style={{ flex:1 }}
                  value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()} />
                <button className="btn btn-ghost btn-sm" onClick={applyCoupon}>APPLY</button>
              </div>
              {applied  && <div style={{ fontSize:11, color:"var(--lime)", marginTop:5 }}>✓ {applied.label} — saving ₹{disc}</div>}
              {cpnErr   && <div className="ierr">✗ {cpnErr}</div>}
              <div style={{ fontSize:10, color:"var(--t4)", marginTop:4 }}>Try: PANDA10 · FIRST20 · GAMING15 · BULK30</div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Contact ── */}
        {step === 2 && (
          <div>
            {[
              { l:"Full Name *",      k:"name",  t:"text",  p:"e.g. Arjun Sharma"   },
              { l:"Email Address *",  k:"email", t:"email", p:"you@example.com"      },
              { l:"Phone Number *",   k:"phone", t:"tel",   p:"+91 9876543210"       },
            ].map(f => (
              <div key={f.k} className="igroup">
                <label className="ilabel">{f.l}</label>
                <input type={f.t}
                  className={`ifield${errs[f.k] ? " err" : ""}`}
                  placeholder={f.p} value={form[f.k]}
                  onChange={e => sf(f.k, e.target.value)} />
                {errs[f.k] && <div className="ierr">⚠ {errs[f.k]}</div>}
              </div>
            ))}
            <div className="igroup">
              <label className="ilabel">Platform *</label>
              <select className="isel" value={form.platform}
                onChange={e => sf("platform", e.target.value)} style={{ padding:"12px 14px" }}>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ background:"rgba(0,207,255,.06)", border:"1px solid rgba(0,207,255,.15)",
              borderRadius:"var(--r2)", padding:11, fontSize:12, color:"var(--cyan)" }}>
              📧 Your thumbnail will be delivered to this email via Google Drive link.
            </div>
          </div>
        )}

        {/* ── STEP 3: Video info ── */}
        {step === 3 && (
          <div>
            {[
              { l:"Video Title *",                   k:"title",     big:false, p:"e.g. I Became RICHEST in Minecraft SMP" },
              { l:"Thumbnail Text (1–4 words) *",    k:"thumbText", big:false, p:"e.g. RICHEST PLAYER"                   },
              { l:"Style Reference Link (optional)", k:"ref",       big:false, p:"https://youtube.com/... or Pinterest"   },
              { l:"Additional Notes",                k:"note",      big:true,  p:"Characters, colours, special requests…" },
            ].map(f => (
              <div key={f.k} className="igroup">
                <label className="ilabel">{f.l}</label>
                {f.big
                  ? <textarea className={`iarea${errs[f.k] ? " err" : ""}`} placeholder={f.p} value={form[f.k]} onChange={e => sf(f.k, e.target.value)} />
                  : <input    className={`ifield${errs[f.k] ? " err" : ""}`} placeholder={f.p} value={form[f.k]} onChange={e => sf(f.k, e.target.value)} />
                }
                {errs[f.k] && <div className="ierr">⚠ {errs[f.k]}</div>}
              </div>
            ))}
            <div style={{ background:"rgba(255,186,0,.06)", border:"1px solid rgba(255,186,0,.15)",
              borderRadius:"var(--r2)", padding:11, fontSize:12, color:"var(--gold)" }}>
              💡 More detail = better first draft = fewer revisions needed.
            </div>
          </div>
        )}

        {/* ── STEP 4: Style & Mood ── */}
        {step === 4 && (
          <div>
            <div className="igroup">
              <label className="ilabel">Thumbnail Style *</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                {STYLES_OPT.map(s => (
                  <button key={s} onClick={() => sf("style", s)}
                    className={`chip ${form.style === s ? "active" : ""}`}
                    style={{ textAlign:"left", borderRadius:"var(--r2)", padding:"9px 10px" }}>{s}</button>
                ))}
              </div>
            </div>
            <div className="igroup">
              <label className="ilabel">Emotion / Mood *</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                {EMOTIONS.map(e => (
                  <button key={e} onClick={() => sf("emotion", e)}
                    className={`chip ${form.emotion === e ? "active-gold" : ""}`}
                    style={{ textAlign:"left", borderRadius:"var(--r2)", padding:"8px 10px" }}>{e}</button>
                ))}
              </div>
            </div>
            <div className="igroup">
              <label className="ilabel">Target Audience</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {AUDIENCES.map(a => (
                  <button key={a} onClick={() => sf("audience", a)}
                    className={`chip ${form.audience === a ? "active-lime" : ""}`}>{a}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: Review & Pay ── */}
        {step === 5 && (
          <div>
            <div style={{ background:"var(--deep)", borderRadius:"var(--r3)", padding:"14px 17px", marginBottom:13 }}>
              <label className="ilabel" style={{ marginBottom:10 }}>ORDER SUMMARY</label>
              <SummaryRow k="Package"   v={`${pkg.ic} ${pkg.n}`} />
              <SummaryRow k="Base Price"v={`₹${pkg.p}`} />
              <SummaryRow k="Platform"  v={form.platform} />
              <SummaryRow k="Style"     v={form.style} />
              <SummaryRow k="Emotion"   v={form.emotion} />
              <SummaryRow k="Delivery"  v={pkg.del} />
              <SummaryRow k="Revisions" v={pkg.rev === -1 ? "Unlimited" : String(pkg.rev)} />
              <SummaryRow k="Video"     v={form.title     || "—"} />
              <SummaryRow k="Text"      v={form.thumbText || "—"} />
              {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                <SummaryRow key={a.id} k={`+ ${a.l}`} v={`+₹${a.p}`} col="var(--lime)" />
              ))}
              {applied && <SummaryRow k={`🎟 ${applied.label}`} v={`-₹${disc}`} col="var(--lime)" />}
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:10, fontSize:17, fontWeight:800 }}>
                <span style={{ fontFamily:"var(--fd)", color:"var(--gold)", letterSpacing:1 }}>TOTAL</span>
                <span style={{ fontFamily:"var(--fd)", fontSize:24, color:"var(--lime)" }}>₹{total}</span>
              </div>
            </div>

            <div style={{ background:"rgba(255,186,0,.06)", border:"1px solid rgba(255,186,0,.18)",
              borderRadius:"var(--r2)", padding:12, marginBottom:12, fontSize:12, color:"var(--gold)" }}>
              💳 After ordering: Pay ₹{total} via UPI <strong>pandaankit@upi</strong><br />
              <span style={{ color:"var(--t3)" }}>Include your Order ID in the note. Work starts within 1hr of payment confirmation.</span>
            </div>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:12 }}>
              {["🔒 Secure","⚡ Fast","🔄 Revisions","✅ 100% Custom","🚫 No Watermark"].map(t => (
                <div key={t} style={{ fontSize:11, color:"var(--t4)" }}>{t}</div>
              ))}
            </div>
            <div style={{ fontSize:10, color:"var(--t4)", lineHeight:1.9 }}>
              By ordering you agree to our{" "}
              <span style={{ color:"var(--red)", cursor:"pointer", textDecoration:"underline" }}>Terms of Service</span>
              {" & "}
              <span style={{ color:"var(--red)", cursor:"pointer", textDecoration:"underline" }}>Refund Policy</span>.
              Major style changes after work starts may require a new order.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display:"flex", gap:10, marginTop:22 }}>
          {step > 1 && (
            <button className="btn btn-ghost" onClick={back} style={{ flex:1 }}>← BACK</button>
          )}
          <button
            className={`btn ${step === 5 ? "btn-gold" : "btn-red"}`}
            style={{ flex:2, justifyContent:"center" }}
            disabled={busy}
            onClick={step < 5 ? next : submit}
          >
            {busy ? (
              <>
                <div style={{ width:15, height:15, border:"2px solid rgba(0,0,0,.3)",
                  borderTopColor:"#000", borderRadius:"50%", animation:"spin .7s linear infinite" }} />
                PLACING ORDER…
              </>
            ) : step < 5 ? "CONTINUE →" : "🛒 PLACE ORDER NOW"}
          </button>
        </div>
      </div>
    </div>
  );
}
