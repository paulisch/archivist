package at.fhhgb.mc.archivist.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the score database table.
 * 
 */
@Entity
@Table(name="score")
@NamedQuery(name="Score.findAll", query="SELECT s FROM Score s")
public class Score implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private int scoreId;

	@Column(nullable=false, length=45)
	private String fileName;

	@Column(nullable=false)
	private int instrumentNo;

	//bi-directional many-to-one association to Instrument
	@ManyToOne
	@JoinColumn(name="InstrumentId", nullable=false)
	private Instrument instrument;

	//bi-directional many-to-one association to Musicpiece
	@ManyToOne
	@JoinColumn(name="MusicPieceId", nullable=false)
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

	public int getInstrumentNo() {
		return this.instrumentNo;
	}

	public void setInstrumentNo(int instrumentNo) {
		this.instrumentNo = instrumentNo;
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