const countries = [
  {name:'United States',code:'US',x:25.1,y:27.8,w:13,h:11,projects:[
    ['Infuse','https://infuse.com/'],['System X','https://systemx.com/'],
    ['New Bible','https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android'],
    ['CIBT Visas','https://cibtvisas.com/'],['Skyly','https://skylyapp.com/']
  ]},
  {name:'Malta',code:'MT',x:51.9,y:35.3,w:2.5,h:4,projects:[['EvenBet Gaming','https://evenbeter.com/']]},
  {name:'Cyprus',code:'CY',x:58.4,y:31.5,w:3,h:4,projects:[['PIN-UP Global Learning Platform','https://pin-up.global/2025/08/25/pin-up-global-transforms-into-the-redcore-business-group/']]},
  {name:'Russia',code:'RU',x:69,y:17.5,w:27,h:12,projects:[['Ot-Oil','https://atollis.com/en/ruabout-company/'],['SODIS','https://www.sodis.ru/']]},
  {name:'Czech Republic',code:'CZ',x:53.9,y:22.3,w:3.5,h:4,projects:[['NOSEDAT','https://www.nosedat.com/technologie/'],['ManualsLib','https://www.manualslib.com/'],['PicTrick + Photo Ideas','https://play.google.com/store/apps/details?id=org.chlabs.pictrick&hl=ru&gl=US']]},
  {name:'Switzerland',code:'CH',x:51.6,y:25.3,w:3,h:4,projects:[['3D Systems','https://www.3dsystems.com/']]},
  {name:'France',code:'FR',x:49.9,y:25.2,w:4.5,h:6,projects:[['Laboratoires Réunis','https://drivein.labo.lu/']]},
  {name:'Israel',code:'IL',x:58.9,y:32.4,w:2.7,h:5,projects:[['High-Q','https://www.high-q.co.il/']]},
  {name:'Italy',code:'IT',x:52.1,y:28.2,w:3.5,h:7,projects:[['KnowledgeShare','https://www.knowledge-share.eu/en']]},
  {name:'United Arab Emirates',code:'AE',x:64.1,y:36.6,w:4,h:5,projects:[['MedIX','https://medixeq.net/']]},
  {name:'Canada',code:'CA',x:24,y:17.5,w:19,h:12,projects:[['Coinchange','https://www.coinchange.io/']]},
  {name:'Germany',code:'DE',x:52.2,y:22.4,w:4,h:6,projects:[['FinanzGeek / weclapp','https://www.weclapp.com/en/']]}
];

const layer=document.getElementById('country-interactions');
const hint=document.getElementById('country-hint');
let hideTimer;

function hideHint(){
  hideTimer=setTimeout(()=>{
    hint.hidden=true;
    document.querySelectorAll('.country-hit').forEach(node=>node.setAttribute('aria-expanded','false'));
  },220);
}

function showHint(country,button){
  clearTimeout(hideTimer);
  document.querySelectorAll('.country-hit').forEach(node=>node.setAttribute('aria-expanded','false'));
  button.setAttribute('aria-expanded','true');
  hint.innerHTML=`<strong>${country.name}</strong><span class="hint-count">${country.projects.length} ${country.projects.length===1?'project':'projects'}</span>${country.projects.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('')}`;
  hint.style.left=`${country.x}%`;
  hint.style.top=`${country.y}%`;
  hint.classList.toggle('hint-below',country.y<30);
  hint.hidden=false;
}

countries.forEach(country=>{
  const button=document.createElement('button');
  button.className='country-hit';
  button.style.left=`${country.x}%`;
  button.style.top=`${country.y}%`;
  button.style.width=`${country.w}%`;
  button.style.height=`${country.h}%`;
  button.setAttribute('aria-label',`${country.name}: ${country.projects.length} ${country.projects.length===1?'project':'projects'}`);
  button.setAttribute('aria-expanded','false');
  if(country.projects.length>1){
    const count=document.createElement('span');
    count.className='country-count';
    count.textContent=country.projects.length;
    count.setAttribute('aria-hidden','true');
    button.appendChild(count);
  }
  button.addEventListener('mouseenter',()=>showHint(country,button));
  button.addEventListener('mouseleave',hideHint);
  button.addEventListener('focus',()=>showHint(country,button));
  button.addEventListener('blur',hideHint);
  button.addEventListener('click',event=>{
    event.preventDefault();
    if(!hint.hidden&&button.getAttribute('aria-expanded')==='true'){
      hint.hidden=true;
      button.setAttribute('aria-expanded','false');
    }else{
      showHint(country,button);
    }
  });
  layer.appendChild(button);
});

hint.addEventListener('mouseenter',()=>clearTimeout(hideTimer));
hint.addEventListener('mouseleave',hideHint);
hint.addEventListener('focusin',()=>clearTimeout(hideTimer));
hint.addEventListener('focusout',hideHint);
document.addEventListener('click',event=>{
  if(event.target.closest('.country-hit')||event.target.closest('.country-hint')) return;
  hint.hidden=true;
  document.querySelectorAll('.country-hit').forEach(node=>node.setAttribute('aria-expanded','false'));
});

