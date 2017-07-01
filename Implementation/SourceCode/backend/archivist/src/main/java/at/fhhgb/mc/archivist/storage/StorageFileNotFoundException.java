/*
 * Archivist 2017
 * StorageFileNotFoundException.java
 */
package at.fhhgb.mc.archivist.storage;

/**
 * The class StorageFileNotFoundException represents an exception for files not found on the server storage.
 */
public class StorageFileNotFoundException extends StorageException {
	
	private static final long serialVersionUID = -2156552697176301662L;

	/**
	 * Instantiates a new storage file not found exception.
	 *
	 * @param message the error message
	 */
	public StorageFileNotFoundException(String message) {
        super(message);
    }

    /**
     * Instantiates a new storage file not found exception.
     *
     * @param message the error message
     * @param cause the cause of the exception
     */
    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}