(() => {
  'use strict';
  const root = document.documentElement;
  const sl = root.lang.toLowerCase().startsWith('sl');
  const menu = document.querySelector('#csMenuButton');
  const nav = document.querySelector('#csMainNav');
  const toggle = (open) => {
    if (!menu || !nav) return;
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
  };
  if (menu && nav) {
    menu.addEventListener('click', () => toggle(menu.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', event => { if (!nav.contains(event.target) && !menu.contains(event.target)) toggle(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') toggle(false); });
  }

  const body = document.body;
  const year = body.dataset.campaignYear || '2027';
  const season = sl ? (body.dataset.campaignSeasonSl || 'Božič') : (body.dataset.campaignSeason || 'Christmas');
  document.querySelectorAll('[data-campaign-year]').forEach(node => { node.textContent = year; });
  document.querySelectorAll('[data-campaign-season]').forEach(node => { node.textContent = season; });

  const service = document.querySelector('#csService');
  document.querySelectorAll('[data-inquiry-service]').forEach(link => {
    link.addEventListener('click', () => {
      if (service) service.value = link.dataset.inquiryService;
    });
  });

  const form = document.querySelector('#csInquiryForm');
  const status = document.querySelector('#csFormStatus');
  if (!form || !status) return;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = false;
  const labels = sl ? {
    prepared: 'E-poštni osnutek je pripravljen, vendar povpraševanje še ni poslano. Preglej in pošlji ga v svojem e-poštnem programu. Če se osnutek ne odpre, lahko uporabiš povezavo spodaj.',
    email: 'Odpri e-poštni osnutek', whatsapp: 'Pošlji prek WhatsAppa',
    name: 'Ime in priimek', emailField: 'E-pošta', whatsappField: 'WhatsApp', language: 'Želeni jezik', service: 'Želena kreacija', people: 'Število oseb', occasion: 'Priložnost', components: 'Želeni elementi', message: 'Sporočilo', consent: 'Soglasje',
    subject: 'BLINKITA · novo osebno povpraševanje',
    whatsappIntro: 'Pozdravljena, Blanka. Želim poslati povpraševanje za osebno BLINKITA kreacijo.'
  } : {
    prepared: 'Your email draft is ready, but your inquiry has not been sent. Review and send it in your email app. If the draft does not open, use one of the links below.',
    email: 'Open email draft', whatsapp: 'Send via WhatsApp',
    name: 'Full name', emailField: 'Email', whatsappField: 'WhatsApp', language: 'Preferred language', service: 'Requested creation', people: 'Number of people', occasion: 'Occasion', components: 'Requested components', message: 'Message', consent: 'Consent',
    subject: 'BLINKITA · new personal inquiry',
    whatsappIntro: 'Hello Blanka. I would like to enquire about a personal BLINKITA creation.'
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const val = (key) => String(data.get(key) || '').trim();
    const selectedService = document.querySelector('#csService option:checked')?.textContent.trim() || '';
    const selectedOccasion = document.querySelector('#csOccasion option:checked')?.textContent.trim() || '';
    const selectedLanguage = document.querySelector('#csLanguage option:checked')?.textContent.trim() || '';
    const components = data.getAll('components').map(value => {
      const input = [...form.querySelectorAll('input[name="components"]')].find(item => item.value === value);
      return input?.parentElement?.textContent.trim() || value;
    });
    const lines = [
      labels.name + ': ' + val('name'),
      labels.emailField + ': ' + val('email'),
      val('whatsapp') ? labels.whatsappField + ': ' + val('whatsapp') : '',
      labels.language + ': ' + selectedLanguage,
      labels.service + ': ' + selectedService,
      val('people') ? labels.people + ': ' + val('people') : '',
      selectedOccasion ? labels.occasion + ': ' + selectedOccasion : '',
      components.length ? labels.components + ': ' + components.join(', ') : '',
      val('message') ? labels.message + ':\n' + val('message') : '',
      labels.consent + ': ' + (data.get('consent') ? 'Yes' : 'No')
    ].filter(Boolean);
    const mail = 'mailto:info@blinkita.si?subject=' + encodeURIComponent(labels.subject) + '&body=' + encodeURIComponent(lines.join('\n\n'));
    const whatsappText = encodeURIComponent(labels.whatsappIntro + '\n\n' + lines.join('\n\n'));
    status.replaceChildren();
    const p = document.createElement('p'); p.textContent = labels.prepared;
    const emailLink = document.createElement('a'); emailLink.href = mail; emailLink.textContent = labels.email;
    const whatsappLink = document.createElement('a'); whatsappLink.href = 'https://wa.me/5016084121?text=' + whatsappText; whatsappLink.target = '_blank'; whatsappLink.rel = 'noopener'; whatsappLink.textContent = labels.whatsapp;
    status.append(p, emailLink, whatsappLink);
    status.classList.add('is-visible');
    status.focus();
    window.location.href = mail;
  });
})();
