const express = require('express');
const router = express.Router();
const path = require('path');
const {
    getAuth,
    onAuthStateChanged
} = require('firebase/auth');
const {
    getFirestore,
} = require('firebase-admin/firestore');

const principalHtmlPath = path.join(__dirname, '../views/principal.html');

// Rota principal
router.get('/', (req, res) => {
    const auth = getAuth();
    const db = getFirestore();

    // Verificar se o usuário está autenticado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const email = user.email;

            // Consultar o papel do usuário no Firestore
            db.collection("users").doc(email).get().then((doc) => {
                if (doc.exists) {
                    var papel = doc.data().papel;

                    if (papel === "admin") {
                        // Usuário é um admin, redirecionar para a rota de admin
                        res.redirect('/inicialadm');
                    } else {
                        // Usuário não é admin, redirecionar para a página principal
                        res.redirect('/inicialuser');
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