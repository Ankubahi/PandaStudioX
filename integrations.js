// integrations.js — PandaStudioX real-world integrations
// Replace all placeholder values before going live

// ═══════════════════════════════════════════════════════════
//  STEP 1 — RAZORPAY PAYMENT
//  Docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/
//  npm install razorpay  (backend only — key never exposed on frontend)
// ═══════════════════════════════════════════════════════════

/**
 * Opens Razorpay checkout and returns payment data on success.
 * MUST load <script src="https://checkout.razorpay.com/v1/checkout.js"></script> in index.html
 *
 * @param {object} orderData - { amount (INR), name, email, phone, description }
 * @returns {Promise<{paymentId, orderId, signature}>}
 */
export function openRazorpay(orderData) {
  return new Promise((resolve, reject) => {
    const options = {
      // ⚠️  Replace with your LIVE key from Razorpay dashboard → Settings → API Keys
      key: "rzp_live_XXXXXXXXXXXXXXXX",

      amount:      orderData.amount * 100, // Razorpay uses paise (₹ × 100)
      currency:    "INR",
      name:        "PandaStudioX",
      description: orderData.description || "Custom Thumbnail Order",
      image:       "https://pandastudiox.com/logo.png",

      // ✅ Only create order in DB AFTER this handler fires (payment confirmed)
      handler: function (response) {
        resolve({
          paymentId:  response.razorpay_payment_id,
          orderId:    response.razorpay_order_id,
          signature:  response.razorpay_signature,
        });
      },

      prefill: {
        name:    orderData.name,
        email:   orderData.email,
        contact: orderData.phone,
      },

      notes: {
        package: orderData.pkg,
      },

      theme: {
        color: "#FF1F4E",
      },

      modal: {
        ondismiss: () => reject(new Error("Payment cancelled by user")),
      },
    };

    if (!window.Razorpay) {
      reject(new Error("Razorpay SDK not loaded. Add script to index.html"));
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", e => reject(new Error(e.error.description)));
    rzp.open();
  });
}

// ═══════════════════════════════════════════════════════════
//  STEP 2 — EMAILJS (send emails without a backend)
//  Docs: https://www.emailjs.com/docs/
//  npm install @emailjs/browser
// ═══════════════════════════════════════════════════════════

import emailjs from "@emailjs/browser";

// ⚠️  Replace with your EmailJS credentials
const EMAILJS_SERVICE_ID  = "service_XXXXXXX";
const EMAILJS_PUBLIC_KEY  = "XXXXXXXXXXXXXXXXX";

// Template IDs — create these in EmailJS dashboard
const TEMPLATE_CONFIRM    = "template_order_confirm";  // sent to customer
const TEMPLATE_NOTIFY     = "template_admin_notify";   // sent to you
const TEMPLATE_DELIVER    = "template_deliver";        // sent on delivery

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmation({ name, email, orderId, pkg, total, delivery }) {
  const params = {
    to_email:    email,
    to_name:     name,
    order_id:    orderId,
    package:     pkg,
    total:       `₹${total}`,
    delivery:    delivery,
    whatsapp:    "https://wa.me/918082646863",
    upi:         "pandaankit@upi",
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_CONFIRM, params, EMAILJS_PUBLIC_KEY);
    console.log("✅ Confirmation email sent to", email);
  } catch (err) {
    console.error("❌ EmailJS confirmation failed:", err);
  }
}

/**
 * Notify admin (you) of a new order
 */
export async function notifyAdmin({ name, email, orderId, pkg, total }) {
  const params = {
    admin_email: "pandaankit2007@gmail.com",
    customer:    name,
    email,
    order_id:    orderId,
    package:     pkg,
    total:       `₹${total}`,
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_NOTIFY, params, EMAILJS_PUBLIC_KEY);
  } catch (err) {
    console.error("❌ EmailJS admin notify failed:", err);
  }
}

/**
 * Send delivery email with Drive link
 */
export async function sendDeliveryEmail({ name, email, orderId, driveLink }) {
  const params = {
    to_email:   email,
    to_name:    name,
    order_id:   orderId,
    drive_link: driveLink,
    whatsapp:   "https://wa.me/918082646863",
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_DELIVER, params, EMAILJS_PUBLIC_KEY);
    console.log("✅ Delivery email sent to", email);
  } catch (err) {
    console.error("❌ EmailJS delivery failed:", err);
  }
}

