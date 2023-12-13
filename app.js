const questions= [
  {
    question:"What is the capital of France?",
    answers:[
      {text:"Rome", correct:false},
      {text:"Berlin", correct:false},
      {text:"Paris", correct:true},
      {text:"Madrid", correct:false},
    ]
  },
  {
    question:"Which planet is known as the Red Planet?",
    answers:[
      {text:"Venus", correct:false},
      {text:"Mars", correct:true},
      {text:"Jupiter", correct:false},
      {text:"Saturn", correct:false},
    ]
  },
  {
    question:"What is the main ingredient in guacamole?",
    answers:[
      {text:"Tomato", correct:false},
      {text:"Avocado", correct:true},
      {text:"Onion", correct:false},
      {text:"Cilabtro", correct:false},
    ]
  },
  {
    question:"In which year did the United States declare its independence?",
    answers:[
      {text:"1746", correct:false},
      {text:"1756", correct:false},
      {text:"1766", correct:false},
      {text:"1776", correct:true},
    ]
  },{
    question:"Who wrote the philosophical work Thus Spoke Zarathustra?",
    answers:[
      {text:"Friedrich Nietzsche", correct:true},
      {text:"Jean-Jacques Rousseau", correct:false},
      {text:"Immanuel Kant", correct:false},
      {text:"Søren Kierkegaard", correct:false},
    ]
  }
]

let questionEl= document.getElementById("question")
let answerBtns= document.getElementById("answerBtns")
let nextBtn= document.getElementById("nextBtn")

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
  currentQuestionIndex=0
  score=0;
  nextBtn.innerHTML="Next"
  showQuestion();
}
function showQuestion(){
  resetPage()
  let currentQuestion= questions[currentQuestionIndex];
  let questionNo= currentQuestionIndex +1;
  questionEl.innerHTML=questionNo + ":" + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button=document.createElement("button");
    button.innerHTML=answer.text
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if(answer.correct){
      button.dataset.correct=answer.correct
    }
    button.addEventListener("click",selectAnswer)

  })
}

function resetPage(){
  nextBtn.style.display="none"
  while(answerBtns.firstChild){
    answerBtns.removeChild(answerBtns.firstChild)
  }
}
function selectAnswer(e){
  const selectedBtn= e.target;
  const isCorrect= selectedBtn.dataset.correct==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct")
    score= score+20
  }else{
    selectedBtn.classList.add("incorrect")
  }
  Array.from(answerBtns.children).forEach(button=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct")
    }button.disabled=true
  })
  nextBtn.style.display="block"

}
function showScore(){
  resetPage()
  questionEl.innerHTML=`You Scored ${score} out of 100`
  nextBtn.innerHTML="Play Again"
  nextBtn.style.display="block"
}

function keepNextBtn(){
  currentQuestionIndex++
  if(currentQuestionIndex<questions.length){
    showQuestion()
  }else{
    showScore()
  }
}

nextBtn.addEventListener("click", function(){
  if(currentQuestionIndex<questions.length){
    keepNextBtn()
  }else{
    startQuiz()
  }
})
startQuiz()
