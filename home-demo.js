(() => {
  'use strict';
  // Public, deliberately separate demo content. No Firebase or private question-bank calls are made here.
  const examples = [
    {year:'Year 1', question:'Mia has 3 apples. She gets 2 more. How many apples does she have?', choices:['4','5','6'], answer:'5', explanation:'3 apples and 2 apples make 5 apples.'},
    {year:'Year 2', question:'A juice costs 35p. You pay with 50p. How much change do you get?', choices:['10p','15p','20p'], answer:'15p', explanation:'50p − 35p = 15p.'},
    {year:'Year 3/4', question:'What is 4 × 6?', choices:['10','20','24'], answer:'24', explanation:'Four groups of six make 24.'},
    {year:'Year 5/6', question:'What is 25% of 40?', choices:['5','10','15'], answer:'10', explanation:'25% is one quarter, and one quarter of 40 is 10.'},
    {year:'Year 7/8', question:'Solve: 3x + 2 = 17. What is x?', choices:['3','5','7'], answer:'5', explanation:'Subtract 2, then divide 15 by 3.'},
    {year:'Year 9/10', question:'A right angle is split into 35° and one other angle. What is the other angle?', choices:['45°','55°','65°'], answer:'55°', explanation:'Angles in a right angle total 90°, so 90° − 35° = 55°.'},
    {year:'11+', question:'Red and blue counters are in the ratio 2:3. If there are 8 red counters, how many blue counters are there?', choices:['10','12','16'], answer:'12', explanation:'If 2 parts are 8, one part is 4. Three parts are 12.'}
  ];
  const levels = document.querySelector('.demo-levels');
  const year = document.querySelector('.demo-year');
  const question = document.querySelector('.demo-question');
  const answers = document.querySelector('.demo-answers');
  const check = document.querySelector('.check-demo');
  const feedback = document.querySelector('.demo-feedback');
  const explanation = document.querySelector('.demo-explanation');
  if (!levels || !year || !question || !answers || !check || !feedback || !explanation) return;
  let selected = 0;
  let answer = '';
  const render = index => {
    selected = index;
    answer = '';
    levels.replaceChildren(); answers.replaceChildren(); feedback.textContent = ''; explanation.hidden = true; explanation.textContent = ''; check.disabled = true;
    const item = examples[index];
    examples.forEach((example, position) => {
      const tab = document.createElement('button'); tab.type = 'button'; tab.className = 'demo-tab'; tab.textContent = example.year; tab.setAttribute('role', 'tab'); tab.setAttribute('aria-selected', String(position === index));
      tab.addEventListener('click', () => render(position)); levels.append(tab);
    });
    year.textContent = `${item.year} sample`;
    question.textContent = item.question;
    item.choices.forEach(choice => {
      const option = document.createElement('button'); option.type = 'button'; option.className = 'demo-option'; option.textContent = choice; option.setAttribute('aria-pressed', 'false');
      option.addEventListener('click', () => { answer = choice; [...answers.children].forEach(button => button.setAttribute('aria-pressed', String(button === option))); check.disabled = false; feedback.textContent = ''; explanation.hidden = true; });
      answers.append(option);
    });
  };
  check.addEventListener('click', () => {
    const item = examples[selected];
    const correct = answer === item.answer;
    feedback.textContent = correct ? 'Correct — well done!' : 'Not quite — try again.';
    feedback.className = `demo-feedback ${correct ? 'is-correct' : 'is-try-again'}`;
    if (correct) { explanation.textContent = item.explanation; explanation.hidden = false; }
  });
  render(0);
})();
