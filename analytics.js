<script type="module">

/* =========================================
   QWEN-911 GLOBAL ANALYTICS SYSTEM
   Firebase Auth + Supabase Backend
========================================= */

/* ---------- FIREBASE ---------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

/* ---------- SUPABASE ---------- */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* =========================================
   FIREBASE CONFIG (YOUR REAL KEYS)
========================================= */
const firebaseConfig = {
  apiKey: "AIzaSyDMPhlgEkaedtGWEiYF84JR_kDRJQZF68I",
  authDomain: "qwen-911.firebaseapp.com",
  databaseURL: "https://qwen-911-default-rtdb.firebaseio.com",
  projectId: "qwen-911",
  storageBucket: "qwen-911.firebasestorage.app",
  messagingSenderId: "518019892837",
  appId: "1:518019892837:web:9972dd63d8dca7936ea88c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =========================================
   SUPABASE CONFIG (SAFE PUBLIC KEY ONLY)
========================================= */

const SUPABASE_URL =
"https://qagawtgfpfupobwuotvw.supabase.co";

/* ✅ USE ANON PUBLIC KEY ONLY */
const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ2F3dGdmcGZ1cG9id3VvdHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMDIzNzYsImV4cCI6MjA4Nzg3ODM3Nn0.-ocXPElc-S6aPlqpJBr0-Fvhv8rvaxEDnWKbw5C4dD4";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* =========================================
   USERNAME FROM EMAIL
   (remove @gmail.com)
========================================= */
function usernameFromEmail(email) {
  if (!email) return "guest";
  return email.replace("@gmail.com", "");
}

/* =========================================
   GLOBAL TRACK EVENT FUNCTION
========================================= */

window.trackEvent = async function (
  eventType,
  metadata = {},
  amount = 0,
  status = "success"
) {
  try {

    const user = auth.currentUser;

    const email = user ? user.email : "guest";
    const username = usernameFromEmail(email);

    await supabase
      .from("analytics_events")
      .insert([
        {
          user_email: email,
          username: username,
          event_type: eventType,
          platform: "web",
          amount: amount,
          metadata: metadata,
          status: status
        }
      ]);

    console.log("✅ Event tracked:", eventType);

  } catch (error) {
    console.error("❌ Analytics error:", error.message);
  }
};

/* =========================================
   AUTO APP OPEN TRACKER
========================================= */

onAuthStateChanged(auth, (user) => {

  if (!user) return;

  setTimeout(() => {
    trackEvent("APP_OPEN", {
      page: window.location.pathname,
      time: new Date().toISOString()
    });
  }, 1200);

});

/* =========================================
   AUTO PAGE VIEW TRACK
========================================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    trackEvent("PAGE_VIEW", {
      page: document.title
    });
  }, 1500);
});

</script>
