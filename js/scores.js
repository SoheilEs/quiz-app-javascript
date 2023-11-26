const scores = JSON.parse(localStorage.getItem("highScore")) || []

const list = document.querySelector("ol")

list.innerHTML = scores.map((score, index) => {
     return `
        <li>
            <span>${index + 1}</span>
            <p>${score.name}</p>
            <span>${score.score}</span>
        </li>
     `
})