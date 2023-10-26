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

if(sessionStorage.getItem("utenteRegistrato") === "true"){
    document.querySelector("#registrazioneAvvenuta").style.display = "block";
    setTimeout(() => {
        document.querySelector("#registrazioneAvvenuta").style.display = "none";
    }, 3000);
    sessionStorage.removeItem("utenteRegistrato")
}

login.onclick = function(){

    fetch("http://localhost:9012/api/utenti")
    .then(data =>{return data.json()})
    .then(res =>{
        const emailCampo = document.querySelector("#email");
        const passwordCampo = document.querySelector("#password");

        const esiste = res.find(u => u.email === emailCampo.value && u.password === passwordCampo.value);
        if(esiste){
            sessionStorage.setItem("user", JSON.stringify(esiste));
            document.querySelector("#loginAvvenuto").style.display = "block"
            setTimeout(() => {
                document.querySelector("#loginAvvenuto").style.display = "none"
                location.href = "3-evento.html";
            }, 3000);
            
        }else{
            document.querySelector("#utenteNonTrovato").style.display = "block";
            setTimeout(() => {
                document.querySelector("#utenteNonTrovato").style.display = "none";
            }, 6000);
        }   
    })        

}