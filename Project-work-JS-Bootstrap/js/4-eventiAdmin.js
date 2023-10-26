const grigliaEventi = document.querySelector("#grigliaEventi");
const formModifica = document.querySelector("#formModifica");
const modifica = document.querySelector("#modifica");
const cancella = document.querySelector("#cancella");
const navLogout = document.querySelector("#profiloLogout");
const btnLogout = document.querySelector("#logout");
const contenitorePaginazione = document.querySelector("#paginationContainer");
const elementoPaginaCorrente = document.querySelector("#paginaCorrente");
const eventiPerPagina = 10;
let paginaCorrente = JSON.parse(sessionStorage.getItem("paginaCorrente")) || 1;

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

if(sessionStorage.getItem("adminEsistente") === "true"){
    document.querySelector("#loginAdmin").style.display = "block";
    sessionStorage.removeItem("adminEsistente");
    setTimeout(() => {
        document.querySelector("#loginAdmin").style.display = "none";
    }, 3000);
}

function html(eventiDaMostrare, indiceInizio, indiceFine){
    grigliaEventi.innerHTML = "";

    eventiDaMostrare.forEach((evento, i) => {
        const elemento = document.createElement("li");
        elemento.setAttribute("class", "list-group-item p-2");
        elemento.innerHTML = `             
            <input class="form-check-input me-1" type="radio" name="evento" value="${i + indiceInizio}" id="inputRadio">
            <strong>Titolo:</strong> ${evento.titolo} - <strong>Data evento:</strong>  ${evento.dataEvento}               
        `;
        grigliaEventi.appendChild(elemento);
    });
}

fetch("http://localhost:9012/api/eventi")
.then(data =>{return data.json()})
.then(res =>{    
    aggiornaPaginazione(res);
    aggiornaVisualizzazioneEventi(res);
    aggiornaIndicatorePaginaCorrente();
})

function aggiornaPaginazione(res) {
    const pagineTotali = Math.ceil(res.length / eventiPerPagina);
    contenitorePaginazione.innerHTML = "";

    if(pagineTotali <= 1){
        paginaCorrente = 1;
        sessionStorage.setItem("paginaCorrente", JSON.stringify(1))
    }

    for (let i = 1; i <= pagineTotali; i++) {
        const pulsantePagina = document.createElement("button");
        pulsantePagina.textContent = i;
        pulsantePagina.classList.add("btn", "btn-secondary", "m-2");
        pulsantePagina.addEventListener("mouseover", function(){
            pulsantePagina.classList.add("bg-transparent");
            pulsantePagina.classList.add("text-black");
        })
        pulsantePagina.addEventListener("mouseout", function(){
            pulsantePagina.classList.remove("bg-transparent");
            pulsantePagina.classList.remove("text-black");
        });
        pulsantePagina.addEventListener("click", function() {
            paginaCorrente = i;
            aggiornaVisualizzazioneEventi(res);
            aggiornaIndicatorePaginaCorrente();
            sessionStorage.setItem("paginaCorrente", JSON.stringify(paginaCorrente)); // salva la pagina corrente in sessionStorage
        });
        contenitorePaginazione.appendChild(pulsantePagina);
    }
}

function aggiornaVisualizzazioneEventi(res) {
    const indiceInizio = (paginaCorrente - 1) * eventiPerPagina;
    const indiceFine = indiceInizio + eventiPerPagina;
    const eventiDaMostrare = res.slice(indiceInizio, indiceFine);

    html(eventiDaMostrare, indiceInizio, indiceFine);

    const btnRadio = document.querySelectorAll("#inputRadio");
    btnRadio.forEach(button => {
        button.addEventListener("change", function(){
            const valoreRadio = this.value;
            let eventoSelezionato = res[valoreRadio];
            sessionStorage.setItem("eventoSelezionato", JSON.stringify(eventoSelezionato));
        });
    });
}

function aggiornaIndicatorePaginaCorrente() {
    elementoPaginaCorrente.textContent = paginaCorrente;
}

window.onload = function(){

    sessionStorage.removeItem("eventoSelezionato");
}

