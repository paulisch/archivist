package at.fhhgb.mc.archivist;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Genre;
import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;

@RestController
public class HelloController {
	
	@Autowired
	private MusicPieceRepository repository;
	
	@RequestMapping("/hello/{name}")
	public String hello(@PathVariable String name) {
		return name + ", hello!";
	}
	
	@RequestMapping("/getall")
	public List<Musicpiece> getMusicPieces() {
		List<Musicpiece> result = new ArrayList<>();
		Iterator it = repository.findAll().iterator();
		while (it.hasNext()) {
			result.add((Musicpiece) it.next());
		}
		return result;
	}
} 