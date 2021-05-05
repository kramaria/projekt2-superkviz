
// pole otazok s objektami
  
const questions = [
   {
    question: 'Kto urobil prvý krok na Mesiaci?',
    imagePath: 'obrazky/prvy_clovek.jpg',
    options: ['Neil Armstrong','Jim Lovell','Luke Skywalker', 'Yuri Gagarin'],
    correctAnswer_questionIndex: '0'
  },
  {
    question: 'Za koľko dní obehne Mesiac planétu Zem?',
    imagePath: 'obrazky/fazy_mesiaca.jpg',
    options: ['365 dní','31 dní', '27,32 dní', 'Ani jedna z možností'],
    correctAnswer_questionIndex: '2'
  },
  {
    question: 'Mesiac sa každý rok o určitú vzdialnosť od Zeme vzdiali, o koľko?',
    imagePath: 'obrazky/galaxia.jpg',
    options: ['1,3 km','3,8 cm', '103 m'],
    correctAnswer_questionIndex: '1'
  },
  {
    question: 'Akú má Mesiac v porovnaní so Zemou hmotnosť?',
    imagePath: 'obrazky/pohlad_na_zem.jpg',
    options: ['75 % celkovej hmotnosti Zeme','53,5 % celkovej hmotnosti Zeme', '16,5 % celkovej hmotnosti Zeme'],
    correctAnswer_questionIndex: '2'
  },
  {
    question: 'Najvyššia teplota na mesiaci sa pohybuje okolo:',
    imagePath: 'obrazky/zatmenie_slnka.jpg',
    options: ['117 °C','55 °C', '35 °C'],
    correctAnswer_questionIndex: '0'
  }
]

let current_questionIndex = 0;

// funkce createElements vytvori elementy, ktore drzia otazku

function createElements() {

  let quiz = document.querySelector('.kviz')

  // oznacenie poradia otazky
  let order = document.createElement('h2');
  order.setAttribute('id', 'poradi');
  quiz.appendChild(order);

  // samotna otazka
  let question_heading = document.createElement('h3');
  question_heading.setAttribute("id","otazka");
  quiz.appendChild(question_heading);

  // div obalujuci obrazok a odpovede
  let wrap = document.createElement('div');
  wrap.className = "obsah";

  // obalujuci div na obrazok s triedou foto a samotny obrazok
  let imageBox = document.createElement('div');
  imageBox.className = "foto";
  let image = document.createElement("img");
  image.setAttribute("id","obrazek");
  imageBox.appendChild(image);
  wrap.appendChild(imageBox);

  // obalujuci div na odpovede s id "moznosti" a ul s id "odpovedi"
  let wrapOfOptions = document.createElement('div')
  wrapOfOptions.setAttribute("id","moznosti");
  let answers = document.createElement('ul')
  answers.setAttribute("id","odpovedi");
  wrapOfOptions.appendChild(answers);
  wrap.appendChild(wrapOfOptions);
  
  quiz.appendChild(wrap);

}

createElements();

  // funkce setQuestionData vyplni elementy na drzanie otazky konktretnymi datami z pola objektov

function setQuestionData() {

  let order = document.querySelector('#poradi');
  let question_heading = document.querySelector('#otazka');
  let image = document.querySelector('#obrazek');
  let answers = document.querySelector('#odpovedi');

  // poradie otazky
  order.innerText = 'OTÁZKA ' + (current_questionIndex + 1) + ' / ' + questions.length;
  
  // otazka a obrazok
  question_heading.innerHTML = questions[current_questionIndex].question;
  image.src = questions[current_questionIndex].imagePath;

  // for cyklus pre generovanie odpovedi s konkretnymi datami
  for (let i=0; i<questions[current_questionIndex].options.length; i++) {
    
    let answer_item = document.createElement('li');
    answer_item.setAttribute("data-odpoved", i);
    answer_item.innerHTML = questions[current_questionIndex].options[i];
    answers.appendChild(answer_item);
  }
};

setQuestionData();


let wrapOfOptions = document.querySelector('#moznosti');

// pole, kde budu zaznamenane odpovede od uzivatela
let array_of_marked_answers = [];

// funkce showQuestion sa postara o obsluhu po kliknuti na odpoved
function showQuestion() {
  
  wrapOfOptions.addEventListener('click', function(udalost) {

  // premenna target_element zaznamena odpoved od uzivatela
  let answers = document.querySelector('#odpovedi');
  let target_element = udalost.target.innerText;
  array_of_marked_answers.push(target_element);

  // moznosti odpovedi z predchadzajucej otazky sa vymazu
  while (answers.hasChildNodes()) {
    answers.removeChild(answers.lastChild);
  }

  // navysenie indexu otazky
  current_questionIndex++;
  
  // po zobrazeni poslednej otazky sa zavola funkcia setResultPage, dovtedy sa vykonava na klik funkcia setQuestionData
  if (current_questionIndex < questions.length) {
  setQuestionData()
  } else {
  setResultPage()
  };
  })
};

showQuestion()

// funkce setResultPage zobrazuje vysledne hodnotenie
function setResultPage() {

  let quiz = document.querySelector('.kviz');

  // zacielenie html elementu s triedou "vysledek" a zmena zobrazeni z none na block
  let result = document.querySelector('.vysledek');
  result.style.display = "block";
  
  // kviz element sa prestane zobrazovat
  quiz.style.display = "none";

  // element s textom "tvoje hodnotenie"
  let result_heading = document.createElement('h2');
  result_heading.innerText = 'TVOJE HODNOTENIE';
  result.appendChild(result_heading);

  // sekcia so zadanim otazky a vyhodnotenim vsetkych odpovedi
  correct_answers = [];
  for (let i=0; i<questions.length; i++) {
    // zadanie otazky
    let question_heading = document.createElement('h3');
    
    result.appendChild(question_heading);

    // poradie otazky a zadanie otazky
    question_heading.innerText = (i + 1) + '. ' + questions[i].question;

    // zmena stylu - velkost textu a zarovnani
    question_heading.style.textAlign = "left";
    question_heading.style.fontSize = "1em";

    // vypisanie odpovede, ktoru oznacil uzivatel
    let result_evaluation_marked_answer = document.createElement('p');
    result.appendChild(result_evaluation_marked_answer);

    result_evaluation_marked_answer.innerText = "Tvoja odpoveď: " + array_of_marked_answers[i];

    // element na vyhodnotenie spravnosti odpovede
    let result_evaluation = document.createElement('p');
    result.appendChild(result_evaluation);

    // podminka - ak uzivatel oznacil spravnu odpoved, vypise sa "to je spravne", ak nie, vypise sa spravna odpoved
    if (questions[i].correctAnswer_questionIndex == questions[i].options.indexOf(array_of_marked_answers[i])) {
      result_evaluation.innerText = "To je SPRÁVNE"
      correct_answers.push("To je SPRÁVNE")

    } else {result_evaluation.innerText = "Správna odpoveď: " + questions[i].options[questions[i].correctAnswer_questionIndex]};
    
  };

  // vytvorenie elementu pre vypocet percenta uspesnoti, samotny vypocet 
  let result_percentage = document.createElement('h2');
  result.appendChild(result_percentage);
  percentage = correct_answers.length / questions.length;
  result_percentage.innerText = "SPRÁVNE " + correct_answers.length + " Z " + questions.length + " OTÁZOK. ÚSPEŠNOSŤ " + Math.round(percentage * 100) + " %."

};


          
       








































