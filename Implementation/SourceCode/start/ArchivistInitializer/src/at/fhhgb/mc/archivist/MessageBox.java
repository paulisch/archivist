package at.fhhgb.mc.archivist;

import javax.swing.JOptionPane;

public class MessageBox {
    
    public static final int ERROR=JOptionPane.ERROR_MESSAGE;
    
    public static void show(String title, String text) {
        JOptionPane.showMessageDialog(null, text, title, JOptionPane.INFORMATION_MESSAGE);
    }  
    
    public static void show(String title, String text, int type) {
        JOptionPane.showMessageDialog(null, text, title, type);
    }
}