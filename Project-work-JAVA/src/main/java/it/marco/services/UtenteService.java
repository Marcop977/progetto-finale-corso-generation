package it.marco.services;

import java.util.List;

import it.marco.entities.Utente;

public interface UtenteService {
	
	List<Utente> getUtenti();
	Utente getUtenteById(int id);
	Utente addUtente(Utente u);

}
