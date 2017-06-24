package at.fhhgb.mc.archivist.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;
import at.fhhgb.mc.archivist.repository.ScoreRepository;
import at.fhhgb.mc.archivist.storage.StorageService;

@RestController
@RequestMapping("/${api.path}/scores")
@CrossOrigin(origins = "http://localhost:8000")
public class ScoreController {

	@Autowired
	private ScoreRepository repository;
	
	@Autowired
	private StorageService storageService;
	
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

	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{scoreIds}")
	public void delete(@PathVariable Integer[] scoreIds) {
		if(scoreIds != null && scoreIds.length > 0) {
			for(Integer id : scoreIds) {
				repository.delete(id);
			}
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, path = "/add")
	public Score add(@RequestBody Score score) {
		score.setFileName("blubber");
		repository.save(score);
		
		prepareForSerialization(score);
		
		return score;
	}
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Score upload(@RequestPart("score") String scoreString, @RequestPart("file") MultipartFile file) throws IOException {
        Score score = new ObjectMapper().readValue(scoreString, Score.class);
        
        storageService.store(file);
        
        //repository.save(score);
		
		prepareForSerialization(score);
		
		return score;
	}
}
