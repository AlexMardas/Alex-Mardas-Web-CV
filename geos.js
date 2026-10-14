const countries = [
  {place:'United States',country:'USA',x:25.1,y:27.8,projects:[
    ['NewVue','https://www.newvue.ai/radiologist-cockpit'],
    ['CoheroHealth','https://www.contractpharma.com/breaking-news/aptargroup-acquires-assets-of-cohero-health/'],
    ['Alt-Bionics','https://www.altbionics.com/'],
    ['BreatheSmart Inhaler','https://aptar.com/en-us/products/pharmaceutical-herotracker-sense-a-smart-healthcare-solution-for-digital-respiratory-medicine'],
    ['LISTEN for Everyone','https://compassionai.com/'],['Phenom'],['Heavys'],['Counterpunch'],
    ['Blueprint Leads','https://www.blueprintleads.com/'],['Morning Star','https://www.morningstarco.com/']
  ]},
  {place:'France',country:'France',x:49,y:25.2,projects:[
    ['CoheroHealth','https://www.contractpharma.com/breaking-news/aptargroup-acquires-assets-of-cohero-health/'],
    ['AdhereIT','https://aptar.com/en-us/products/pharmaceutical-adhereit']
  ]},
  {place:'United Kingdom',country:'UK',x:47.6,y:21.8,projects:[
    ['IAG Dynamika','https://www.ia-grp.com/dynamika/'],
    ['DUSKER Sleepbar','https://www.amazon.co.uk/Dusker-Sleepbar-v2-0-Smart-App-Mist-Grey/dp/B0CQKG36PY']
  ]},
  {place:'Switzerland',country:'Switzerland',x:49.2,y:26.2,projects:[['UBS Bank']]},
  {place:'Belarus',country:'Belarus',x:54.1,y:22.4,projects:[['Logistory'],['AutoGIS']]},
  {place:'Poland',country:'Poland',x:51.5,y:23.2,projects:[
    ['Ellipta FindAir ONE','https://findair.pl/findair-one-add-ons-pl/findair-one-ellipta-pl.html']
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
  hint.innerHTML=`<strong>${item.country}</strong><small>${projectCount} ${projectCount===1?'project':'projects'}</small>${item.projects.map(([name,url])=>url?`<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`:`<span class="map-project">${name}</span>`).join('')}`;

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
