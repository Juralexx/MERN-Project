const mongoose = require('mongoose');
const database = process.env.DATABASE.replace('<USER:PASSWORD>', process.env.DATABASE_USER_AND_PASS);

mongoose
    .connect(database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log('Connexion à la base donnée réussie !'))
    .catch((err) => console.log('Impossible de se connecter à la base de donnée', err));



