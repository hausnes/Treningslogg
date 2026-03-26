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
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brukernavn, passord })
    });

    if (response.ok) {
        localStorage.setItem("brukernavn", brukernavn);
        window.location.href = "index.html";
    } else {
        console.log("Feil brukernavn eller passord");
    }
}

async function signup(brukernavn, passord) {
    const response = await fetch("/api/registrer_bruker", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({brukernavn, passord})
    });

    if (!response.ok) {
        const data = await response.json();
        console.log("Registrering feilet:", data.error);
        return;
    }

    localStorage.setItem("brukernavn", brukernavn);
    window.location.href = "index.html";
};

// Slutt Authecation system








//session