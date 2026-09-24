
async function createUserJson(){
   
      const nameformCreateUser = document.getElementById("nameformCreateUser").value
      const emailformCreateUser =  document.getElementById("emailformCreateUser").value
      const passwordformCreateUser =  document.getElementById("passwordformCreateUser").value
      //const fotoperfilformCreateUser =  document.getElementById("fotoperfilformCreateUser").value

      const name = nameformCreateUser
      const email = emailformCreateUser
      const password = passwordformCreateUser
      //const fotoperfil = fotoperfilformCreateUser

      console.log("dados!", nameformCreateUser, emailformCreateUser, passwordformCreateUser)
      console.log("daods 2:", name, email, password)

      dadosJson = {
        
        name,
        email,
        password
        //fotoperfil
      }

      try {

      //const jsonEnviarBackEnd = JSON.stringify(dadosJson)

      //console.log(jsonEnviarBackEnd)

      //if  (jsonEnviarBackEnd){
        const  sentJson = await fetch('https://dbsqlite.onrender.com/createuserfromfrontend', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosJson)
        })

        if (!sentJson.ok){
            throw new Error(`Erro na requisição: ${sentJson.status}`)
        }

        
        // Ler como texto primeiro para verificar se a resposta não veio vazia
        const textResponse = await sentJson.text();
        const dadosRetornados = textResponse ? JSON.parse(textResponse) : {};

        console.log('Sucesso ao enviar:', dadosRetornados);
        
      //}

        
    } catch (error) {
        console.log("erro em createUserJson, createuser.js: ", error)
    }
}
//createUserJson()