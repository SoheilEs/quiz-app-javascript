const score = localStorage.getItem("score");
const highScore = JSON.parse(localStorage.getItem("highScore"))||[];
const result = document.querySelector("h1")
const btn = document.querySelector("button");
const inp = document.querySelector("input");

result.innerText = score



const btnHandler = () => {
    if(!inp.value || !score){ 
        alert("Invalid username or score")
    }else{
        const finalScore = {
            name: inp.value,
            score
        }
        highScore.push(finalScore) 
        console.log(highScore);
        highScore.sort((a,b)=> b.score - a.score)
        highScore.splice(10)
        console.log(highScore)
        localStorage.setItem("highScore", JSON.stringify(highScore))
        localStorage.removeItem("score")
         window.location.replace("index.html")
    } 
}

btn.addEventListener("click", btnHandler)