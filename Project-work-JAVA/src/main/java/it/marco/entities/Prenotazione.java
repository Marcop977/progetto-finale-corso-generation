package it.marco.entities;

import java.sql.Timestamp;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prenotazioni")
public class Prenotazione {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_prenotazione;
	
	@UpdateTimestamp
	private Timestamp dataPrenotazione;
	private int postiPrenotati;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "evento_id")
	private Evento evento_id;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "utente_id")
	private Utente utente_id;

	public int getId_prenotazione() {
		return id_prenotazione;
	}

	public void setId_prenotazione(int id_prenotazione) {
		this.id_prenotazione = id_prenotazione;
	}

	public Timestamp getDataPrenotazione() {
		return dataPrenotazione;
	}

	public void setDataPrenotazione(Timestamp dataPrenotazione) {
		this.dataPrenotazione = dataPrenotazione;
	}

	public int getPostiPrenotati() {
		return postiPrenotati;
	}

	public void setPostiPrenotati(int postiPrenotati) {
		this.postiPrenotati = postiPrenotati;
	}

	public Evento getEvento_id() {
		return evento_id;
	}

	public void setEvento_id(Evento evento_id) {
		this.evento_id = evento_id;
	}

	public Utente getUtente_id() {
		return utente_id;
	}

	public void setUtente_id(Utente utente_id) {
		this.utente_id = utente_id;
	}	
		

}
