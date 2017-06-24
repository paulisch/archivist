package at.fhhgb.mc.archivist.controller;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import at.fhhgb.mc.archivist.model.Instrument;
import at.fhhgb.mc.archivist.repository.InstrumentRepository;

@RestController
@RequestMapping("/${api.path}/instruments")
@CrossOrigin(origins = "http://localhost:8000")
public class InstrumentController {

	@Autowired
	private InstrumentRepository repository;
	
	@RequestMapping(method = RequestMethod.GET, path = "/get")
	public Collection<Instrument> get() {
		Collection<Instrument> result = new LinkedList<Instrument>();
		
		Iterator<Instrument> it = repository.findAll().iterator();
		while(it.hasNext()) {
			Instrument current = it.next();
			prepareForSerialization(current);			
			result.add(current);
		}
		return result;
	}
	
	private void prepareForSerialization(Instrument instrument) {
		instrument.setScores(null);
	}
}
