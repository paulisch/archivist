package at.fhhgb.mc.archivist;

import java.util.ArrayList;
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
		Genre g = new Genre();
		g.setGenreName("Jazz");
		
		Musicpiece p = new Musicpiece();
		p.setMusicPieceName(name);
		p.setGenre(g);
		
		repository.save(p);
		
		return name + " created!";
	}
	
	@RequestMapping("/getmusicpieces")
	public List<String> getMusicPieces() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Zigeunermarsch");
		list.add("Radetzky Marsch");
		return list;
	}
} 