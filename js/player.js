const $=s=>document.querySelector(s),st=load();
let cur=LESSONS.some(l=>l.id===st.cur)?st.cur:1;
const cv=$("#cv"),vid=$("#vid");wave(cv);
function note(k){try{return localStorage.getItem("sof-note-"+k)||""}catch(e){return""}}
function render(){
  const l=LESSONS[cur-1],isDone=st.done.includes(cur);
  $("#lt").textContent=`${l.id}. ${l.t}`;$("#ld").textContent=l.s;
  $("#ph").textContent=l.src?"":`Video placeholder, lesson ${l.id}, ${l.d}`;
  vid.hidden=cv.hidden=true;$("#play").hidden=false;
  if(l.src){vid.src=l.src;vid.hidden=false;$("#play").hidden=true}else{cv.hidden=false;cv._on=false;$("#play").textContent="▶"}
  $("#note").value=note(cur);
  $("#done").textContent=isDone?"Completed":"Mark as complete";
  $("#next").hidden=cur===LESSONS.length;
  $("#list").innerHTML=LESSONS.map(x=>`<button class="les ${x.id===cur?"cur":""} ${st.done.includes(x.id)?"done":""}" data-id="${x.id}"><span class="ck">${st.done.includes(x.id)?"✓":""}</span><span>${x.id}. ${x.t}</span><span class="mono">${x.d}</span></button>`).join("");
  const n=st.done.length;$("#pt").textContent=`${n} of ${LESSONS.length} complete`;$("#pf").style.width=n/LESSONS.length*100+"%";
  st.cur=cur;save(st);
}
$("#list").onclick=e=>{const b=e.target.closest(".les");if(b){cur=+b.dataset.id;render()}};
$("#play").onclick=()=>{cv._on=!cv._on;$("#play").textContent=cv._on?"❚❚":"▶"};
$("#done").onclick=()=>{const i=st.done.indexOf(cur);i<0?st.done.push(cur):st.done.splice(i,1);render()};
$("#next").onclick=()=>{cur=Math.min(cur+1,LESSONS.length);render()};
$("#note").oninput=e=>{try{localStorage.setItem("sof-note-"+cur,e.target.value)}catch(_){}};
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x.id==="t-"+b.dataset.t));
});
render();
