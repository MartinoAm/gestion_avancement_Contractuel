
const express = require('express');
const connexion = require('../config/dbConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({
//     extended: true
// }));


router.get('/api/etablissement', (req, res) => {
    connexion.query('SELECT * FROM etablissement', (erreur, resultat) => {
        if (erreur) {
            console.log("Erreur de la recuperation de donnee");
            res.status(500).send('erreur de la recuperation de donnee!!!');
            return;
        }
        res.json(resultat);
    });
});

router.post('/api/etablissement/add', (req, res) => {

    const { id_etab, nom_etab, adress_etab } = req.body;
    let sql = 'INSERT INTO etablissement VALUES (?, ?, ?)';

    connexion.query(sql, [id_etab, nom_etab, adress_etab], (erreur) => {
        if (erreur) {
            res.send({
                status: false,
                message: "erreur de l'insertion de donnee"
            });
        }
        res.send({
            status: true,
            message: "Insertion success"
        });
    });
});

router.put('/api/etablissement/update/:id', (request, response) => {
    const { id_etab, nom_etab, adress_etab } = request.body;
    const { id } = request.params;
    const sql = "UPDATE etablissement SET nom_etab = ?, adress_etab = ? WHERE id_etab = ?";
    connexion.query(sql, [nom_etab, adress_etab, id], (erreur, resultat) => {
        if (erreur) {
            response.status(500).send("Erreur lors de la recuperation de donnee", erreur);
        } else {
            response.status(200).send("Modification reussi !");
        }
    });
});

router.delete('/api/etablissement/delete/:id', (request, response) => {
    const { id } = request.params;
    const sql = 'DELETE FROM etablissement WHERE id_etab = ?';
    connexion.query(sql, [id], (erreur) => {
        if (erreur) {
            response.status(500).send("Erreur lors de la suppression de donnee ", erreur);
        } else {
            response.status(200).send("Supression Success!");
        }
    });
});

// router.delete('/api/etablissement/delete/:id', (req, res) => {
//     let sql = "DELETE FROM etablissement WHERE id_etab =" + req.params.id;
//     connexion.query(sql, (erreur) => {
//         if (erreur) {
//             res.send({
//                 status: false,
//                 message: 'Erreur lors de suppression!'
//             });
//         }
//         res.send({
//             status: true,
//             message: 'Supresseion reussi !!!!'
//         });
//     });
// });

module.exports = router;