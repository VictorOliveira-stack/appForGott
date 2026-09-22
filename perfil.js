/*Vanilla JS URLSearchParams tutorial"

"Pass data between HTML pages using Query Parameters"

"Filter fetch API results by URL parameter in JavaScript" */

async function carregarPostsDoUsuario() {
    // 1. Extrai o nome do autor passado na URL (ex: perfil.html?autor=victor)
    const urlParams = new URLSearchParams(window.location.search);
    const autorProcurado = urlParams.get("autor");
  
    const tituloPerfil = document.getElementById("tituloPerfil");
    const container = document.getElementById("renderPostsUsuario");
  
    if (!autorProcurado) {
      tituloPerfil.textContent = "Usuário não encontrado";
      container.innerHTML = "<p>Nenhum usuário foi informado.</p>";
      return;
    }
  
    // Atualiza o título da página com o nome do autor
    tituloPerfil.textContent = `Publicações de @${autorProcurado}`;
  
    try {
      // Busca todos os posts no seu servidor backend
      const resposta = await fetch("https://dbsqlite.onrender.com/enderFront");
  
      if (!resposta.ok) {
        throw new Error(`Erro: ${resposta.status}`);
      }
  
      const respostaServidor = await resposta.json();
      const listaPosts = respostaServidor.dados;
  
      if (!Array.isArray(listaPosts)) {
        container.innerHTML = "<p>Erro ao ler postagens do servidor.</p>";
        return;
      }
  
      // Filtra APENAS os posts em que o 'autor' é igual ao 'autorProcurado'
      const postsDoAutor = listaPosts.filter(
        (item) => item.autor.toLowerCase() === autorProcurado.toLowerCase()
      );
  
      if (postsDoAutor.length === 0) {
        container.innerHTML = "<p>Este usuário ainda não possui publicações.</p>";
        return;
      }
  
      // Inverte para exibir os mais recentes primeiro
      postsDoAutor.reverse();
  
      // Constrói o HTML dos posts
      let htmlContent = `<div class="accordion" id="accordionPerfil">`;
  
      postsDoAutor.forEach((item, index) => {
        const collapseId = `collapsePerfil${index}`;
        const headingId = `headingPerfil${index}`;
  
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
                 data-bs-parent="#accordionPerfil">
              <div class="accordion-body">
                ${item.texto}
              </div>
            </div>
          </div>
          <br>
        `;
      });
  
      htmlContent += `</div>`;
      container.innerHTML = htmlContent;
  
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro);
      container.innerHTML = "<p>Erro ao carregar as publicações do usuário.</p>";
    }
  }
  
  carregarPostsDoUsuario();