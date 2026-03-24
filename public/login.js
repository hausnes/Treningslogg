// Authentication system

//Behandler form
const form = document.getElementById("authenticate")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const authType = document.querySelector('input[name="authType"]:checked').value;
    const brukernavn = document.getElementById("name").value
    const passord = document.getElementById("password").value

// Sjekker om bruker skal logge inn eller registrere seg og går videre til funksjonen som gjør det
    if (authType === "login") {
        login(brukernavn, passord);
    }
    if (authType === "signup") {
        signup(brukernavn, passord)
    }
});

async function login(brukernavn, passord) {
// Finner stien til alle brukerene
    const response = await fetch('http://localhost:3000/api/bruker');
    const personer = await response.json();

    let login_status = false;

// Sjekker om både brukernavn og passord matcher med ein eksisterande bruker
    for (let i = 0; i < personer.length; i++) {
        if (brukernavn === personer[i].brukernavn && passord === personer[i].passord) {
            login_status = true;
        }
    }

    if (login_status === true) {
        localStorage.setItem("brukernavn", brukernavn)
        window.location.href = "index.html";
    }
    else {
        console.log("Feil brukernavn eller passord")
    }
}

async function signup(brukernavn, passord) {
// Poster brukernavn og passord til person i databasen min
    const response = await fetch("/api/registrer_bruker", {
        method: "POST",
        headers: {"Content-Type": "application/json"          
        },
        body: JSON.stringify({brukernavn, passord})
    });
    localStorage.setItem("brukernavn", brukernavn)
    window.location.href = "index.html";
};

// Slutt Authecation system








//session