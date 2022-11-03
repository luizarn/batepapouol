let nome = prompt('Qual é o seu lindo nome?');
let usuario;
let lastMessage;
let penultimateMessage;

listaMensagens = [];
pegarMensagens();
inicioBatepapo();


function inicioBatepapo(){
    usuario = {
        name: nome
    };
    
    const promesse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    promesse.then(setInterval(deuCerto, 5000));
    promesse.catch(deuErrado);
}


function deuCerto(){
    //pegarMensagens();
    console.log("seu nome está com o status ativo!")
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario);  
}

function deuErrado(erro){
    if ( erro.response.status === 400){
    alert('Esse usuário já está em uso :( Tente novamente');
    const nome = prompt('Qual é o seu lindo nome?')
    inicioBatepapo();
} else{
    alert("Ocorreu un erro!");
}
}

//Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido

function pegarMensagens() {
//1º como pegar mensagens do servidor
const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

promessa.then(respostaChegou);
}

setInterval(pegarMensagens, 3000); //atualizar as mensagens a cada 3 segundos

function respostaChegou(resposta){
    console.log("it's all good")
   
    //adicionar o que veio do servidor para a array vazia
    listaMensagens = resposta.data;

    //adicionar na tela do app as mensagens do servidor
    renderizarMensagens();
}

//2º como exibir conforme o layout -> de acordo com os fundos

//preciso selecionar o quadro onde as mensagens serão inseridas
function renderizarMensagens(){
 const quadroPrincipal = document.querySelector(".caixadeMensagens");

//o conteudo dessa cte que virou a caixa tem que ser zerada inicialmente para não ficar adicionando duplicamente
    quadroPrincipal.innerHTML = '';
//percorrer o array para adicionar li por li no ul
for(let i = 0; i < listaMensagens.length; i++){
    let message = listaMensagens[i];

    if(message.type === 'status'){
        quadroPrincipal.innerHTML += 
    `<li class = "mensagem fundocinza" data-test="message">
    <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span>  ${message.text} </p>
     </li>
     `
    }else if(message.type === 'message'){
        quadroPrincipal.innerHTML += 
        `<li class = "mensagem fundobranco" data-test="message">
        <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span> para <span class="negrito">${message.to}</span>: ${message.text} </p>
        </li>`
    } else if(message.type === 'private_message' && (message.from === nome || message.to === nome)){
        quadroPrincipal.innerHTML += 
    `<li class = "mensagem fundorosa" data-test="message">
    <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span> reservadamente para <span class="negrito">${message.to}</span>: ${message.text} </p>
    </li>
    `
    }else{
        quadroPrincipal.innerHTML += "";
    }
}

//fazer com que a última mensagem que foi adicionada fique sempre aparente
penultimateMessage = lastMessage;
let comparador = quadroPrincipal.querySelectorAll(".mensagem");
lastMessage = comparador[(comparador.length)-1];
if (lastMessage.innerHTML !== penultimateMessage.innerHTML){
    lastMessage.scrollIntoView();
}
}
renderizarMensagens();




function addMensagem(){
const msg = document.querySelector('.campo-texto').value;

let novamsg = {
    from: nome,
    to: "Todos",
    text: msg,
    type: "message"
};
console.log(novamsg)

const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novamsg);

promisse.then(pegarMensagens)
promisse.catch(msgnaoChegou)

limparTexto();

}

function msgnaoChegou(){
    window.location.reload()
}

function limparTexto(){
    document.querySelector('.campo-texto').value ="";
}