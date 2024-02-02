require('isomorphic-fetch');
const express = require('express');
const path = require('path'); // Importe o módulo 'path'

const router = express.Router();

// Use path.join para lidar com caminhos de forma segura
const loginHtmlPath = path.join(__dirname, '../views/login.html');

router.get('/', (req, res) => {
  res.sendFile(loginHtmlPath);
});

// Verificar se digitou certo e nível de acesso
const {
  initializeApp,
  applicationDefault,
  cert
} = require('firebase-admin/app');
const {
  getAuth,
  signInWithEmailAndPassword
} = require('firebase/auth');


const serviceAccount = require('../sistema-corraproabraco-firebase-adminsdk-libko-a61185313d.json');

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();


// Rota para processar os dados do formulário (deve ser um método POST)
router.post('/processar', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    console.log('Login bem-sucedido:', user);

    // Aqui você pode redirecionar o usuário para outra página ou enviar uma resposta ao cliente
    res.redirect('/principal');
  } catch (error) {
    console.error('Erro ao realizar o login:', error.message);

    // Aqui você pode redirecionar o usuário para uma página de erro ou enviar uma resposta ao cliente
    res.status(500).send('Erro ao realizar o login');
  }
});

module.exports = router;