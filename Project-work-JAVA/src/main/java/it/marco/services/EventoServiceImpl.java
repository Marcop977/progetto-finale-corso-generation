package it.marco.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.marco.entities.Evento;
import it.marco.repos.EventoDAO;

@Service
public class EventoServiceImpl implements EventoService {
	
	@Autowired
	EventoDAO eventoDao;

	@Override
	public List<Evento> getEventi() {
		return eventoDao.findAll();
	}

	@Override
	public Evento getEventoById(int id) {
		return eventoDao.findById(id).get();
	}

	@Override
	public Evento addEvento(Evento e) {
		return eventoDao.save(e);
	}

	@Override
	public Evento updateEvento(Evento e) {
		return eventoDao.save(e);
	}

	@Override
	public void deleteEventoById(int id) {
		eventoDao.deleteById(id);
	}

	@Override
	public List<Evento> addEventi(List<Evento> eventi) {
		return eventoDao.saveAll(eventi);
	}

}
