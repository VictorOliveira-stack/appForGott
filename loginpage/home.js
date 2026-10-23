async function carregarPosts() {
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
              <small>Por:<strong> <a href="perfilapi.html?autor=${encodeURIComponent(item.autor)}">${item.autor}</a></strong></a></small>
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
  setInterval(carregarPosts, 10 * 60 * 1000); // Executa a cada 10 minutos

  //fazer postagem via front end

  async function postarHomeApi() {

    //const imagemHomeApi = document.getElementById("imagemhomeapi ").value
    const tituloHomeApi = document.getElementById("titulohomeapi").value
    const textHomeApi = document.getElementById("texthomeapi").value

    if (!tituloHomeApi || !textHomeApi){
        alert("Titulo e texto são nescessários!")
        return
    }

    //const dadosJson = {imagemHomeApi, tituloHomeApi, textHomeApi}
    const dadosJson = {tituloHomeApi, textHomeApi}

    try {
        
        const respostaPostarHomeApi = await fetch('https://dbsqlite.onrender.com/postarfromfrontend', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // ESSENCIAL para receber e salvar o cookie de sessão!
            body: JSON.stringify(dadosJson)

        })

        // Se o servidor recusar (ex: 401 Unauthorized), captura o erro aqui
        if (!respostaPostarHomeApi.ok) {
            const erroData = await respostaPostarHomeApi.json().catch(() => ({}));
            throw new Error(erroData.error || `Erro: ${respostaPostarHomeApi.status}`);
        }

        const resultadoPostarHomeApi = await respostaPostarHomeApi.json()
        console.log("Post feito com sucesso!", resultadoPostarHomeApi)

        document.getElementById("titulohomeapi").value = "";
        document.getElementById("texthomeapi").value = "";


    } catch (error) {
        console.log("Error em postarHomeAp / home.js", error)
        alert("Falha ao postar: " + error.message);
    }


  }