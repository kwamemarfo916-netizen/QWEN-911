import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
"https://qagawtgfpfupobwuotvw.supabase.co",
"YOUR_ANON_KEY"
);

/* GLOBAL TRACK FUNCTION */
window.trackEvent = async function(
event_type,
metadata = {}
){

try{

await supabase
.from("analytics_events")
.insert([
{
username: localStorage.getItem("username") || "guest",
event_type: event_type,
metadata: metadata,
created_at: new Date().toISOString(),
page: location.pathname
}
]);

}catch(err){

console.log("Tracking error:",err);

}

};
