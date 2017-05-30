package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Musicpiece;

public interface MusicPieceRepository extends CrudRepository<Musicpiece, Integer> {

}