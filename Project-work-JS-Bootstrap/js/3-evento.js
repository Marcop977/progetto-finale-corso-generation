const containerEvento = document.querySelector("#containerEvento");
const evento = JSON.parse(sessionStorage.getItem("evento"));
const utente = JSON.parse(sessionStorage.getItem("user"));
const locandinaCont = document.querySelector("#locandina");
const prenota = document.querySelector("#prenota");
const form = document.querySelector("#formPrenotazione");
const navLogout = document.querySelector("#profiloLogout");
const btnLogout = document.querySelector("#logout");
const btnLogin = document.querySelector("#login");
const navLogin = document.querySelector("#dropdownId");
const registrati = document.querySelector("#registrati");
const immagineEvento = document.querySelector("#immagineEvento");
const posizioneEvento = document.querySelector("#posizioneEvento");

posizioneEvento.textContent = evento.luogoEvento;


const occhioPassword = document.querySelector("#occhioPassword");
const passwordCampo = document.querySelector("#password");

occhioPassword.addEventListener("click", function(event) {
    event.stopPropagation();
    const type = passwordCampo.getAttribute("type") === "password" ? "text" : "password";
    occhioPassword.classList.toggle("bi-eye");
    passwordCampo.setAttribute("type", type);
});

immagineEvento.setAttribute("src", `./img/immagini-evento/${evento.locandinaEventoSingolo}.jpg`);

if(sessionStorage.getItem("user") == null){
    registrati.style.display = "block";
    navLogin.style.display = "block";

    btnLogin.addEventListener("click", function(){
        

        fetch("http://localhost:9012/api/utenti")
        .then(data =>{return data.json()})
        .then(res =>{
            const emailCampo = document.querySelector("#email");
            const passwordCampo = document.querySelector("#password");

            const esiste = res.find(u => u.email === emailCampo.value && u.password === passwordCampo.value);
            if(esiste){
                sessionStorage.setItem("user", JSON.stringify(esiste));    
                mostraNascondi();
                document.querySelector("#alertLogin").style.display = "block";
                setTimeout(() => {
                    document.querySelector("#alertLogin").style.display = "none";
                }, 3000);

            }else{
                document.querySelector("#utenteNonTrovato").style.display = "block";
                setTimeout(() => {
                    document.querySelector("#utenteNonTrovato").style.display = "none";
                }, 6000);
            }
        })

    })
}else{
    mostraNascondi()          
}


function mostraNascondi(){
    const utenteEsistente = JSON.parse(sessionStorage.getItem("user"));
    if(utenteEsistente && utenteEsistente.ruolo == "Amministratore"){         
                
        btnPannello.onclick = function(){
            location.href = "2-admin.html";
        }

        registrati.style.display = "none";
        navLogin.style.display = "none";
        btnPannello.style.display = "block";
        navLogout.style.display = "block";
        btnLogout.onclick = function(){
            sessionStorage.removeItem("user");
            document.querySelector("#alertLogout").style.display = "block";
            registrati.style.display = "block";
            navLogin.style.display = "block";
            btnPannello.style.display = "none";
            navLogout.style.display = "none";
            setTimeout(() => {
                document.querySelector("#alertLogout").style.display = "none";
            }, 3000);
        }
                         
    }else if(utenteEsistente && utenteEsistente.ruolo == "Utente") {
        registrati.style.display = "none";
        navLogin.style.display = "none";
        navLogout.style.display = "block";
        btnLogout.onclick = function(){
            sessionStorage.removeItem("user");
            document.querySelector("#alertLogout").style.display = "block";
            registrati.style.display = "block";
            navLogin.style.display = "block";
            btnPannello.style.display = "none";
            navLogout.style.display = "none";
            setTimeout(() => {
                document.querySelector("#alertLogout").style.display = "none";
            }, 3000);
        }               
    }else{
        document.querySelector("#utenteNonTrovato").style.display = "block";
        setTimeout(() => {
            document.querySelector("#utenteNonTrovato").style.display = "none";
        }, 6000);            
    } 
}
// containerEvento.innerHTML = evento.dataEvento;
// locandinaCont.setAttribute("src", evento.locandina);


// containerEvento.innerHTML = `
//     <div class="row" id="colSingoloEvento">
//         <div class="col-lg-6">
//             <img class="w-100" src="./img/immagini-evento/${evento.locandinaEventoSingolo}.jpg" alt="">
//         </div>
//         <div class="col-lg-6 bg-secondary text-center">
//             <h4 class="fs-2">Titolo: ${evento.titolo}</h4>
//             <p>Data evento: ${evento.dataEvento}</p>
//             <p>Posti disponibili: ${evento.postiDisponibili}</p>
//             <p>Categoria evento: ${evento.tipologia}</p>
//             <p>Luogo evento: ${evento.luogoEvento}</p>
//             <p>Descrizione evento:</p>
//             <p>${evento.descrizioneLunga}</p>
//             <button type="button" class="btn btn-primary w-100" style="display: none;" id="prenota">Prenota evento</button>
//         </div>
//     </div>
// `;


