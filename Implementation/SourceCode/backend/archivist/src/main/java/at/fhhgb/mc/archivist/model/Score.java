package at.fhhgb.mc.archivist.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the score database table.
 * 
 */
@Entity
@NamedQuery(name="Score.findAll", query="SELECT s FROM Score s")
public class Score implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int scoreId;

	private String fileName;

	//bi-directional many-to-one association to Instrument
	@ManyToOne
	@JoinColumn(name="InstrumentId")
	private Instrument instrument;

	//bi-directional many-to-one association to Musicpiece
	@ManyToOne
	@JoinColumn(name="MusicPieceId")
	private Musicpiece musicpiece;

	public Score() {
	}

	public int getScoreId() {
		return this.scoreId;
	}

	public void setScoreId(int scoreId) {
		this.scoreId = scoreId;
	}

	public String getFileName() {
		return this.fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Instrument getInstrument() {
		return this.instrument;
	}

	public void setInstrument(Instrument instrument) {
		this.instrument = instrument;
	}

	public Musicpiece getMusicpiece() {
		return this.musicpiece;
	}

	public void setMusicpiece(Musicpiece musicpiece) {
		this.musicpiece = musicpiece;
	}

}