const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestionavencementcontractuel'
});

connexion.connect((erreur) => {
    if (erreur) {
        throw erreur
    }

    console.log('Connexion etablie au serveur de base de donnee ');
});


module.exports = connexion;