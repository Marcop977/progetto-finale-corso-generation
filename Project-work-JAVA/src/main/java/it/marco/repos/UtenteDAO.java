package it.marco.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.marco.entities.Utente;

@Repository
public interface UtenteDAO extends JpaRepository<Utente, Integer> {

}
