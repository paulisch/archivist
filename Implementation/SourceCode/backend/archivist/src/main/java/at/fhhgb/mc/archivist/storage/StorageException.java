/*
 * Archivist 2017
 * StorageException.java
 */
package at.fhhgb.mc.archivist.storage;

public class StorageException extends RuntimeException {

	private static final long serialVersionUID = 2990448662207516307L;

	public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
