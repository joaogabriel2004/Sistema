const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD4sZLJhNXYf_LZeF85LZhq_Myg_mGSjNU",
    authDomain: "sistema-corraproabraco.firebaseapp.com",
    projectId: "sistema-corraproabraco",
    storageBucket: "sistema-corraproabraco.appspot.com",
    messagingSenderId: "626902617736",
    appId: "1:626902617736:web:72f82ee3b30cda678dd93d"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Use auth como middleware em todas as rotas que precisam de autenticação
app.use((req, res, next) => {
  req.auth = auth;
  next();
});

// Rota principal redireciona para a página de login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Rotas
const loginRoute = require('./routes/login');
const principalRoute = require('./routes/principal');
const inicialadmRoute = require('./routes/inicialadm');

app.use('/login', loginRoute);
app.use('/principal', principalRoute);
app.use('/inicialadm', inicialadmRoute);

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
