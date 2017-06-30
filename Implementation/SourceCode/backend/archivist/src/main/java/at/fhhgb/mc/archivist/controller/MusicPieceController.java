/*
 * Archivist 2017
 * MusicPieceController.java
 */
package at.fhhgb.mc.archivist.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;
import at.fhhgb.mc.archivist.repository.ScoreRepository;
import at.fhhgb.mc.archivist.storage.StorageService;

/**
 * The class  MusicPieceController makes musicpiece-entries accessible.
 * URL: /archivist/api/musicpieces
 */
@RestController
@RequestMapping("/${api.path}/musicpieces")
@CrossOrigin(origins = "http://localhost:8000") //for testing purposes with frontend running on port 8000
public class MusicPieceController {

	/** The musicpiece repository. */
	@Autowired
	private MusicPieceRepository repository;
	
	/** The score repository. */
	@Autowired
	private ScoreRepository repScore;
	
	/** The storage service. */
	@Autowired
	private StorageService storageService;
	
	/**
	 * Gets a list of musicpieces stored in the database.
	 *
	 * @return the list of musicpieces
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Musicpiece> get() {
		Collection<Musicpiece> result = new LinkedList<Musicpiece>();
		
		Iterator<Musicpiece> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Musicpiece current = it.next();
			prepareForSerialization(current);
			result.add(current);
		}
		return result;
	}
	
	/**
	 * Adds a new or updates an existing musicpiece entry in the database.
	 *
	 * @param musicPiece the music piece to add or update
	 * @return the updated or new musicpiece
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/add")
	public Musicpiece addOrUpdate(@RequestBody Musicpiece musicPiece) {
		repository.save(musicPiece);
		prepareForSerialization(musicPiece);
		return musicPiece;
	}
	
	
	/**
	 * Gets a musicpiece by a given id stored in the database.
	 *
	 * @param id the id of the requested musicpiece
	 * @return the musicpiece having the requested id
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
	public Musicpiece get(@PathVariable Integer id) {
		Musicpiece result = repository.findOne(id);
		
		//Prepare the list of scores of that musicpiece for serialization
		List<Score> scores = result.getScores();
		for(Score scr : scores) {
			scr.setMusicpiece(null);
			scr.getInstrument().setScores(null);
		}
		
		prepareForSerialization(result);
		
		//Provide the list of scores prepared before; prepareForSerialization would actually set the scores to null.
		result.setScores(scores);
		
		return result;
	}
	
	/**
	 * Deletes all musicpieces by given ids including scores from the database and score files from the server.
	 *
	 * @param musicPieceIds the ids of the musicpieces to delete
	 */
	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{musicPieceIds}")
	public void delete(@PathVariable Integer[] musicPieceIds) {
		if(musicPieceIds != null && musicPieceIds.length > 0) {
			for(Integer id : musicPieceIds) {
				Musicpiece p = repository.findOne(id);
				ScoreController.deleteScores(storageService, repScore, p);
				repository.delete(p);
			}
		}
	}
	
	/**
	 * Prepare a musicpiece object for serialization.
	 * Sets certain properties to null to avoid reference loops and allow trouble-free serialization.
	 *
	 * @param current the current musicPiece object for serialization
	 */
	private void prepareForSerialization(Musicpiece musicPiece) {
		musicPiece.setScores(null);
		if (musicPiece.getGenre() != null) {
			musicPiece.getGenre().setMusicpieces(null);
			musicPiece.getGenre().setGenre(null);
			musicPiece.getGenre().setGenres(null);
		}
	}
}