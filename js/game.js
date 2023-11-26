import {formatData} from './helper.js '


const loder = document.getElementById("loader")
const quiezSection = document.getElementById("container")
const questionText = document.getElementById("question-text")
const answerChoice = document.querySelectorAll(".answer-text")
const scoreText = document.getElementById("score")
const nextBtn = document.getElementById("next-button")
const questionNumberHolder = document.getElementById("question-number")
const finishBtn = document.getElementById("finish-button")
const errorText = document.getElementById("error")

const CORRECT_BONUS = 10 

const level = localStorage.getItem("level") || "medium";
const BASE_URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`


let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;





const fetchData = async () =>{
    try {
        const response =  await fetch(BASE_URL)
        const json = await response.json()
        formatedData = formatData(json.results)
        start()
    }catch(error){
        loder.style.display = "none"
        errorText.style.display = "block"
    }

 
}
const start = () => {
    showQuestion() 
    loder.style.display = "none"
    quiezSection.style.display = "block" 
}

const showQuestion = () => {
    questionNumberHolder.innerText = questionIndex + 1
    const{
        question,
        answers,
        correctAnswerIndex,
    }=formatedData[questionIndex]
    correctAnswer = correctAnswerIndex
    questionText.innerText = question
    answerChoice.forEach((button,index)=>{
        button.innerText = answers[index]
    })
}
const answerHandler = (event,index)=>{
    if (!isAccepted) {return;}
    isAccepted = false;
    const isCorrect = index === correctAnswer ? true : false
    if(isCorrect){
         event.target.classList.add("correct")
         score += CORRECT_BONUS 
         scoreText.innerText = score
    }else{
        event.target.classList.add("incorrect")
        answerChoice[correctAnswer].classList.add("correct")
    }
}

const nextQuestion = () => {
    questionIndex++; 
  
    if(questionIndex < formatedData.length){
        isAccepted = true;
        removeClass()
        showQuestion()
    }else {
      finishBtnHandler()
    }
}

const removeClass = ()=>{
    answerChoice.forEach(button => button.className = "answer-text")
}

const finishBtnHandler = () => {
    localStorage.setItem("score", JSON.stringify(score))
    window.location.replace ("/end.html")
}
 

window.addEventListener("load", fetchData())
answerChoice.forEach((item,index) => {
    item.addEventListener('click',(event)=>answerHandler(event,index))
})
nextBtn.addEventListener("click", nextQuestion)
finishBtn.addEventListener("click", finishBtnHandler)