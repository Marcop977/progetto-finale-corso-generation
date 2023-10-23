package it.marco.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.marco.entities.Prenotazione;

@Repository
public interface PrenotazioneDAO extends JpaRepository<Prenotazione, Integer>{

}
