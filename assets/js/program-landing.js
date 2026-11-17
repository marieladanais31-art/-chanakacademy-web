(function(){
  'use strict';
  var program=document.body.dataset.program||'off-campus';
  var $=function(s,r){return(r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var code=function(){return window.getCurrentCountry?window.getCurrentCountry():'GLOBAL'};
  function sisUrl(source){var r=window.SUPPORTED_REGIONS&&window.SUPPORTED_REGIONS[code()];var u=new URL('https://sis.chanakacademy.org/matricula');u.searchParams.set('programa',program);u.searchParams.set('program',program==='off-campus'?'off_campus':'dual_diploma');u.searchParams.set('country',code());u.searchParams.set('currency',r?r.currency:'USD');u.searchParams.set('src',source||'program-landing');if(program==='off-campus')u.searchParams.set('scope','international');return u.toString()}
  function paymentUrl(c){return ''; /* Payment follows the approved individual quote; country alone cannot select an invoice. */}
  function dossierUrl(c){var country=['ES','MX','PA','CO','US','GLOBAL'].indexOf(c)>=0?c:'GLOBAL';if(program==='off-campus')return document.documentElement.lang.indexOf('en')===0?'https://drive.google.com/file/d/1I4camNE5nlLMgij2-cqIWEMc370SzV_a/view':'https://drive.google.com/file/d/1DoygClK-C02tnlInKokJelK64j38J5lp/view';return document.documentElement.lang.indexOf('en')===0?'https://drive.google.com/file/d/1Z1Frfo5ZEcga_KUF0YUg9eHpz1L6B2n9/view':'https://drive.google.com/file/d/1AuAE7TXFTx2TuboCtgr3fAqcEstSwnwa/view'}
  function render(){
    var c=code(),region=window.SUPPORTED_REGIONS&&window.SUPPORTED_REGIONS[c]||{flag:'🌎',name:'Internacional',currency:'USD'};
    $$('[data-region-label]').forEach(function(el){el.textContent=region.flag+' '+((document.documentElement.lang||'').indexOf('en')===0&&region.nameEn?region.nameEn:region.name)});
    $$('[data-sis]').forEach(function(el){el.href=sisUrl(el.dataset.sis||'cta')});
    $$('[data-dossier]').forEach(function(el){el.href=dossierUrl(c)});
    var market=window.CHANAK_PRICING&&window.CHANAK_PRICING.markets&&(window.CHANAK_PRICING.markets[c]||window.CHANAK_PRICING.markets.GLOBAL);
    var data=market&&(program==='off-campus'?market.off_campus:market.dual_diploma);
    var mount=$('#regional-price');if(mount&&data){
      var isEn=document.documentElement.lang&&document.documentElement.lang.indexOf('en')===0;
      var price=isEn?'Personalized plan upon review':'Plan personalizado tras revisión';
      function fmtMo(val){
        if(!val) return '';
        var clean=val.toString().trim();
        if(/\/(mes|mo|month)/i.test(clean)){
          return isEn?clean.replace(/\/mes/i,'/month'):clean;
        }
        return clean+(isEn?' / month':'/mes');
      }
      if(data.status==='published'){
        if(program==='off-campus'&&data.tiers&&data.tiers.length){
          var baseM=data.tiers[0].monthly;
          price=baseM?(data.tiers.length>1&&data.tiers.some(function(t){return t.monthly!==baseM})?(isEn?'From ':'Desde '):'')+fmtMo(baseM):price;
        }
        if(program==='dual-diploma'&&data.routes&&data.routes.length){
          var baseD=data.routes[0].monthly;
          price=baseD?((isEn?'From ':'Desde ')+fmtMo(baseD)):(data.routes[0].totalYear||price);
        }
      }
      var rawIncludes = data.includes || data.note;
      var includesHtml = '';
      if(rawIncludes){
        var items = rawIncludes.split('·').map(function(s){return s.trim();}).filter(Boolean);
        if(items.length > 1){
          includesHtml = '<ul class="program-includes-list" style="list-style:none;padding:0;margin:14px 0 18px;display:flex;flex-direction:column;gap:8px;font-size:0.92rem;color:#f1f5f9 !important;text-align:left;">' +
            items.map(function(it){
              return '<li style="display:flex;align-items:flex-start;gap:8px;color:#f1f5f9 !important;"><span style="color:#7be2dc !important;font-weight:bold;line-height:1.2;">✓</span><span style="color:#f1f5f9 !important;">'+it+'</span></li>';
            }).join('') + '</ul>';
        } else {
          includesHtml = '<p style="margin:12px 0 16px;color:#f1f5f9 !important;">' + rawIncludes + '</p>';
        }
      } else {
        includesHtml = '<p style="margin:12px 0 16px;color:#f1f5f9 !important;">' + (isEn?'The academic route and final investment are confirmed in writing after reviewing the student file.':'La ruta y la inversión final se confirman por escrito después de revisar el caso.') + '</p>';
      }
      mount.innerHTML='<div class="eyebrow" style="color:#78dfd9 !important;">'+(isEn?'INFORMATION FOR ':'INFORMACIÓN PARA ')+((isEn&&region.nameEn)?region.nameEn:region.name).toUpperCase()+'</div><div class="price-value" style="color:#7be2dc !important;font-size:30px;font-weight:950;">'+price+'</div>'+includesHtml+'<p class="small" style="color:#cbd5e1 !important;font-size:12px;line-height:1.45;">'+(data.footnote||(isEn?'No enrollment fee is collected without prior written confirmation of the applicable program and rate.':'No se cobra una matrícula sin confirmar previamente el programa y el importe aplicable.'))+'</p>';
    }
    var pay=$('#approved-payment'),payLink=paymentUrl(c);if(pay){if(payLink){pay.classList.remove('hide');pay.href=payLink;pay.dataset.chanakDirectPayment='1'}else{pay.classList.add('hide');pay.removeAttribute('href')}}
    $$('input[name="pais"]').forEach(function(i){i.value=c});
  }
  function initForm(){var form=$('#lead-form'),status=$('#form-status');if(!form)return;var pending=false;form.addEventListener('submit',function(e){e.preventDefault();if(pending)return;pending=true;var selectedCountry=code();var button=form.querySelector('button[type="submit"]');if(button)button.disabled=true;status.textContent='Enviando…';var fd=new FormData(form);fd.set('programa',program);fd.set('origen',location.href);fd.set('language',document.documentElement.lang||'es');fd.set('country_code',selectedCountry);fd.set('pais',selectedCountry);var params=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){if(params.has(k))fd.set(k,params.get(k))});fetch('/enviar-formulario.php',{method:'POST',body:fd,headers:{'Accept':'application/json'}}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j}})}).then(function(x){if(!x.ok||x.j.success!==true)throw new Error(x.j.message||'No se pudo enviar.');if(window.ChanakTracking)window.ChanakTracking.lead(program);status.style.color='#087a80';status.replaceChildren();var en=(document.documentElement.lang||'es').indexOf('en')===0;var msg=document.createElement('p');msg.textContent=en?'Request received. Our Admissions team will contact you within one business day. No charge has been made.':'Solicitud recibida. Admisiones te contactará en un día hábil. No se ha realizado ningún cobro.';status.appendChild(msg);var steps=document.createElement('p');steps.textContent=en?'Next: review the plan and official USD tuition, then complete the SIS application if you wish to enroll.':'Siguiente paso: revisa el programa y la colegiatura oficial en USD; después podrás completar la solicitud de matrícula en el SIS.';status.appendChild(steps);var rates=document.createElement('a');rates.href='/tarifas/';rates.textContent=en?' View USD tuition →':' Ver tarifas en USD →';status.appendChild(rates);var link=document.createElement('a');link.href=x.j.dossier||dossierUrl(selectedCountry);link.textContent=en?' Optional PDF dossier →':' Dossier opcional PDF →';link.target='_blank';link.rel='noopener';status.appendChild(link);var apply=document.createElement('a');apply.href=sisUrl('offcampus-lead-success');apply.textContent=en?' Begin enrollment application →':' Iniciar solicitud de matrícula →';status.appendChild(apply);form.reset()}).catch(function(err){status.style.color='#a62b2b';status.textContent=err.message||'No se pudo enviar. Escríbenos a '+(program==='dual-diploma'?'dualdiploma':'offcampus')+'@chanakacademy.org.'}).finally(function(){pending=false;if(button)button.disabled=false})})}
  document.addEventListener('DOMContentLoaded',function(){if(window.renderChanakRegionSelector){$$('.chanak-region-selector-mount').forEach(function(el){window.renderChanakRegionSelector(el)})}render();initForm()});
  window.addEventListener('chanak:countryChange',render);
})();

