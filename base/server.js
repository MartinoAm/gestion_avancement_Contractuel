
const express = require('express');
const app = express();
const PORT = require('./config/portConfig');

const etabRouter = require('./models/etablissement.server');
const agentRouter = require('./models/agent.server');
const contratRouter = require('./models/contrat.server');

// const cors = require('cors');

app.use('/', etabRouter);
app.use('/', agentRouter);
app.use('/', contratRouter);


app.listen(PORT, () => {
    console.log('Server lancer dans le port: ', PORT);
})