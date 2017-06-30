/*
 * Archivist 2017
 * ScoreController.java
 */
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

/**
 * The class  ScoreController makes score-entries accessible.
 * URL: /archivist/api/scores
 */
@RestController
@RequestMapping("/${api.path}/scores")
@CrossOrigin(origins = "http://localhost:8000") //for testing purposes with frontend running on port 8000
public class ScoreController {

	/** The score repository. */
	@Autowired
	private ScoreRepository repository;
	
	/** The musicpiece repository. */
	@Autowired
	private MusicPieceRepository repMusicPiece;
	
	/** The instrument repository. */
	@Autowired
	private InstrumentRepository repInstrument;
	
	/** The storage service. */
	@Autowired
	private StorageService storageService;
	
	/**
	 * Gets a list of scores belonging to the given musicpiece stored in the database.
	 *
	 * @param musicPieceId the id of the musicpiece to get the scores from
	 * @return the list of scores belonging to the musicpiece
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Score> get(@RequestParam("musicPieceId") Integer musicPieceId) {
		Collection<Score> result = new LinkedList<Score>();
		
		Iterator<Score> it = repository.findByMusicpiece_MusicPieceId(musicPieceId).iterator();
		while(it.hasNext()) {
			Score current = it.next();
			prepareForSerialization(current);
			result.add(current);
		}
		return result;
	}

	/**
	 * Deletes all scores and the associated file by given ids from the database.
	 *
	 * @param scoreIds the ids of the scores to delete
	 */
	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{scoreIds}")
	public void delete(@PathVariable Integer[] scoreIds) {
		if(scoreIds != null && scoreIds.length > 0) {
			for(Integer id : scoreIds) {
				deleteScore(storageService, repository, id);
			}
		}
	}
	
	/**
	 * Stores a new score in the database and save the corresponding score file on the server.
	 *
	 * @param scoreString the score object as JSON string
	 * @param file the file representing the score
	 * @return the new score
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/upload")
    public Score upload(@RequestPart("score") String scoreString, @RequestPart("file") MultipartFile file) throws IOException {
		//TODO: Implement algorithm to detect if file already exists, then choose another name; do not put ID into filename!
        Score score = new ObjectMapper().readValue(scoreString, Score.class);
        
        //Set instrument and musicpiece as objects for the new score (fetch data from database)
        score.setInstrument(repInstrument.findOne(score.getInstrument().getInstrumentId()));
        score.setMusicpiece(repMusicPiece.findOne(score.getMusicpiece().getMusicPieceId()));
        
        //Determine the file extension
        String[] fileSplit = file.getOriginalFilename().split("\\.");
        String fileExtension = fileSplit[fileSplit.length - 1];
        
        //Build the final file name for the score
        String filename =
        		score.getMusicpiece().getMusicPieceName() +
        		"_" +
        		score.getInstrument().getInstrumentName() +
        		"-" +
        		score.getInstrumentNo() +
        		"." +
        		fileExtension;
        
        //Save the score in the database
        score.setFileName(filename);
        repository.save(score);
		
        //Store the score file on the server's upload directory
        storageService.store(file, score.getFileName());
        
		prepareForSerialization(score);
		
		return score;
	}
	
	/**
	 * Serves uploaded score files.
	 *
	 * @param filename the filename of the requested score file
	 * @return the actual file resource
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")
                .body(file);
    }
	
	/**
	 * Deletes a single score-entry from the database and deletes the score file from the server.
	 *
	 * @param storageService the storage service
	 * @param repository the score repository
	 * @param scoreId the id of the score to delete
	 */
	public static void deleteScore(StorageService storageService, ScoreRepository repository, Integer scoreId) {
		Score s = repository.findOne(scoreId);
		try {
			storageService.delete(s.getFileName());
		}
		catch(StorageFileNotFoundException e) {
			//Score file not existing, so deleting is not necessary anyway 
		}
		repository.delete(scoreId);
	}
	
	/**
	 * Deletes all scores of a given musicpiece.
	 * Deletes score entries from database and deletes the score files from the server.
	 *
	 * @param storageService the storage service
	 * @param repository the score repository
	 * @param musicpiece the musicpiece to delete the scores from
	 */
	public static void deleteScores(StorageService storageService, ScoreRepository repository, Musicpiece musicpiece) {
		if (musicpiece.getScores() != null && musicpiece.getScores().size() > 0) {
			for(Score s : musicpiece.getScores()) {
				deleteScore(storageService, repository, s.getScoreId());
			}
		}
	}
	
	/**
	 * Prepare a score object for serialization.
	 * Sets certain properties to null to avoid reference loops and allow trouble-free serialization.
	 *
	 * @param current the current score object for serialization
	 */
	private void prepareForSerialization(Score current) {
		Musicpiece musicPiece = new Musicpiece();
		musicPiece.setMusicPieceId(current.getMusicpiece().getMusicPieceId());
		
		current.setMusicpiece(musicPiece);
		
		current.getInstrument().setScores(null);
	}
	

	/**
	 * Handles exceptions for storage files, that cannot be found.
	 *
	 * @param exc the exception object
	 * @return the HTTP response entity
	 */
	@SuppressWarnings("rawtypes")
	@ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
