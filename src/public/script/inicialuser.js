function iniciarBanco() {
    const firebaseConfig = {
        apiKey: "AIzaSyD4sZLJhNXYf_LZeF85LZhq_Myg_mGSjNU",
        authDomain: "sistema-corraproabraco.firebaseapp.com",
        projectId: "sistema-corraproabraco",
        storageBucket: "sistema-corraproabraco.appspot.com",
        messagingSenderId: "626902617736",
        appId: "1:626902617736:web:72f82ee3b30cda678dd93d"
    };
    firebase.initializeApp(firebaseConfig);
    listarTabela()
}


function listarTabela() {
    const db = firebase.firestore();

    // Exemplo de leitura de dados
    const collectionName = 'assistidos';

    // Obtém a referência para o corpo da tabela
    const corpoTabela = document.getElementById('corpoTabelaAssistidos');

    db.collection(collectionName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Extrai os dados de cada documento
            const data = doc.data();

            // Cria uma nova linha da tabela
            const novaLinha = document.createElement('tr');

            // Preenche cada célula da linha com os dados correspondentes
            novaLinha.innerHTML = `
                <td>${data.nome}</td>
                <td>${data.idade}</td>
                <td>${data.sexo}</td>
                <td>${data['id-genero']}</td>
                <td>${data['raca-cor']}</td>
                <td>${data.territorio}</td>
                <td>${data['cad-unico']}</td>
            `;

            // Adiciona a nova linha ao corpo da tabela
            corpoTabela.appendChild(novaLinha);
        });
    }).catch((error) => {
        console.error("Erro ao obter dados: ", error);
    });
}