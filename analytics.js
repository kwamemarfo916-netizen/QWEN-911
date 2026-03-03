import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
"https://qagawtgfpfupobwuotvw.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ2F3dGdmcGZ1cG9id3VvdHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMDIzNzYsImV4cCI6MjA4Nzg"
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
event_type,
metadata,
created_at: new Date().toISOString()
}
]);
}catch(err){
console.log("Tracking error:",err);
}

};
