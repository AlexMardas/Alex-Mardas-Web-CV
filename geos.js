const countries = [
  {place:'United States',country:'USA',x:25.1,y:27.8,projects:[
    ['Infuse','https://infuse.com/'],['System X','https://systemx.com/'],
    ['New Bible — Google Play','https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android'],
    ['CIBT Visas','https://cibtvisas.com/'],['Skyly','https://skylyapp.com/']
  ]},
  {place:'Canada',country:'Canada',x:22,y:17.75,projects:[['Coinchange','https://www.coinchange.io/']]},
  {place:'Malta',country:'Malta',x:50.14,y:31.34,projects:[['EvenBet Gaming','https://evenbeter.com/']]},
  {place:'Cyprus',country:'Cyprus',x:54.89,y:31.69,projects:[['PIN-UP Global Learning Platform','https://pin-up.global/2025/08/25/pin-up-global-transforms-into-the-redcore-business-group/']]},
  {place:'Russia',country:'Russia',x:72.93,y:18.31,projects:[['Ot-Oil','https://atollis.com/en/ruabout-company/'],['SODIS','https://www.sodis.ru/']]},
  {place:'France',country:'France',x:49,y:25.2,projects:[['Laboratoires Réunis','https://drivein.labo.lu/']]},
  {place:'Bern',country:'Switzerland',x:48.54,y:25.7,projects:[['3D Systems','https://www.3dsystems.com/']]},
  {place:'Rome',country:'Italy',x:49.64,y:28.24,projects:[['KnowledgeShare','https://www.knowledge-share.eu/en']]},
  {place:'Berlin',country:'Germany',x:49.11,y:23.59,projects:[['FinanzGeek / weclapp','https://www.weclapp.com/en/']]},
  {place:'Jerusalem',country:'Israel',x:55.29,y:33.45,projects:[['High-Q','https://www.high-q.co.il/']]},
  {place:'Al Ain',country:'UAE',x:60.11,y:37.04,projects:[['MedIX','https://medixeq.net/']]},
  {place:'Prague',country:'Czech Republic',x:50.39,y:24.23,projects:[
    ['NOSEDAT','https://www.nosedat.com/technologie/'],['ManualsLib','https://www.manualslib.com/'],
    ['PicTrick + Photo Ideas — Google Play','https://play.google.com/store/apps/details?id=org.chlabs.pictrick&hl=ru&gl=US']
  ]}
];

const markerLayer=document.getElementById('map-markers');
countries.forEach((item,index)=>{
  const point=document.createElement('div');
  point.className='map-point';
  point.style.left=`${item.x}%`;
  point.style.top=`${item.y*2}%`;

  const marker=document.createElement('button');
  const projectCount=item.projects.length;
  marker.className=`map-marker${projectCount>1?' map-marker-count':''}`;
  marker.setAttribute('aria-label',`${item.country}: ${projectCount} ${projectCount===1?'project':'projects'}`);
  marker.setAttribute('aria-pressed','false');
  marker.setAttribute('aria-describedby',`hint-${index}`);
  marker.innerHTML=projectCount>1?`<span aria-hidden="true">${projectCount}</span>`:'<span aria-hidden="true"></span>';

  const hint=document.createElement('div');
  hint.className='map-hint';
  hint.id=`hint-${index}`;
  hint.setAttribute('role','tooltip');
  hint.innerHTML=`<strong>${item.country}</strong><small>${projectCount} ${projectCount===1?'project':'projects'}</small>${item.projects.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('')}`;

  marker.addEventListener('click',()=>{
    const willOpen=!point.classList.contains('is-open');
    document.querySelectorAll('.map-point').forEach(node=>node.classList.remove('is-open'));
    document.querySelectorAll('.map-marker').forEach(node=>node.setAttribute('aria-pressed','false'));
    point.classList.toggle('is-open',willOpen);
    marker.setAttribute('aria-pressed',String(willOpen));
  });

  point.append(marker,hint);
  markerLayer.appendChild(point);
});

document.addEventListener('click',event=>{
  if(event.target.closest('.map-point')) return;
  document.querySelectorAll('.map-point').forEach(node=>node.classList.remove('is-open'));
  document.querySelectorAll('.map-marker').forEach(node=>node.setAttribute('aria-pressed','false'));
});

