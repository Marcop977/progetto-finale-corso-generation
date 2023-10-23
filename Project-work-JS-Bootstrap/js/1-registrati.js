const passwordUtente = document.getElementById("password");
const ripetiPassword = document.getElementById("ripetiPassword");

document.querySelector("#occhioNascosto").addEventListener("click", mostraNascondi);
document.querySelector("#occhioNascosto2").addEventListener("click", mostraNascondi);

function mostraNascondi(){
    if(occhioNascosto === this){
        const type = passwordUtente.getAttribute("type") === "password" ? "text" : "password";
        occhioNascosto.classList.toggle('bi-eye');
        password.setAttribute("type", type);
    }else if(occhioNascosto2 === this){
        const type = ripetiPassword.getAttribute("type") === "password" ? "text" : "password";
        occhioNascosto2.classList.toggle('bi-eye');
        ripetiPassword.setAttribute("type", type);
    }
}


document.getElementById("registrati").onclick = function(event) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const nome = document.getElementById("nome");
    const cognome = document.getElementById("cognome");
    const dataNascita = document.getElementById("dataNascita");
    const email = document.getElementById("email");
    const emailFeedback = document.querySelector("#emailFeedback");
    const passwordFeedback = document.getElementById("passwordFeedback");
    const ripetiPasswordFeedback = document.getElementById("ripetiPasswordFeedback");
    const campiFeedback = document.querySelector("#campiFeedback");
  
    const campi = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="date"]');
  
    campi.forEach(campo =>{
        campo.addEventListener("input", function() {
            campiFeedback.style.display = "none";
            campo.classList.remove("errore");
        });
    });
  
    if(email.value == "" && passwordUtente.value == "" && ripetiPassword.value == "") {
        campiFeedback.textContent = "Compila i campi obbligatori";
        campiFeedback.style.display = "block";
        email.classList.add("errore");
        passwordUtente.classList.add("errore");
        ripetiPassword.classList.add("errore");
        event.preventDefault();
        return; //se la condizione si verifica, con return il codice non va avanti, quindi solo se la condizione non si verifica verranno mostrati gli altri messaggi d'errore
    }
  
    if(email.value == "") {
        email.classList.add("errore");
        emailFeedback.textContent = "Campo email obbligatorio";
        emailFeedback.style.display = "block";
        event.preventDefault();
        return;
    }else if(!email.value.match(regexEmail)) {
        email.classList.add("errore");
        emailFeedback.textContent = "Inserisci una e-mail corretta";
        emailFeedback.style.display = "block";
        event.preventDefault();
        return;
    }else{
        emailFeedback.style.display = "none";
    }
  
    if(passwordUtente.value == "") {
        passwordUtente.classList.add("errore");
        passwordFeedback.textContent = 'Campo password obbligatorio';
        passwordFeedback.style.display = 'block';
        event.preventDefault();
        return;
    }else if(!passwordUtente.value.match(regex)) {
        passwordUtente.classList.add("errore");
        passwordFeedback.textContent = 'La password deve contenere almeno una lettera minuscola, una maiuscola, un numero e deve essere lunga almeno 8 caratteri.';
        passwordFeedback.style.display = 'block';
        event.preventDefault();
        return;
    }else{
        passwordFeedback.style.display = 'none';
    }
  
    if(ripetiPassword.value == "") {
        ripetiPassword.classList.add("errore");
        ripetiPasswordFeedback.innerText = 'Ripeti la password correttamente.';
        ripetiPasswordFeedback.style.display = 'block';
        event.preventDefault();
        return;
    }else if(passwordUtente.value !== ripetiPassword.value) {
        ripetiPassword.classList.add("errore");
        ripetiPasswordFeedback.innerText = 'Le password non coincidono.';
        ripetiPasswordFeedback.style.display = 'block';
        event.preventDefault();
        return;
    }else{
        ripetiPasswordFeedback.style.display = 'none';
    }
  
    
    const utente = {
        nome: nome.value,
        cognome: cognome.value,
        ruolo: "Utente",
        firma: "Utente",
        tipo: "B",
        nascita: dataNascita.value,
        email: email.value,
        password: passwordUtente.value
    };
    sessionStorage.setItem("utenteRegistrato", "true");
  
    fetch("http://localhost:9012/api/utenti", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(utente)
    })
    .then(data => {
        
        return data.json()})
    .then(res =>{
        
        location.href = "1-login.html";


        // setTimeout(() => { 
        //     window.location.href = "1-homepage.html";
        // }, 3000);
    })

    nome.value = "",
    cognome.value = "",
    dataNascita.value = "",
    email.value = "",
    passwordUtente.value = "",
    ripetiPassword.value = "",

    event.preventDefault();
    
}
