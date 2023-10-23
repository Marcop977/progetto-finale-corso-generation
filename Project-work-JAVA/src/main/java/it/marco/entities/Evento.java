package it.marco.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "eventi")
public class Evento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_evento;
	
	private String titolo;
	private String tipologia;
	private String descrizione;
	private String descrizioneLunga;
	private String luogoEvento;
	private int postiDisponibili;
	private boolean prenotazioneObbligatoria;
	private LocalDate dataEvento;
	private String locandina;
	private String locandinaEventoSingolo;
	
	public int getId_evento() {
		return id_evento;
	}
	public void setId_evento(int id_evento) {
		this.id_evento = id_evento;
	}
	public String getTitolo() {
		return titolo;
	}
	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}
	public String getTipologia() {
		return tipologia;
	}
	public void setTipologia(String tipologia) {
		this.tipologia = tipologia;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public String getDescrizioneLunga() {
		return descrizioneLunga;
	}
	public void setDescrizioneLunga(String descrizioneLunga) {
		this.descrizioneLunga = descrizioneLunga;
	}
	public String getLuogoEvento() {
		return luogoEvento;
	}
	public void setLuogoEvento(String luogoEvento) {
		this.luogoEvento = luogoEvento;
	}
	public int getPostiDisponibili() {
		return postiDisponibili;
	}
	public void setPostiDisponibili(int postiDisponibili) {
		this.postiDisponibili = postiDisponibili;
	}
	public boolean isPrenotazioneObbligatoria() {
		return prenotazioneObbligatoria;
	}
	public void setPrenotazioneObbligatoria(boolean prenotazioneObbligatoria) {
		this.prenotazioneObbligatoria = prenotazioneObbligatoria;
	}
	public LocalDate getDataEvento() {
		return dataEvento;
	}
	public void setDataEvento(LocalDate dataEvento) {
		this.dataEvento = dataEvento;
	}
	public String getLocandina() {
		return locandina;
	}
	public void setLocandina(String locandina) {
		this.locandina = locandina;
	}
	public String getLocandinaEventoSingolo() {
		return locandinaEventoSingolo;
	}
	public void setLocandinaEventoSingolo(String locandinaEventoSingolo) {
		this.locandinaEventoSingolo = locandinaEventoSingolo;
	}
	
	
	
	
	
	
}
