
const express = require("express");
const connexion = require("../config/dbConfig");
const bodyParser = require("body-parser");
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.post('/api/contrat/add', (requete, response) => {
    const { code_contrat, matricule, grade, type_contrat, refdoss, datecontrat } = requete.body;
    const sql = "INSERT INTO contrat VALUES ( ?, ?, ?, ?, ?, ?)";
    connexion.query(sql, [code_contrat, matricule, grade, type_contrat, refdoss, datecontrat], (erreur) => {
        if (erreur) {
            response.send("Erreur lors de l'insertion de nouvelle contrat", erreur);
        } else {
            response.status(200).send("Insertion effectuee avec success !");
        }
    });
});

router.put('/api/contrat/update/:id', (request, response) => {
    const { id } = request.params;
    const { grade, type_contrat } = request.body;
    const sql = "UPDATE contrat SET grade = ?, type_contrat = ? WHERE  matricule = ?";
    connexion.query(sql, [grade, type_contrat, id], (erreur) => {
        if (erreur) {
            response.status(500).send("Erreur lors de la modification de donnee", erreur);
        } else {
            response.status(200).send("Modification reussi");
        }
    });
});

router.get('/api/contrat/count', (request, response) => {

    const sql = "SELECT COUNT(*) AS nombrecontrat FROM contrat";
    connexion.query(sql, (erreur, res) => {
        if (erreur) {
            response.send("Erreur lors de la recuperation de donnee");
        } else {
            response.json(res);
        }
    });
});

router.get('/api/contrat/search/:matricule', (request, response) => {
    const { matricule } = request.params;
    const sql = "SELECT * FROM contrat WHERE matricule =" + matricule;
    connexion.query(sql, [matricule], (erreur, resultat) => {
        if (erreur) {
            response.send('Erreur de la recuperation de donnee avec le matricule', erreur);
        } else {
            response.json(resultat);
        }
    });
});

router.get('/api/contrat', (request, response) => {
    const sql = 'SELECT * FROM contrat';
    connexion.query(sql, (erreur, resultat) => {
        if (erreur) {
            response.send("Erreur lors de la recuperation de donnee", erreur);
        } else {
            response.json(resultat);
        }
    });
});


router.get('/api/contrat/search', (req, res) => {
    const searchTerm = req.body;
    const query = "SELECT * FROM contrat WHERE matricule = " + searchTerm;

    connexion.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', err);
            res.status(500).json({ error: 'Erreur lors de la recherche des utilisateurs' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;