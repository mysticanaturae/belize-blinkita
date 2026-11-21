(() => {
  'use strict';

  const sl = document.documentElement.lang.toLowerCase().startsWith('sl');
  const $ = (selector) => document.querySelector(selector);
  const style = document.createElement('style');
  style.textContent = '.numerology-results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.numerology-results>.number-system{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.number-system>h4{grid-column:1/-1;color:var(--gold);margin:8px 0 0}.number-system>.number-result{margin:0}.number-system>.number-result:first-of-type{grid-column:1/-1}#dailyTzolkin{display:block;margin:14px 0;padding:16px;border:1px solid var(--line);border-radius:12px;background:#0b222b}#dailyTzolkin h4{margin:0 0 6px;color:var(--gold)}#dailyTzolkin p{margin:7px 0}.number-result .number-explanation{color:#d4ded8}@media(max-width:680px){.numerology-results,.numerology-results>.number-system{grid-template-columns:1fr}.numerology-results>.number-system{grid-column:1}}';
  document.head.append(style);
  const masters = [11, 22, 33];
  const debts = [13, 14, 16, 19];
  const py = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8 };
  const ch = { A:1,B:2,C:3,D:4,E:5,F:8,G:3,H:5,I:1,J:1,K:2,L:3,M:4,N:5,O:7,P:8,Q:1,R:2,S:3,T:4,U:6,V:6,W:6,X:5,Y:1,Z:7 };
  const meanings = sl ? {
    1:'Ena govori o pobudi, samostojnosti in pogumu za začetek. Dar je vodstvo; izziv je, da samostojnost ne postane osamitev.',
    2:'Dvojka poudarja sodelovanje, občutljivost in sposobnost povezovanja. Dar je diplomacija; izziv so omahovanje in pretirano prilagajanje.',
    3:'Trojka prinaša ustvarjalnost, izražanje in veselje do izmenjave. Dar je navdih; izziv je razpršenost ali odvisnost od potrditve.',
    4:'Štirica gradi stabilnost, red in zanesljive temelje. Dar je vztrajnost; izziv je togost ali občutek, da mora biti vse popolno.',
    5:'Petica išče svobodo, spremembe in raziskovanje. Dar je prilagodljivost; izziv je nemir, ki oteži vztrajanje pri izbranem.',
    6:'Šestica neguje skrb, odgovornost in harmonijo. Dar je podpora; izziv je prevzemanje preveč bremen ali nadzor v imenu skrbi.',
    7:'Sedmica raziskuje, premišljuje in išče notranje znanje. Dar je uvid; izziv je umik, dvom ali pretirana analiza.',
    8:'Osmica se ukvarja z udejanjanjem, organizacijo in odgovorno rabo vpliva. Dar je sposobnost graditi; izziv je enačenje vrednosti z uspehom.',
    9:'Devetica prinaša sočutje, širši pogled in zaključevanje ciklov. Dar je velikodušnost; izziv je izčrpavanje ali težko spuščanje preteklosti.',
    11:'Mojstrsko število 11 poudarja intuicijo, navdih in občutljiv uvid. Njegova osnovna dvojka opisuje, kako se ta navdih uči živeti skozi sodelovanje, poslušanje in ravnovesje.',
    22:'Mojstrsko število 22 povezuje veliko vizijo z zmožnostjo, da jo zgradiš korak za korakom. Njegova osnovna štirica prinaša red, potrpežljivost in trdne temelje.',
    33:'Mojstrsko število 33 govori o sočutju, podpori in navdihujoči skrbi za skupnost. Njegova osnovna šestica pomaga to skrb utelešati v odnosih in odgovornosti.'
  } : {
    1:'One carries initiative, independence and the courage to begin. Its gift is leadership; its challenge is letting independence become isolation.',
    2:'Two highlights cooperation, sensitivity and connection. Its gift is diplomacy; its challenge is indecision or over-adapting to others.',
    3:'Three brings creativity, expression and joyful exchange. Its gift is inspiration; its challenge is scattered focus or seeking approval.',
    4:'Four builds stability, order and dependable foundations. Its gift is persistence; its challenge is rigidity or perfectionism.',
    5:'Five seeks freedom, change and exploration. Its gift is adaptability; its challenge is restlessness that makes commitment difficult.',
    6:'Six nurtures care, responsibility and harmony. Its gift is support; its challenge is carrying too much or controlling in the name of care.',
    7:'Seven reflects, investigates and seeks inner knowledge. Its gift is insight; its challenge is withdrawal, doubt or over-analysis.',
    8:'Eight works with realization, organization and responsible influence. Its gift is building; its challenge is measuring worth only by success.',
    9:'Nine brings compassion, perspective and completion. Its gift is generosity; its challenge is exhaustion or difficulty releasing the past.',
    11:'Master Number 11 highlights intuition, inspiration and sensitive insight. Its root 2 shows how that inspiration learns to live through cooperation, listening and balance.',
    22:'Master Number 22 links a large vision with the ability to build it step by step. Its root 4 brings order, patience and strong foundations.',
    33:'Master Number 33 speaks of compassion, support and care that can inspire a community. Its root 6 gives that care form through relationships and responsibility.'
  };
  const debtMeaning = sl ? {
    13:'Karmični dolg 13: potrpežljivost, dosledno delo in skrb za podrobnosti pomagajo zamisel uresničiti.',
    14:'Karmični dolg 14: svoboda se razvija skupaj z zmernostjo, odgovornostjo in premišljenimi izbirami.',
    16:'Karmični dolg 16: spremembe lahko spodbudijo iskrenost, ponižnost in prenovo temeljev.',
    19:'Karmični dolg 19: samostojnost se uravnoteži s sodelovanjem, vzajemnostjo in upoštevanjem drugih.'
  } : {
    13:'Karmic Debt 13: patience, consistent effort and attention to detail help turn an idea into reality.',
    14:'Karmic Debt 14: freedom grows alongside moderation, responsibility and considered choices.',
    16:'Karmic Debt 16: change can invite honesty, humility and rebuilding on sound foundations.',
    19:'Karmic Debt 19: independence comes into balance through cooperation, reciprocity and regard for others.'
  };
  const chaldeanMap = ch;
  const vowelSet = new Set(['A','E','I','O','U']);
  const meaning = (n) => meanings[n] || '';
  const text = (el, value) => { if (el) el.textContent = value; };

  function normalizeName(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[ĐÐ]/g, 'D').toUpperCase().replace(/[^A-Z]/g, '');
  }
  function pathFor(total) {
    const path = [total];
    let n = total;
    while (n > 9) {
      n = String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);
      path.push(n);
    }
    return path;
  }
  function pathText(path) {
    return path.map((n, i) => `${n}${masters.includes(n) ? (sl ? ' · mojstrsko število' : ' · master number') : ''}`).join(' → ');
  }
  function pathMeaning(path) {
    const relevant = [...new Set(path.filter((n, i) => i === path.length - 1 || masters.includes(n)))];
    return relevant.map(n => meaning(n)).filter(Boolean).join(' ');
  }
  function nameMetric(letters, map) {
    const values = letters.map(letter => map[letter]);
    const total = values.reduce((sum, n) => sum + n, 0);
    return { total, path: pathFor(total), detail: letters.map((letter, i) => `${letter}=${values[i]}`).join(' + ') + ` = ${total}` };
  }
  function dateParts(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!m) throw new Error(sl ? 'Vnesi veljaven datum rojstva.' : 'Enter a valid birth date.');
    const year = Number(m[1]), month = Number(m[2]), day = Number(m[3]);
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) throw new Error(sl ? 'Vnesi veljaven datum rojstva.' : 'Enter a valid birth date.');
    return { year, month, day };
  }
  function card(title, metric, description, detail) {
    const article = document.createElement('article'); article.className = 'number-result';
    const h = document.createElement('h4'); h.textContent = title;
    const total = document.createElement('p'); total.className = 'number-total'; total.textContent = metric;
    const p = document.createElement('p'); p.className = 'number-explanation'; p.textContent = description;
    article.append(h, total, p);
    if (detail) { const d = document.createElement('details'), s = document.createElement('summary'), body = document.createElement('p'); s.textContent = sl ? 'Pokaži izračun' : 'Show calculation'; body.textContent = detail; d.append(s, body); article.append(d); }
    return article;
  }
  function showPathCard(root, title, result, detail) {
    root.append(card(title, (sl ? 'Pot seštevka: ' : 'Reduction path: ') + pathText(result.path), pathMeaning(result.path), detail));
  }
  function computeNameSystem(root, title, letters, map, pythagorean, birth) {
    const vowels = letters.filter(x => vowelSet.has(x));
    const consonants = letters.filter(x => !vowelSet.has(x));
    const expression = nameMetric(letters, map);
    const soul = nameMetric(vowels, map);
    const personality = nameMetric(consonants, map);
    const maturityTotal = expression.path.at(-1) + birth.life.path.at(-1);
    const maturity = { total: maturityTotal, path: pathFor(maturityTotal) };
    const set = document.createElement('section'); set.className = 'number-system';
    const h = document.createElement('h4'); h.textContent = title; set.append(h);
    showPathCard(set, sl ? 'Izraz / usoda · celotno ime' : 'Expression / Destiny · full name', expression, letters.join(' + ') + ' · ' + expression.detail);
    showPathCard(set, sl ? 'Dušno število · samoglasniki' : 'Soul Urge · vowels', soul, (sl ? 'Samoglasniki: ' : 'Vowels: ') + (vowels.join('') || '—') + ' · ' + soul.detail + (sl ? ' · Y je tukaj obravnavan kot soglasnik.' : ' · Y is treated as a consonant here.'));
    showPathCard(set, sl ? 'Osebnostno število · soglasniki' : 'Personality · consonants', personality, (sl ? 'Soglasniki: ' : 'Consonants: ') + (consonants.join('') || '—') + ' · ' + personality.detail);
    showPathCard(set, sl ? 'Število zrelosti' : 'Maturity number', maturity, `${birth.life.path.at(-1)} + ${expression.path.at(-1)} = ${maturityTotal}`);
    const debtNumbers = [...new Set([expression, soul, personality, maturity].flatMap(x => x.path).filter(n => debts.includes(n)))];
    const debtTitle = sl ? 'Karmični dolgovi' : 'Karmic debts';
    set.append(card(debtTitle, debtNumbers.length ? debtNumbers.join(', ') : (sl ? 'V tem izračunu ni zaznanih 13, 14, 16 ali 19.' : 'No 13, 14, 16 or 19 appeared in these calculations.'), debtNumbers.length ? debtNumbers.map(n => debtMeaning[n]).join(' ') : (sl ? 'Karmični dolgovi se v teh tradicijah iščejo v določenih sestavljenih številih.' : 'These traditions look for karmic debts in specific compound numbers.')));
    if (pythagorean) {
      const present = new Set(letters.map(letter => py[letter]));
      const missing = Array.from({length:9}, (_, i) => i + 1).filter(n => !present.has(n));
      set.append(card(sl ? 'Karmične lekcije · manjkajoče vrednosti' : 'Karmic lessons · missing values', missing.length ? missing.join(', ') : (sl ? 'Ni manjkajočih vrednosti.' : 'No missing values.'), missing.length ? (sl ? 'V pitagorejskem izračunu se te vrednosti ne pojavijo v imenu. To je tema za razvoj, ne napaka ali kazen.' : 'These values do not appear in the Pythagorean name calculation. They are considered themes for growth, not a flaw or punishment.') : (sl ? 'V imenu so zastopane vse vrednosti od 1 do 9.' : 'All values from 1 to 9 appear in the name.')));
    }
    root.append(set);
  }

  const toneMeaning = sl ? [
    'Začetek: namen naredi prvi vdih.','Srečanje sil: odnos in izbira.','Gibanje: energija najde smer.','Temelj: oblika, ritem in struktura.','Sij: volja in ustvarjalna moč stopita naprej.','Ravnovesje: skrb, prilagoditev in zbrana pozornost.','Notranje gibanje: poslušanje med vidnim in nevidnim.','Celovitost: povezovanje misli in dejanj.','Potrpežljivost: nega tega, kar dozoreva.','Udejanjanje: zamisel dobi resnično obliko.','Spuščanje: ustvarjanje prostora za spremembo.','Razumevanje: prepoznati vzorec in deliti njegov pomen.','Zaključek: zbrati celoto in odpreti nov krog.'
  ] : [
    'Beginning: an intention takes its first breath.','Encounter: relationship and choice meet.','Movement: energy finds a direction.','Foundation: shape, rhythm and structure.','Radiance: creative will comes forward.','Balance: care and steady attention.','Inner movement: listening between the visible and unseen.','Integrity: bringing thought and action together.','Patience: tending what is coming to maturity.','Making real: giving an idea a form.','Release: making space for change.','Understanding: recognizing a pattern and sharing its meaning.','Completion: gathering the cycle and opening the next.'
  ];
  const signNames = sl ? ['Imox','Iq','Aq’ab’al',"K’at",'Kan','Kame','Kej',"Q’anil",'Toj',"Tz’i",'B’atz','E','Aj',"I’x",'Tz’ikin','Ajmaq','Noj','Tijax','Kawoq','Ajpu'] : ['Imix','Ik','Akbal','Kan','Chicchan','Cimi','Manik','Lamat','Muluc','Oc','Chuen','Eb','Ben','Ix','Men','Cib','Caban','Etznab','Cauac','Ahau'];
  const signMeaning = sl ? [
    'Začetki in življenje, ki prihaja na dan.','Dih, glas in sila spremembe.','Tišina pred obnovo.','Zbiranje bistvenega.','Življenjska moč in modrost telesa.','Spomin in preobrazba.','Ravnovesje in skrb za živi svet.','Rodovitnost in zorenje.','Darovanje in vzajemnost.','Zvestoba in iskrene vezi.','Ustvarjalna igra in umetnost ustvarjanja.','Življenjska pot in izbire.','Dom in pokončna moč.','Zemlja, intuicija in tihi prostor.','Vizija in širši pogled.','Premislek in odpuščanje.','Znanje v odgovornem dejanju.','Jasnost in razločevanje.','Skupnost in medsebojna podpora.','Pogum in zaključek cikla.'
  ] : [
    'Beginnings and life emerging.','Breath, voice and the force of change.','Quiet before renewal.','Gathering what matters.','Life force and embodied wisdom.','Remembrance and transformation.','Balance and care for the living world.','Fertility and ripening.','Offering and reciprocity.','Loyalty and honest bonds.','Creative play and the joy of making.','Life path and choices.','Home and grounded strength.','Earth, intuition and sacred space.','Vision and a wider view.','Reflection and forgiveness.','Knowledge shaped into responsible action.','Clarity and discernment.','Community and mutual support.','Courage and completion.'
  ];
  function tzolkin(date) {
    const {year, month, day} = dateParts(date);
    const a = Math.floor((14 - month) / 12), yy = year + 4800 - a, mm = month + 12 * a - 3;
    const jdn = day + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
    const epoch = jdn - 584283;
    return { tone: ((epoch + 3) % 13 + 13) % 13 + 1, sign: ((epoch + 19) % 20 + 20) % 20 };
  }
  function drawTzolkin(target, date, heading) {
    if (!target) return;
    const t = tzolkin(date), title = document.createElement('h4'); title.textContent = heading;
    const code = document.createElement('p'); code.className = 'number-total'; code.textContent = `${t.tone} ${signNames[t.sign]}`;
    const meaning = document.createElement('p'); meaning.textContent = (sl ? `Ton ${t.tone}: ${toneMeaning[t.tone - 1]} ` : `Tone ${t.tone}: ${toneMeaning[t.tone - 1]} `) + (sl ? `Znak ${signNames[t.sign]}: ${signMeaning[t.sign]}` : `Sign ${signNames[t.sign]}: ${signMeaning[t.sign]}`);
    target.replaceChildren(title, code, meaning);
  }
  function renderDailyCombination(date) {
    const output = $('#dailyCombination');
    if (!output) return;
    const sky = $('#dailyReading')?.textContent || '';
    const question = $('#dailyPrompt')?.textContent || '';
    const t = tzolkin(date);
    output.textContent = sl
      ? `Skupni dnevni utrip · ${date}: ${sky} Tzolk’in doda ton ${t.tone} (${toneMeaning[t.tone - 1]}) in znak ${signNames[t.sign]} (${signMeaning[t.sign]}). ${question}`
      : `Combined daily rhythm · ${date}: ${sky} Tzolk’in adds tone ${t.tone} (${toneMeaning[t.tone - 1]}) and sign ${signNames[t.sign]} (${signMeaning[t.sign]}). ${question}`;
  }
  function renderPersonalBirth(first, last, birthDate) {
    const letters = normalizeName(`${first} ${last}`);
    if (!letters) throw new Error(sl ? 'Ime vsebuje neveljavne znake.' : 'The name contains no usable letters.');
    const {year, month, day} = dateParts(birthDate);
    const dateSum = `${year}${String(month).padStart(2,'0')}${String(day).padStart(2,'0')}`.split('').reduce((sum, d) => sum + Number(d), 0);
    const birth = { life: {total:dateSum, path:pathFor(dateSum)}, birthday: {total:day, path:pathFor(day)}, attitude: {total:day+month, path:pathFor(day+month)} };
    const normalized = $('#numerologyNormalized');
    text(normalized, (sl ? 'Uporabljena oblika: ' : 'Normalized spelling: ') + letters);
    const results = $('#numerologyResult'); results.replaceChildren();
    const birthGroup = document.createElement('section'); birthGroup.className = 'number-system';
    const groupTitle = document.createElement('h4'); groupTitle.textContent = sl ? 'Števila iz datuma rojstva' : 'Numbers from your birth date'; birthGroup.append(groupTitle);
    showPathCard(birthGroup, sl ? 'Življenjska pot' : 'Life Path', birth.life, `${year}${String(month).padStart(2,'0')}${String(day).padStart(2,'0')} → ${dateSum}`);
    showPathCard(birthGroup, sl ? 'Rojstno število · dan v mesecu' : 'Birthday number · day of month', birth.birthday, `${day}`);
    showPathCard(birthGroup, sl ? 'Odnosi do sveta · dan + mesec' : 'Attitude · day + month', birth.attitude, `${day} + ${month} = ${day+month}`);
    const lifeDebts = [...new Set([...birth.life.path, ...birth.birthday.path].filter(n => debts.includes(n)))];
    birthGroup.append(card(sl ? 'Karmični dolg v datumu' : 'Karmic debt in the date', lifeDebts.length ? lifeDebts.join(', ') : (sl ? 'Ni zaznanega števila 13, 14, 16 ali 19.' : 'No 13, 14, 16 or 19 appeared.'), lifeDebts.length ? lifeDebts.map(n => debtMeaning[n]).join(' ') : (sl ? 'Sestavljena števila v življenjski poti in rojstnem dnevu ne vključujejo teh tradicionalnih karmičnih dolgov.' : 'The Life Path and Birthday compound numbers do not include these traditional karmic debts.')));
    const methodNote = document.createElement('p'); methodNote.className = 'calc-note'; methodNote.textContent = sl ? 'Mojstrska števila so prikazana skupaj z osnovnim številom. Numerološke šole se pri nekaterih pravilih razlikujejo; razlage so simbolno izhodišče za razmislek.' : 'Master numbers are shown with their root number. Numerology schools differ on some rules; these readings are symbolic prompts for reflection.';
    birthGroup.append(methodNote);
    results.append(birthGroup);
    computeNameSystem(results, sl ? 'Pitagorejski sistem' : 'Pythagorean system', letters, py, true, birth);
    computeNameSystem(results, sl ? 'Kaldejski sistem' : 'Chaldean system', letters, chaldeanMap, false, birth);
    $('#personalTzHint').hidden = true;
    drawTzolkin($('#personalTzPanel'), birthDate, sl ? 'Tvoj osebni Tzolk’in iz rojstnega datuma' : 'Your birth Tzolk’in');
    const dailyDate = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Belize', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
    const dailyTz = $('#dailyTzolkin');
    if (dailyTz) drawTzolkin(dailyTz, dailyDate, sl ? 'Tzolk’in današnjega dne' : 'Today’s Tzolk’in');
    renderDailyCombination(dailyDate);
    const birthField = $('#nDate'); if (birthField) birthField.value = birthDate;
    const cycleField = $('#birthDate'); if (cycleField) { cycleField.value = birthDate; cycleField.dispatchEvent(new Event('change', {bubbles:true})); }
    document.querySelector('[data-dashboard-tab="numerology"]')?.click();
  }

  const form = $('#numerologyForm');
  if (form) {
    const dateInput = $('#numBirthDate'), chartDate = $('#nDate');
    if (dateInput && chartDate) {
      dateInput.addEventListener('change', () => { chartDate.value = dateInput.value; });
      chartDate.addEventListener('change', () => { dateInput.value = chartDate.value; });
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      try { renderPersonalBirth($('#numFirstName').value.trim(), $('#numSurname').value.trim(), $('#numBirthDate').value); }
      catch (error) { const status = $('#numerologyNormalized'); text(status, error.message); }
    });
  }
  const chartPanel = $('#dashboard-chart');
  if (chartPanel) {
    const natalForm = $('#natalForm');
    if (natalForm) chartPanel.prepend(natalForm);
    const start = $('#selectedTitle')?.closest('.section-head');
    const end = $('#model');
    if (start && end) {
      const explorer = document.createElement('div'); explorer.id = 'zodiacExplorer';
      let node = start;
      while (node) {
        const next = node.nextElementSibling;
        explorer.append(node);
        if (node === end) break;
        node = next;
      }
      chartPanel.append(explorer);
    }
  }
  const dailyTz = $('#dailyTzolkin');
  if (dailyTz) {
    const date = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Belize', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
    drawTzolkin(dailyTz, date, sl ? 'Tzolk’in današnjega dne' : 'Today’s Tzolk’in');
    renderDailyCombination(date);
  }
})();

