const NOMBRES={
  "999":"El Progreso (Departamento)","201":"Guastatoya","202":"Morazán","203":"San Agustín Acasaguastlán",
  "204":"San Cristóbal Acasaguastlán","205":"El Jícaro","206":"Sansare","207":"Sanarate","208":"San Antonio La Paz"
};
const API_BASE="https://censopoblacion.azurewebsites.net/API/indicadores/2/";

(function(){
  const params=new URLSearchParams(location.search);
  const cod=params.get("cod");
  const sel=document.getElementById("municipio");
  if(cod&&NOMBRES[cod]) sel.value=cod;
  cargar(sel.value);
})();

document.getElementById("btnCargar").addEventListener("click",()=>{
  const cod=document.getElementById("municipio").value;
  setCodInURL(cod);
  cargar(cod);
});

function setCodInURL(cod){
  const url=new URL(location.href);
  url.searchParams.set("cod",cod);
  history.replaceState({}, "", url);
}

async function cargar(codigo){
  const info=document.getElementById("info");
  const grid=document.getElementById("grid");
  info.innerHTML=`<div class="d-flex align-items-baseline gap-2 justify-content-center">
    <h2 class="h5 mb-0">${NOMBRES[codigo]??("Código "+codigo)}</h2>
    <span class="muted">Cargando…</span></div>`;
  grid.innerHTML="";

  try{
    const res=await fetch(API_BASE+codigo);
    if(!res.ok) throw new Error("HTTP "+res.status);
    let data=await res.json();
    if(typeof data==="string"){ try{ data=JSON.parse(data);}catch{} }

    info.innerHTML=`<div class="d-flex align-items-baseline gap-2 justify-content-center">
      <h2 class="h5 mb-0">${NOMBRES[codigo]??("Código "+codigo)}</h2>
      <span class="muted">Datos del Censo 2018</span></div>`;

    renderData(data,grid);
  }catch(err){
    info.innerHTML=`<h2 class="h5 mb-1">${NOMBRES[codigo]??("Código "+codigo)}</h2>
      <div class="alert alert-danger mb-2">Error al cargar datos: ${err.message}</div>`;
  }
}

function renderData(data,container){
  if(Array.isArray(data)){ container.appendChild(colWrap("Listado",tablaDeObjetos(data))); return; }
  if(data&&typeof data==="object"){
    Object.entries(data).forEach(([k,v])=>{
      container.appendChild(colWrap(formateaTitulo(k),renderValor(v)));
    });
    return;
  }
  container.appendChild(colWrap("Dato",p(String(data))));
}

function renderValor(v){
  if(v==null) return p("—");
  if(typeof v==="string"||typeof v==="number") return p(String(v));
  if(Array.isArray(v)){
    if(v.length&&typeof v[0]==="object") return tablaDeObjetos(v);
    const ul=document.createElement("ul"); ul.className="mb-0";
    v.forEach(item=>{
      const li=document.createElement("li");
      li.textContent=typeof item==="object"?JSON.stringify(item):String(item);
      ul.appendChild(li);
    });
    return ul;
  }
  if(typeof v==="object"){
    const div=document.createElement("div");
    Object.entries(v).forEach(([k2,v2])=>{
      const row=document.createElement("p");
      row.className="mb-1";
      row.innerHTML=`<strong>${formateaTitulo(k2)}:</strong> ${typeof v2==="object"?JSON.stringify(v2):String(v2)}`;
      div.appendChild(row);
    });
    return div;
  }
  return p(String(v));
}

function tablaDeObjetos(arr){
  const wrap=document.createElement("div");
  wrap.className="table-responsive";
  const table=document.createElement("table");
  table.className="table table-sm table-striped align-middle mb-0";
  if(!arr.length){ table.innerHTML="<tr><td>Sin datos</td></tr>"; wrap.appendChild(table); return wrap; }
  const cols=Array.from(new Set(arr.flatMap(o=>o&&typeof o==="object"?Object.keys(o):[])));
  const thead=document.createElement("thead");
  const trh=document.createElement("tr");
  cols.forEach(c=>{ const th=document.createElement("th"); th.textContent=formateaTitulo(c); trh.appendChild(th); });
  thead.appendChild(trh);
  const tbody=document.createElement("tbody");
  arr.forEach(o=>{
    const tr=document.createElement("tr");
    cols.forEach(c=>{
      const td=document.createElement("td");
      const val=o?.[c];
      td.textContent=typeof val==="object"?JSON.stringify(val):(val??"");
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody); wrap.appendChild(table);
  return wrap;
}

function colWrap(titulo,contenido){
  const col=document.createElement("div");
  col.className="col-12 col-md-6 col-lg-4";
  const c=document.createElement("div");
  c.className="card h-100";
  const body=document.createElement("div");
  body.className="card-body text-start";
  const h=document.createElement("h3");
  h.className="h6 card-title";
  h.textContent=titulo;
  body.appendChild(h);
  body.appendChild(contenido);
  c.appendChild(body);
  col.appendChild(c);
  return col;
}

function p(txt){ const el=document.createElement("p"); el.className="mb-0"; el.textContent=txt; return el; }
function formateaTitulo(t){ return String(t).replace(/[_\-]/g," ").replace(/\b\w/g,m=>m.toUpperCase()); }
