/*
 * Archivist 2017
 * StorageException.java
 */
package at.fhhgb.mc.archivist.storage;

/**
 * The class StorageException is the base exception class for storage errors.
 */
public class StorageException extends RuntimeException {
	
	private static final long serialVersionUID = 2990448662207516307L;

	/**
	 * Instantiates a new storage exception.
	 *
	 * @param message the error message
	 */
	public StorageException(String message) {
        super(message);
    }

	/**
     * Instantiates a new storage exception.
     *
     * @param message the error message
     * @param cause the cause of the exception
     */
    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
