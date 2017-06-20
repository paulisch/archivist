package at.fhhgb.mc.archivist.repository;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Genre;

public interface GenreRepository extends CrudRepository<Genre, Integer> {

}