
const express = require('express');
const connexion = require('../config/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.post('/api/agent/add', (requete, reponse) => {
    const { matricule, nom_agent, prenom_agent, naissance, cin, adresse_agent, telephone, email, diplome, nom_poste, id_etab } = requete.body;
    const sql = 'INSERT INTO agent VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connexion.query(sql, [matricule, nom_agent, prenom_agent, naissance, cin, adresse_agent, telephone, email, diplome, nom_poste, id_etab], (erreur) => {
        if (erreur) {
            reponse.send("Erreur lors de l'insertion de requete !");
            return
        } else {
            reponse.send({
                message: "Insertion de donnee effectuee avec success !"
            });
        }
    });
})

router.put('/api/agent/update/:id', (requete, response) => {
    const { matricule, nom_agent, prenom_agent, dateNaiss, cin, adresse_agent, sexe, diplome, nom_poste, dateEmbauche, id_etab, tel, email } = requete.body;
    const { id } = requete.params;
    const sql = "UPDATE agent SET matricule = '" + matricule + "', nom_agent = '" + nom_agent + "',prenom_agent='" + prenom_agent + "',dateNaiss='" + dateNaiss + "'," +
        +"cin='" + cin + "', adresse_agent = '" + adresse_agent + "', sexe='" + sexe + "', diplome = '" + diplome + "', nom_poste = '" + nom_poste + "'," +
        +"dataEmbauche = '" + dateEmbauche + "', id_etab = '" + id_etab + "', tel = '" + tel + "', email = '" + email + "' WHERE matricule =" + id;

    connexion.query(sql, (erreur, res) => {
        if (erreur) {
            response.send("Erreur lors de la modification !");
        } else {
            response.send({
                message: "Modification Effectuee avec success !",
                data: res
            });
        }
    })
});

router.get('/api/agent', (requete, response) => {
    const sql = "SELECT * FROM agent";
    connexion.query(sql, (erreur, res) => {
        if (erreur) {
            response.send("Erreur lors de la recuperation de donnee").status(400);
        } else {
            response.json(res);
        }
    });
});

router.get('/api/agent/search/:matricule', (request, response) => {
    const { matricule } = request.params;
    const sql = "SELECT * FROM agent WHERE matricule = ?";
    connexion.query(sql, [matricule], (erreur, resultat) => {
        if (erreur) {
            response.status(500).send("Erreur de la recuperation de donnee", erreur);
        } else {
            response.status(200).json(resultat);
        }
    });
});

module.exports = router;