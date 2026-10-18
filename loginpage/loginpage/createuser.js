
async function createUserJson(){
   
      const nameformCreateUser = document.getElementById("nameformCreateUser").value
      const emailformCreateUser =  document.getElementById("emailformCreateUser").value
      const passwordformCreateUser =  document.getElementById("passwordformCreateUser").value
      //const fotoperfilformCreateUser =  document.getElementById("fotoperfilformCreateUser").value

      const name = nameformCreateUser
      const email = emailformCreateUser
      const password = passwordformCreateUser
      //const fotoperfil = fotoperfilformCreateUser

      if (!nameformCreateUser || !emailformCreateUser || !passwordformCreateUser) {
        alert("Preencha todos os campos!");
        return;
      }

      console.log("dados!", nameformCreateUser, emailformCreateUser, passwordformCreateUser)
      console.log("daods 2:", name, email, password)
      

      dadosJson = {
        
        name,
        email,
        password
        //fotoperfil
      }
      console.log("Iniciando requisição para criar usuário...", dadosJson);

      try {

      //const jsonEnviarBackEnd = JSON.stringify(dadosJson)

      //console.log(jsonEnviarBackEnd)

      //if  (jsonEnviarBackEnd){
        const  sentJson = await fetch('https://dbsqlite.onrender.com/createuserfromfrontend', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // <--- ESSENCIAL para aceitar o cookie de sessão do backend
            body: JSON.stringify(dadosJson)
        })
        console.log("Resposta recebida do servidor. Status:", sentJson.status);

        if (!sentJson.ok){
            //throw new Error(`Erro na requisição: ${sentJson.status}`)
            const erroData = await sentJson.json().catch(() => ({}));
            throw new Error(erroData.error || `Erro na requisição: ${sentJson.status}`);
        }

        
        // Ler como texto primeiro para verificar se a resposta não veio vazia
        //const dadosRetornados = textResponse ? JSON.parse(textResponse) : {};
        const dadosRetornados = await sentJson.json();
        console.log('Sucesso ao enviar:', dadosRetornados);

        console.log("Tentando redirecionar para login.html...");

        window.location.href = "./login.html"
        
      //}

        
    } catch (error) {
        console.log("erro em createUserJson, createuser.js: ", error)
        alert("Falha ao criar usuário: " + error.message);
    }
}

//createUserJson()