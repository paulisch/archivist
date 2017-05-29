package at.fhhgb.mc.archivist.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the genre database table.
 * 
 */
@Entity
@NamedQuery(name="Genre.findAll", query="SELECT g FROM Genre g")
public class Genre implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int genreId;

	private String genreName;

	//bi-directional many-to-one association to Genre
	@ManyToOne
	@JoinColumn(name="ParentId")
	private Genre genre;

	//bi-directional many-to-one association to Genre
	@OneToMany(mappedBy="genre")
	private List<Genre> genres;

	//bi-directional many-to-one association to Musicpiece
	@OneToMany(mappedBy="genre")
	private List<Musicpiece> musicpieces;

	public Genre() {
	}

	public int getGenreId() {
		return this.genreId;
	}

	public void setGenreId(int genreId) {
		this.genreId = genreId;
	}

	public String getGenreName() {
		return this.genreName;
	}

	public void setGenreName(String genreName) {
		this.genreName = genreName;
	}

	public Genre getGenre() {
		return this.genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public List<Genre> getGenres() {
		return this.genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

	public Genre addGenre(Genre genre) {
		getGenres().add(genre);
		genre.setGenre(this);

		return genre;
	}

	public Genre removeGenre(Genre genre) {
		getGenres().remove(genre);
		genre.setGenre(null);

		return genre;
	}

	public List<Musicpiece> getMusicpieces() {
		return this.musicpieces;
	}

	public void setMusicpieces(List<Musicpiece> musicpieces) {
		this.musicpieces = musicpieces;
	}

	public Musicpiece addMusicpiece(Musicpiece musicpiece) {
		getMusicpieces().add(musicpiece);
		musicpiece.setGenre(this);

		return musicpiece;
	}

	public Musicpiece removeMusicpiece(Musicpiece musicpiece) {
		getMusicpieces().remove(musicpiece);
		musicpiece.setGenre(null);

		return musicpiece;
	}

}