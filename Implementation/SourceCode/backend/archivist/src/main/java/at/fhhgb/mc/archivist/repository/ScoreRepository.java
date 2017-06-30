/*
 * Archivist 2017
 * ScoreRepository.java
 */
package at.fhhgb.mc.archivist.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import at.fhhgb.mc.archivist.model.Score;

/**
 * The Interface ScoreRepository for managing score-entries in the database.
 * Spring framework will implement a functioning class automatically in the background.
 */
public interface ScoreRepository extends CrudRepository<Score, Integer> {
	
	/**
	 * Find a list of scores by music piece id.
	 *
	 * @param musicPieceId the music piece id of the requested scores
	 * @return the list of scores
	 */
	List<Score> findByMusicpiece_MusicPieceId(int musicPieceId);
}