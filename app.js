const express = require("express");
const app = express();

const PORT = 3000;

const Database = require('better-sqlite3');
const db = new Database('trening.db');

// CORS-middleware for å tillate forespørsler fra andre domener
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

app.post("/api/registrer_bruker", express.json(), (req, res) => {
    const {brukernavn, passord} = req.body;
    const eksisterer = db.prepare("SELECT * FROM Person WHERE brukernavn = ?").get(brukernavn);
    if (eksisterer) return res.status(409).json({ error: 'Brukernavn er allerede i bruk' });
    db.prepare("INSERT INTO Person (brukernavn, passord) VALUES(?,?)").run(brukernavn, passord);
    res.status(201).json({ message: 'Bruker registrert!' });
})

app.post('/api/login', express.json(), (req, res) => {
    const { brukernavn, passord } = req.body;
    const person = db.prepare('SELECT * FROM Person WHERE brukernavn = ? AND passord = ?').get(brukernavn, passord);
    if (!person) return res.status(401).json({ error: 'Feil brukernavn eller passord' });
    res.json({ brukernavn: person.brukernavn });
});

app.get('/api/ovelser', (req, res) => {
    const rows = db.prepare('SELECT navn, muskel FROM Ovelse').all();
    res.json(rows);
});

app.get('/api/bruker', (req, res) => {
    console.log("Forsøker å hente info om brukar.");
    const rows = db.prepare("SELECT brukernavn, passord FROM Person").all();
    res.json(rows);
})

app.get('/api/oekt/:brukernavn', (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

    const rows = db.prepare(`
        SELECT Oekt.oekt_id
        FROM Person
        JOIN Oekt ON Person.brukernavn = Oekt.brukernavn
        WHERE Person.brukernavn = ?
    `).all(brukernavn);

    res.json(rows);
});

// Rute som lar oss registrere en ny fjelltur for en person
app.post('/api/registrer_ovelse', express.json(), (req, res) => {
    // Henter ut data fra request body (det som klienten har sendt inn)
    const {navn, muskel} = req.body;
    // Registrer den nye fjellturen
    db.prepare('INSERT INTO Ovelse (navn, muskel) VALUES (?, ?)').run(navn, muskel);

    res.status(201).json({ message: 'Fjellturen er registrert!' });
});

//Registrere ny bruker
app.post('/api/signup', express.json(), (req, res) => {
    // Henter ut data fra request body (det som klienten har sendt inn)
    const { brukernavn, passord} = req.body;

    // Sjekk om personen eksisterer
    const person = db.prepare('SELECT * FROM Person WHERE brukernavn = ?').get(brukernavn);
    if (!person) return res.status(404).json({ error: 'Person ikke funnet' });

    // Registrerer ny bruker
    db.prepare('INSERT INTO Person (brukernavn, passord) VALUES (?, ?)').run(brukernavn, passord);

    res.status(201).json({ message: 'Bruker registrert er registrert!' });
});

// Åpner en viss port på serveren, og starter serveren
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});


//express - session, for å kunne fikse innloggingsystemet






