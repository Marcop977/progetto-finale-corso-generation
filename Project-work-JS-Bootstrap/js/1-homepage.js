const btnLogin = document.querySelector("#login");
const btnLogout = document.querySelector("#logout");
const pannello = document.querySelector("#pannello");
const btnPannello = document.querySelector("#btnPannello");
const grigliaEventi = document.querySelector("#grigliaEventi");
const disponibili = document.querySelector("#disponibili");
const nonDisponibili = document.querySelector("#nonDisponibili");
const navLogin = document.querySelector("#dropdownId");
const navLogout = document.querySelector("#profiloLogout");
const registrati = document.querySelector("#registrati");
const eventiNonTrovati = document.querySelector("#eventiNonTrovati");
// const selectGenere = document.querySelector("#selectGenere");
// document.querySelector("#linkEventi").addEventListener("click", function(){
//     location.href = "1-homepage.html#titoloLista"
// })
// logout dell'admin dalla pagina 2-admin
document.addEventListener("DOMContentLoaded", function() {
    const logoutAdmin = sessionStorage.getItem("logoutAdmin");

    if(logoutAdmin === "true") {
        document.querySelector("#alertLogout").style.display = "block";
        setTimeout(() => {
            document.querySelector("#alertLogout").style.display = "none";
        }, 3000);
        sessionStorage.removeItem("logoutAdmin");
    }
});

const occhioPassword = document.querySelector("#occhioPassword");
const passwordCampo = document.querySelector("#password");

occhioPassword.addEventListener("click", function(event) {
    event.stopPropagation();
    const type = passwordCampo.getAttribute("type") === "password" ? "text" : "password";
    occhioPassword.classList.toggle("bi-eye");
    passwordCampo.setAttribute("type", type);
});


//------- login

