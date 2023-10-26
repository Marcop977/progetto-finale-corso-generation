const titolo = document.querySelector("#titoloEvento");
const immagineEventoSingolo = document.querySelector("#immagineEventoSingolo");
const descrizioneBreve = document.querySelector("#descrizioneBreve");
const descrizioneCampo = document.querySelector("#descrizione");
const postiDisponibiliCampo = document.querySelector("#postiDisponibili");
const dataEventoCampo = document.querySelector("#dataEvento");
const prenotazioneCampo = document.querySelector("#attivo");
const luogoEventoCampo = document.querySelector("#luogoEvento");
const tipologiaCampo = document.querySelector("#tipologia");
const immagineCampo = document.querySelector("#locandina");
const utente = JSON.parse(sessionStorage.getItem('user'));
const modificaCancella = document.querySelector("#modificaCancella");
const navLogout = document.querySelector("#profiloLogout");
const btnLogout = document.querySelector("#logout");
const feedbackCampi = document.querySelector("#feedbackCampi");

if(sessionStorage.getItem("adminEsistente") === "true"){
    document.querySelector("#loginAdmin").style.display = "block";
    sessionStorage.removeItem("adminEsistente");
    setTimeout(() => {
        document.querySelector("#loginAdmin").style.display = "none";
    }, 3000);
}

navLogout.style.display = "block";
btnLogout.onclick = function(){
    sessionStorage.removeItem("user");
    sessionStorage.setItem("logoutAdmin", "true");
    location.href = "1-homepage.html";
}        

const btnScompare = document.querySelectorAll(".scompare");
btnScompare.forEach(button => {
    button.addEventListener("mouseover", function(){
        button.classList.add("bg-transparent");
        button.classList.add("text-black");
    })
    button.addEventListener("mouseout", function(){
        button.classList.remove("bg-transparent");
        button.classList.remove("text-black");
    });
});


btnRegistra.onclick = function(event){
    let errore = false;  //se dopo i controlli la variabile rimane false, allora avviene la registrazione

    if(titolo.value === ""){
        titolo.classList.add("errore");
        errore = true;
    } else {
        titolo.classList.remove("errore");
    }

    if(immagineEventoSingolo.value === ""){
        immagineEventoSingolo.classList.add("errore");
        errore = true;
    } else {
        immagineEventoSingolo.classList.remove("errore");
    }

    if(descrizioneBreve.value === ""){
        descrizioneBreve.classList.add("errore");
        errore = true;
    } else {
        descrizioneBreve.classList.remove("errore");
    }

    if(descrizioneCampo.value === ""){
        descrizioneCampo.classList.add("errore");
        errore = true;
    } else {
        descrizioneCampo.classList.remove("errore");
    }

    if(postiDisponibiliCampo.value === ""){
        postiDisponibiliCampo.classList.add("errore");
        errore = true;
    } else {
        postiDisponibiliCampo.classList.remove("errore");
    }

    if(dataEventoCampo.value === ""){
        dataEventoCampo.classList.add("errore");
        errore = true;
    } else {
        dataEventoCampo.classList.remove("errore");
    }

    if(luogoEventoCampo.value === ""){
        luogoEventoCampo.classList.add("errore");
        errore = true;
    } else {
        luogoEventoCampo.classList.remove("errore");
    }

    if(tipologiaCampo.value === "-- Seleziona tipologia --"){
        tipologiaCampo.classList.add("errore");
        errore = true;
    } else {
        tipologiaCampo.classList.remove("errore");
    }

    if(immagineCampo.value === ""){
        immagineCampo.classList.add("errore");
        errore = true;
    } else {
        immagineCampo.classList.remove("errore");
    }

    const campi = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], select, textarea');
  
    campi.forEach(campo =>{
        campo.addEventListener("input", function() {
            feedbackCampi.style.display = "none";
            campo.classList.remove("errore");
        });
    });

    if(!errore){ //se errore è false, se non ! è true. (errore) significa true
        const evento = {
            titolo: titolo.value,
            locandinaEventoSingolo: immagineEventoSingolo.value,
            descrizione: descrizioneBreve.value,
            descrizioneLunga: descrizioneCampo.value,
            postiDisponibili: postiDisponibiliCampo.value,
            dataEvento: dataEventoCampo.value,
            prenotazioneObbligatoria: prenotazioneCampo.checked,
            luogoEvento: luogoEventoCampo.value,
            tipologia: tipologiaCampo.value,
            locandina: immagineCampo.value
        }

        fetch("http://localhost:9012/api/evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        })
        .then(data =>{
            prendiAvviso()
            return data.json()
            
        })        
    }else{
        event.preventDefault();
        feedbackCampi.style.display = "block";
    }
}

function prendiAvviso(){
    const alertInvio = document.querySelector("#alertInvio");
    alertInvio.style.display = "block";
    setTimeout(function() {
        alertInvio.style.display = "none";
    }, 3000); 
    titolo.value = "";
    immagineEventoSingolo.value = "";
    descrizioneBreve.value = "";
    descrizioneCampo.value = "";
    postiDisponibiliCampo.value = "";
    dataEventoCampo.value = "";
    prenotazioneCampo.checked = "";
    luogoEventoCampo.value = "";
    tipologiaCampo.value = "";
    immagineCampo.value = "";
}        