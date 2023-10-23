package it.marco.dto;

import java.sql.Timestamp;

public class PrenotazioneDTO {

	private Timestamp dataPrenotazione;
	private int postiPrenotati;
	private int evento_id;
	private int utente_id;
	
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
	public int getEvento_id() {
		return evento_id;
	}
	public void setEvento_id(int evento_id) {
		this.evento_id = evento_id;
	}
	public int getUtente_id() {
		return utente_id;
	}
	public void setUtente_id(int utente_id) {
		this.utente_id = utente_id;
	}
	
	
}
