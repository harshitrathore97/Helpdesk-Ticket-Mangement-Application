(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={urgent:{label:`Urgent`,hours:2,color:`#ff4444`,weight:4},high:{label:`High`,hours:4,color:`#ff8c00`,weight:3},normal:{label:`Normal`,hours:24,color:`#4c9eff`,weight:2},low:{label:`Low`,hours:48,color:`#22c55e`,weight:1}};function t(){return e}function n(t,n){return n+(e[t]??e.normal).hours*60*60*1e3}function r(e,t){return e.slaDeadline-t}function i(e,t){return![`resolved`,`closed`].includes(e.status)&&r(e,t)<0}function a(e,t){if([`resolved`,`closed`].includes(e.status))return`Resolved`;let n=r(e,t);return n<0?`OVERDUE`:n<18e5?`Critical`:n<36e5?`Imminent`:n<144e5?`Soon`:`On Track`}function o(e,t){return{OVERDUE:`overdue`,Critical:`critical`,Imminent:`imminent`,Soon:`soon`,"On Track":`on-track`,Resolved:`resolved`}[a(e,t)]??`on-track`}var s=[`low`,`normal`,`high`,`urgent`];function c(e){let t=s.indexOf(String(e).toLowerCase());return t===-1||t>=s.length-1?null:s[t+1]}var l=`priya`,u=`alex`;function d({id:e,customer:t,email:r,company:i,subject:a,priority:o,status:s,assignee:c,createdMinsAgo:l,note:u}){let d=Date.now()-l*60*1e3,f=n(o,d);return{id:e,customer:t,email:r??`${t.split(` `)[0].toLowerCase()}@${i.toLowerCase().replace(/\s+/g,``)}.com`,company:i,subject:a,priority:o,status:s??`open`,assignee:c??null,createdAt:d,slaDeadline:f,resolvedAt:s===`resolved`?d+(Math.random()*60+20)*60*1e3:null,note:u??null,history:[]}}var f=[{id:`priya`,name:`Priya Sharma`,avatar:`PS`,color:`#7c3aed`},{id:`alex`,name:`Alex Chen`,avatar:`AC`,color:`#0ea5e9`}],p=[d({id:`TKT-0001`,customer:`Marcus Vance`,company:`Meridian Capital`,subject:`Laptop won't boot — client demo starts in 20 minutes`,priority:`urgent`,status:`in_progress`,assignee:l,createdMinsAgo:135,note:`Called Marcus directly. Trying Bitlocker recovery key.`}),d({id:`TKT-0002`,customer:`Elena Rostova`,company:`NorthStar Sales`,subject:`VPN tunnel collapsed — entire remote sales team locked out`,priority:`urgent`,status:`open`,assignee:null,createdMinsAgo:145,note:null}),d({id:`TKT-0003`,customer:`David Kim`,company:`Pinnacle Finance`,subject:`SSO down for entire finance team during month-end close`,priority:`urgent`,status:`open`,assignee:u,createdMinsAgo:130}),d({id:`TKT-0004`,customer:`Sophia Huang`,company:`BlueSky Media`,subject:`Exchange server not sending outbound emails — quotes bouncing`,priority:`high`,status:`open`,assignee:null,createdMinsAgo:260}),d({id:`TKT-0005`,customer:`Raj Patel`,company:`Vertex Consulting`,subject:`MFA app deleted — locked out of all corporate systems`,priority:`urgent`,status:`open`,assignee:l,createdMinsAgo:138}),d({id:`TKT-0006`,customer:`Liam Gallagher`,company:`Quantum Dynamics`,subject:`Zoom keeps crashing during all-hands — presenting in 1 hour`,priority:`urgent`,status:`open`,assignee:u,createdMinsAgo:90}),d({id:`TKT-0007`,customer:`Aisha Okonkwo`,company:`Luminary Health`,subject:`Shared network drive unreachable from entire radiology wing`,priority:`high`,status:`in_progress`,assignee:l,createdMinsAgo:200}),d({id:`TKT-0008`,customer:`Carlos Mendes`,company:`Atlas Logistics`,subject:`Printer in warehouse not accepting jobs — 50 shipments stalled`,priority:`high`,status:`open`,assignee:null,createdMinsAgo:180}),d({id:`TKT-0009`,customer:`Grace O'Sullivan`,company:`Ember Studios`,subject:`Adobe Creative Cloud license expired — design team can't work`,priority:`high`,status:`open`,assignee:u,createdMinsAgo:170}),d({id:`TKT-0010`,customer:`James Whitfield`,company:`CoreEdge Tech`,subject:`GitHub Actions runner out of disk space — CI/CD pipeline blocked`,priority:`high`,status:`open`,assignee:l,createdMinsAgo:155}),d({id:`TKT-0011`,customer:`Priscilla Nakamura`,company:`Horizon Bank`,subject:`New MacBook Pro won't connect to corporate Wi-Fi (802.1X)`,priority:`normal`,status:`open`,assignee:null,createdMinsAgo:60}),d({id:`TKT-0012`,customer:`Oliver King`,company:`Summit Analytics`,subject:`Slack keeps logging me out every 2 hours — very disruptive`,priority:`normal`,status:`in_progress`,assignee:u,createdMinsAgo:45}),d({id:`TKT-0013`,customer:`Fatima Al-Rashid`,company:`Crescent Legal`,subject:`VPN connects but can't reach internal SharePoint sites`,priority:`normal`,status:`open`,assignee:null,createdMinsAgo:90}),d({id:`TKT-0014`,customer:`Noah Brandt`,company:`GreenWave Energy`,subject:`Excel crashing when opening files >50MB — data team blocked`,priority:`normal`,status:`open`,assignee:l,createdMinsAgo:30}),d({id:`TKT-0015`,customer:`Isabella Torres`,company:`Apex Realty`,subject:`OneDrive sync stuck — files from yesterday not synced`,priority:`normal`,status:`open`,assignee:null,createdMinsAgo:75}),d({id:`TKT-0016`,customer:`Ethan Blackwood`,company:`Ironclad Security`,subject:`Windows Update KB5034439 failing with error 0x800f0922`,priority:`normal`,status:`open`,assignee:u,createdMinsAgo:120}),d({id:`TKT-0017`,customer:`Layla Hassan`,company:`SilverLeaf Pharma`,subject:`Outlook signature stripped when forwarding — compliance issue`,priority:`high`,status:`open`,assignee:null,createdMinsAgo:100}),d({id:`TKT-0018`,customer:`Felix Bauer`,company:`EuroTrade GmbH`,subject:`Webcam not detected in Webex — international call in 3 hours`,priority:`high`,status:`open`,assignee:l,createdMinsAgo:50}),d({id:`TKT-0019`,customer:`Yuki Tanaka`,company:`Fuji Digital`,subject:`PowerPoint presenter view not working on secondary display`,priority:`normal`,status:`open`,assignee:null,createdMinsAgo:110}),d({id:`TKT-0020`,customer:`Samuel Osei`,company:`AfriLink Telecom`,subject:`Can't install Python 3.12 — Windows says "system administrator"`,priority:`normal`,status:`open`,assignee:u,createdMinsAgo:200}),d({id:`TKT-0021`,customer:`Chloe Bennett`,company:`Pixel Perfect Agency`,subject:`Requesting a larger secondary monitor for Figma design work`,priority:`low`,status:`open`,assignee:null,createdMinsAgo:300}),d({id:`TKT-0022`,customer:`Aaron Miller`,company:`DraftBit`,subject:`Access request to Figma Enterprise workspace for new joiners`,priority:`low`,status:`open`,assignee:l,createdMinsAgo:1440}),d({id:`TKT-0023`,customer:`Mia Reynolds`,company:`CloudFirst Inc`,subject:`Wireless mouse scroll wheel making clicking noise — annoying`,priority:`low`,status:`open`,assignee:null,createdMinsAgo:720}),d({id:`TKT-0024`,customer:`Ben Ashworth`,company:`Sterling Group`,subject:`Keyboard repeat rate too fast — want to adjust sensitivity`,priority:`low`,status:`open`,assignee:u,createdMinsAgo:480}),d({id:`TKT-0025`,customer:`Hana Kobayashi`,company:`Opal Ventures`,subject:`Dark mode not applying to Outlook calendar — aesthetic request`,priority:`low`,status:`open`,assignee:null,createdMinsAgo:360}),d({id:`TKT-0026`,customer:`Derek Stone`,company:`PrismTech`,subject:`Requesting a physical USB hub for the standing desk setup`,priority:`low`,status:`open`,assignee:null,createdMinsAgo:2880}),d({id:`TKT-0027`,customer:`Natalie Ford`,company:`BloomBox`,subject:`Teams background blurring not available on this machine`,priority:`low`,status:`open`,assignee:l,createdMinsAgo:600}),d({id:`TKT-0028`,customer:`Chris Abara`,company:`MegaPort Shipping`,subject:`Label printer driver not compatible with Windows 11 upgrade`,priority:`high`,status:`waiting`,assignee:u,createdMinsAgo:90,note:`Awaiting vendor driver from Zebra — ETA tomorrow 9am.`}),d({id:`TKT-0029`,customer:`Valeria Cruz`,company:`Solano Architecture`,subject:`AutoCAD license server returning "no licenses available"`,priority:`urgent`,status:`waiting`,assignee:l,createdMinsAgo:55,note:`Escalated to Autodesk support — ticket #AUT-98123.`}),d({id:`TKT-0030`,customer:`Patrick Nwosu`,company:`BrightPath NGO`,subject:`Salesforce integration failing with OAuth token expired error`,priority:`high`,status:`waiting`,assignee:u,createdMinsAgo:240,note:`Need Salesforce admin to re-authorize the connected app.`}),d({id:`TKT-0031`,customer:`Sandra Lopez`,company:`Citadel Law`,subject:`Password reset for domain account after lockout`,priority:`urgent`,status:`resolved`,assignee:l,createdMinsAgo:500,note:`Reset via AD, MFA re-enrolled. User confirmed working.`}),d({id:`TKT-0032`,customer:`Tom Bradley`,company:`GlobeCast TV`,subject:`Teams audio feedback loop during live broadcast test`,priority:`high`,status:`resolved`,assignee:u,createdMinsAgo:380,note:`Fixed by changing audio device in Teams settings.`}),d({id:`TKT-0033`,customer:`Amara Singh`,company:`NewGen Schools`,subject:`Google Classroom not loading on school-issued Chromebooks`,priority:`normal`,status:`resolved`,assignee:l,createdMinsAgo:1200,note:`Cleared cache & refreshed Google policy via admin console.`}),d({id:`TKT-0034`,customer:`Victor Cheng`,company:`AlphaWave Capital`,subject:`Bloomberg Terminal disconnected from market data feed`,priority:`urgent`,status:`resolved`,assignee:u,createdMinsAgo:600,note:`Bloomberg network service restarted. Feed restored in 8 mins.`}),d({id:`TKT-0035`,customer:`Diana Müller`,company:`Heidelberg Systems`,subject:`Dual-monitor not detected after Windows 11 23H2 update`,priority:`normal`,status:`resolved`,assignee:l,createdMinsAgo:2e3,note:`Rolled back display driver to 31.0.101.2115. Issue resolved.`}),d({id:`TKT-0036`,customer:`Leo Fontaine`,company:`Maison Digital`,subject:`Can't share screen in Google Meet — extension blocked by policy`,priority:`normal`,status:`resolved`,assignee:u,createdMinsAgo:800,note:`Allowed screen capture extension via Workspace Admin.`})],m=1e3;function h(){return`TKT-${++m}`}function ee(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var g=`helpdesk_tickets_v2`,_={tickets:[],activeAgent:`priya`,team:f},v=new Set;function y(){let e=re();v.forEach(t=>t(e))}function te(e){return v.add(e),()=>v.delete(e)}function ne(){if(typeof localStorage<`u`){let e=localStorage.getItem(g);if(e)try{_.tickets=JSON.parse(e);return}catch{}}_.tickets=p,b()}function b(){typeof localStorage<`u`&&localStorage.setItem(g,JSON.stringify(_.tickets))}function re(){return{..._}}function ie(){return _.tickets}function x(){return _.activeAgent}function S(){return _.team}function ae(e){return _.team.find(t=>t.id===e)??null}function oe(e){_.activeAgent=e,y()}function se({customer:e,email:t,company:r,subject:i,priority:a,assignee:o}){let s=Date.now(),c={id:h(),customer:e,email:t??``,company:r??``,subject:i,priority:a,status:`open`,assignee:o??null,createdAt:s,slaDeadline:n(a,s),resolvedAt:null,note:null,history:[{at:s,msg:`Ticket created`}]};return _.tickets=[c,..._.tickets],b(),y(),c}function C(e,t){_.tickets=_.tickets.map(r=>{if(r.id!==e)return r;let i={...r,...t};if(t.priority&&t.priority!==r.priority&&(i.slaDeadline=n(i.priority,i.createdAt)),t.status&&t.status!==r.status){let e={at:Date.now(),msg:`Status changed to ${t.status}`};i.history=[...r.history??[],e],(t.status===`resolved`||t.status===`closed`)&&(i.resolvedAt=Date.now())}return i}),b(),y()}function w(e,t){C(e,{assignee:t})}function ce(e){let t=[];return _.tickets=_.tickets.map(n=>{if([`resolved`,`closed`].includes(n.status)||!i(n,e))return n;let r=c(n.priority);if(!r)return n;let a=n.priority,o={at:e,action:`escalated`,from:a,to:r,msg:`⚡ Auto-Escalated: SLA breached. Priority raised from ${a.toUpperCase()} ➔ ${r.toUpperCase()} (automated check run)`},s={...n,priority:r,isEscalated:!0,lastEscalatedAt:e,escalationCount:(n.escalationCount||0)+1,history:[...n.history??[],o]};return t.push({id:n.id,from:a,to:r,subject:n.subject,customer:n.customer}),s}),t.length>0&&(b(),y()),t}var le=new Set([`resolved`,`closed`]);function T(e){return t()[e.priority]?.weight??0}function E(e){return le.has(e.status)}function ue(e,t,n){let a=E(e),o=E(t);if(a&&!o)return 1;if(!a&&o)return-1;if(a&&o)return(t.resolvedAt??0)-(e.resolvedAt??0);let s=i(e,n),c=i(t,n);if(s&&!c)return-1;if(!s&&c)return 1;if(s&&c){let i=r(e,n)-r(t,n);return i===0?T(t)-T(e):i}let l=r(e,n)-r(t,n);if(Math.abs(l)>1e3)return l;let u=T(t)-T(e);return u===0?e.createdAt-t.createdAt:u}function de(e,t){return[...e].sort((e,n)=>ue(e,n,t))}function fe(e,t){return de(e.filter(e=>!E(e)),t)}function pe(e,t){return fe(e,t)[0]??null}var D=0,O=new Set,k=null;function A(){return Date.now()+D}function j(e){D+=e,M()}function me(){D=0,M()}function he(e){return O.add(e),ge(),()=>{O.delete(e),O.size===0&&_e()}}function M(){let e=A();O.forEach(t=>t(e))}function ge(){k===null&&(k=setInterval(()=>{M()},1e3))}function _e(){k!==null&&(clearInterval(k),k=null)}function ve(){if(D===0)return`Real time`;let e=D>0?`+`:`-`,t=Math.abs(D),n=Math.floor(t/36e5),r=Math.floor(t%36e5/6e4),i=[];return n&&i.push(`${n}h`),r&&i.push(`${r}m`),i.length||i.push(`<1m`),`${e}${i.join(` `)} ahead`}function ye(e,t){let n=A(),a=e.filter(e=>![`resolved`,`closed`].includes(e.status)),o=a.filter(e=>i(e,n)),s=a.filter(e=>{let t=r(e,n);return t>=0&&t<36e5}),c=e.filter(e=>e.status===`resolved`||e.status===`closed`);t.innerHTML=`
    <div class="stats-banner">
      <div class="stat-card stat--overdue" id="stat-overdue">
        <span class="stat-icon">🔴</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-overdue-count">${o.length}</div>
          <div class="stat-label">Overdue</div>
        </div>
        ${o.length>0?`<span class="stat-badge-pulse"></span>`:``}
      </div>
      <div class="stat-card stat--urgent" id="stat-approaching">
        <span class="stat-icon">⚡</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-approaching-count">${s.length}</div>
          <div class="stat-label">Due &lt; 1h</div>
        </div>
      </div>
      <div class="stat-card stat--active" id="stat-active">
        <span class="stat-icon">📋</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-active-count">${a.length}</div>
          <div class="stat-label">Active Tickets</div>
        </div>
      </div>
      <div class="stat-card stat--resolved" id="stat-resolved">
        <span class="stat-icon">✅</span>
        <div class="stat-content">
          <div class="stat-value" id="stat-resolved-count">${c.length}</div>
          <div class="stat-label">Resolved Today</div>
        </div>
      </div>
    </div>
  `}function be(e){let t=A(),n=e.filter(e=>![`resolved`,`closed`].includes(e.status)),a=n.filter(e=>i(e,t)),o=n.filter(e=>{let n=r(e,t);return n>=0&&n<36e5}),s=e.filter(e=>e.status===`resolved`||e.status===`closed`),c=parseInt(document.getElementById(`stat-overdue-count`)?.textContent??`0`);if(document.getElementById(`stat-overdue-count`)&&(document.getElementById(`stat-overdue-count`).textContent=a.length),document.getElementById(`stat-approaching-count`)&&(document.getElementById(`stat-approaching-count`).textContent=o.length),document.getElementById(`stat-active-count`)&&(document.getElementById(`stat-active-count`).textContent=n.length),document.getElementById(`stat-resolved-count`)&&(document.getElementById(`stat-resolved-count`).textContent=s.length),a.length!==c){let e=document.getElementById(`stat-overdue-count`);e&&(e.classList.remove(`animate-badge-pop`),e.offsetWidth,e.classList.add(`animate-badge-pop`))}}function N(e){if(e===0)return`Due now`;let t=Math.abs(e),n=Math.floor(t/36e5),r=Math.floor(t%36e5/6e4),i=Math.floor(t%6e4/1e3),a=[];n>0&&a.push(`${n}h`),(r>0||n>0)&&a.push(`${r}m`),n===0&&a.push(`${i}s`);let o=a.join(` `);return e<0?`Overdue by ${o}`:`Due in ${o}`}function P(e){return e?new Date(e).toLocaleString(`en-US`,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,hour12:!0}):`—`}function xe(e){let t=Date.now()-e;if(t<6e4)return`just now`;let n=Math.floor(t/6e4),r=Math.floor(n/60),i=Math.floor(r/24);return i>0?`${i}d ago`:r>0?`${r}h ago`:`${n}m ago`}function F(e){return e.split(`_`).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(` `)}function Se(e,t,{onPick:n,onView:i}){let a=A(),s=pe(e,a);if(!s){t.innerHTML=`
      <div class="pick-next-banner" style="opacity:0.5; justify-content:center;">
        <span style="font-size:20px;">🎉</span>
        <span style="font-size:14px; color:var(--text-secondary);">Queue is clear — great work!</span>
      </div>
    `;return}let c=o(s,a),l=r(s,a),u=N(l),d=S().find(e=>e.id===s.assignee),f=l<0;t.innerHTML=`
    <div class="pick-next-banner ${f?`animate-flash-red`:``}" style="${f?`border-color: rgba(239,68,68,0.4);`:``}">
      <div class="pick-next-rank">#1</div>
      <div class="pick-next-content">
        <div class="pick-next-label">
          ${f?`🚨 OVERDUE — Pick this ticket now`:`⚡ Next Most Pressing Ticket`}
        </div>
        <div class="pick-next-subject">${I(s.subject)}</div>
        <div class="pick-next-meta">
          <span class="font-mono sla-timer sla--${c}" id="pick-next-timer">${u}</span>
          <span>·</span>
          <span>${I(s.customer)}</span>
          <span>·</span>
          <span class="priority-badge priority--${s.priority}">${we(s.priority)}</span>
          ${d?`<span>·</span><span>${d.name}</span>`:`<span>· Unassigned</span>`}
        </div>
      </div>
      <div class="pick-next-actions">
        <button class="btn btn--ghost btn--sm" id="pick-next-view-btn">View</button>
        <button class="btn btn--primary btn--sm" id="pick-next-btn">
          ${s.assignee?`▶ Resume`:`▶ Pick & Assign`}
        </button>
      </div>
    </div>
  `,document.getElementById(`pick-next-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),n(s)}),document.getElementById(`pick-next-view-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),i(s)})}function Ce(e){let t=A(),n=pe(e,t),i=document.getElementById(`pick-next-timer`);if(!i||!n)return;let a=r(n,t),s=o(n,t);i.textContent=N(a),i.className=`font-mono sla-timer sla--${s}`}function I(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function we(e){return e.charAt(0).toUpperCase()+e.slice(1)}var L={search:``,tab:`all`,priority:`all`,status:`active`},R=null;function Te(){return{...L}}function Ee(e,{onChange:t,activeAgentId:n,allTickets:r}){R=t;let a=A(),o=S(),s=r.filter(e=>![`resolved`,`closed`].includes(e.status)&&i(e,a)).length,c=r.filter(e=>![`resolved`,`closed`].includes(e.status)&&e.assignee===n).length,l=r.filter(e=>![`resolved`,`closed`].includes(e.status)&&!e.assignee).length,u=r.filter(e=>[`resolved`,`closed`].includes(e.status)).length,d=o.find(e=>e.id===n),f=r.filter(e=>![`resolved`,`closed`].includes(e.status)).length;if(e.querySelector(`.filter-bar`)){let t=e.querySelector(`#pill-all`);if(t){t.className=`filter-pill ${L.tab===`all`?`active`:``}`;let e=t.querySelector(`.pill-count`);e&&(e.textContent=f)}let n=e.querySelector(`#pill-overdue`);if(n){n.className=`filter-pill pill--overdue ${L.tab===`overdue`?`active`:``}`;let e=n.querySelector(`.pill-count`);e&&(e.textContent=s)}let r=e.querySelector(`#pill-mine`);r&&(r.className=`filter-pill pill--my-tickets ${L.tab===`mine`?`active`:``}`,r.innerHTML=`👤 ${z(d?.name??`My Tickets`)} <span class="pill-count">${c}</span>`);let i=e.querySelector(`#pill-unassigned`);if(i){i.className=`filter-pill pill--unassigned ${L.tab===`unassigned`?`active`:``}`;let e=i.querySelector(`.pill-count`);e&&(e.textContent=l)}let a=e.querySelector(`#pill-resolved`);if(a){a.className=`filter-pill pill--resolved ${L.tab===`resolved`?`active`:``}`;let e=a.querySelector(`.pill-count`);e&&(e.textContent=u)}let o=e.querySelector(`#priority-filter`);o&&o.value!==L.priority&&(o.value=L.priority);let p=e.querySelector(`#status-filter`);p&&p.value!==L.status&&(p.value=L.status);return}e.innerHTML=`
    <div class="filter-bar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          id="search-input"
          class="search-input"
          placeholder="Search by customer, subject, ID…"
          value="${z(L.search)}"
          autocomplete="off"
        />
        <span class="search-clear" id="search-clear" title="Clear search">✕</span>
      </div>

      <div class="filter-pills">
        <button class="filter-pill ${L.tab===`all`?`active`:``}" data-tab="all" id="pill-all">
          All Tickets
          <span class="pill-count">${f}</span>
        </button>

        <button class="filter-pill pill--overdue ${L.tab===`overdue`?`active`:``}" data-tab="overdue" id="pill-overdue">
          🔴 Overdue
          <span class="pill-count">${s}</span>
        </button>

        <button class="filter-pill pill--my-tickets ${L.tab===`mine`?`active`:``}" data-tab="mine" id="pill-mine">
          👤 ${z(d?.name??`My Tickets`)}
          <span class="pill-count">${c}</span>
        </button>

        <button class="filter-pill pill--unassigned ${L.tab===`unassigned`?`active`:``}" data-tab="unassigned" id="pill-unassigned">
          ○ Unassigned
          <span class="pill-count">${l}</span>
        </button>

        <button class="filter-pill pill--resolved ${L.tab===`resolved`?`active`:``}" data-tab="resolved" id="pill-resolved">
          ✅ Resolved
          <span class="pill-count">${u}</span>
        </button>
      </div>

      <div style="display:flex; gap:8px; margin-left:auto;">
        <select class="filter-select" id="priority-filter">
          <option value="all" ${L.priority===`all`?`selected`:``}>All Priorities</option>
          <option value="urgent" ${L.priority===`urgent`?`selected`:``}>🔴 Urgent</option>
          <option value="high"   ${L.priority===`high`?`selected`:``}>🟠 High</option>
          <option value="normal" ${L.priority===`normal`?`selected`:``}>🔵 Normal</option>
          <option value="low"    ${L.priority===`low`?`selected`:``}>🟢 Low</option>
        </select>

        <select class="filter-select" id="status-filter">
          <option value="active" ${L.status===`active`?`selected`:``}>Active</option>
          <option value="all"    ${L.status===`all`?`selected`:``}>All Status</option>
          <option value="open"         ${L.status===`open`?`selected`:``}>Open</option>
          <option value="in_progress"  ${L.status===`in_progress`?`selected`:``}>In Progress</option>
          <option value="waiting"      ${L.status===`waiting`?`selected`:``}>Waiting</option>
          <option value="resolved"     ${L.status===`resolved`?`selected`:``}>Resolved</option>
        </select>
      </div>
    </div>
  `;let p=document.getElementById(`search-input`),m=document.getElementById(`search-clear`),h=ee(e=>{L.search=e,R?.(L)},250);p?.addEventListener(`input`,e=>{h(e.target.value.trim())}),m?.addEventListener(`click`,()=>{L.search=``,p&&(p.value=``),R?.(L)}),e.querySelectorAll(`[data-tab]`).forEach(t=>{t.addEventListener(`click`,()=>{L.tab=t.dataset.tab,Ee(e,{onChange:R,activeAgentId:n,allTickets:r}),R?.(L)})}),document.getElementById(`priority-filter`)?.addEventListener(`change`,e=>{L.priority=e.target.value,R?.(L)}),document.getElementById(`status-filter`)?.addEventListener(`change`,e=>{L.status=e.target.value,R?.(L)})}function De(e,t,n){let{search:r,tab:a,priority:o,status:s}=t,c=A();return e.filter(e=>{if(a===`resolved`){if(![`resolved`,`closed`].includes(e.status))return!1}else if(a===`overdue`){if([`resolved`,`closed`].includes(e.status)||!i(e,c))return!1}else if(a===`mine`){if([`resolved`,`closed`].includes(e.status)||e.assignee!==n)return!1}else if(a===`unassigned`){if([`resolved`,`closed`].includes(e.status)||e.assignee!==null)return!1}else if(s===`active`){if([`resolved`,`closed`].includes(e.status))return!1}else if(s!==`all`&&e.status!==s)return!1;if(o!==`all`&&e.priority!==o)return!1;if(r){let t=r.toLowerCase();if(![e.id,e.customer,e.company,e.subject,e.email].join(` `).toLowerCase().includes(t))return!1}return!0})}function z(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Oe(e,t,{onView:n,onAssign:r,onResolve:i,onStatusChange:a}){let o=S();if(e.length===0){t.innerHTML=`
      <div class="queue-empty">
        <div class="queue-empty-icon">🗂️</div>
        <div class="queue-empty-title">No tickets match</div>
        <div class="queue-empty-subtitle">Try adjusting your filters or search query</div>
      </div>
    `;return}let s=A();t.innerHTML=`
    <table class="queue-table" aria-label="Helpdesk ticket queue">
      <thead>
        <tr>
          <th class="col-rank">#</th>
          <th class="col-id">ID</th>
          <th class="col-subject">Subject</th>
          <th class="col-customer">Customer</th>
          <th class="col-priority">Priority</th>
          <th class="col-status">Status</th>
          <th class="col-assignee">Assignee</th>
          <th class="col-sla">SLA / Deadline</th>
          <th class="col-actions">Actions</th>
        </tr>
      </thead>
      <tbody id="ticket-tbody">
        ${e.map((e,t)=>Ae(e,t,s,o,{onView:n,onAssign:r,onResolve:i,onStatusChange:a})).join(``)}
      </tbody>
    </table>
  `,t.querySelectorAll(`.ticket-row`).forEach(t=>{t.addEventListener(`click`,r=>{if(r.target.closest(`.action-btn`))return;let i=t.dataset.id,a=e.find(e=>e.id===i);a&&n(a)})}),t.querySelectorAll(`.action--view`).forEach(t=>{t.addEventListener(`click`,r=>{r.stopPropagation();let i=t.dataset.id,a=e.find(e=>e.id===i);a&&n(a)})}),t.querySelectorAll(`.action--assign`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let i=t.dataset.id,a=e.find(e=>e.id===i);a&&r(a)})}),t.querySelectorAll(`.action--resolve`).forEach(t=>{t.addEventListener(`click`,n=>{n.stopPropagation();let r=t.dataset.id,a=e.find(e=>e.id===r);a&&i(a)})})}function ke(e){let n=A();e.forEach(e=>{let i=document.getElementById(`sla-timer-${e.id}`),a=document.getElementById(`sla-bar-${e.id}`);if(!i)return;let s=o(e,n),c=r(e,n);if([`resolved`,`closed`].includes(e.status)){i.textContent=`Resolved`,i.className=`sla-timer sla--resolved`;return}if(i.textContent=N(c),i.className=`sla-timer sla--${s}`,a){let n=(t()[e.priority]?.hours??24)*3600*1e3,r=e.slaDeadline-e.createdAt-Math.max(c,0),i=Math.min(100,Math.max(0,r/n*100));a.style.width=`${i}%`,a.className=`sla-bar-fill sla--${s}`}let l=document.querySelector(`.ticket-row[data-id="${e.id}"]`);l&&c<0?(l.classList.add(`row--overdue`),l.classList.remove(`row--critical`)):l&&c<18e5&&l.classList.add(`row--critical`)})}function Ae(e,n,a,s,c){let l=o(e,a),u=r(e,a),d=i(e,a),f=[`resolved`,`closed`].includes(e.status),p=s.find(t=>t.id===e.assignee),m=(t()[e.priority]?.hours??24)*3600*1e3,h=f?m:e.slaDeadline-e.createdAt-Math.max(u,0),ee=f?100:Math.min(100,Math.max(0,h/m*100)),g=[`ticket-row`,d?`row--overdue`:``,!d&&u<18e5&&!f?`row--critical`:``,f?`row--resolved`:``].filter(Boolean).join(` `),_=n===0&&!f?`rank-cell rank--top`:d?`rank-cell rank--overdue`:`rank-cell`,v=p?`<div class="assignee-chip">
         <div class="agent-avatar" style="background:${p.color}20; color:${p.color};">${p.avatar}</div>
         <span class="agent-name">${B(p.name.split(` `)[0])}</span>
       </div>`:`<span class="unassigned-chip">○ Unassigned</span>`,y=f?`<div class="actions-cell">
         <button class="action-btn action--view" data-id="${e.id}" title="View">👁</button>
       </div>`:`<div class="actions-cell">
         <button class="action-btn action--view" data-id="${e.id}" title="View details">👁</button>
         <button class="action-btn action--assign" data-id="${e.id}" title="Assign">👤</button>
         <button class="action-btn action--resolve" data-id="${e.id}" title="Mark resolved">✓</button>
       </div>`;return`
    <tr class="${g}" data-id="${e.id}" tabindex="0" aria-label="Ticket ${e.id}: ${B(e.subject)}">
      <td><div class="${_}">${n+1}</div></td>
      <td><span class="ticket-id">${e.id}</span></td>
      <td>
        <div class="ticket-subject-wrap">
          <span class="ticket-subject">${B(e.subject)}</span>
          <span class="ticket-company">${B(e.company)}</span>
        </div>
      </td>
      <td>
        <div class="customer-cell">
          <span class="customer-name">${B(e.customer)}</span>
          <span class="customer-company">${B(e.email)}</span>
        </div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
          <span class="priority-badge priority--${e.priority}">${je(e.priority)}</span>
          ${e.isEscalated?`<span class="badge-escalated" title="Priority auto-escalated (+${e.escalationCount||1} level) due to SLA breach">⚡ Escalated</span>`:``}
        </div>
      </td>
      <td><span class="status-badge status--${e.status}">${F(e.status)}</span></td>
      <td>${v}</td>
      <td>
        <div class="sla-cell">
          <span class="sla-timer sla--${l}" id="sla-timer-${e.id}">
            ${f?`Resolved`:N(u)}
          </span>
          <div class="sla-bar-track">
            <div class="sla-bar-fill sla--${l}" id="sla-bar-${e.id}" style="width:${ee}%"></div>
          </div>
        </div>
      </td>
      <td>${y}</td>
    </tr>
  `}function B(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function je(e){return e.charAt(0).toUpperCase()+e.slice(1)}var V=1,H=15;function Me(){return V}function U(e){V=e}function Ne(e){let t=(V-1)*H,n=t+H;return e.slice(t,n)}function Pe(e){return Math.max(1,Math.ceil(e/H))}function Fe(e,{total:t,onChange:n}){let r=Pe(t),i=Math.min(V,r);i!==V&&(V=i);let a=(V-1)*H+1,o=Math.min(V*H,t),s=Ie(V,r);e.innerHTML=`
    <div class="pagination">
      <div class="pagination-info">
        ${t===0?`No tickets`:`Showing <strong>${a}–${o}</strong> of <strong>${t}</strong>`}
      </div>
      <div class="pagination-controls">
        <button class="page-btn" id="page-prev" aria-label="Previous page" ${V<=1?`disabled`:``}>‹</button>
        ${s}
        <button class="page-btn" id="page-next" aria-label="Next page" ${V>=r?`disabled`:``}>›</button>
        <select class="per-page-select" id="per-page-select" title="Rows per page">
          ${[10,15,25,50].map(e=>`<option value="${e}" ${H===e?`selected`:``}>${e} / page</option>`).join(``)}
        </select>
      </div>
    </div>
  `,document.getElementById(`page-prev`)?.addEventListener(`click`,()=>{V>1&&(V--,n())}),document.getElementById(`page-next`)?.addEventListener(`click`,()=>{V<r&&(V++,n())}),e.querySelectorAll(`.page-btn[data-page]`).forEach(e=>{e.addEventListener(`click`,()=>{V=parseInt(e.dataset.page),n()})}),document.getElementById(`per-page-select`)?.addEventListener(`change`,e=>{H=parseInt(e.target.value),V=1,n()})}function Ie(e,t){if(t<=7)return Le(1,t+1).map(t=>W(t,e)).join(``);let n=[];n.push(W(1,e)),e>4&&n.push(`<span class="page-dots">…</span>`);let r=Math.max(2,e-2),i=Math.min(t-1,e+2);for(let t=r;t<=i;t++)n.push(W(t,e));return e<t-3&&n.push(`<span class="page-dots">…</span>`),n.push(W(t,e)),n.join(``)}function W(e,t){return`<button class="page-btn ${e===t?`active`:``}" data-page="${e}">${e}</button>`}function Le(e,t){return Array.from({length:t-e},(t,n)=>e+n)}var G=null;function Re(){G=document.createElement(`div`),G.className=`toast-container`,G.id=`toast-container`,document.body.appendChild(G)}function K(e,t=`info`,n=3500){G||Re();let r={success:`✅`,error:`❌`,info:`ℹ️`},i=document.createElement(`div`);i.className=`toast toast--${t}`,i.innerHTML=`
    <span class="toast-icon">${r[t]??`ℹ️`}</span>
    <span class="toast-msg">${ze(e)}</span>
  `,G.appendChild(i),setTimeout(()=>{i.style.animation=`toastOut 0.25s ease forwards`,setTimeout(()=>i.remove(),250)},n)}function ze(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var q=null;function Be(e){e.innerHTML=`
    <div class="drawer-overlay hidden" id="drawer-overlay"></div>
    <div class="drawer-panel hidden" id="drawer-panel" role="complementary" aria-label="Ticket details">
    </div>
  `,document.getElementById(`drawer-overlay`)?.addEventListener(`click`,Y),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Y()})}function J(e){q=e.id,document.getElementById(`drawer-overlay`)?.classList.remove(`hidden`),document.getElementById(`drawer-panel`)?.classList.remove(`hidden`),He(e)}function Y(){q=null,document.getElementById(`drawer-overlay`)?.classList.add(`hidden`),document.getElementById(`drawer-panel`)?.classList.add(`hidden`)}function Ve(e){if(!q||q!==e.id)return;let n=A(),i=r(e,n),a=o(e,n),s=document.getElementById(`drawer-sla-timer`),c=document.getElementById(`drawer-sla-bar`);if(s&&(s.textContent=N(i),s.className=`sla-panel-timer sla--${a}`),c){let n=(t()[e.priority]?.hours??24)*3600*1e3,r=e.slaDeadline-e.createdAt-Math.max(i,0),o=Math.min(100,Math.max(0,r/n*100));c.style.width=`${o}%`,c.className=`sla-panel-bar-fill sla--${a}`}}function He(e){let n=A(),i=r(e,n),a=o(e,n),s=S();s.find(t=>t.id===e.assignee);let c=[`resolved`,`closed`].includes(e.status),l=(t()[e.priority]?.hours??24)*3600*1e3,u=c?l:e.slaDeadline-e.createdAt-Math.max(i,0),d=c?100:Math.min(100,Math.max(0,u/l*100)),f=[`open`,`in_progress`,`waiting`,`resolved`,`closed`],p=document.getElementById(`drawer-panel`);p.innerHTML=`
    <div class="drawer-header">
      <div class="drawer-header-left">
        <span class="drawer-ticket-id">${e.id}</span>
        <h3 class="drawer-subject">${X(e.subject)}</h3>
        <div class="drawer-badges">
          <span class="priority-badge priority--${e.priority}">${Ue(e.priority)}</span>
          ${e.isEscalated?`<span class="badge-escalated" title="Priority auto-escalated (+${e.escalationCount||1} level) due to SLA breach">⚡ Auto-Escalated</span>`:``}
          <span class="status-badge status--${e.status}">${F(e.status)}</span>
        </div>
      </div>
      <button class="drawer-close" id="drawer-close-btn" aria-label="Close details">✕</button>
    </div>

    <div class="drawer-body">

      <!-- SLA Panel -->
      <div class="sla-panel">
        <div class="drawer-section-title">SLA Status</div>
        <div class="sla-panel-timer sla--${a}" id="drawer-sla-timer">
          ${c?`✅ Resolved`:N(i)}
        </div>
        <div class="sla-panel-bar-track">
          <div class="sla-panel-bar-fill sla--${a}" id="drawer-sla-bar" style="width:${d}%"></div>
        </div>
        <div class="sla-panel-meta">
          <span>Opened: ${xe(e.createdAt)}</span>
          <span>Deadline: ${P(e.slaDeadline)}</span>
        </div>
      </div>

      <!-- Customer Info -->
      <div>
        <div class="drawer-section-title">Customer</div>
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <div class="drawer-info-label">Name</div>
            <div class="drawer-info-value">${X(e.customer)}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Company</div>
            <div class="drawer-info-value">${X(e.company||`—`)}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Email</div>
            <div class="drawer-info-value">${X(e.email||`—`)}</div>
          </div>
          <div class="drawer-info-item">
            <div class="drawer-info-label">Opened</div>
            <div class="drawer-info-value">${P(e.createdAt)}</div>
          </div>
        </div>
      </div>

      <!-- Assignment -->
      <div>
        <div class="drawer-section-title">Assignee</div>
        <div class="assign-row">
          <select class="form-select" id="drawer-assign-select" style="max-width:200px;">
            <option value="">Unassigned</option>
            ${s.map(t=>`<option value="${t.id}" ${e.assignee===t.id?`selected`:``}>${t.name}</option>`).join(``)}
          </select>
          <button class="btn btn--ghost btn--sm" id="drawer-assign-btn">Save</button>
        </div>
      </div>

      <!-- Status Transition -->
      ${c?``:`
      <div>
        <div class="drawer-section-title">Change Status</div>
        <div class="status-actions">
          ${f.filter(t=>t!==e.status).map(e=>`
            <button class="btn btn--ghost btn--sm drawer-status-btn" data-status="${e}">
              → ${F(e)}
            </button>
          `).join(``)}
        </div>
      </div>
      `}

      <!-- Notes -->
      <div>
        <div class="drawer-section-title">Notes</div>
        <textarea class="notes-area" id="drawer-notes" placeholder="Add notes, workarounds, or updates…">${X(e.note??``)}</textarea>
        <div style="margin-top:8px;">
          <button class="btn btn--ghost btn--sm" id="drawer-save-note-btn">Save Note</button>
        </div>
      </div>

      <!-- History -->
      ${e.history?.length?`
      <div>
        <div class="drawer-section-title">History</div>
        <div class="history-list">
          ${(e.history??[]).map(e=>`
            <div class="history-item">
              <span class="history-dot"></span>
              <span>${X(e.msg)} — <em>${P(e.at)}</em></span>
            </div>
          `).join(``)}
        </div>
      </div>
      `:``}

    </div>
  `,document.getElementById(`drawer-close-btn`)?.addEventListener(`click`,Y),document.getElementById(`drawer-assign-btn`)?.addEventListener(`click`,()=>{let t=document.getElementById(`drawer-assign-select`)?.value||null;w(e.id,t),K(`Assigned to ${s.find(e=>e.id===t)?.name??`Unassigned`}`,`success`)}),document.querySelectorAll(`.drawer-status-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.status;C(e.id,{status:n}),K(`Status updated to ${F(n)}`,`success`),Y()})}),document.getElementById(`drawer-save-note-btn`)?.addEventListener(`click`,()=>{let t=document.getElementById(`drawer-notes`)?.value??``;C(e.id,{note:t}),K(`Note saved`,`success`)})}function X(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Ue(e){return e.charAt(0).toUpperCase()+e.slice(1)}function We(e){e.innerHTML=`
    <div class="modal-overlay hidden" id="create-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-title">Create New Ticket</h2>
          <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
        </div>
        <div class="modal-body" id="modal-body">
          <div class="form-group">
            <label class="form-label" for="f-customer">Customer Name <span class="required">*</span></label>
            <input id="f-customer" class="form-input" type="text" placeholder="e.g. Marcus Vance" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="f-email">Email</label>
              <input id="f-email" class="form-input" type="email" placeholder="customer@company.com" />
            </div>
            <div class="form-group">
              <label class="form-label" for="f-company">Company</label>
              <input id="f-company" class="form-input" type="text" placeholder="Acme Corp" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="f-subject">Issue / Subject <span class="required">*</span></label>
            <textarea id="f-subject" class="form-textarea" placeholder="Describe the issue clearly…" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="f-priority">Priority <span class="required">*</span></label>
              <select id="f-priority" class="form-select">
                <option value="urgent">🔴 Urgent (2h SLA)</option>
                <option value="high">🟠 High (4h SLA)</option>
                <option value="normal" selected>🔵 Normal (24h SLA)</option>
                <option value="low">🟢 Low (48h SLA)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="f-assignee">Assign To</label>
              <select id="f-assignee" class="form-select">
                <option value="">Unassigned</option>
                ${S().map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
              </select>
            </div>
          </div>
          <div class="sla-preview" id="sla-preview-box">
            <span class="sla-preview-label">⏱ SLA Deadline:</span>
            <span class="sla-preview-value" id="sla-preview-val">Response due within 24 hours</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn--ghost" id="modal-cancel-btn">Cancel</button>
          <button class="btn btn--primary" id="modal-submit-btn">Create Ticket</button>
        </div>
      </div>
    </div>
  `;let n=document.getElementById(`create-modal`),r=document.getElementById(`f-priority`),i=document.getElementById(`sla-preview-val`);function a(){let e=t()[r.value]?.hours??24;i.textContent=`Response due within ${e<24?`${e} hour${e>1?`s`:``}`:`${e/24} day${e>24?`s`:``}`}`}r?.addEventListener(`change`,a),document.getElementById(`modal-close-btn`)?.addEventListener(`click`,Z),document.getElementById(`modal-cancel-btn`)?.addEventListener(`click`,Z),n?.addEventListener(`click`,e=>{e.target===n&&Z()}),document.getElementById(`modal-submit-btn`)?.addEventListener(`click`,()=>{let e=document.getElementById(`f-customer`)?.value.trim(),t=document.getElementById(`f-subject`)?.value.trim(),n=document.getElementById(`f-email`)?.value.trim(),r=document.getElementById(`f-company`)?.value.trim(),i=document.getElementById(`f-priority`)?.value,a=document.getElementById(`f-assignee`)?.value||null;if(!e){alert(`Customer name is required.`);return}if(!t){alert(`Subject is required.`);return}se({customer:e,email:n,company:r,subject:t,priority:i,assignee:a}),K(`Ticket created for ${e}`,`success`),Z(),Ke()})}function Ge(){let e=document.getElementById(`create-modal`);e&&(e.classList.remove(`hidden`),document.getElementById(`f-customer`)?.focus())}function Z(){document.getElementById(`create-modal`)?.classList.add(`hidden`)}function Ke(){[`f-customer`,`f-email`,`f-company`,`f-subject`].forEach(e=>{let t=document.getElementById(e);t&&(t.value=``)});let e=document.getElementById(`f-priority`);e&&(e.value=`normal`);let t=document.getElementById(`f-assignee`);t&&(t.value=``)}var qe=document.getElementById(`app-header`),Je=document.getElementById(`stats-banner`),Ye=document.getElementById(`sim-bar`),Xe=document.getElementById(`pick-next`),Ze=document.getElementById(`filter-bar`),Qe=document.getElementById(`filter-summary`);document.getElementById(`queue-wrap`);var $e=document.getElementById(`queue-content`),et=document.getElementById(`pagination`),tt=document.getElementById(`drawer-mount`),nt=document.getElementById(`modal-mount`),rt=[],it=``;ne(),Re(),Be(tt),We(nt),ot(),st(),Q(),te(()=>{Q()}),he(e=>{let t=ie();be(t),Ce(t),ke(rt),t.forEach(e=>Ve(e));let n=document.getElementById(`sim-offset-display`);n&&(n.textContent=ve());let r=document.getElementById(`live-clock`);r&&(r.textContent=new Date(e).toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!0}));let a=t.filter(t=>![`resolved`,`closed`].includes(t.status)&&i(t,e)).map(e=>e.id).sort().join(`,`);if(a!==it){it=a;let t=ce(e);if(t.length>0){let e=t.map(e=>`${e.id} (${e.from.toUpperCase()} ➔ ${e.to.toUpperCase()})`).slice(0,2).join(`, `);K(`⚡ Automated Escalation: ${t.length} breached ticket(s) raised +1 priority: ${e}`,`warning`)}Q()}});function Q(){let e=ie(),t=x(),n=Te(),r=de(e,A()),i=De(r,n,t);rt=i;let a=Me(),o=Pe(i.length);a>o&&U(Math.max(1,o));let s=Ne(i);ye(e,Je),Se(e,Xe,{onPick:e=>ct(e),onView:e=>J(e)}),Ee(Ze,{onChange:()=>{U(1),Q()},activeAgentId:t,allTickets:e}),at(i.length,r.length,n),Oe(s,$e,{onView:e=>J(e),onAssign:e=>lt(e),onResolve:e=>ut(e),onStatusChange:(e,t)=>C(e.id,{status:t})}),Fe(et,{total:i.length,onChange:()=>Q()})}function at(e,t,n){let r=[n.tab===`all`?null:`Tab: ${n.tab}`,n.priority===`all`?null:`Priority: ${n.priority}`,n.status===`active`?null:`Status: ${n.status}`,n.search?`Search: "${n.search}"`:null].filter(Boolean);Qe.innerHTML=`
    <div class="filter-summary">
      <span class="filter-count">${e} ticket${e===1?``:`s`}</span>
      ${r.length?`<span style="color:var(--text-muted);font-size:11px;">${r.join(` · `)}</span>`:``}
      ${r.length?`<button class="btn btn--ghost btn--sm" id="clear-filters-btn" style="font-size:11px;padding:2px 8px;">Clear filters</button>`:``}
    </div>
  `,document.getElementById(`clear-filters-btn`)?.addEventListener(`click`,()=>{let e=Te();Object.assign(e,{search:``,tab:`all`,priority:`all`,status:`active`});let t=document.getElementById(`search-input`);t&&(t.value=``),U(1),Q()})}function ot(){qe.innerHTML=`
    <header class="app-header">
      <div class="header-brand">
        <div class="brand-logo">🎫</div>
        <div>
          <div class="brand-title">HelpQueue Pro</div>
          <div class="brand-subtitle">Smart SLA-Driven IT Helpdesk</div>
        </div>
      </div>
      <div class="header-right">
        <div class="live-clock">
          <span style="color:var(--text-muted);font-size:11px;">TIME </span>
          <span class="clock-time" id="live-clock">—</span>
        </div>
        <div class="agent-switcher" id="agent-switcher">
          ${S().map(e=>`
            <button
              class="agent-switcher-btn ${x()===e.id?`active`:``}"
              data-agent="${e.id}"
              id="agent-btn-${e.id}"
              aria-label="Switch to ${e.name}"
            >
              <div class="agent-avatar" style="background:${e.color}22;color:${e.color};width:22px;height:22px;font-size:9px;">${e.avatar}</div>
              ${e.name.split(` `)[0]}
            </button>
          `).join(``)}
        </div>
        <button class="btn btn--primary" id="new-ticket-btn" aria-label="Create new ticket">
          + New Ticket
        </button>
      </div>
    </header>
  `,document.getElementById(`new-ticket-btn`)?.addEventListener(`click`,Ge),document.querySelectorAll(`[data-agent]`).forEach(e=>{e.addEventListener(`click`,()=>{oe(e.dataset.agent),ot()})})}function st(){Ye.innerHTML=`
    <div class="sim-bar" title="Time-warp simulator: advance clock to see SLA breaches live">
      <span class="sim-bar-label">⚗️ SLA Simulator</span>
      <span class="sim-offset" id="sim-offset-display">${ve()}</span>
      <button class="sim-btn" id="sim-plus-30" title="Advance time by 30 minutes">+30m</button>
      <button class="sim-btn" id="sim-plus-1h" title="Advance time by 1 hour">+1h</button>
      <button class="sim-btn" id="sim-plus-2h" title="Advance time by 2 hours">+2h</button>
      <button class="sim-btn" id="sim-plus-4h" title="Advance time by 4 hours">+4h</button>
      <button class="sim-btn sim-btn--escalate" id="sim-run-escalation" title="Automated check: Escalates any ticket that breached its agreed response time by +1 level (at most 1 level per run)">⚡ Auto-Escalate Breached</button>
      <button class="sim-btn sim-btn--reset" id="sim-reset" title="Reset to real time">↩ Reset</button>
      <span style="color:var(--text-muted);font-size:11px;margin-left:4px;">Watch tickets breach SLA and auto-escalate!</span>
    </div>
  `,document.getElementById(`sim-plus-30`)?.addEventListener(`click`,()=>{j(18e5),$(!1)}),document.getElementById(`sim-plus-1h`)?.addEventListener(`click`,()=>{j(36e5),$(!1)}),document.getElementById(`sim-plus-2h`)?.addEventListener(`click`,()=>{j(72e5),$(!1)}),document.getElementById(`sim-plus-4h`)?.addEventListener(`click`,()=>{j(144e5),$(!1)}),document.getElementById(`sim-run-escalation`)?.addEventListener(`click`,()=>{$(!0)}),document.getElementById(`sim-reset`)?.addEventListener(`click`,()=>{me(),Q()})}function $(e=!1){let t=ce(A());if(t.length>0){let e=t.map(e=>`${e.id} (${e.from.toUpperCase()} ➔ ${e.to.toUpperCase()})`).slice(0,3).join(`, `),n=t.length>3?` +${t.length-3} more`:``;K(`⚡ Auto-Escalated ${t.length} breached ticket(s) (+1 level): ${e}${n}`,`warning`)}else e&&K(`All breached tickets are already at maximum priority (Urgent) or on track.`,`info`);Q()}function ct(e){let t=x();ae(t),e.assignee!==t&&w(e.id,t),e.status===`open`&&C(e.id,{status:`in_progress`}),K(`Picked up ${e.id} — now in progress`,`success`),J({...e,assignee:t,status:`in_progress`})}function lt(e){let t=x(),n=ae(t);w(e.id,t),K(`Assigned ${e.id} to ${n?.name??`you`}`,`success`)}function ut(e){confirm(`Mark "${e.subject.slice(0,50)}…" as resolved?`)&&(C(e.id,{status:`resolved`}),K(`${e.id} resolved ✅`,`success`))}