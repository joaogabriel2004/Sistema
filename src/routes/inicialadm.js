const express = require('express');
const app = express();
const path = require('path');   

const router = express.Router();
const {
    getAuth,
    onAuthStateChanged
} = require('firebase/auth');
const {
    getFirestore,
} = require('firebase-admin/firestore');

const inicialadmHtmlPath = path.join(__dirname, '../views/inicialadm.html');

router.get('/', (req, res) => {
    const auth = getAuth();
    const db = getFirestore();

    // Verificar se o usuário está autenticado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuário está logado

            // Obter o email do usuário
            const email = user.email;

            // Consultar o papel do usuário no Firestore
            db.collection("users").doc(email).get().then((doc) => {
                if (doc.exists) {
                    var papel = doc.data().papel;
                    if (papel === "admin") {
                        // Consultar o documento "maria" no Firestore
                        db.collection("assistidos").doc("maria").get().then((doc) => {
                            if (doc.exists) {
                                // Obter todos os campos do documento "maria"
                                var dadosMaria = doc.data();
                                res.sendFile(inicialadmHtmlPath);
                            } else {
                                console.log("Documento 'maria' não encontrado");
                            }
                        }).catch((error) => {
                            console.error("Erro ao obter documento:", error);
                        });
                    } else {
                        // Usuário não é admin, redirecionar para a página de login
                        res.redirect('/login');
                    }
                } else {
                    // Documento do usuário não encontrado, redirecionar para a página de login
                    res.redirect('/login');
                }
            }).catch((error) => {
                console.error("Erro ao obter documento:", error);
                // Tratar erro, por exemplo, redirecionar para a página de login
                res.redirect('/login');
            });
        } else {
            // Usuário não está logado, redirecionar para a página de login
            res.redirect('/login');
        }
    });
});



// Rota para fornecer os dados da coleção "assistidos" para o frontend
app.get('/dados', async (req, res) => {
    try {
      const snapshot = await admin.firestore().collection('assistidos').get();
      const dados = [];
  
      snapshot.forEach(doc => {
        dados.push(doc.data());
      });
  
      res.json(dados);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

module.exports = router;
