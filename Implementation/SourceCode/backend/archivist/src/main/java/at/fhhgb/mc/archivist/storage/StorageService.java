/*
 * Archivist 2017
 * StorageService.java
 */
package at.fhhgb.mc.archivist.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * The interface StorageService provides methods to access the file storage of the server.
 */
public interface StorageService {

    /**
     * Initializes the server upload directory.
     */
    void init();

    /**
     * Stores a file to the upload directory.
     *
     * @param file the file to upload
     */
    void store(MultipartFile file);
    
    /**
     * Stores a file to the upload directory having a specific filename.
     *
     * @param file the file to upload
     * @param destinationFilename the target filename of the file to upload
     */
    void store(MultipartFile file, String destinationFilename);

    /**
     * Loads the path of all files and returns them.
     *
     * @return the stream of path-objects
     */
    Stream<Path> loadAll();

    /**
     * Load the path of a specific file.
     *
     * @param filename the filename of the requested file
     * @return the path of the requested file
     */
    Path load(String filename);

    /**
     * Loads the resource object of a specific file.
     *
     * @param filename the filename of the requested file
     * @return the resource object of the requested file
     */
    Resource loadAsResource(String filename);

    /**
     * Deletes all content of the upload directory and the upload directory itself.
     */
    void deleteAll();
    
    /**
     * Delete a specific file.
     *
     * @param filename the filename of the file to delete
     */
    void delete(String filename);
}
