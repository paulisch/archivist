package at.fhhgb.mc.archivist;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	
	@RequestMapping("/hello/{name}")
	public String hello(@PathVariable String name) {
		return "Hello " + name + "!";
	}
	
	@RequestMapping("/getmusicpieces")
	public List<String> getMusicPieces() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Zigeunermarsch");
		list.add("Radetzky Marsch");
		return list;
	}
} 