modifica.onclick = function(){
    let eventoSelezionatoSession = JSON.parse(sessionStorage.getItem("eventoSelezionato"));
    
    if(eventoSelezionatoSession){
        setTimeout(() => {  
            formModifica.scrollIntoView();
        }, 100);
        formModifica.innerHTML = "";
        const containerDaIngrandire = document.querySelector("#containerDaIngrandire");
        containerDaIngrandire.setAttribute("style", "height: 150vh;");
        const div = document.createElement("div");
        div.setAttribute("id", "contenitoreModifica");
        div.setAttribute("class", "row mb-3")
        div.setAttribute("style", "padding-top: 5rem;");
        div.innerHTML = `
            <div class="col-12">
                <h1>Modifica evento</h1>
                <form class="w-75">
                    <div class="mb-3">
                        <input type="hidden" id="idEvento" value="${eventoSelezionatoSession.id_evento}">
                        <label for="" class="form-label">Titolo evento</label>
                        <input type="text" name="titoloEvento" id="titoloEvento" class="form-control" placeholder="" aria-describedby="helpId" value="${eventoSelezionatoSession.titolo}">
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="mb-3">
                                <label for="" class="form-label">Luogo evento</label>
                                <input type="text" name="luogoEvento" id="luogoEvento" class="form-control" placeholder="" aria-describedby="helpId" value="${eventoSelezionatoSession.luogoEvento}">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="mb-3">
                                <label for="" class="form-label">Posti disponibili</label>
                                <input type="number" name="postiDisponibili" id="postiDisponibili" class="form-control" placeholder="" aria-describedby="helpId" value="${eventoSelezionatoSession.postiDisponibili}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="mb-3">
                                <label for="" class="form-label">Tipologia evento</label>
                                <select class="form-select form-select-lg" name="tipologia" id="tipologia">
                                    <option disabled selected>-- Seleziona tipologia --</option>
                                    <option value="Concerto" ${eventoSelezionatoSession.tipologia === 'Concerto' ? 'selected' : ''}>Concerto</option>
                                    <option value="Teatro" ${eventoSelezionatoSession.tipologia === 'Teatro' ? 'selected' : ''}>Teatro</option>
                                    <option value="Cinema" ${eventoSelezionatoSession.tipologia === 'Cinema' ? 'selected' : ''}>Cinema</option>
                                    <option value="Mostra" ${eventoSelezionatoSession.tipologia === 'Mostra' ? 'selected' : ''}>Mostra</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-4 d-flex align-items-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${eventoSelezionatoSession.prenotazioneObbligatoria}" id="attivo" ${eventoSelezionatoSession.prenotazioneObbligatoria ? 'checked' : ''}>
                                <label class="form-check-label" for="attivo">
                                    Prenotazione obbligatoria
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="dataEvento" class="form-label">Data dell'evento</label>
                                <input type="date" class="form-control" id="dataEvento" name="dataEvento" value="${eventoSelezionatoSession.dataEvento}">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="" class="form-label">Inserisci locandina per homepage</label>
                                <input type="text" name="locandina" id="locandina" class="form-control" placeholder="" aria-describedby="helpId" value="${eventoSelezionatoSession.locandina}">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Inserisci immagine per sezione evento</label>
                        <input type="text" name="immagineEventoSingolo" id="immagineEventoSingolo" class="form-control" placeholder="" aria-describedby="helpId"value="${eventoSelezionatoSession.locandinaEventoSingolo}">
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Caratteristiche evento</label>
                        <input type="text" name="descrizioneBreve" id="descrizioneBreve" class="form-control" placeholder="" aria-describedby="helpId" value="${eventoSelezionatoSession.descrizione}">
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Descrizione evento</label>
                        <textarea class="form-control" name="descrizioneVal" id="descrizioneVal" rows="3">${eventoSelezionatoSession.descrizioneLunga}</textarea>
                    </div>
                    <div class="container-fluid text-end p-0 mt-2">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#contenitoreModale2"><i class="bi bi-arrow-counterclockwise"></i> Ripristina campi</button>
                    <button type="button" class="btn btn-danger" id="btnAnnulla"><i class="bi bi-x-lg"></i> Annulla modifiche</button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#contenitoreModale"><i class="bi bi-check2"></i> Salva modifiche</button>
                        <div id="feedbackCampi" class="invalid-feedback" style="display: none;">Compila tutti i campi</div>
                    </div>
                </form>
            </div>                    
        `;               

        formModifica.appendChild(div);

        document.querySelector("#btnRipristina").addEventListener("click", function(){
            document.querySelector("#titoloEvento").value = "";
            document.querySelector("#luogoEvento").value = "";
            document.querySelector("#postiDisponibili").value = "";
            document.querySelector("#tipologia").value = "";
            document.querySelector("#attivo").checked = false;
            document.querySelector("#dataEvento").value = "";
            document.querySelector("#locandina").value = "";
            document.querySelector("#immagineEventoSingolo").value = "";
            document.querySelector("#descrizioneBreve").value = "";
            document.querySelector("#descrizioneVal").value = "";
            document.querySelector("#descrizioneVal").value = "";
        })
        
        div.querySelector("#btnAnnulla").addEventListener("click", function(){
            formModifica.innerHTML = "";
            containerDaIngrandire.setAttribute("style", "height: 70vh;");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
        
    }else{
        document.querySelector("#alertSelezionaEvento").style.display = "block";
        setTimeout(() => {
            document.querySelector("#alertSelezionaEvento").style.display = "none";
        }, 3000);
    }
}

document.querySelector("#btnSalva").addEventListener("click", function(){    
    let containerModale = document.querySelector("#contenitoreModale");
    let modale = bootstrap.Modal.getInstance(containerModale);
    document.querySelector("#containerDaIngrandire").setAttribute("style", "height: 70vh;");
    
    const idEvento = document.querySelector("#idEvento");
    const titolo = document.querySelector("#titoloEvento");
    const luogoEvento = document.querySelector("#luogoEvento");
    const postiDisponibili = document.querySelector("#postiDisponibili");
    const tipologia = document.querySelector("#tipologia");
    const prenotazione = document.querySelector("#attivo");
    const dataEvento = document.querySelector("#dataEvento");
    const locandina = document.querySelector("#locandina");
    const immagineEvento = document.querySelector("#immagineEventoSingolo");
    const descrizioneBreve = document.querySelector("#descrizioneBreve");
    const descrizioneLunga = document.querySelector("#descrizioneVal");

    const eventoModificato = {
        "id_evento": idEvento.value,
        "titolo": titolo.value,
        "luogoEvento": luogoEvento.value,
        "postiDisponibili": postiDisponibili.value,
        "tipologia": tipologia.value,
        "prenotazioneObbligatoria": prenotazione.value,
        "dataEvento": dataEvento.value,
        "locandina": locandina.value,
        "locandinaEventoSingolo": immagineEvento.value,
        "descrizione": descrizioneBreve.value,
        "descrizioneLunga": descrizioneLunga.value
    }

    fetch("http://localhost:9012/api/eventi", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventoModificato)
    })
    .then(data =>{
        modale.hide();
        prendiAvviso();
        return data.json();
    }) 
})


