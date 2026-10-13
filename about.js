const artifactTrack=document.querySelector('.artifact-track');
const artifactPrev=document.querySelector('.artifact-prev');
const artifactNext=document.querySelector('.artifact-next');

if(artifactTrack&&artifactPrev&&artifactNext){
  const step=()=>{
    const card=artifactTrack.querySelector('.artifact-card');
    const gap=parseFloat(getComputedStyle(artifactTrack).columnGap)||0;
    return card?card.getBoundingClientRect().width+gap:artifactTrack.clientWidth;
  };
  const updateControls=()=>{
    const end=artifactTrack.scrollWidth-artifactTrack.clientWidth;
    artifactPrev.disabled=artifactTrack.scrollLeft<4;
    artifactNext.disabled=artifactTrack.scrollLeft>end-4;
  };
  artifactPrev.addEventListener('click',()=>artifactTrack.scrollBy({left:-step(),behavior:'smooth'}));
  artifactNext.addEventListener('click',()=>artifactTrack.scrollBy({left:step(),behavior:'smooth'}));
  artifactTrack.addEventListener('scroll',updateControls,{passive:true});
  window.addEventListener('resize',updateControls);
  updateControls();
}

