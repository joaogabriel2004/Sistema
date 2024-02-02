const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');   
// Configurando o Express para usar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurando o Express para servir arquivos estáticos do diretório 'public'
app.use('/public', express.static(path.join(__dirname, '/src/public')));

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
const loginRoute = require('./src/routes/login');
const principalRoute = require('./src/routes/principal');
const inicialadmRoute = require('./src/routes/inicialadm');
const inicialuserRoute = require('./src/routes/inicialuser')

app.use('/login', loginRoute);
app.use('/principal', principalRoute);
app.use('/inicialadm', inicialadmRoute);
app.use('/inicialuser', inicialuserRoute)

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
