const locations = [
  {place:'United States',country:'USA',lat:39.8283,lng:-98.5795,projects:['Infuse','System X','New Bible']},
  {place:'Malta',country:'Malta',lat:35.8997,lng:14.5147,projects:['EvenBet Gaming']},
  {place:'Cyprus',country:'Cyprus',lat:35.1264,lng:33.4299,projects:['PIN-UP Global Learning Platform']},
  {place:'Vladivostok',country:'Russia',lat:43.1155,lng:131.8855,projects:['Ot-Oil']},
  {place:'Czech Republic',country:'Czech Republic',lat:49.8175,lng:15.473,projects:['NOSEDAT','ManualsLib','PicTrick + Photo Ideas']},
  {place:'Zürich',country:'Switzerland',lat:47.3769,lng:8.5417,projects:['3D Systems']},
  {place:'France',country:'France',lat:46.2276,lng:2.2137,projects:['Laboratoires Réunis']},
  {place:'Israel',country:'Israel',lat:31.0461,lng:34.8516,projects:['High-Q']},
  {place:'Torino',country:'Italy',lat:45.0703,lng:7.6869,projects:['KnowledgeShare']},
  {place:'United Arab Emirates',country:'UAE',lat:23.4241,lng:53.8478,projects:['MedIX']},
  {place:'Canada',country:'Canada',lat:56.1304,lng:-106.3468,projects:['Coinchange']},
  {place:'Worms',country:'Germany',lat:49.6341,lng:8.3507,projects:['FinanzGeek / weclapp']},
  {place:'Washington, D.C.',country:'USA',lat:38.9072,lng:-77.0369,projects:['CIBT Visas']},
  {place:'Moscow',country:'Russia',lat:55.7558,lng:37.6173,projects:['SODIS']},
  {place:'Florida',country:'USA',lat:27.6648,lng:-81.5158,projects:['Skyly']}
];
const markerLayer=document.getElementById('map-markers');
const detail=document.getElementById('map-detail');

// The SVG's viewport is wider than its geographic viewBox, so the rendered
// map has equal internal margins on the left and right. Account for those
// margins before converting longitude to a percentage position.
const mapViewBoxRatio=2752.766/1537.631;
const mapImageRatio=939.74725/476.7276;
const geographicWidth=(mapViewBoxRatio/mapImageRatio)*100;
const longitudeOffset=(100-geographicWidth)/2;

locations.forEach(item=>{
  const marker=document.createElement('button');
  marker.className='map-marker';
  marker.style.left=`${longitudeOffset+((item.lng+180)/360)*geographicWidth}%`;
  marker.style.top=`${((90-item.lat)/180)*100}%`;
  marker.setAttribute('aria-label',`${item.place}: ${item.projects.join(', ')}`);
  marker.setAttribute('aria-pressed','false');
  marker.innerHTML='<span></span>';
  marker.addEventListener('click',()=>{
    document.querySelectorAll('.map-marker').forEach(node=>node.setAttribute('aria-pressed','false'));
    marker.setAttribute('aria-pressed','true');
    detail.innerHTML=`<span class="detail-kicker">${item.country}</span><h2>${item.place}</h2>${item.projects.map(project=>`<div class="detail-project">${project}</div>`).join('')}`;
  });
  markerLayer.appendChild(marker);
});

