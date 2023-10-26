const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#login");

document.querySelector("#occhioNascosto").addEventListener("click", mostraNascondi);

function mostraNascondi(){
    if(occhioNascosto === this){
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        occhioNascosto.classList.toggle('bi-eye');
        password.setAttribute("type", type);
    }
}

login.onclick = function(){

    fetch("http://localhost:9012/api/utenti")
    .then(data =>{return data.json()})
    .then(res =>{
        const emailCampo = document.querySelector("#email");
        const passwordCampo = document.querySelector("#password");

        const esiste = res.find(u => u.email === emailCampo.value && u.password === passwordCampo.value);
        if(esiste && esiste.ruolo === "Amministratore"){
            sessionStorage.setItem("user", JSON.stringify(esiste));
            sessionStorage.setItem("adminEsistente", "true");
            
            location.href = "2-admin.html";
        }else if(esiste){
            sessionStorage.setItem("user", JSON.stringify(esiste));
            location.href = "errore.html";
        }else{
            document.querySelector("#utenteNonTrovato").style.display = "block";
            setTimeout(() => {
                document.querySelector("#utenteNonTrovato").style.display = "none";
            }, 6000);
        }        
    })
}