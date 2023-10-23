package it.marco.services;

import java.util.List;

import it.marco.entities.Prenotazione;

public interface PrenotazioneService {

	List<Prenotazione> getPrenotazioni();
	Prenotazione getPrenotazioneById(int id);
	Prenotazione addPrenotazione(Prenotazione p);
}
