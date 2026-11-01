const districts=[
{id:1,name:"The Observers",motto:"See. Question. Create Change.",color:"#e0b52f",file:"district-1.png",names:["Yangan","Pagaran","Salcedo","Fortallio","Abuzo","Ledesma","Arias","Abrio"]},
{id:2,name:"The Truth Seekers",motto:"Uncover. Analyze. Expose.",color:"#aeb2bc",file:"district-2.png",names:["Intia","Amora","Cabalang","Labial, L.","Gulapo, C.","Naluan","Alaba","Miculob"]},
{id:3,name:"The Voices",motto:"Listen. Understand. Amplify.",color:"#168fd1",file:"district-3.png",names:["Morano","Barsobia","Balumpo","Senogbohan","Bangot","Japona","Econar"]},
{id:4,name:"The Advocates",motto:"Inform. Inspire. Take Action.",color:"#19b9b5",file:"district-4.png",names:["Paca","Gadrinab","Obradas","Acac","Susi","Teofilo","Samon"]},
{id:5,name:"The Alliance",motto:"Unite. Collaborate. Build Tomorrow.",color:"#a34bd2",file:"district-5.png",names:["Buhawe","Gamutan","Gales","Bunglay","Labial, S.","Risare","Tanghian"]}
];
let participants=districts.flatMap(d=>d.names.map(name=>({name,district:d.id})));
let selectedDistrict=0, history=[], chosen=null, soundOn=true, busy=false;
const $=id=>document.getElementById(id);
const total=()=>participants.length;
const eligible=()=>participants.filter(p=>(!selectedDistrict||p.district===selectedDistrict)&&!history.some(h=>h.name===p.name&&h.district===p.district));
function district(id){return districts.find(d=>d.id===id)}
function showToast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
function renderPreview(){$("districtPreview").innerHTML=districts.map(d=>`<div class="preview-card" style="--district:${d.color}"><img src="./assets/districts/${d.file}" alt=""><strong>DISTRICT ${d.id}</strong></div>`).join("")}
function renderDistricts(){
 const cards=[{id:0,name:"All Districts",motto:"All registered tributes",color:"#d8b568",file:null},...districts];
 $("districtGrid").innerHTML=cards.map(d=>`<button class="district-card ${selectedDistrict===d.id?"active":""}" data-district="${d.id}" style="--district:${d.color}">${d.file?`<img src="./assets/districts/${d.file}" alt="${d.name} emblem">`:`<div style="height:125px;display:grid;place-items:center;font-size:48px;color:#d8b568">✦</div>`}<strong>${d.id?"DISTRICT "+d.id:"ALL DISTRICTS"}</strong><small>${d.name}</small></button>`).join("");
 document.querySelectorAll("[data-district]").forEach(b=>b.addEventListener("click",()=>{selectedDistrict=Number(b.dataset.district);renderAll()}));
 const d=selectedDistrict?district(selectedDistrict):null;
 $("selectedDistrict").textContent=d?`${d.name.toUpperCase()} — ${d.motto}`:"Select from all five districts. The Reaping will draw from all registered tributes.";
}
function renderRoster(){
 const list=participants.filter(p=>!selectedDistrict||p.district===selectedDistrict);
 $("rosterTitle").textContent=selectedDistrict?`District ${selectedDistrict} — ${district(selectedDistrict).name}`:"All Districts";
 $("totalCount").textContent=`${list.length} tributes`;
 $("remainingCount").textContent=`${eligible().length} remaining`;
 $("roster").innerHTML=list.map(p=>{const used=history.some(h=>h.name===p.name&&h.district===p.district);return `<li class="${used?"selected":""}"><span>${escapeHtml(p.name)} <small style="color:${district(p.district).color}">· D${p.district}</small></span><span>${used?"SELECTED":""} <button class="remove" data-remove="${encodeURIComponent(p.name)}" data-d="${p.district}" aria-label="Remove ${escapeHtml(p.name)}">×</button></span></li>`}).join("")||'<li class="empty">No participants in this district yet.</li>';
 document.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{const name=decodeURIComponent(b.dataset.remove),d=Number(b.dataset.d);participants=participants.filter(p=>!(p.name===name&&p.district===d));history=history.filter(p=>!(p.name===name&&p.district===d));if(chosen&&chosen.name===name&&chosen.district===d)chosen=null;renderAll()}));
 $("remainingLabel").textContent=`${eligible().length} eligible tributes remain`;
}
function renderCeremony(){
 const d=chosen?district(chosen.district):(selectedDistrict?district(selectedDistrict):null);
 $("ceremonyDistrict").innerHTML=d?`<img src="./assets/districts/${d.file}" alt="District ${d.id} emblem">`:"<span>✦</span>";
 document.documentElement.style.setProperty("--district",d?d.color:"#d8b568");
 $("ceremonyGroup").textContent=selectedDistrict?`DISTRICT ${selectedDistrict} · ${district(selectedDistrict).name.toUpperCase()}`:"ALL DISTRICTS";
 $("chosenName").textContent=chosen?chosen.name:"???????";
 $("chosenMeta").textContent=chosen?`DISTRICT ${chosen.district} · ${district(chosen.district).name.toUpperCase()} · THE CAPITOL HAS SPOKEN`:"AWAITING THE CAPITOL'S SELECTION";
 $("reapBtn").disabled=busy||eligible().length===0;
 $("reapBtn").style.opacity=$("reapBtn").disabled?".45":"1";
}
function renderHistory(){
 $("historyList").innerHTML=history.length?history.map((h,i)=>`<li><strong>${i+1}. ${escapeHtml(h.name)}</strong> <span style="color:${district(h.district).color}">— District ${h.district}: ${district(h.district).name}</span></li>`).join(""):'<li class="empty">No tributes have been selected yet.</li>';
}
function renderAll(){renderDistricts();renderRoster();renderCeremony();renderHistory()}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function tab(name){document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));["registry","ceremony","history"].forEach(n=>$(`${n}Tab`).classList.toggle("hidden",n!==name))}
function addNames(names,d=selectedDistrict||1){let added=0;for(const raw of names){const name=raw.trim();if(name&&!participants.some(p=>p.name.toLowerCase()===name.toLowerCase()&&p.district===d)){participants.push({name,district:d});added++}}renderAll();showToast(`${added} participant${added===1?"":"s"} added`)}
$("addForm").addEventListener("submit",e=>{e.preventDefault();if(!$("newName").value.trim())return;addNames([$("newName").value]);$("newName").value=""});
$("bulkAdd").addEventListener("click",()=>{const names=$("bulkNames").value.split(/\r?\n/).filter(x=>x.trim());if(!names.length)return;addNames(names);$("bulkNames").value=""});
$("enterBtn").addEventListener("click",()=>{$("homeView").classList.add("hidden");$("appView").classList.remove("hidden");tab("registry");window.scrollTo(0,0)});
$("backHome").addEventListener("click",()=>{$("appView").classList.add("hidden");$("homeView").classList.remove("hidden");window.scrollTo(0,0)});
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>tab(b.dataset.tab)));
$("reapBtn").addEventListener("click",async()=>{
 if(busy||!eligible().length)return;
 busy=true;chosen=null;renderCeremony();$("countdown").classList.remove("hidden");
 const pool=eligible();const winner=pool[Math.floor(Math.random()*pool.length)];
 for(let n=5;n>=1;n--){$("countdown").textContent=n;await new Promise(r=>setTimeout(r,650))}
 $("countdown").classList.add("hidden");
 chosen=winner;history.push({...winner,event:$("eventName").value||"THE REAPING",time:new Date().toISOString()});
 if(soundOn){const a=new Audio("./assets/audio/reaping-reveal.wav");a.volume=.85;a.play().catch(()=>showToast("Tap the page once to enable sound."))}
 $("chosenName").classList.add("reveal");renderAll();busy=false;showToast("THE CAPITOL HAS SPOKEN.");
});
$("hideReveal").addEventListener("click",()=>{chosen=null;renderCeremony()});
$("fullscreenBtn").addEventListener("click",async()=>{document.body.classList.toggle("presentation");if(!document.body.classList.contains("presentation")&&document.fullscreenElement)await document.exitFullscreen().catch(()=>{});else if(document.body.classList.contains("presentation")&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen().catch(()=>{});});
$("resetBtn").addEventListener("click",()=>{if(confirm("Reset this event? All selection history will be cleared.")){history=[];chosen=null;renderAll();showToast("The Reaping has been reset.")}});
$("exportBtn").addEventListener("click",()=>{const rows=[["Order","Name","District","District Name","Event","Selected At"],...history.map((h,i)=>[i+1,h.name,h.district,district(h.district).name,h.event,h.time])];const csv=rows.map(r=>r.map(x=>`"${String(x??"").replace(/"/g,'""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="the-reaping-history.csv";a.click();URL.revokeObjectURL(a.href)});
$("soundToggle").addEventListener("click",()=>{soundOn=!soundOn;$("soundToggle").textContent=soundOn?"♫ Sound on":"♫ Sound off";$("soundToggle").setAttribute("aria-pressed",String(soundOn))});
let deferredInstall=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("installBtn").classList.remove("hidden")});
$("installBtn").addEventListener("click",async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("installBtn").classList.add("hidden")});
renderPreview();renderAll();
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
