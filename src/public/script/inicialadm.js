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

const abrirModalBtn = document.getElementById('abrirModalBtn');
const meuModal = document.getElementById('meuModal');
const fecharModal = document.querySelector('.fechar');
const formAssistido = document.getElementById('formAssistido');

abrirModalBtn.addEventListener('click', function () {
    meuModal.style.display = 'block';
});

fecharModal.addEventListener('click', function () {
    meuModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === meuModal) {
        meuModal.style.display = 'none';
    }
});

formAssistido.addEventListener('submit', function (event) {
    event.preventDefault();
    // Adicione aqui a lógica para lidar com os dados do formulário, por exemplo, enviá-los para o Firebase
    console.log('Dados do formulário:', formAssistido.elements);
    meuModal.style.display = 'none';
});

formAssistido.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtenha os valores dos campos do formulário
    const nome = formAssistido.elements.nome.value;
    const idade = formAssistido.elements.idade.value;
    const sexo = formAssistido.elements.sexo.value;
    const idGenero = formAssistido.elements.idGenero.value;
    const racaCor = formAssistido.elements.racaCor.value;
    const territorio = formAssistido.elements.territorio.value;
    const cadUnico = formAssistido.elements.cadUnico.value;

    // Adicione esses valores como um novo documento na coleção "assistidos"
    const db = firebase.firestore();
    const collectionName = 'assistidos';

    db.collection(collectionName).add({
            nome: nome,
            idade: idade,
            sexo: sexo,
            'id-genero': idGenero,
            'raca-cor': racaCor,
            territorio: territorio,
            'cad-unico': cadUnico
        })
        .then((docRef) => {
            console.log('Documento adicionado com ID:', docRef.id);
            // Feche o modal após a adição bem-sucedida
            meuModal.style.display = 'none';
        })
        .catch((error) => {
            console.error('Erro ao adicionar documento:', error);
        });
});