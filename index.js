async function carregarPosts() {
    try {
      const resposta = await fetch("https://dbsqlite.onrender.com/receberdocliente");
      
      if (!resposta.ok) {
        throw new Error(`Erro: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
      dados.reverse(); //inverte a ordem do array para o ultimo virar o primeiro
      const container = document.getElementById("renderGetFetch");

      console.log(`os dados da API: `, dados)
  
      // Começamos a construir a estrutura da sanfona (accordion)
      let htmlContent = `<div class="accordion" id="accordionPosts">`;
  
      dados.forEach((item, index) => {
        // Criamos IDs únicos para o Bootstrap saber qual item abrir/fechar
        const collapseId = `collapse${index}`;
        const headingId = `heading${index}`;
        
        // O primeiro item inicia aberto (show), os demais fechados (collapsed) //retirei essa ideia do primeiro item aparecer aberto
        //const eOPrimeiro = index === 0;
  
        htmlContent += `
          <div class="accordion-item" style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.585);">
            <h2 class="accordion-header" id="${headingId}">
              <button class="accordion-button collapsed"
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#${collapseId}"
                      aria-expanded="false"
                      aria-controls="${collapseId}">
                <h3>${item.titulo}</h3>
                
              </button>
              <hr>
            </h2>
            
            <div id="${collapseId}" 
                 class="accordion-collapse collapse" 
                 aria-labelledby="${headingId}" 
                 data-bs-parent="#accordionPosts">
              <div class="accordion-body">
                ${item.texto}
                


              </div>
            </div>

            <div class="mt-3 text- text-muted" style="margin-left: 22px;">
                  <small>Por: <strong>${item.autor}</strong></small>
            </div>

          </div>

          <br>
        `;

        console.log(`o titulo: ${item.titulo}`);
            console.log(`o texto: ${item.texto}`);
            console.log(`o autor: item: ${item.autor}`)
            console.log("_____________________________________")
      });
  
      htmlContent += `</div>`;
  
      // Injeta todo o HTML gerado na div container
      container.innerHTML = htmlContent;
  
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
    }
  }
  carregarPosts();
  setInterval(carregarPosts, 10 * 60 * 1000)//600000

/*async function buscarDados(){
    try {
        const resposta = await fetch("https://dbsqlite.onrender.com/receberdocliente")

        const renderGetFetch = document.getElementById("renderGetFetch")

        if (!resposta.ok){
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log(dados)

        //sem loop se consulta por index
        /*console.log(`os dados: ${dados[1].titulo}`)
        console.log(`texto: ${dados[1].texto}`)
        console.log("autor:", dados[1].autor)

        dados.forEach(item => {

            const card = document.createElement('div')

            card.innerHTML = `
                <h2>${item.titulo}</h2>
                <p>${item.texto}</p>
                <small> <small>Por</small> ${item.autor} </small>

            `

            renderGetFetch.appendChild(card)

            console.log(`o titulo: ${item.titulo}`);
            console.log(`o texto: ${item.texto}`);
            console.log(`o autor: item: ${item.autor}`)
            console.log("_____________________________________")
        });



    } catch (error) {
        console.error("Falha ao buscar dados", error)
    }
}
buscarDados()
setInterval(buscarDados, 10 * 60 * 1000) //ou 600000*/

/*
const container = document.getElementById('meu-container');

dados.forEach((item) => {
  // Cria uma div para cada post do banco
  const card = document.createElement('div');
  
  card.innerHTML = `
    <h2>${item.titulo}</h2>
    <p>${item.texto}</p>
    <small>Escrito por: ${item.autor}</small>
  `;

  container.appendChild(card);
});
*/

//method post
/*

async function criarPost() {
  const novoPost = {
    title: 'Meu Novo Post',
    body: 'Conteúdo do post incrível',
    userId: 1
  };

  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Informa ao servidor que estamos enviando JSON
      },
      body: JSON.stringify(novoPost) // Converte o objeto JS para uma string JSON
    });

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status}`);
    }

    const dadosCriados = await resposta.json();
    console.log('Criado com sucesso:', dadosCriados);

  } catch (erro) {
    console.error('Erro ao enviar:', erro);
  }
}

criarPost();

*/