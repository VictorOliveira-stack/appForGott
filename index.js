async function carregarPosts() {
  try {
    const resposta = await fetch("https://dbsqlite.onrender.com/enderFront");

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status}`);
    }

    const respostaServidor = await resposta.json();
    console.log(`Dados brutos da API:`, respostaServidor);

    const listaPosts = respostaServidor.dados;

    if (!Array.isArray(listaPosts)) {
      console.error("A propriedade 'dados' não veio como lista:", listaPosts);
      return;
    }

    listaPosts.reverse();

    const container = document.getElementById("renderGetFetch");

    let htmlContent = `<div class="accordion" id="accordionPosts">`;

    listaPosts.forEach((item, index) => {
      const collapseId = `collapse${index}`;
      const headingId = `heading${index}`;
      // Usamos o ID único (UUID) do item para diferenciar cada post
      const postId = item.id || `post-${index}`;

      let htmlImagem = "";
      if (item.imagem && item.imagem !== "") {
        htmlImagem = `
          <div class="mb-2 text-center">
            <img src="data:image/jpeg;base64,${item.imagem}" 
                class="img-fluid rounded" 
                alt="Imagem do post" 
                style="max-height: 250px; width: 100%; object-fit: cover;">
          </div>
        `;
      }

      htmlContent += `
        <div class="accordion-item" id="${postId}" style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.585);">
        
          ${htmlImagem}

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

          <div class="d-flex justify-content-between align-items-center mt-3 text-muted px-3 pb-3">
            <small>Por:<strong> <a href="perfil.html?autor=${encodeURIComponent(item.autor)}">${item.autor}</a></strong></small>
            
            <!-- Botão de Compartilhar usando o ID (UUID) do Post -->
            <button class="btn btn-sm btn-outline-secondary" onclick="compartilharPost('${postId}', '${item.titulo}')">
              🔗 Compartilhar
            </button>
          </div>

        </div>
        <br>
      `;
    });

    htmlContent += `</div>`;

    container.innerHTML = htmlContent;

    // Se a página foi aberta com uma âncora de ID na URL (ex: #seu-uuid), rola a tela até lá
    verificarERolarAtePost();

  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
  }
}

// Função de Compartilhamento (Nativo em celulares ou copia o link no PC)
function compartilharPost(idDoPost, tituloDoPost) {
    const urlDoPost = window.location.origin + window.location.pathname + "#" + idDoPost;

    if (navigator.share) {
        navigator.share({
            title: tituloDoPost,
            text: 'Veja essa postagem: ' + tituloDoPost,
            url: urlDoPost,
        }).catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
        navigator.clipboard.writeText(urlDoPost).then(() => {
            alert("Link do post copiado para a área de transferência!");
        }).catch(err => {
            console.error('Erro ao copiar link: ', err);
        });
    }
}

// Opcional: Rola a página automaticamente para o post se o usuário abrir o link direto
function verificarERolarAtePost() {
    if (window.location.hash) {
        setTimeout(() => {
            const elemento = document.querySelector(window.location.hash);
            if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth' });
                // Abre o accordion automaticamente se quiser destacar
                const botaoAcordeon = elemento.querySelector('.accordion-button');
                const collapseDiv = elemento.querySelector('.accordion-collapse');
                if (botaoAcordeon && collapseDiv) {
                    botaoAcordeon.classList.remove('collapsed');
                    botaoAcordeon.setAttribute('aria-expanded', 'true');
                    collapseDiv.classList.add('show');
                }
            }
        }, 300);
    }
}

carregarPosts();
setInterval(carregarPosts, 10 * 60 * 1000);

/*async function carregarPosts() {
  try {
    const resposta = await fetch("https://dbsqlite.onrender.com/enderFront");

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status}`);
    }

    // Recebe a resposta do servidor (é um objeto com { status, message, dados })
    const respostaServidor = await resposta.json();
    console.log(`Dados brutos da API:`, respostaServidor);

    // Extrai a lista de posts de dentro de respostaServidor.dados
    const listaPosts = respostaServidor.dados;

    // Garantia de que temos um Array para iterar
    if (!Array.isArray(listaPosts)) {
      console.error("A propriedade 'dados' não veio como lista:", listaPosts);
      return;
    }

    // Inverte a ordem da lista (o último cadastrado fica em primeiro)
    listaPosts.reverse();

    const container = document.getElementById("renderGetFetch");

    // Começamos a construir a estrutura do accordion
    let htmlContent = `<div class="accordion" id="accordionPosts">`;

    listaPosts.forEach((item, index) => {
      const collapseId = `collapse${index}`;
      const headingId = `heading${index}`;

      let htmlImagem = "";
      if (item.imagem && item.imagem !== "") {
        htmlImagem = `
          <div class="mb-2 text-center">
            <img src="data:image/jpeg;base64,${item.imagem}" 
                class="img-fluid rounded" 
                alt="Imagem do post" 
                style="max-height: 250px; width: 100%; object-fit: cover;">
          </div>
        `;
      }

      htmlContent += `
        <div class="accordion-item" style="box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.585);">
        
          ${htmlImagem}

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

          <div class="mt-3 text-muted" style="margin-left: 22px;">
            <small>Por:<strong> <a href="perfil.html?autor=${encodeURIComponent(item.autor)}">${item.autor}</a></strong></a></small>
          </div>

        </div>
        <br>
      `;

      console.log(`Título: ${item.titulo}`);
      console.log(`Texto: ${item.texto}`);
      console.log(`Autor: ${item.autor}`);
      console.log("_____________________________________");
    });

    htmlContent += `</div>`;

    // Injeta todo o HTML gerado na div container
    container.innerHTML = htmlContent;

  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
  }
}

carregarPosts();
setInterval(carregarPosts, 10 * 60 * 1000);*/ // Executa a cada 10 minutos

/*
        <div class="mt-3 text-muted" style="margin-left: 22px;">
            <small>Por:<strong> <a href="perfil.html?id=${item.id}&nome=${encodeURIComponent(item.autor)}">${item.autor}</strong></a></small>
          </div>
*/

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