function prendiAvviso(){
    const alertInvio = document.querySelector("#alertInvio");
    alertInvio.style.display = "block";
    fetch("http://localhost:9012/api/eventi")
    .then(data =>{return data.json()})
    .then(res =>{
        sessionStorage.removeItem("eventoSelezionato");
        aggiornaPaginazione(res);
        aggiornaVisualizzazioneEventi(res);
        aggiornaIndicatorePaginaCorrente();

        document.querySelector("#contenitoreModifica").style.display = "none";
        document.querySelector(".scroll-nav").scrollIntoView();
    })
    setTimeout(function() {
        alertInvio.style.display = "none";
    }, 3000); 

}

cancella.addEventListener('click', function() {

    let eventoSelezionatoSession = JSON.parse(sessionStorage.getItem("eventoSelezionato"));
    let containerModale = document.querySelector("#exampleModalToggle");
    let modale = bootstrap.Modal.getInstance(containerModale);
    let containerModale2 = document.querySelector("#exampleModalToggle2");
    let modale2 = bootstrap.Modal.getInstance(containerModale2);            
    
    if(eventoSelezionatoSession){
        fetch("http://localhost:9012/api/prenotazioni")
        .then(data => {return data.json()})
        .then(res => {
            let trovato = false;
            res.forEach(prenotazione => {
                if(prenotazione.evento_id.id_evento != null){
                    if(eventoSelezionatoSession.id_evento == prenotazione.evento_id.id_evento){
                        trovato = true;
                    }
                }
            });
            
            if(trovato){
                const alertErrore = document.querySelector("#alertErrore");
                alertErrore.style.display = "block";
                setTimeout(() => {
                    alertErrore.style.display = "none";
                }, 4000);
                modale.hide();
            }else{
                fetch("http://localhost:9012/api/eventi/" + eventoSelezionatoSession.id_evento, {
                    method: "DELETE"
                })
                .then(data =>{                    
                    modale.hide();
                    prendiAvvisoDelete();
                    
                })
            
                sessionStorage.setItem("paginaCorrente", JSON.stringify(paginaCorrente));
            }
        })

    }else{
        document.querySelector("#alertSelezionaEvento").style.display = "block";
        setTimeout(() => {
            document.querySelector("#alertSelezionaEvento").style.display = "none";
        }, 3000);
    }
});


function prendiAvvisoDelete(){
    const alertCancella = document.querySelector("#alertCancella");
    alertCancella.style.display = "block"
    fetch("http://localhost:9012/api/eventi")
    .then(data =>{return data.json()})
    .then(res =>{
        sessionStorage.removeItem("eventoSelezionato");
        aggiornaPaginazione(res);
        aggiornaVisualizzazioneEventi(res);
        aggiornaIndicatorePaginaCorrente();
    })
    setTimeout(function() {
        alertCancella.style.display = "none";
    }, 3000); 
}

