const locations = [
  {place:'United States',country:'USA',lat:39.8283,lng:-98.5795,projects:[['Infuse','https://infuse.com/'],['System X','https://systemx.com/'],['New Bible','https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android']]},
  {place:'Malta',country:'Malta',lat:35.8997,lng:14.5147,projects:[['EvenBet Gaming','https://evenbeter.com/']]},
  {place:'Cyprus',country:'Cyprus',lat:35.1264,lng:33.4299,projects:[['PIN-UP Global Learning Platform','https://pin-up.global/2025/08/25/pin-up-global-transforms-into-the-redcore-business-group/']]},
  {place:'Vladivostok',country:'Russia',lat:43.1155,lng:131.8855,projects:[['Ot-Oil','https://atollis.com/en/ruabout-company/']]},
  {place:'Czech Republic',country:'Czech Republic',lat:49.8175,lng:15.473,projects:[['NOSEDAT','https://www.nosedat.com/technologie/'],['ManualsLib','https://www.manualslib.com/'],['PicTrick + Photo Ideas','https://play.google.com/store/apps/details?id=org.chlabs.pictrick&hl=ru&gl=US']]},
  {place:'Zürich',country:'Switzerland',lat:47.3769,lng:8.5417,projects:[['3D Systems','https://www.3dsystems.com/']]},
  {place:'France',country:'France',lat:46.2276,lng:2.2137,projects:[['Laboratoires Réunis','https://drivein.labo.lu/']]},
  {place:'Israel',country:'Israel',lat:31.0461,lng:34.8516,projects:[['High-Q','https://www.high-q.co.il/']]},
  {place:'Torino',country:'Italy',lat:45.0703,lng:7.6869,projects:[['KnowledgeShare','https://www.knowledge-share.eu/en']]},
  {place:'United Arab Emirates',country:'UAE',lat:23.4241,lng:53.8478,projects:[['MedIX','https://medixeq.net/']]},
  {place:'Canada',country:'Canada',lat:56.1304,lng:-106.3468,projects:[['Coinchange','https://www.coinchange.io/']]},
  {place:'Worms',country:'Germany',lat:49.6341,lng:8.3507,projects:[['FinanzGeek / weclapp','https://www.weclapp.com/en/']]},
  {place:'Washington, D.C.',country:'USA',lat:38.9072,lng:-77.0369,projects:[['CIBT Visas','https://cibtvisas.com/']]},
  {place:'Moscow',country:'Russia',lat:55.7558,lng:37.6173,projects:[['SODIS','https://www.sodis.ru/']]},
  {place:'Florida',country:'USA',lat:27.6648,lng:-81.5158,projects:[['Skyly','https://skylyapp.com/']]}
];
const markerLayer=document.getElementById('map-markers');

// The SVG's viewport is wider than its geographic viewBox, so the rendered
// map has equal internal margins on the left and right. Account for those
// margins before converting longitude to a percentage position.
const mapViewBoxRatio=2752.766/1537.631;
const mapImageRatio=939.74725/476.7276;
const geographicWidth=(mapViewBoxRatio/mapImageRatio)*100;
const longitudeOffset=(100-geographicWidth)/2;

locations.forEach(item=>{
  const point=document.createElement('div');
  point.className='map-point';
  point.style.left=`${longitudeOffset+((item.lng+180)/360)*geographicWidth}%`;
  point.style.top=`${((90-item.lat)/180)*100}%`;
  const marker=document.createElement('button');
  marker.className='map-marker';
  marker.setAttribute('aria-label',`${item.place}: ${item.projects.map(project=>project[0]).join(', ')}`);
  marker.setAttribute('aria-pressed','false');
  marker.setAttribute('aria-describedby',`hint-${locations.indexOf(item)}`);
  marker.innerHTML='<span></span>';
  marker.addEventListener('click',()=>{
    const willOpen=!point.classList.contains('is-open');
    document.querySelectorAll('.map-point').forEach(node=>node.classList.remove('is-open'));
    document.querySelectorAll('.map-marker').forEach(node=>node.setAttribute('aria-pressed','false'));
    point.classList.toggle('is-open',willOpen);
    marker.setAttribute('aria-pressed',String(willOpen));
  });
  const hint=document.createElement('div');
  hint.className='map-hint';
  hint.id=`hint-${locations.indexOf(item)}`;
  hint.setAttribute('role','tooltip');
  hint.innerHTML=`<strong>${item.place}, ${item.country}</strong>${item.projects.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('')}`;
  point.append(marker,hint);
  markerLayer.appendChild(point);
});

document.addEventListener('click',event=>{
  if(event.target.closest('.map-point')) return;
  document.querySelectorAll('.map-point').forEach(node=>node.classList.remove('is-open'));
  document.querySelectorAll('.map-marker').forEach(node=>node.setAttribute('aria-pressed','false'));
});