// ═══════════════════════════════════════════════════════════
//  STEP 3 — FIREBASE FIRESTORE (store orders)
//  Docs: https://firebase.google.com/docs/firestore
//  npm install firebase
// ═══════════════════════════════════════════════════════════

import { initializeApp }              from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

// ⚠️  Replace with your Firebase project config
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "pandastudiox.firebaseapp.com",
  projectId:         "pandastudiox",
  storageBucket:     "pandastudiox.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef123456",
};

const firebaseApp = initializeApp(firebaseConfig);
const db          = getFirestore(firebaseApp);

/**
 * Save a new confirmed order to Firestore
 * ✅ Call ONLY after Razorpay payment success
 */
export async function saveOrder({
  orderId, name, email, phone,
  pkg, addons, total, paymentId,
  platform, style, emotion, title, thumbText, ref, note,
}) {
  const orderData = {
    orderId,
    customer: { name, email, phone },
    package:  { id: pkg.id, name: pkg.n, price: pkg.p, delivery: pkg.del },
    addons:   addons || [],
    total,
    paymentId,
    details:  { platform, style, emotion, title, thumbText, ref, note },
    status:   "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const ref = await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Order saved to Firestore:", ref.id);
    return ref.id;
  } catch (err) {
    console.error("❌ Firestore save failed:", err);
    throw err;
  }
}

/**
 * Update order status in Firestore
 */
export async function updateOrderStatus(firestoreId, status, driveLink = null) {
  const updates = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (driveLink) updates.driveLink = driveLink;

  try {
    await updateDoc(doc(db, "orders", firestoreId), updates);
    console.log(`✅ Order ${firestoreId} → ${status}`);
  } catch (err) {
    console.error("❌ Firestore update failed:", err);
  }
}

// ═══════════════════════════════════════════════════════════
//  STEP 4 — COMPLETE ORDER FLOW
//  Use this in OrderModal.jsx instead of the setTimeout stub
// ═══════════════════════════════════════════════════════════

/**
 * Full order pipeline:
 * 1. Open Razorpay → wait for payment confirmation
 * 2. Save order to Firestore (ONLY after payment)
 * 3. Send confirmation email to customer
 * 4. Notify admin
 */
export async function processOrder({
  form, pkg, addons, total, applied,
  onSuccess, onError,
}) {
  try {
    // Step 1: Payment
    const { paymentId } = await openRazorpay({
      amount:      total,
      name:        form.name,
      email:       form.email,
      phone:       form.phone,
      description: `${pkg.n} Thumbnail — PandaStudioX`,
      pkg:         pkg.n,
    });

    // Step 2: Generate order ID
    const orderId = `TH-${Date.now().toString(36).toUpperCase()}`;

    // Step 3: Save to Firestore (AFTER payment!)
    await saveOrder({
      orderId,
      name:      form.name,
      email:     form.email,
      phone:     form.phone,
      pkg,
      addons,
      total,
      paymentId,
      platform:  form.platform,
      style:     form.style,
      emotion:   form.emotion,
      title:     form.title,
      thumbText: form.thumbText,
      ref:       form.ref,
      note:      form.note,
    });

    // Step 4: Send emails
    await Promise.all([
      sendOrderConfirmation({
        name:     form.name,
        email:    form.email,
        orderId,
        pkg:      pkg.n,
        total,
        delivery: pkg.del,
      }),
      notifyAdmin({
        name:    form.name,
        email:   form.email,
        orderId,
        pkg:     pkg.n,
        total,
      }),
    ]);

    // Step 5: Success callback
    onSuccess({ oid: orderId, pkg, total, email: form.email, name: form.name });

  } catch (err) {
    console.error("Order flow failed:", err);
    onError?.(err.message || "Payment failed. Please try again.");
  }
}

// ═══════════════════════════════════════════════════════════
//  STEP 5 — GOOGLE ANALYTICS 4
//  Add to index.html (replace G-XXXXXXXXXX with your ID):
//
//  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
//  <script>
//    window.dataLayer = window.dataLayer || [];
//    function gtag(){dataLayer.push(arguments);}
//    gtag('js', new Date());
//    gtag('config', 'G-XXXXXXXXXX');
//  </script>
// ═══════════════════════════════════════════════════════════

/**
 * Track a custom event in GA4
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Usage examples:
// trackEvent("order_started",   { package: "standard" });
// trackEvent("order_completed", { package: "standard", value: 249, currency: "INR" });
// trackEvent("coupon_applied",  { coupon: "PANDA10" });
// trackEvent("view_portfolio",  { category: "minecraft" });
