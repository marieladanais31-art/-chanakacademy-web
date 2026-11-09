/**
 * Chanak Microschools & Partner Hub Interactive Logic
 * Handles interactive 5-question test and accessible form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Partner Self-Assessment Test (on /open-a-microschool)
  const testForm = document.getElementById('partner-test-form');
  const testResult = document.getElementById('test-result');
  const partnerFormWrap = document.getElementById('partner-form-section');

  if (testForm && testResult) {
    const radioInputs = testForm.querySelectorAll('input[type="radio"]');
    
    function evaluateTest() {
      const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
      let answeredCount = 0;
      let yesCount = 0;

      questions.forEach(q => {
        const checked = testForm.querySelector(`input[name="${q}"]:checked`);
        if (checked) {
          answeredCount++;
          if (checked.value === 'yes') yesCount++;
        }
      });

      if (answeredCount === 5) {
        testResult.style.display = 'block';
        const lang = document.documentElement.lang || 'es';
        
        let title = '';
        let msg = '';
        let btnText = '';

        if (lang === 'en') {
          title = yesCount >= 4 ? '🎉 Excellent Match for a Chanak Microschool' : '📋 Good Potential for a Chanak Partnership';
          msg = `You answered ${yesCount} out of 5 criteria favorably. Your community is in a strong position to begin the partnership roadmap with Chanak International Academy.`;
          btnText = 'Complete Partner Application ↓';
        } else if (lang === 'ca') {
          title = yesCount >= 4 ? '🎉 Excel·lent Perfil per a una Chanak Microschool' : '📋 Bon Potencial per a Aliança Chanak';
          msg = `Has respost afirmativament a ${yesCount} de 5 criteris. La teva comunitat està en una posició òptima per iniciar la ruta d'aliança amb Chanak International Academy.`;
          btnText = 'Completar Sol·licitud Institucional ↓';
        } else if (lang === 'fr') {
          title = yesCount >= 4 ? '🎉 Profil Idéal pour une Chanak Microschool' : '📋 Bon Potentiel pour un Partenariat Chanak';
          msg = `Vous avez répondu favorablement à ${yesCount} critères sur 5. Votre structure est dans une position propice pour initier la feuille de route avec Chanak International Academy.`;
          btnText = 'Compléter la Demande Institutionnelle ↓';
        } else {
          title = yesCount >= 4 ? '🎉 Perfil Ideal para una Chanak Microschool' : '📋 Buen Potencial para Alianza con Chanak';
          msg = `Has respondido favorablemente a ${yesCount} de 5 criterios. Tu comunidad u organización se encuentra en una posición propicia para iniciar la ruta de socio con Chanak International Academy.`;
          btnText = 'Completar Solicitud de Socio ↓';
        }

        testResult.innerHTML = `
          <h3 style="margin: 0 0 8px; font-family: var(--font-serif); font-size: 1.35rem; color: #166534;">${title}</h3>
          <p style="margin: 0 0 16px; font-size: 0.95rem; line-height: 1.6; color: #166534;">${msg}</p>
          <a href="#partner-form" class="btn btn-teal" style="font-size: 0.92rem; padding: 10px 22px;">${btnText}</a>
        `;

        // Pre-fill hidden input in the form
        const testSummaryField = document.getElementById('field-test-summary');
        if (testSummaryField) {
          testSummaryField.value = `Test completed: ${yesCount}/5 affirmative`;
        }
      }
    }

    radioInputs.forEach(input => {
      input.addEventListener('change', evaluateTest);
    });
  }

  // 2. Generic Accessible Ajax Submission for Waitlist & Partner Forms
  const forms = document.querySelectorAll('.ajax-microschool-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      const successBox = form.parentElement.querySelector('.form-success');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';
      }

      try {
        const formData = new FormData(form);
        const response = await fetch('/enviar-formulario.php', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        // Even if PHP returns plain text or JSON, consider 200 OK as success
        if (response.ok) {
          form.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'block';
            successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          // Fallback to standard submission
          form.submit();
        }
      } catch (err) {
        // Fallback to standard submission on network failure
        console.warn('Ajax submission fallback to native POST', err);
        form.submit();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  });

  // 3. Language switcher helper: persist chosen language in localStorage
  document.querySelectorAll('.lang-switch a').forEach(link => {
    link.addEventListener('click', () => {
      const l = link.getAttribute('lang');
      if (l) {
        try { localStorage.setItem('chanak_lang', l); } catch (e) {}
      }
    });
  });
});
