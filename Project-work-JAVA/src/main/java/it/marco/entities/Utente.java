package it.marco.entities;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "utenti")
public class Utente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_utente;
	
	private String nome;
	private String cognome;
	private String ruolo;
	private String email;
	private String password;
	private String nascita;
	private char tipo;
	private String firma;
	
	@UpdateTimestamp
	private Timestamp ultimaModifica;
	
	@CreationTimestamp
	private Timestamp dataIscrizione;
	
	public int getId_utente() {
		return id_utente;
	}
	public void setId_utente(int id_utente) {
		this.id_utente = id_utente;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	public String getRuolo() {
		return ruolo;
	}
	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNascita() {
		return nascita;
	}
	public void setNascita(String nascita) {
		this.nascita = nascita;
	}
	public char getTipo() {
		return tipo;
	}
	public void setTipo(char tipo) {
		this.tipo = tipo;
	}
	public String getFirma() {
		return firma;
	}
	public void setFirma(String firma) {
		this.firma = firma;
	}
	public Timestamp getUltimaModifica() {
		return ultimaModifica;
	}
	public void setUltimaModifica(Timestamp ultimaModifica) {
		this.ultimaModifica = ultimaModifica;
	}
	public Timestamp getDataIscrizione() {
		return dataIscrizione;
	}
	public void setDataIscrizione(Timestamp dataIscrizione) {
		this.dataIscrizione = dataIscrizione;
	}
	
	
}