if(sessionStorage.getItem("user") == null){
    registrati.style.display = "block";
    navLogin.style.display = "block";

    btnLogin.addEventListener("click", function(){

        fetch("http://localhost:9012/api/utenti")
        .then(data =>{return data.json()})
        .then(res =>{
            const emailCampo = document.querySelector("#email");
            // const passwordCampo = document.querySelector("#password");

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
    } else {
        alert("Utente non trovato");
    } 
}


// ---------- eventi

fetch("http://localhost:9012/api/eventi")
.then(data => { return data.json() })
.then(res => {
    const oggi = new Date();
    const mesi = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];

    res.sort((a, b) => new Date(a.dataEvento) - new Date(b.dataEvento));

    res.forEach(evento => {
        const data = new Date(evento.dataEvento);
        const colEvento = document.createElement("div");
        colEvento.setAttribute("id", "colEvento");
        colEvento.setAttribute("class", "col-lg-4 mb-4");
        colEvento.innerHTML = `
            <div class="card shadow" id="card">
                <img class="card-img-top" src="./img/locandine/${evento.locandina}.jpg" alt="Title">
                <div class="card-body px-lg-3">
                    <div class="row">
                        <div class="col-2 d-flex flex-wrap justify-content-center text-center">
                            <h4 class="text-warning" id="dataEvento">${mesi[data.getMonth()]} <span class="text-black">${data.getDate()}</span></h4>
                        </div>
                        <div class="col-10">
                            <h4 class="card-title">${evento.titolo}</h4>
                            <p class="card-text" id="descrizione">${evento.descrizione}</p>
                            <p class="card-text" id="genere" style="display: none;">${evento.tipologia}</p>
                            <p class="card-text" id="localita" style="display: none;">${evento.luogoEvento}</p> 
                        </div>
                    </div>
                </div>
            </div>
        `;

        colEvento.querySelector("#card").addEventListener("click", function () {
            location.href = "3-evento.html";
            sessionStorage.setItem("evento", JSON.stringify(evento));
        })
        colEvento.querySelector("#card").addEventListener("mouseover", function () {
            colEvento.querySelector("#card").classList.add("overlay");
        })
        colEvento.querySelector("#card").addEventListener("mouseout", function () {
            colEvento.querySelector("#card").classList.remove("overlay");
        })

        if(data > oggi) {
            disponibili.appendChild(colEvento);
        }else{
            if(nonDisponibili.firstChild) {
                nonDisponibili.insertBefore(colEvento, nonDisponibili.firstChild);
            }else{
                nonDisponibili.appendChild(colEvento);
            }
        }


    });    
    

    const eventiTitoli = ["Concerto: Beethoven", "Fotografia del XX Secolo", "Notte di Blues: Jam Session"];
    for(let i = 0; i < eventiTitoli.length; i++){
        const titoloBanner = document.querySelector(`#titoloBanner${i + 1}`);
        // titoloBanner.setAttribute("style", "cursor: pointer; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);");
        const paragrafoBanner = document.querySelector(`#paragrafoBanner${i + 1}`);
        // paragrafoBanner.setAttribute("style", "cursor: pointer;");
        // const btnBanner = document.querySelector(`#btnBanner${i + 1}`);  //bottone banner
        const eventoSpecifico = res.find(evento => evento.titolo === eventiTitoli[i]);

        if(eventoSpecifico){
            titoloBanner.textContent = eventoSpecifico.titolo;
            paragrafoBanner.textContent = eventoSpecifico.descrizioneLunga;
            // btnBanner.onclick = function(){
            //     sessionStorage.setItem("evento", JSON.stringify(eventoSpecifico));
            //     location.href = "3-evento.html";
            // }


            const banner = document.querySelector(`#banner${i + 1}`);
            // banner.addEventListener("mouseover", function(){
            //     banner.classList.add("overlay");
            // })
            // banner.addEventListener("mouseout", function(){
            //     banner.classList.remove("overlay");
            // })
            banner.addEventListener("click", function(){
                sessionStorage.setItem("evento", JSON.stringify(eventoSpecifico));
                location.href = "3-evento.html";
            })

            
        
        }
    }    
})



// ---------- mappa

const map = L.map("map").setView([40.8522, 14.2681], 7);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',}).addTo(map);
const provider = new GeoSearch.OpenStreetMapProvider();


fetch("http://localhost:9012/api/eventi")
.then(data => { return data.json() })
.then(res => {
    const addresses = res.map(evento => evento.luogoEvento);
    
    const markers = [];

    addresses.forEach(address => {
        const results = provider.search({query: address});
        results.then(data => {
            const location = data[0];
            const iconaMarker = L.icon({
                iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
                iconSize: [35, 50],
            });
            const marker = L.marker([location.y, location.x], { icon: iconaMarker }).addTo(map);
            marker.bindPopup(address);
            markers.push(marker); // Aggiungi il marker all'array

            marker.addEventListener('click', function() {
                const eventoCorrispondente = res.find(evento => evento.luogoEvento === address);
                if(eventoCorrispondente){
                    
                    sessionStorage.setItem("evento", JSON.stringify(eventoCorrispondente));
                    window.location.href = "3-evento.html";
                }
            });

        });
    });

    Promise.all(addresses.map(address => provider.search({query: address})))
    .then(data => {
        const locations = data.map(d => [d[0].y, d[0].x]);
        const bounds = L.latLngBounds(locations);
        map.fitBounds(bounds);
    });
});

// ----------- swiper
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    autoplay: {
        delay: 3000,
        // disableOnInteraction: false,
    },
    loop: true,
    effect: "fade",
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
const swiperContainer = document.querySelector(".swiper");

swiperContainer.addEventListener("mouseover", function () {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener("mouseout", function () {
 swiper.autoplay.start();
});

const paginationPrev = document.querySelector(".pagination-prev");
const paginationNext = document.querySelector(".pagination-next");

document.querySelector(".swiper-container").addEventListener("mouseover", function(){

    paginationPrev.style.display = "block";
    paginationNext.style.display = "block";
})
document.querySelector(".swiper").addEventListener("mouseout", function(){
    paginationPrev.style.display = "none";
    paginationNext.style.display = "none";
})

// ------------ filtro



document.querySelector("#eliminaFiltro").addEventListener("click", function(){
    document.querySelectorAll("#colEvento").forEach(colEvento => {
        colEvento.style.display = "block";
    });
    document.querySelector("#eventiDisponibili").style.display = "block";
    const containerEventiDisponibili = document.querySelector("#eventiDisponibili").parentElement;
    const containerEventiPassati = document.querySelector("#eventiPassati").parentElement;
    containerEventiDisponibili.style.display = "block";
    containerEventiPassati.style.display = "block";
    document.querySelector(".nessunEvento").style.display = "none";
    document.querySelector("#iconaTriste").style.display = "none";
    document.querySelector("#selectTipoEvento").value = 0;
    document.querySelector("#selectData").value = 0;
    document.querySelector("#selectLocalita").value = 0;
    
    
})

document.querySelector("#eliminaFiltro").addEventListener("click", function(){
    this.style.display = "none";
    document.querySelector("#colCompare").style.display = "none";
    document.querySelector("#colCompare2").style.display = "none";
    document.querySelector("#colCompare3").style.display = "none";
    document.querySelector("#colSiStringe").setAttribute("class", "col-lg-3");
    document.querySelector("#colSiStringe2").setAttribute("class", "col-lg-3 border-start border-end");
    document.querySelector("#colSiStringe3").setAttribute("class", "col-lg-3");
    document.querySelector("#colSiStringe4").setAttribute("class", "col-lg-3");

    // scegliere se usarli a eliminaFiltro o al tasto cerca
    // document.querySelector("#selectTipoEvento").value = "0";
    // document.querySelector("#selectData").value = "";
    // document.querySelector("#selectLocalita").value = "0";

    // ricerca 2
    // document.querySelector("#colCambia").setAttribute("class", "col-lg-2");
    // document.querySelector("#colCambia2").setAttribute("class", "col-lg-2");
    document.querySelector("#testoCerca").textContent = "Cerca";
    document.querySelector("#iconaCerca").classList.remove("fs-3");
    document.querySelector("#tastoCerca").setAttribute("class", "btn btn-warning w-100 mt-2 rounded-4 py-4");
    
})


document.querySelector("#tastoCerca").addEventListener("click", function(){

    // ricerca 2
    // document.querySelector("#colCambia").setAttribute("class", "col-lg-1");
    // document.querySelector("#colCambia2").setAttribute("class", "col-lg-1");
    

    if(document.querySelector("#selectTipoEvento").value !== "0" || document.querySelector("#selectData").value !== "" || document.querySelector("#selectLocalita").value !== "0"){

        document.querySelector("#colCompare3").style.display = "block";
        // document.querySelector("#colSiStringe").setAttribute("class", "col-lg-2");
        // document.querySelector("#colSiStringe2").setAttribute("class", "col-lg-2");
        // document.querySelector("#colSiStringe3").setAttribute("class", "col-lg-2");
        this.setAttribute("class", "btn btn-warning w-100 mt-2 rounded-4 py-3");
        // this.setAttribute("style", "padding-top: 1rem; padding-bottom: 1rem;")
        document.querySelector("#testoCerca").textContent = "";
        document.querySelector("#iconaCerca").classList.add("fs-3");
        document.querySelector("#colSiStringe4").setAttribute("class", "col-lg-1");
    }

    
    const containerEventiDisponibili = document.querySelector("#eventiDisponibili").parentElement;
    const containerEventiPassati = document.querySelector("#eventiPassati").parentElement;

    const mesi = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU", "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];


    const oggi = new Date();
    let ciSonoEventiDisponibili = false;
    let ciSonoEventiPassati = false;

    document.querySelectorAll("#colEvento").forEach(colEvento => {

        const genereEvento = colEvento.querySelector("#genere");
        const localitaEvento = colEvento.querySelector("#localita");
        const genereEventoInput = document.querySelector("#selectTipoEvento");
        const dataEventoInput = document.querySelector("#selectData");
        const localitaEventoInput = document.querySelector("#selectLocalita");

        if(genereEventoInput.value !== "0" || localitaEventoInput.value !== "0" || dataEventoInput.value !== ""){
            document.querySelector("#eliminaFiltro").style.display = "block";
        }


        const data = colEvento.querySelector("#dataEvento").textContent; // ora essendo la data GEN 01 devo cambiare approccio per confrontarla con date
 
        const dataSplit = data.split(' '); 
        const mese = dataSplit[0]; 
        const giorno = parseInt(dataSplit[1], 10); 

        
        const dataEvento = new Date(2023, mesi.indexOf(mese), giorno);
        
        const anno = dataEvento.getFullYear();
        const mese1 = String(dataEvento.getMonth() + 1).padStart(2, '0'); // Mese è 0-based
        const giorno1 = String(dataEvento.getDate()).padStart(2, '0');

        const dataSelezionata = `${anno}-${mese1}-${giorno1}`;


        if((genereEvento.textContent === genereEventoInput.value || genereEventoInput.value === "0") &&
            (localitaEvento.textContent.split(', ')[1] === localitaEventoInput.value || localitaEventoInput.value === "0") &&
            (dataSelezionata === dataEventoInput.value || dataEventoInput.value === "")
        ){
            // document.querySelector("#iconaTriste").style.display = "none";
            colEvento.style.display = "block";
            if (dataEvento > oggi) {
                ciSonoEventiDisponibili = true;
            } else {
                ciSonoEventiPassati = true;
            }
        }else{
            colEvento.style.display = "none";
        }

    });
    
   

    if(ciSonoEventiDisponibili){
        containerEventiDisponibili.style.display = "block";
        const messaggioNessunEvento = containerEventiDisponibili.querySelector(".nessunEvento");

        if(messaggioNessunEvento){
            containerEventiDisponibili.removeChild(messaggioNessunEvento);
        }

        document.querySelector("#eventiDisponibili").style.display = "block";

        document.querySelector("#iconaTriste").style.display = "none";
    }else{
        document.querySelector("#iconaTriste").style.display = "block";
        document.querySelector("#eventiDisponibili").style.display = "none";
        const messaggioNessunEvento = containerEventiDisponibili.querySelector(".nessunEvento");
        if(!messaggioNessunEvento){
            const messaggioDiv = document.createElement("div");
            messaggioDiv.classList.add("nessunEvento", "container", "text-center", "my-5");
            containerEventiDisponibili.appendChild(messaggioDiv);
        }
    }

    if(ciSonoEventiPassati){
        containerEventiPassati.style.display = "block";
    }else{
        containerEventiPassati.style.display = "none";
    }

    document.querySelector("#selectTipoEvento").value = "0";
    document.querySelector("#selectData").value = "";
    document.querySelector("#selectLocalita").value = "0";
})
