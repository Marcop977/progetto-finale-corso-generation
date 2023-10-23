package it.marco.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.marco.entities.Utente;
import it.marco.repos.UtenteDAO;

@Service
public class UtenteServiceImpl implements UtenteService {
	
	@Autowired
	UtenteDAO utenteDao;

	@Override
	public List<Utente> getUtenti() {
		return utenteDao.findAll();
	}

	@Override
	public Utente getUtenteById(int id) {
		return utenteDao.findById(id).get();
	}

	@Override
	public Utente addUtente(Utente u) {
		return utenteDao.save(u);
	}

}