containerEvento.innerHTML = `
    <h2 class="fs-2 pb-3">${evento.titolo}</h2>
    <p class="fs-5"><strong>Data evento:</strong> ${evento.dataEvento}</p>
    <p class="fs-5" id="postiDisponibili"><strong>Posti disponibili:</strong> ${evento.postiDisponibili}</p>
    <p class="fs-5"><strong>Categoria evento:</strong> ${evento.tipologia}</p>
    <p class="fs-5"><strong>Luogo evento:</strong> ${evento.luogoEvento}</p>
    <p class="fs-5"><strong>Descrizione evento:</strong></p>
    <p class="fs-5 px-5">${evento.descrizioneLunga}</p>
`;

// document.querySelector("#postiPrenotazione").addEventListener("input", function() {
//     if (this.value > 99) {
//         this.value = 99;
//     }
// });


// ---------- mappa
const map = L.map("map").setView([40.8522, 14.2681], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',}).addTo(map);
const provider = new GeoSearch.OpenStreetMapProvider();
const address = evento.luogoEvento;

const results = provider.search({query: address});
results.then(data => {
    const location = data[0];
    const iconaMarker = L.icon({
        iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
        iconSize: [35, 50],
    });
    const marker = L.marker([location.y, location.x], {icon: iconaMarker}).addTo(map);
    marker.bindPopup(address);
    map.setView([location.y, location.x], 15);
});

// --------- prenotazione
if(evento.prenotazioneObbligatoria === true){
    const titoloPrenotazione = document.querySelector("#titoloPrenotazione");
    titoloPrenotazione.textContent = "È richiesta la prenotazione per questo evento";
    const conferma = document.querySelector("#conferma");
    conferma.style.display = "block";

    conferma.addEventListener("mouseover", function(){
        conferma.classList.add("bg-transparent");
    })
    conferma.addEventListener("mouseout", function(){
        conferma.classList.remove("bg-transparent");
    });

    conferma.onclick = function(){
        if(sessionStorage.getItem("user") == null){
            document.querySelector("#contenitoreModale2").style.display = "block";
            

        }else{
        
            
            const nomePrenotazione = document.querySelector("#nomePrenotazione");
            const posti = document.querySelector("#postiPrenotazione");
            const email = document.querySelector("#emailPrenotazione");
            const campiFeedback = document.querySelector("#campiFeedback");
            const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const emailFeedback = document.querySelector("#emailFeedback");
            const postiFeedback = document.querySelector("#postiFeedback");

            const campi = document.querySelectorAll('input[type="text"], input[type="number"]');
  
            campi.forEach(campo =>{
                campo.addEventListener("input", function() {
                    campiFeedback.style.display = "none";
                    campo.classList.remove("errore");
                });
            });

            if(email.value == "" && posti.value == ""){
                posti.classList.add("errore");
                email.classList.add("errore");
                campiFeedback.textContent = "Compila i campi obbligatori.";
                campiFeedback.style.display = "block";
                event.preventDefault();
                return;
            }

            if(!email.value.match(regexEmail) || email.value == ""){
                email.classList.add("errore");
                emailFeedback.textContent = "Inserisci una e-mail corretta";
                emailFeedback.style.display = "block";
                event.preventDefault();
                return;
            }else{
                email.classList.remove("errore");
                emailFeedback.style.display = "none";
            }

            if(posti.value == ""){
                posti.classList.add("errore");
                postiFeedback.textContent = "Inserisci i posti";
                postiFeedback.style.display = "block";
                event.preventDefault();
                return;
            }else{
                posti.classList.remove("errore");
                postiFeedback.style.display = "none";
            }
            
            const prenotazione = {
                postiPrenotati: posti.value,
                evento_id: evento.id_evento,
                utente_id: utente.id_utente
            }

            const eventoMenoPosti = {
                id_evento: evento.id_evento,
                locandina: evento.locandina,
                postiDisponibili: evento.postiDisponibili - posti.value,
                dataEvento: evento.dataEvento,
                descrizione: evento.descrizione,
                prenotazioneObbligatoria: evento.prenotazioneObbligatoria,
                luogoEvento: evento.luogoEvento,
                tipologia: evento.tipologia,
                descrizioneLunga: evento.descrizioneLunga,
                locandinaEventoSingolo: evento.locandinaEventoSingolo,
                titolo: evento.titolo
            }
            

            fetch("http://localhost:9012/api/prenotazioniDTO", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(prenotazione)
            })
            .then(data =>{
                //svuota campi
                document.querySelector("#alertPrenotazione").style.display = "block";
                setTimeout(() => {
                    document.querySelector("#alertPrenotazione").style.display = "none";
                }, 3000);
                return data.json()
            })

            sessionStorage.setItem("evento", JSON.stringify(eventoMenoPosti));

            fetch("http://localhost:9012/api/eventi", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventoMenoPosti)
            })
            .then(data =>{return data.json()})
            .then(res =>{
                const posti = containerEvento.querySelector("#postiDisponibili");
                posti.innerHTML = `<strong>Posti disponibili:</strong> ${res.postiDisponibili}`;
            })

            nomePrenotazione.value = "";
            email.value = "";
            posti.value = "";
        }
    }
}else{
    const titoloPrenotazione = document.querySelector("#titoloPrenotazione");
    titoloPrenotazione.textContent = "Non è richiesta alcuna prenotazione per questo evento";
    const formScompare = document.querySelector("#formScompare");
    formScompare.style.display = "none";
}
    
document.querySelector("#annulla").addEventListener("click", function(){
    document.querySelector("#contenitoreModale2").style.display = "none";
})

document.querySelector("#login2").addEventListener("click", function(){
    location.href = "3-login.html";
})