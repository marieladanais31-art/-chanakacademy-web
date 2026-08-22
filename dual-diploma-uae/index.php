<?php
declare(strict_types=1);

/**
 * English international-admissions landing for UAE / Dubai traffic.
 * Single source for pricing: _private/commercial-pricing.php (also used
 * by enviar-formulario.php for the confirmation email + dossier link).
 * Deliberately does NOT load /assets/site-config.js or
 * /assets/js/chanak-overrides.js — those scripts key their DOM injections
 * off any path starting with "/dual-diploma", which would silently splice
 * Spanish copy onto this English page.
 */

$pricing = include __DIR__ . '/../_private/commercial-pricing.php';
$uae     = $pricing['UAE'];
$dubai   = $pricing['Dubai'];

function fmt_aed(int $amount): string
{
    return 'AED ' . number_format($amount);
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>U.S. Dual Diploma — International Admissions for UAE &amp; Dubai | Chanak International Academy</title>
  <meta name="description" content="U.S. Dual Diploma pathway for students in the UAE and Dubai. Request information from Chanak International Academy's International Admissions team." />
  <link rel="canonical" href="https://www.chanakacademy.org/dual-diploma-uae/" />
  <meta property="og:title" content="U.S. Dual Diploma — International Admissions for UAE &amp; Dubai" />
  <meta property="og:description" content="A flexible U.S. high school pathway for international students in the UAE and Dubai, alongside their current education." />
  <meta property="og:url" content="https://www.chanakacademy.org/dual-diploma-uae/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.chanakacademy.org/assets/og-image.jpg" />
  <meta property="og:site_name" content="Chanak International Academy" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/dual-diploma-panama/style-shared.css" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18109980849"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('js', new Date());
    gtag('config','AW-18109980849');
    gtag('config', 'GT-NSSXS5N6');
    gtag('event', 'landing_visit', { event_category: 'international_admissions', event_label: 'dual-diploma-uae' });
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "U.S. Dual Diploma — International Admissions for UAE and Dubai",
    "description": "U.S. Dual Diploma pathway for students in the United Arab Emirates, including Dubai, with academic guidance and enrollment support from Chanak International Academy.",
    "url": "https://www.chanakacademy.org/dual-diploma-uae/",
    "areaServed": ["United Arab Emirates", "Dubai"],
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Chanak International Academy",
      "url": "https://www.chanakacademy.org/",
      "identifier": "FLDOE #134620"
    },
    "serviceType": "U.S. Dual Diploma"
  }
  </script>
  <style>
    .price-table{width:100%;border-collapse:collapse;margin-top:1rem;background:#fff}
    .price-table th,.price-table td{padding:.7rem .9rem;text-align:left;border-bottom:1px solid #e1e8f0}
    .price-table th{color:#071a36;font-size:.82rem;text-transform:uppercase;letter-spacing:.03em}
    .price-table td{color:#24415f}
    .faq-item{margin-bottom:1rem}
    .faq-item h3{color:#071a36;margin:0 0 .3rem;font-size:1.02rem}
    .faq-item p{margin:0;color:#3a5a7a}
    .disclaimer{font-size:.82rem;color:#5b7a91;max-width:78ch;margin:1rem auto 0}
    .field label{display:block;font-weight:600;margin-bottom:.25rem;color:#173255;font-size:.92rem}
    .field input,.field select{width:100%;padding:.65rem .8rem;border:1px solid #c9d8ea;border-radius:10px;font:inherit;background:#fff}
    .field{margin-bottom:.8rem}
    .field-row{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
    @media(max-width:680px){.field-row{grid-template-columns:1fr}}
  </style>
  <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1697477548238291');fbq('track','PageView');function trackMetaLead(programName){if(typeof fbq==='function'){fbq('track','Lead',{content_name:programName||'Landing'});fbq('track','Schedule',{content_name:programName||'Landing'});}}</script>
</head>
<body>
  <header class="topbar">
    <div class="container topbar-wrap">
      <a class="brand" href="/dual-diploma-uae/" aria-label="Chanak International Academy">
        <img src="/assets/chanak-logo.png" alt="Chanak International Academy" style="height:42px;width:auto" />
        <span class="brand-name">Chanak International Academy</span>
      </a>
      <nav>
        <a href="#program">Program</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
        <a href="#form">Contact</a>
      </nav>
    </div>
  </header>

  <section class="hero" id="program">
    <div class="container hero-grid">
      <div>
        <span class="badge">INTERNATIONAL ADMISSIONS · UAE &amp; DUBAI</span>
        <h1>U.S. Dual Diploma for Students in the UAE</h1>
        <p class="hero-sub">A flexible U.S. high school pathway for international students in the United Arab Emirates and Dubai, alongside their current school program, when applicable.</p>
        <div class="benefits-inline">
          <div class="benefit">Complementary U.S. academic pathway</div>
          <div class="benefit">Academic mentoring and progress tracking</div>
          <div class="benefit">Approximately 5 hours per week</div>
        </div>
        <div class="btns">
          <a class="btn btn-primary" href="#form">Request Dual Diploma Information</a>
          <a class="btn btn-secondary" href="#pricing">View Pricing</a>
        </div>
        <p class="subtext">Our International Admissions team reviews every request individually. Eligibility is confirmed during the admissions process.</p>
      </div>
      <div class="hero-visual">
        <img src="/assets/img/hero-dualdiploma.webp" alt="Student in the UAE following an online academic pathway" />
      </div>
    </div>
  </section>

  <main>
    <section class="section">
      <div class="container trust">
        <div class="trust-item"><img src="/assets/chanak-logo.png" alt="Chanak International Academy" /><div><strong>Chanak International Academy</strong></div></div>
        <div class="trust-item"><img src="/assets/fldoe-logo.png" alt="Florida Department of Education" /><div><strong>Florida Department of Education</strong><br />FLDOE #134620</div></div>
        <div class="trust-item"><img src="/assets/msa-dark.png" alt="Middle States Association" /><div><strong>Middle States Association</strong><br />Official Candidate for Accreditation</div></div>
      </div>
    </section>

    <section class="section">
      <div class="container card">
        <h2>What is the U.S. Dual Diploma?</h2>
        <p>The Chanak U.S. Dual Diploma is a <strong>complementary U.S. high school pathway</strong> — not a replacement for the student's current school. It combines an online academic structure (approximately 5 hours per week), academic mentoring, and progress tracking through Chanak's Student Information System (SIS). Students receive an official transcript and, upon successful completion of the program requirements, a U.S. High School Diploma issued by Chanak International Academy (FLDOE #134620).</p>
        <p class="disclaimer">The Chanak U.S. Dual Diploma provides academic documentation that may be considered as part of admission processes. Admission, recognition, equivalency and eligibility requirements vary by university, country and program. Final decisions are made by the receiving institution. Students and families should verify specific admission and recognition requirements directly with their intended university or institution.</p>
      </div>
    </section>

    <section class="section navy" id="pricing">
      <div class="container">
        <h2>Pricing — 2026–2027</h2>
        <div class="card">
          <p>Pricing is confirmed individually by city — the United Arab Emirates and Dubai have different rates (monthly, academic year, and enrollment fee), in AED. Download the information pack for your city to see exact pricing, or request information below and our International Admissions team will confirm it with you.</p>
          <div class="btns" style="margin-top:1rem">
            <a id="dossierDownload" class="btn btn-secondary dark btn-sm" href="/assets/dossiers/Chanak_Dual_Diploma_UAE_2026-2027.pdf" target="_blank" rel="noopener noreferrer" data-chanak-track="dossier_download">Download information pack (PDF) — United Arab Emirates</a>
          </div>
          <p class="disclaimer">The pack shown updates automatically once you type your city in the form below — Dubai gets the Dubai-priced pack, any other UAE city gets the UAE pack. Pricing does not include additional academic materials, which are managed separately.</p>
        </div>
      </div>
    </section>

    <section class="section" id="form">
      <div class="container form-card">
        <h2>Request Information</h2>
        <p>Tell us a little about your student so our International Admissions team can guide you appropriately. We typically respond within 1 business day.</p>
        <form id="infoRequestForm" novalidate style="display:grid;gap:.4rem">
          <div style="position:absolute;left:-9999px" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <div class="field-row">
            <div class="field"><label for="guardianName">Parent / Guardian name</label><input id="guardianName" name="guardianName" required /></div>
            <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required /></div>
          </div>
          <div class="field-row">
            <div class="field"><label for="whatsapp">WhatsApp</label><input id="whatsapp" name="whatsapp" required /></div>
            <div class="field"><label for="country">Country</label><input id="country" name="country" value="United Arab Emirates" required /></div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="city">City</label>
              <input id="city" name="city" list="cityOptions" required placeholder="Dubai, Abu Dhabi..." />
              <datalist id="cityOptions">
                <option value="Dubai"></option>
                <option value="Abu Dhabi"></option>
                <option value="Sharjah"></option>
                <option value="Ajman"></option>
              </datalist>
            </div>
            <div class="field">
              <label for="program">Program</label>
              <select id="program" name="program" required>
                <option value="U.S. Dual Diploma" selected>U.S. Dual Diploma</option>
                <option value="Off-Campus">Off-Campus</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>
          </div>
          <div class="field-row">
            <div class="field"><label for="studentName">Student name</label><input id="studentName" name="studentName" required /></div>
            <div class="field"><label for="studentAge">Student age</label><input id="studentAge" name="studentAge" required /></div>
          </div>
          <div class="field-row">
            <div class="field"><label for="currentGrade">Current grade</label><input id="currentGrade" name="currentGrade" required /></div>
            <div class="field"><label for="currentSchool">Current school</label><input id="currentSchool" name="currentSchool" required /></div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="currentSituation">Student's current educational situation</label>
              <select id="currentSituation" name="currentSituation">
                <option value="">Select one</option>
                <option>Homeschool</option>
                <option>Public school</option>
                <option>Private school</option>
                <option>Not currently enrolled</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="field">
              <label for="educationStage">Current education stage</label>
              <select id="educationStage" name="educationStage">
                <option value="">Select one</option>
                <option>Elementary</option>
                <option>Middle school</option>
                <option>High school</option>
                <option>Already graduated</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style="margin-top:.4rem">
            <button id="submitInfoBtn" class="btn btn-primary" type="submit" style="border:none;cursor:pointer">Request Dual Diploma Information</button>
          </div>
          <p id="infoRequestStatus" role="status" aria-live="polite" style="font-weight:600;margin:.4rem 0 0"></p>
        </form>
      </div>
    </section>

    <section class="section navy" id="admissions">
      <div class="container card">
        <h2>International Admissions</h2>
        <p>Interested in the U.S. Dual Diploma? Our International Admissions team can help you understand the program, eligibility requirements, enrollment process and next steps. Your information has been received and reviewed on a case-by-case basis — eligibility is confirmed during the admissions process, not before.</p>
        <div class="btns"><a class="btn btn-primary" href="#form">Contact International Admissions</a></div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container card">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item"><h3>What is the U.S. Dual Diploma?</h3><p>A complementary U.S. high school pathway. Students continue their current school program (when applicable) and work toward a U.S. High School Diploma issued by Chanak International Academy (FLDOE #134620).</p></div>
        <div class="faq-item"><h3>How does it work?</h3><p>After an initial review, Chanak defines a personalized academic route. Students study through Chanak's Student Information System (SIS) with academic mentoring and progress tracking.</p></div>
        <div class="faq-item"><h3>How many hours per week?</h3><p>Approximately 5 hours per week on average, confirmed for each student during the admissions process.</p></div>
        <div class="faq-item"><h3>How much does it cost?</h3><p>Pricing is shown in the information pack for your city — download it above, or type your city in the request form and the correct pack (United Arab Emirates or Dubai) opens automatically. Your applicable region and final pricing are confirmed by our International Admissions team.</p></div>
        <div class="faq-item"><h3>What are the enrollment steps?</h3><p>Request information → academic orientation call → eligibility review → enrollment, once the family and Chanak confirm the academic route together.</p></div>
        <div class="faq-item"><h3>What documents are required?</h3><p>Typically: student's most recent school report/transcript, a copy of the guardian's and student's ID or passport, and any prior academic records. Our team will confirm the exact list for your case.</p></div>
        <div class="faq-item"><h3>Is Chanak accredited?</h3><p>Chanak International Academy is registered with the Florida Department of Education (FLDOE #134620) and is currently a Candidate for Accreditation with the Middle States Association (MSA-CESS). Candidate status does not constitute accreditation.</p></div>
        <div class="faq-item"><h3>Does the Dual Diploma guarantee university admission?</h3><p>No. It provides academic documentation that may be considered as part of admission processes. Admission, recognition and eligibility requirements vary by university, country and program, and the final decision is always made by the receiving institution.</p></div>
        <p class="disclaimer">Have a different question? <a href="#form">Contact International Admissions</a> directly.</p>
      </div>
    </section>
  </main>

  <script>
  (function () {
    "use strict";
    var form = document.getElementById('infoRequestForm');
    var status = document.getElementById('infoRequestStatus');
    var submitBtn = document.getElementById('submitInfoBtn');
    var cityInput = document.getElementById('city');
    var dossierLink = document.getElementById('dossierDownload');

    // Captura UTM de Meta/Google Ads al llegar, igual que en la Home.
    (function captureUtm(){
      try {
        var qs = new URLSearchParams(location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
          if (qs.get(k)) sessionStorage.setItem('chanak_' + k, qs.get(k));
        });
      } catch (e) {}
    })();
    function chanakUtm() {
      var out = {};
      try {
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
          out[k] = sessionStorage.getItem('chanak_' + k) || '';
        });
      } catch (e) {}
      return out;
    }

    function syncDossierByCity() {
      var isDubai = (cityInput.value || '').toLowerCase().indexOf('dubai') > -1;
      if (isDubai) {
        dossierLink.href = '/assets/dossiers/Chanak_Dual_Diploma_Dubai_2026-2027.pdf';
        dossierLink.textContent = 'Download information pack (PDF) — Dubai';
      } else {
        dossierLink.href = '/assets/dossiers/Chanak_Dual_Diploma_UAE_2026-2027.pdf';
        dossierLink.textContent = 'Download information pack (PDF) — United Arab Emirates';
      }
    }
    cityInput.addEventListener('input', syncDossierByCity);
    syncDossierByCity();

    document.addEventListener('click', function (event) {
      var el = event.target.closest && event.target.closest('[data-chanak-track="dossier_download"]');
      if (el && typeof gtag === 'function') {
        gtag('event', 'dossier_download', { event_category: 'content', event_label: el.getAttribute('href') });
      }
    }, true);

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      status.textContent = '';
      status.style.color = '#173255';

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var payload = Object.fromEntries(new FormData(form).entries());
      var programSelect = payload.program || '';
      payload.necesidad = programSelect.indexOf('Dual Diploma') > -1 ? 'dual'
        : (programSelect === 'Off-Campus' ? 'offcampus' : 'info');
      payload.programa = 'U.S. Dual Diploma - UAE/Dubai International Admissions Request';
      payload.origen = 'dual-diploma-uae landing';
      Object.assign(payload, chanakUtm());

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        var response = await fetch('/enviar-formulario.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Request failed');

        if (typeof gtag === 'function') {
          gtag('event', 'form_submitted', { event_category: 'international_admissions', event_label: 'dual-diploma-uae' });
        }
        if (typeof trackMetaLead === 'function') trackMetaLead('Dual Diploma UAE');
        form.reset();
        document.getElementById('country').value = 'United Arab Emirates';
        status.textContent = 'Thank you. Your information has been received — our International Admissions team will review it and contact you soon.';
        status.style.color = '#0f6e3d';
      } catch (error) {
        status.textContent = 'We could not send your request. Please email dualdiploma@chanakacademy.org.';
        status.style.color = '#a51f1f';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Dual Diploma Information';
      }
    });
  })();
  </script>

  <footer><div class="container"><strong>Chanak International Academy</strong><br />dualdiploma@chanakacademy.org<br />FLDOE #134620<br />MSA-CESS Official Candidate for Accreditation<br />Chanak Foundation / Nonprofit 501(c)(3)</div></footer>
</body>
</html>
