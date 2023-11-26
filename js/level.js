const btn = document.querySelectorAll("button")


const levelHandler = (e) => {
    const level = e.target.innerText.toLowerCase()
    localStorage.setItem("level", level)
    window.location.assign("/")
}


btn.forEach( button => button.addEventListener("click", levelHandler))