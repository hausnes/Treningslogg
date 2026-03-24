function utformHTML() {
    const brukernavn = localStorage.getItem("brukernavn")
    document.getElementById("Navn").innerText = "Velkommen" + brukernavn;
}

utformHTML()

console.log(localStorage.getItem("brukernavn"))