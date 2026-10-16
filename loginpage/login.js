async function fazerLoginFromFronendjson(){
    const email = document.getElementById("apiEmailLogin").value
    const password = document.getElementById("apiPasswordLogin").value

    if (!email || !password){
        alert("Preencha todos os campos!")
        return
    }

    const dadosJson = {email, password}

    try {
        const resposta = await fetch('https://dbsqlite.onrender.com/loginfromfrontend', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // ESSENCIAL para receber e salvar o cookie de sessão!
            body: JSON.stringify(dadosJson)
        })

        if (!resposta.ok) {
            const erroData = await resposta.json()
            throw new Error(erroData.error || `Erro: ${resposta.status}`)
        }

        const resultado = await resposta.json()
        console.log("Login bem-sucedido:", resultado)

        window.location.href = "./home.html"

        
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Falha ao entrar: " + error.message);
    }

}