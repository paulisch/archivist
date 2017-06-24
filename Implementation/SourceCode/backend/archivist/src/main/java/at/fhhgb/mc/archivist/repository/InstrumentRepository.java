package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;
import at.fhhgb.mc.archivist.model.Instrument;

public interface InstrumentRepository extends CrudRepository<Instrument, Integer> {

}