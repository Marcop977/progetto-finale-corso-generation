package it.marco.services;

import java.util.List;

import it.marco.entities.Evento;

public interface EventoService {
	
	List<Evento> getEventi();
	Evento getEventoById(int id);
	Evento addEvento(Evento e);
	Evento updateEvento(Evento e);
	void deleteEventoById(int id);
	
	List<Evento> addEventi(List<Evento> eventi);

}
