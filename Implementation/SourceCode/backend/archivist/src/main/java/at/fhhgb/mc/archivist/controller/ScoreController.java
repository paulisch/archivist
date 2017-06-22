package at.fhhgb.mc.archivist.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;
import at.fhhgb.mc.archivist.repository.ScoreRepository;

@RestController
@RequestMapping("/${api.path}/scores")
@CrossOrigin(origins = "http://localhost:8000")
public class ScoreController {

	@Autowired
	private ScoreRepository repository;
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Score> get(@RequestParam("musicPieceId") Integer musicPieceId) {
		Collection<Score> result = new LinkedList<Score>();
		
		Musicpiece p = new Musicpiece();
		p.setMusicPieceId(musicPieceId);
		
		Iterator<Score> it = repository.findByMusicpiece_MusicPieceId(musicPieceId).iterator();
		while(it.hasNext()) {
			Score current = it.next();
			prepareForSerialization(current);
			result.add(current);
		}
		return result;
	}

	private void prepareForSerialization(Score current) {
		Musicpiece musicPiece = new Musicpiece();
		musicPiece.setMusicPieceId(current.getMusicpiece().getMusicPieceId());
		
		current.setMusicpiece(musicPiece);
		
		current.getInstrument().setScores(null);		
	}

	
	
	
}
