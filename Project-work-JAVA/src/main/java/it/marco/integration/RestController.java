package it.marco.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import it.marco.dto.PrenotazioneDTO;
import it.marco.entities.Evento;
import it.marco.entities.Prenotazione;
import it.marco.entities.Utente;
import it.marco.services.EventoService;
import it.marco.services.PrenotazioneService;
import it.marco.services.UtenteService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://127.0.0.1:5500/")
public class RestController {

	@Autowired
	UtenteService utenteService;
	
	@Autowired
	EventoService eventoService;
	
	@Autowired
	PrenotazioneService prenotazioneService;
	
	@GetMapping("utenti")
	List<Utente> getUtenti(){
		return utenteService.getUtenti(); 
	}
	
	@GetMapping("utenti/{id}")
	Utente getUtenteById(@PathVariable int id) {
		return utenteService.getUtenteById(id);
	}
	
	@GetMapping("eventi")
	List<Evento> getEventi(){
		return eventoService.getEventi(); 
	}
	
	@GetMapping("eventi/{id}")
	Evento getEventoById(@PathVariable int id) {
		return eventoService.getEventoById(id);
	}
	
	@GetMapping("prenotazioni")
	List<Prenotazione> getPrenotazioni() {
		return prenotazioneService.getPrenotazioni();
	}
	
	@GetMapping("prenotazioni/{id}")
	Prenotazione getPrenotazioneById(@PathVariable int id) {
		return prenotazioneService.getPrenotazioneById(id);
	}
	
	@PostMapping("utenti")
	Utente addUtente(@RequestBody Utente u) {
//		u.setUltimaModifica(Timestamp.valueOf(LocalDateTime.now()));
		return utenteService.addUtente(u);
	}
	
	@PostMapping("evento")
	Evento addEvento(@RequestBody Evento e) {
		return eventoService.addEvento(e);
	}	
	
	@PostMapping("eventi")
	List<Evento> addEventi(@RequestBody List<Evento> eventi) {
		return eventoService.addEventi(eventi);
	}	
	
	
	@PutMapping("eventi")
	Evento updateEvento(@RequestBody Evento e) {
		return eventoService.updateEvento(e);
	}
	
	@DeleteMapping("eventi/{id}")
	void deleteEventoById(@PathVariable int id) {
		eventoService.deleteEventoById(id);
	}
	
	@PostMapping("prenotazioni")
	Prenotazione addPrenotazione(@RequestBody Prenotazione p) {
		return prenotazioneService.addPrenotazione(p);
	}
	
	@PostMapping("prenotazioniDTO")
	Prenotazione addPrenotazioneDTO(@RequestBody PrenotazioneDTO p) {
		Prenotazione nuovaPrenotazione = new Prenotazione();
		nuovaPrenotazione.setDataPrenotazione(p.getDataPrenotazione());
		nuovaPrenotazione.setPostiPrenotati(p.getPostiPrenotati());
		nuovaPrenotazione.setEvento_id(eventoService.getEventoById(p.getEvento_id()));
		nuovaPrenotazione.setUtente_id(utenteService.getUtenteById(p.getUtente_id()));
		return prenotazioneService.addPrenotazione(nuovaPrenotazione);
	}
	
}
