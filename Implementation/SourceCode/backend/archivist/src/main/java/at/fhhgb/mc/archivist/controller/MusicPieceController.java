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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;
import at.fhhgb.mc.archivist.repository.ScoreRepository;
import at.fhhgb.mc.archivist.storage.StorageService;

@RestController
@RequestMapping("/${api.path}/musicpieces")
@CrossOrigin(origins = "http://localhost:8000")
public class MusicPieceController {

	@Autowired
	private MusicPieceRepository repository;
	
	@Autowired
	private ScoreRepository repScore;
	
	@Autowired
	private StorageService storageService;
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Musicpiece> get(@RequestParam(required = false, defaultValue = "") String search) {
		Collection<Musicpiece> result = new LinkedList<Musicpiece>();
		
		Iterator<Musicpiece> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Musicpiece current = it.next();
			prepareForSerialization(current);
			result.add(current);
		}
		return result;
	}
	
	@RequestMapping(method = RequestMethod.POST, path = "/add")
	public Musicpiece addOrUpdate(@RequestBody Musicpiece musicPiece) {
		repository.save(musicPiece);
		return musicPiece;
	}
	
	
	@RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
	public Musicpiece get(@PathVariable Integer id) {
		Musicpiece result = repository.findOne(id);
		
		List<Score> scores = result.getScores();
		for(Score scr : scores) {
			scr.setMusicpiece(null);
			scr.getInstrument().setScores(null);
		}
		
		prepareForSerialization(result);
		
		result.setScores(scores);
		
		return result;
	}
	
	private void prepareForSerialization(Musicpiece musicPiece) {
		musicPiece.setScores(null);
		if (musicPiece.getGenre() != null) {
			musicPiece.getGenre().setMusicpieces(null);
			musicPiece.getGenre().setGenre(null);
			musicPiece.getGenre().setGenres(null);
		}
	}
	
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
	
}
