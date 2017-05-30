package at.fhhgb.mc.archivist.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the instrument database table.
 * 
 */
@Entity
@Table(name="instrument")
@NamedQuery(name="Instrument.findAll", query="SELECT i FROM Instrument i")
public class Instrument implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private int instrumentId;

	@Column(nullable=false, length=45)
	private String instrumentName;

	@Column(nullable=false, length=2)
	private String tune;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="instrument")
	private List<Score> scores;

	public Instrument() {
	}

	public int getInstrumentId() {
		return this.instrumentId;
	}

	public void setInstrumentId(int instrumentId) {
		this.instrumentId = instrumentId;
	}

	public String getInstrumentName() {
		return this.instrumentName;
	}

	public void setInstrumentName(String instrumentName) {
		this.instrumentName = instrumentName;
	}

	public String getTune() {
		return this.tune;
	}

	public void setTune(String tune) {
		this.tune = tune;
	}

	public List<Score> getScores() {
		return this.scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public Score addScore(Score score) {
		getScores().add(score);
		score.setInstrument(this);

		return score;
	}

	public Score removeScore(Score score) {
		getScores().remove(score);
		score.setInstrument(null);

		return score;
	}

}