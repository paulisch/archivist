/*
 * Archivist 2017
 * StorageFileNotFoundException.java
 */
package at.fhhgb.mc.archivist.storage;

public class StorageFileNotFoundException extends StorageException {

	private static final long serialVersionUID = -2156552697176301662L;

	public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}