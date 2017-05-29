package at.fhhgb.mc.archivist.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the musicpiece database table.
 * 
 */
@Entity
@NamedQuery(name="Musicpiece.findAll", query="SELECT m FROM Musicpiece m")
public class Musicpiece implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int musicPieceId;

	private String archiveNo;

	private String composer;

	private int difficulty;

	private String musicPieceName;

	//bi-directional many-to-one association to Genre
	@ManyToOne
	@JoinColumn(name="GenreId")
	private Genre genre;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="musicpiece")
	private List<Score> scores;

	public Musicpiece() {
	}

	public int getMusicPieceId() {
		return this.musicPieceId;
	}

	public void setMusicPieceId(int musicPieceId) {
		this.musicPieceId = musicPieceId;
	}

	public String getArchiveNo() {
		return this.archiveNo;
	}

	public void setArchiveNo(String archiveNo) {
		this.archiveNo = archiveNo;
	}

	public String getComposer() {
		return this.composer;
	}

	public void setComposer(String composer) {
		this.composer = composer;
	}

	public int getDifficulty() {
		return this.difficulty;
	}

	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}

	public String getMusicPieceName() {
		return this.musicPieceName;
	}

	public void setMusicPieceName(String musicPieceName) {
		this.musicPieceName = musicPieceName;
	}

	public Genre getGenre() {
		return this.genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public List<Score> getScores() {
		return this.scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public Score addScore(Score score) {
		getScores().add(score);
		score.setMusicpiece(this);

		return score;
	}

	public Score removeScore(Score score) {
		getScores().remove(score);
		score.setMusicpiece(null);

		return score;
	}

}