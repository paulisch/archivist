package at.fhhgb.mc.archivist.repository;

import java.util.Iterator;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Musicpiece;
import at.fhhgb.mc.archivist.model.Score;

public interface ScoreRepository extends CrudRepository<Score, Integer> {
	List<Score> findByMusicpiece_MusicPieceId(int musicPieceId);
}