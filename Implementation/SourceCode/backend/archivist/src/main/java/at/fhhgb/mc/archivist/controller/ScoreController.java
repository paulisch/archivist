package at.fhhgb.mc.archivist.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;
import at.fhhgb.mc.archivist.repository.InstrumentRepository;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;
import at.fhhgb.mc.archivist.repository.ScoreRepository;
import at.fhhgb.mc.archivist.storage.StorageFileNotFoundException;
import at.fhhgb.mc.archivist.storage.StorageService;

@RestController
@RequestMapping("/${api.path}/scores")
@CrossOrigin(origins = "http://localhost:8000")
public class ScoreController {

	@Autowired
	private ScoreRepository repository;
	
	@Autowired
	private MusicPieceRepository repMusicPiece;
	
	@Autowired
	private InstrumentRepository repInstrument;
	
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
				Score s = repository.findOne(id);
				if(s != null) {
					try {
						storageService.delete(s.getFileName());
					}
					catch(StorageFileNotFoundException e) {
					}
					repository.delete(id);
				}
			}
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, path = "/upload")
    public Score upload(@RequestPart("score") String scoreString, @RequestPart("file") MultipartFile file) throws IOException {
		//TODO: Implement algorithm to detect if file already exists, then chooser another name; do not put ID into filename!
        Score score = new ObjectMapper().readValue(scoreString, Score.class);
        
        score.setInstrument(repInstrument.findOne(score.getInstrument().getInstrumentId()));
        score.setMusicpiece(repMusicPiece.findOne(score.getMusicpiece().getMusicPieceId()));
        
        String[] fileSplit = file.getOriginalFilename().split("\\.");
        String fileExtension = fileSplit[fileSplit.length - 1];
        
        String filename =
        		score.getMusicpiece().getMusicPieceName() +
        		"_" +
        		score.getInstrument().getInstrumentName() +
        		"-" +
        		score.getInstrumentNo() +
        		"." +
        		fileExtension;
        
        score.setFileName(filename);
        repository.save(score);
		
        storageService.store(file, score.getFileName());
        
		prepareForSerialization(score);
		
		return score;
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")
                .body(file);
    }
	
	@SuppressWarnings("rawtypes")
	@ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
