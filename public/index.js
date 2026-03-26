function utformHTML() {
    const brukernavn = localStorage.getItem("brukernavn");

    if (!brukernavn) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("Navn").innerText = "Velkommen " + brukernavn;
}

utformHTML();