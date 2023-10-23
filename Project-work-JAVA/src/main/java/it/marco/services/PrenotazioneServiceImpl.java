package it.marco.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.marco.entities.Prenotazione;
import it.marco.repos.PrenotazioneDAO;

@Service
public class PrenotazioneServiceImpl implements PrenotazioneService {
	
	@Autowired
	PrenotazioneDAO prenotazioneDao;
	
	@Override
	public List<Prenotazione> getPrenotazioni() {
		return prenotazioneDao.findAll();
	}

	@Override
	public Prenotazione getPrenotazioneById(int id) {
		return prenotazioneDao.findById(id).get();
	}

	@Override
	public Prenotazione addPrenotazione(Prenotazione p) {
		return prenotazioneDao.save(p);
	}

}
