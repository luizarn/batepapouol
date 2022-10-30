
listaMensagens = [];
let lastMessage;

setInterval(pegarMensagens, 3000);

//Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido

function pegarMensagens() {
//1º como pegar mensagens do servidor
const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

promessa.then(respostaChegou);
}

pegarMensagens()



function respostaChegou(resposta){
    console.log("it's all good")
   
    //adicionar o que veio do servidor para a array vazia
    listaMensagens = resposta.data;
    console.log(listaMensagens)

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
    `<li class = "mensagem fundocinza">
    <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span>  ${message.text} </p>
     </li>
     `
    } else if(message.type === 'private_message'){
        quadroPrincipal.innerHTML += 
    `<li class = "mensagem fundorosa">
    <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span> reservadamente para <span class="negrito">${message.to}</span>: ${message.text} </p>
    </li>
    `
    } else{
        quadroPrincipal.innerHTML += 
        `<li class = "mensagem fundobranco">
        <p> <span class="letracinza">(${message.time})</span> <span class="negrito">${message.from}</span> para <span class="negrito">${message.to}</span>: ${message.text} </p>
        </li>`
    }
}
let lastMessage = quadroPrincipal.querySelectorAll(".mensagem");
lastMessage[(lastMessage.length)-1].scrollIntoView();
}
renderizarMensagens();


//function addMensagem(){

//function attMensages(){

   // lastme
   // const lastmessage = document.querySelector(".mensagem");
  // lastmessage.scrollIntoView();
//}

