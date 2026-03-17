const express = required("express");
const app = express();

const PORT = 3000;

const Database = require('better-sqlite3');
const db = new Database('trening.db');

// CORS-middleware for å tillate forespørsler fra andre domener
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

app.get('/api/ovelser', (req, res) => {
    const rows = db.prepare('SELECT navn, muskel FROM Ovelse').all();
    res.json(rows);
});

app.get('api/bruker', (req, res) => {
    const rows = db.prepare("SELECT brukernavn FROM Person");
    res.json(rows);
})

app.get('api/oekt/:brukernavn', (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

    const rows = db.prepare(`
        SELECT Oekt.oekt_id
        FROM Person
        JOIN Oekt ON Person.brukernavn = Oekt.brukernavn
        JOIN Oekt ON oekt.oekt.id = Oekt.oekt_id
        WHERE Person.brukernavn = ?
    `).all(brukernavn);

    res.json(rows);
});
