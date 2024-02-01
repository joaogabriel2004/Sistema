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
                        // Usuário é um admin, enviar a página inicial de admin
                        res.sendFile(inicialadmHtmlPath);
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

module.exports = router;
