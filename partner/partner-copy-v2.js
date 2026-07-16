(function(){
'use strict';

function applyPartnerCopy(){
 const galleryHeading=document.querySelector('#proof h2');
 if(galleryHeading){
  galleryHeading.innerHTML='크루즈를 즐기는 사람에서.<br /><span class="accent-text">크루즈를 알리는 사람이 됩니다.</span>';
 }
}

if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',applyPartnerCopy,{once:true});
}else{
 applyPartnerCopy();
}
})();
