const fechaInput = document.getElementById('fecha');
const tablaBody  = document.querySelector('#tabla tbody');
const statsDiv   = document.getElementById('stats');
const btnExport  = document.getElementById('btnExport');

// Selecciona hoy por defecto

// Obtiene la fecha de hoy que devuelve el servidor (opcional, solo al cargar)
fetch('/api/attendance?date=today').then(r=>r.json()).then(()=>{
     fechaInput.valueAsNumber = Date.now() - (new Date()).getTimezoneOffset()*60000;
     loadEverything();
});

fechaInput.addEventListener('change', loadEverything);
btnExport.addEventListener('click', () => {
  const fecha = fechaInput.value;
  window.location = `/api/attendance/export?date=${fecha}`;
});

async function loadEverything(){
  const fecha = fechaInput.value;
  renderTable(await fetchJSON(`/api/attendance?date=${fecha}`));
  renderStats(await fetchJSON(`/api/attendance/stats?date=${fecha}`));
}

function renderTable(rows){
  tablaBody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.studentId}</td>
      <td>${r.present ? '✅' : '❌'}</td>
    </tr>`).join('');
}

function renderStats({total,present,absent,percent}){
  statsDiv.innerHTML = `
    ${box('Total de Alumnos', total)}
    ${box('Presentes',        present)}
    ${box('Ausentes',         absent)}
    ${box('Porcentaje',       percent+'%')}
  `;
}
const box = (lbl,val)=> `<div><h3 class="text-primary">${val}</h3><small>${lbl}</small></div>`;

async function fetchJSON(url){
  const r = await fetch(url); 
  return r.json();
}
