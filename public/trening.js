const form = document.getElementById("authenticate")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const authType = document.querySelector('input[name="authType"]:checked').value;
    const brukernavn = document.getElementById("name").value
    const passord = document.getElementById("password").value

    if (authType === "login") {
        login();
    }
});

async function login() {
    const response = await fetch('http://localhost:3000/api/bruker');
    const personer = await response.json();

    console.log(personer)
}
//session