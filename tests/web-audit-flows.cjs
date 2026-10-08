const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

// Compile every modified inline script and structured-data block.
for (const p of ['index.html','diagnostico/index.html','off-campus/index.html','dual-diploma/index.html','matricula/index.html','florida-home-education/index.html','us/alabama/index.html']) {
  for (const match of read(p).matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/src=/.test(match[1])) continue;
    if (/ld\+json/.test(match[1])) JSON.parse(match[2]);
    else new vm.Script(match[2], {filename:p});
  }
}

// Trackers do not load on rejection; accepting loads each once, revoking blocks leads.
const scripts = [], listeners = {};
const tracking = {
  location: {origin:'https://www.chanakacademy.org',pathname:'/off-campus/'},
  localStorage: {getItem:()=>null,setItem:()=>{}},
  document: {
    head:{appendChild:el=>scripts.push(el.src)},
    createElement:()=>({}),addEventListener:(name,fn)=>listeners[name]=fn
  }, URL
};
tracking.window = tracking; vm.createContext(tracking);
vm.runInContext(read('assets/js/consent-tracking.js'), tracking);
assert.equal(scripts.length, 0);
tracking.ChanakTracking.lead('off-campus');
assert.equal(tracking.dataLayer.filter(x=>x[0]==='event').length,0);
tracking.ChanakTracking.setConsent(true,true);
tracking.ChanakTracking.setConsent(true,true);
assert.equal(scripts.length,2);
tracking.ChanakTracking.lead('off-campus');
assert.equal(tracking.dataLayer.filter(x=>x[1]==='generate_lead').length,1);
assert.equal(tracking.fbq.queue.filter(x=>x[1]==='Lead').length,1);
tracking.ChanakTracking.setConsent(false,false);
tracking.ChanakTracking.lead('off-campus');
assert.equal(tracking.dataLayer.filter(x=>x[1]==='generate_lead').length,1);
assert.equal(tracking.fbq.queue.filter(x=>x[1]==='Lead').length,1);

// Diagnostic country prices and checkout links must agree with the existing catalog.
const diagnostic = read('diagnostico/index.html');
const context = {window:{},location:{search:''},URLSearchParams};
vm.createContext(context); vm.runInContext(read('js/regional-pricing.js'), context);
const configStart = diagnostic.indexOf('const STRIPE_LINK_EUR');
const configEnd = diagnostic.indexOf('function withUTM',configStart);
const catalogStart = diagnostic.indexOf('function catalogConfig(');
const catalogEnd = diagnostic.indexOf('function applyCountryConfig(',catalogStart);
vm.runInContext(diagnostic.slice(configStart,configEnd)+diagnostic.slice(catalogStart,catalogEnd),context);
for (const [code,key] of Object.entries({es:'ES',pa:'PA',mx:'MX',us:'US',int:'GLOBAL'})) {
  const actual = vm.runInContext(`catalogConfig('${code}')`,context);
  assert.equal(actual.priceText,context.window.CHANAK_PRICING.markets[key].diagnostic.price);
  assert.equal(actual.currency,context.window.CHANAK_PRICING.markets[key].currency);
  if (code==='us'||code==='mx'||code==='int') assert.equal(actual.stripeUrl,'');
}
assert(vm.runInContext("catalogConfig('es').stripeUrl",context).includes('buy.stripe.com'));
assert(vm.runInContext("catalogConfig('pa').stripeUrl",context).includes('buy.stripe.com'));

// Run the real diagnostic submit handler without sending email or contacting the API.
const ids = [...diagnostic.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
const elements = Object.fromEntries(ids.map(id=>[id,{value:'example',style:{},textContent:'Submit',checkValidity:()=>true}]));
elements.pais.value = 'Estados Unidos';
let sent, leads=0, success=true;
context.document = {getElementById:id=>elements[id]||null,documentElement:{lang:'es'}};
context.fetch = async (_,options) => {sent=JSON.parse(options.body);return {ok:true,json:async()=>({success})};};
context.alert = ()=>{};
context.window.ChanakTracking = {lead:()=>leads++};
context.selector = {value:'us'};
vm.runInContext('const countrySelector=selector;',context);
const start = diagnostic.indexOf('async function enviarFormulario()');
const end = diagnostic.indexOf('</script>',start);
vm.runInContext(diagnostic.slice(start,end),context);
(async()=>{
  await context.enviarFormulario();
  assert.equal(sent.country_code,'US');assert.equal(sent.moneda,'USD');
  assert.equal(sent.whatsapp,'example');assert.equal(sent.precio,'$58 USD');assert.equal(leads,1);
  success=false;await context.enviarFormulario();assert.equal(leads,1);
  assert.equal(elements['submit-btn'].disabled,false);
  // The hero video and published state fees are retained.
  assert(read('index.html').includes('/assets/video/universidad-hero.mp4'));
  assert(read('florida-home-education/index.html').includes('$295'));
  assert(!read('index.html').includes('Diploma FLDOE'));
  assert(!read('index.html').includes('Testimonio verificado'));
  assert(!read('diagnostico/index.html').includes('Precio regular:'));
  console.log('PASS: scripts, consent, five country prices, checkout safeguards, diagnostic success/failure and protected content');
})().catch(error=>{console.error(error);process.exitCode=1;});
