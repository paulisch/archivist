package at.fhhgb.mc.archivist;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Genre;
import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.repository.MusicPieceRepository;

@RestController()
@RequestMapping("/${api.path}/hello")
@CrossOrigin(origins = "http://localhost:8000")
public class HelloController {
	
	@Autowired
	private MusicPieceRepository repository;
	
	@RequestMapping("/{name}")
	public String hello(@PathVariable String name) {
		return name + ", hello!";
	}
	
	@RequestMapping("/getall")
	public List<Map<String, String>> getMusicPieces() {
				
		List<Map<String, String>> musicPieces=new ArrayList<>();
		
		Iterator it = repository.findAll().iterator(); //Fetch data from database
		while (it.hasNext()) { //Iterate over result
			Musicpiece p = (Musicpiece) it.next();
			
			Map<String, String> obj = new HashMap<String, String>();
			obj.put("id", Integer.toString(p.getMusicPieceId()));
			obj.put("name", p.getMusicPieceName());
			obj.put("composer", p.getComposer());
			
			musicPieces.add(obj);
		}
		
//		Map<String, String> obj = new HashMap<String, String>();
//		obj.put("id", Integer.toString(1));
//		obj.put("name", "asdf");
//		obj.put("name", "bsdf");
//		
//		musicPieces.add(obj);
		
		return musicPieces;
	}
	
	@RequestMapping("/remove")
	public boolean remove (int id) {		
		repository.findOne(id);		
		repository.delete(id);
		return true;
	}
}