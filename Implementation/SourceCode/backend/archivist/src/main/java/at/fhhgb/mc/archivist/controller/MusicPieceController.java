package at.fhhgb.mc.archivist.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;

@RestController
@RequestMapping("/${api.path}/musicpieces")
@CrossOrigin(origins = "http://localhost:8000")
public class MusicPieceController {

	@Autowired
	private MusicPieceRepository repository;
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Musicpiece> get(@RequestParam(required = false, defaultValue = "") String search) {
		Collection<Musicpiece> result = new LinkedList<Musicpiece>();
		
		Iterator<Musicpiece> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Musicpiece current = it.next();
			current.setScores(null);
			
			if (current.getGenre() != null) {
				current.getGenre().setMusicpieces(null);
				current.getGenre().setGenre(null);
				current.getGenre().setGenres(null);
			}
			
			result.add(current);
		}
		return result;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, path = "/delete/{musicPieceIds}")
	public void delete(@PathVariable Integer[] musicPieceIds) {
		if(musicPieceIds != null && musicPieceIds.length > 0) {
			for(Integer id : musicPieceIds) {
				repository.delete(id);
			}
		}
	}
	
}
