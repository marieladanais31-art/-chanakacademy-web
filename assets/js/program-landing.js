(function(){
  'use strict';
  var program=document.body.dataset.program||'off-campus';
  var $=function(s,r){return(r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var code=function(){return window.getCurrentCountry?window.getCurrentCountry():'GLOBAL'};
  function sisUrl(source){var r=window.SUPPORTED_REGIONS&&window.SUPPORTED_REGIONS[code()];var u=new URL('https://sis.chanakacademy.org/matricula');u.searchParams.set('programa',program);u.searchParams.set('program',program==='off-campus'?'off_campus':'dual_diploma');u.searchParams.set('country',code());u.searchParams.set('currency',r?r.currency:'USD');u.searchParams.set('src',source||'program-landing');return u.toString()}
  function paymentUrl(c){var x=window.CHANAK_CONFIG&&window.CHANAK_CONFIG.stripe;if(!x)return'';if(c==='MX')return x.mexico;if(c==='CO')return x.colombia;return''}
  function dossierUrl(c){var suffix=c==='GLOBAL'?'en':String(c).toLowerCase();return'/assets/dossiers/dossier-'+program+'-'+suffix+'.pdf'}
  function render(){
    var c=code(),region=window.SUPPORTED_REGIONS&&window.SUPPORTED_REGIONS[c]||{flag:'🌎',name:'Internacional',currency:'USD'};
    $$('[data-region-label]').forEach(function(el){el.textContent=region.flag+' '+region.name});
    $$('[data-sis]').forEach(function(el){el.href=sisUrl(el.dataset.sis||'cta')});
    $$('[data-dossier]').forEach(function(el){el.href=dossierUrl(c)});
    var market=window.CHANAK_PRICING&&window.CHANAK_PRICING.markets&&(window.CHANAK_PRICING.markets[c]||window.CHANAK_PRICING.markets.GLOBAL);
    var data=market&&(program==='off-campus'?market.off_campus:market.dual_diploma);
    var mount=$('#regional-price');if(mount&&data){
      var price='Plan personalizado tras revisión';
      if(data.status==='published'){
        if(program==='off-campus'&&data.tiers&&data.tiers.length){price=data.tiers[0].monthly?(data.tiers.length>1&&data.tiers.some(function(t){return t.monthly!==data.tiers[0].monthly})?'Desde ':'')+data.tiers[0].monthly+'/mes':price}
        if(program==='dual-diploma'&&data.routes&&data.routes.length){price=data.routes[0].monthly||data.routes[0].totalYear||price}
      }
      mount.innerHTML='<div class="eyebrow">INFORMACIÓN PARA '+region.name.toUpperCase()+'</div><div class="price-value">'+price+'</div><p>'+(data.includes||data.note||'La ruta y la inversión final se confirman por escrito después de revisar el caso.')+'</p><p class="small">'+(data.footnote||'No se cobra una matrícula sin confirmar previamente el programa y el importe aplicable.')+'</p>';
    }
    var pay=$('#approved-payment'),payLink=paymentUrl(c);if(pay){if(payLink){pay.classList.remove('hide');pay.href=payLink;pay.dataset.chanakDirectPayment='1'}else{pay.classList.add('hide');pay.removeAttribute('href')}}
    $$('input[name="pais"]').forEach(function(i){if(!i.value)i.value=c});
  }
  function initForm(){var form=$('#lead-form'),status=$('#form-status');if(!form)return;form.addEventListener('submit',function(e){e.preventDefault();status.textContent='Enviando…';var fd=new FormData(form);fd.set('programa',program);fd.set('origen',location.href);fetch('/enviar-formulario.php',{method:'POST',body:fd,headers:{'Accept':'application/json'}}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j}})}).then(function(x){if(!x.ok||x.j.success===false)throw new Error(x.j.message||'No se pudo enviar.');status.style.color='#087a80';status.textContent='Solicitud recibida. Te contactaremos en un día hábil.';form.reset();setTimeout(function(){window.open(dossierUrl(code()),'_blank','noopener')},450)}).catch(function(err){status.style.color='#a62b2b';status.textContent=err.message||'No se pudo enviar. Escríbenos a offcampus@chanakacademy.org.'})})}
  document.addEventListener('DOMContentLoaded',function(){if(window.renderChanakRegionSelector){$$('.chanak-region-selector-mount').forEach(function(el){window.renderChanakRegionSelector(el)})}render();initForm()});
  window.addEventListener('chanak:countryChange',render);
})();
