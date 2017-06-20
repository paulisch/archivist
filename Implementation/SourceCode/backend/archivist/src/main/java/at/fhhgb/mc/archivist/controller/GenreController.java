package at.fhhgb.mc.archivist.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Genre;
import at.fhhgb.mc.archivist.repository.GenreRepository;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;

@RestController
@RequestMapping("/${api.path}/genres")
@CrossOrigin(origins = "http://localhost:8000")
public class GenreController {

	@Autowired
	private GenreRepository repository;
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Genre> get() {
		Collection<Genre> result = new LinkedList<Genre>();
		
		Iterator<Genre> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Genre current = it.next();
			prepareForSerialization(current);			
			result.add(current);
		}
		return result;
	}

	private void prepareForSerialization(Genre current) {
		current.setMusicpieces(null);
		current.setGenres(null);
		if (current.getGenre() != null) {
			Genre g = new Genre();
			g.setGenreId(current.getGenre().getGenreId());
			current.setGenre(g);
		}
	}
	
}
