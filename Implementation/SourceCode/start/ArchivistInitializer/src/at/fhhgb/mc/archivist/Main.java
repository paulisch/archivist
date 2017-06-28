package at.fhhgb.mc.archivist;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Scanner;

public class Main {
	
	public static final String SHORTCUT_FILE = "shortcutCmd.bat";
	public static final String START_FILE = "start.cmd";
	public static final String URL_ARCHIVIST = "http://localhost:8080/archivist/";
	public static final int WILDFLY_PORT = 8080;
	public static final int MAX_TRIES = 25;
	
	public static void main(String[] args) {		
		StartLoadingDialog d=new StartLoadingDialog();
        d.setAlwaysOnTop(true);
        d.setVisible(true);
        
        createDesktopShortcut();
        
        boolean wildFlyRunning = false;
        boolean executedStart = false;
        int tryCounter = 0;
        
        do {
        	tryCounter++;
        	if (executedStart) {
	        	try {
	    			Thread.sleep(2000);
	    		} catch (InterruptedException e) {
	    			e.printStackTrace();
	    		}
        	}
        	
        	try {
	        	if(isProcessRunningOnPort(WILDFLY_PORT)) {
	        		wildFlyRunning = true;
	        	}
        	}
        	catch(Exception e) {
        		System.out.println("Failed to detect, if service process running on port" + WILDFLY_PORT);
        	}
	        
	        if (!wildFlyRunning && !executedStart) {
	        	boolean success = executeStartFile();
	        	if (success) {
	        		executedStart = true;
	        	}
	        }
	        
        } while(!wildFlyRunning && tryCounter < MAX_TRIES);
        
        if (wildFlyRunning) {
        	int sleepTime = 2500; //Default wait time if wildfly already running
        	
        	if (executedStart) {
        		sleepTime = 20000; //Give wildfly some time to deploy application on fresh start up
        	}
        	
        	try {
    			Thread.sleep(sleepTime);
    		} catch (InterruptedException e) {
    			e.printStackTrace();
    		}
        }
        
        //Open web app
        openWebpage(URI.create(URL_ARCHIVIST));
        
        if (!wildFlyRunning) {
        	MessageBox.show("Fehler", "Archivist konnte leider nicht gestartet werden!");
        }
        
        //Close dialog
        d.dispose();
	}
	
	private static boolean executeStartFile() {
		boolean success = true;
		try {
			Runtime rt = Runtime.getRuntime();
			
			StringBuilder result = new StringBuilder("");
	
			//Read resource
	    	Scanner scanner = new Scanner(Main.class.getResourceAsStream("/" + START_FILE));
			while (scanner.hasNextLine()) {
				String line = scanner.nextLine();
				result.append(line).append(String.format("%n"));
			}
			scanner.close();
			
			//Write to file
	        PrintWriter writer = new PrintWriter(START_FILE, "UTF-8");
	        writer.print(result.toString());
	        writer.close();
	    	
	    	System.out.println("Executing " + START_FILE);
	    	Process exec = rt.exec(START_FILE);
	    	exec.waitFor();
	    	
	    	//BufferedReader stdInput = new BufferedReader(new InputStreamReader(exec.getInputStream()));
	        
	        //String s = null;
	        //while ((s = stdInput.readLine()) != null) {
	        //    System.out.println(s);
	        //}
		}
		catch(Exception e) {
			success = false;
			System.out.println("Unable to execute start file");
			e.printStackTrace();
		}
		finally {
			File file = new File(START_FILE);
	        if (file.exists()) {
	        	file.delete();
	        }
		}
		return success;
	}
	
	private static boolean isProcessRunningOnPort(int port) throws IOException {
		boolean running = false;
		String search = ":" + port;
		Runtime rt = Runtime.getRuntime();
		Process proc = rt.exec("netstat -ano");
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        
        String s = null;
        while ((s = stdInput.readLine()) != null) {
            System.out.println(s);
            
            if (s.contains(search)) {
            	running = true;
            }
        }
        
        stdInput.close();
        
        return running;
	}
	
	private static void createDesktopShortcut() {		
		try {
			Runtime rt = Runtime.getRuntime();
			
	        File jarDir = new File(ClassLoader.getSystemClassLoader().getResource(".").getPath());
	        String jarName = new java.io.File(Main.class.getProtectionDomain().getCodeSource().getLocation().getPath()).getName();
	        String path = jarDir.getAbsolutePath();
	        path = path.replace('/', '\\');
	        
	        System.out.println("Path of jar: " + path);
	        System.out.println("Name of jar: " + jarName);
	        
	        StringBuilder shortcutCmd = new StringBuilder();
	        shortcutCmd.append("set SCRIPT=\"%TEMP%\\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs\"\n");
	        shortcutCmd.append("echo Set oWS = WScript.CreateObject(\"WScript.Shell\") >> %SCRIPT%\n");
	        shortcutCmd.append("echo sLinkFile = \"%USERPROFILE%\\Desktop\\Archivist.lnk\" >> %SCRIPT%\n");
	        shortcutCmd.append("echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%\n");
	        shortcutCmd.append("echo oLink.TargetPath = \""+path+"\\"+jarName+"\" >> %SCRIPT%\n");
	        shortcutCmd.append("echo oLink.WorkingDirectory = \""+path+"\" >> %SCRIPT%\n");
	        shortcutCmd.append("echo oLink.IconLocation = \""+path+"\\archivist.ico\" >> %SCRIPT%\n");
	        shortcutCmd.append("echo oLink.Save >> %SCRIPT%\n");
	        shortcutCmd.append("cscript /nologo %SCRIPT%\n");
	        shortcutCmd.append("del %SCRIPT%\n");
	        
	        String finalshortcutCmd = shortcutCmd.toString();

            PrintWriter writer = new PrintWriter(SHORTCUT_FILE, "UTF-8");
            writer.print(finalshortcutCmd);
            writer.close();
	        
	        System.out.println("Executing " + SHORTCUT_FILE);
	        rt.exec(SHORTCUT_FILE).waitFor();	        
		}
		catch(Exception e) {
			System.out.println("Unable to create shortcut");
			e.printStackTrace();
		}
		finally {
			File file = new File(SHORTCUT_FILE);
			if (file.exists()) {
				file.delete();
			}
		}
	}
	
	private static void openWebpage(URI uri) {
	    Desktop desktop = Desktop.isDesktopSupported() ? Desktop.getDesktop() : null;
	    if (desktop != null && desktop.isSupported(Desktop.Action.BROWSE)) {
	        try {
	            desktop.browse(uri);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	}

	@SuppressWarnings("unused")
	private static void openWebpage(URL url) {
	    try {
	        openWebpage(url.toURI());
	    } catch (URISyntaxException e) {
	        e.printStackTrace();
	    }
	}
}