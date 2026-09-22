const REGISTRATION_URL="https://forms.gle/6kCAHVnSAdmp2Rdv7";
const EARLY_BIRD_DEADLINE=new Date("2026-09-30T23:59:59+05:30").getTime();

const menuButton=document.querySelector(".menu-btn");
const mobileMenu=document.getElementById("mobile-menu");
menuButton.addEventListener("click",()=>{
  const open=menuButton.getAttribute("aria-expanded")==="true";
  menuButton.setAttribute("aria-expanded",String(!open));
  menuButton.setAttribute("aria-label",open?"Open navigation":"Close navigation");
  mobileMenu.classList.toggle("open",!open);
});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menuButton.setAttribute("aria-expanded","false");
  menuButton.setAttribute("aria-label","Open navigation");
  mobileMenu.classList.remove("open");
}));

function updateCountdown(){
  const diff=EARLY_BIRD_DEADLINE-Date.now();
  const status=document.getElementById("deadline-status");
  const box=document.getElementById("countdown");
  if(diff<=0){
    box.innerHTML='<div style="grid-column:1/-1;padding-top:10px;border-top:1px solid var(--line);font-weight:700">EARLY-BIRD DEADLINE HAS PASSED</div>';
    status.textContent="The supplied material does not state a post-deadline price. Open the registration form for current availability.";
    return;
  }
  const days=Math.floor(diff/86400000);
  const hours=Math.floor((diff%86400000)/3600000);
  const mins=Math.floor((diff%3600000)/60000);
  const secs=Math.floor((diff%60000)/1000);
  document.getElementById("days").textContent=String(days).padStart(2,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("mins").textContent=String(mins).padStart(2,"0");
  document.getElementById("secs").textContent=String(secs).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById("calendarBtn").addEventListener("click",()=>{
  const ics=[
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//ILLUMINATE 2026//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT",
    "UID:illuminate-2026-ggct@event","DTSTAMP:20260922T180000Z",
    "DTSTART;TZID=Asia/Kolkata:20261009T110000","DTEND;TZID=Asia/Kolkata:20261009T170000",
    "SUMMARY:ILLUMINATE 2026",
    "LOCATION:Seminar Hall\\, Gyan Ganga College of Technology\\, Jabalpur",
    "DESCRIPTION:6-hour entrepreneurship workshop. Registration: "+REGISTRATION_URL,
    "URL:"+REGISTRATION_URL,"END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download="illuminate-2026.ics";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
});

const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced&&"IntersectionObserver" in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");io.unobserve(entry.target)}});
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}else{
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in"));
}

const sticky=document.getElementById("stickyRegister");
const hero=document.querySelector(".hero");
const stickyObserver=new IntersectionObserver(([entry])=>sticky.classList.toggle("visible",!entry.isIntersecting),{threshold:.05});
stickyObserver.observe(hero);