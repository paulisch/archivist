package at.fhhgb.mc.archivist;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.border.Border;
import javax.swing.border.CompoundBorder;
import javax.swing.border.EmptyBorder;

import com.sun.awt.AWTUtilities;

public class StartLoadingDialog extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private BufferedImage logo;

	public StartLoadingDialog() {
		init();
	}

	private void init() {
		
		Color archivistRed = new Color(143, 17, 26);
		
		Font font = null;
		try {
			font = Font.createFont(Font.TRUETYPE_FONT, getClass().getResource("/roboto/Roboto-Regular.ttf").openStream());
		} catch (FontFormatException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		GraphicsEnvironment genv = GraphicsEnvironment.getLocalGraphicsEnvironment();
		genv.registerFont(font);
		font = font.deriveFont(16f);
		
		try {
			logo = ImageIO.read(getClass().getResource("/archivist1.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		String errors = "";

		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setUndecorated(true);
		this.setPreferredSize(new Dimension(512, 512 + 180));
		this.setLayout(new BorderLayout());
		this.setIconImage(logo);

		JLabel logoLabel = new JLabel(new ImageIcon(logo));
		logoLabel.setDoubleBuffered(true);
		logoLabel.setPreferredSize(new Dimension(512, 512));
		this.add(BorderLayout.CENTER, logoLabel);

		this.pack();
		
		this.getContentPane().setBackground(archivistRed);
		
		JPanel panel = new JPanel() {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
		    protected void paintComponent(Graphics g) {
		        //super.paintComponent(g);
		    	Graphics2D gr = (Graphics2D)g;
		    	gr.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		    	int h = getHeight();
		    	int w = getWidth();
		    	
		    	@SuppressWarnings("unused")
				int r = (int)(Math.min(w, h) / 1);
		    	
		    	g.setColor(new Color(255, 255, 255));
		        //g.fillOval((w-r)/2, (h-r)/2, r, r);
		    	
		    	@SuppressWarnings("unused")
				float width = w * 0.6f;
		    	@SuppressWarnings("unused")
				float height = h * 0.99f;
		    	//g.fillOval((int)((w-width)/2), (int)((h-height)/2), (int)width, (int)height);
		    	
		    	g.fillRect(0, 0, getWidth(), 16);
		    	g.fillRoundRect(0, 0, getWidth(), getHeight(), 16, 16);
		    }
		};
		panel.setPreferredSize(new Dimension(512, 180));
		panel.setDoubleBuffered(true);
		panel.setLayout(new BorderLayout());
		
		JLabel description = new JLabel("© Archivist 2017", SwingConstants.CENTER);
		Border border = description.getBorder();
		Border margin = new EmptyBorder(10,0,10,0);
		description.setBorder(new CompoundBorder(border, margin));
		description.setFont(font);
		panel.add(description, BorderLayout.SOUTH);
		
		
		ImageIcon ico = new ImageIcon(getClass().getResource("/loading.gif"));
		//ico = new ImageIcon(ico.getImage().getScaledInstance(124, 124, Image.SCALE_DEFAULT));
		JLabel loadingLabel = new JLabel(ico);
		loadingLabel.setDoubleBuffered(true);
		//loadingLabel.setPreferredSize(new Dimension(512, 160));
		panel.add(BorderLayout.CENTER, loadingLabel);
		
		
		//this.add(BorderLayout.SOUTH, loadingLabel);
		this.add(BorderLayout.SOUTH, panel);

		this.setOpacity(0.0f);

		//AWTUtilities.setWindowOpacity(this, 0f);

		AWTUtilities.setWindowOpaque(this, false);
		if (!errors.equals("")) {
			MessageBox.show("Error", errors, MessageBox.ERROR);
		}
	}

	@Override
	public void setVisible(final boolean stat) {
		if (stat && !isVisible()) {
			setLocationRelativeTo(null);
			StartLoadingDialog.super.setVisible(stat);

			/*new Thread() {
				@Override
				public void run() {
					for (int i = 0; i <= loadingBar.getMaximum(); i++) {
						loadingBar.setValue(i);
						try {
							Thread.sleep(100);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}
			}.start();*/

			new Thread() {
				@Override
				public void run() {
					for (int i = 0; i <= 90; i+=3) {
						StartLoadingDialog.this.setOpacity((float) (Math.sin(Math.toRadians(i))));
						try {
							Thread.sleep(15);
						} catch (InterruptedException ex) {
						}
					}
				}
			}.start();
		}
	}

	@Override
	public void dispose() {
		new Thread() {
			@Override
			public void run() {
				for (int i = 0; i <= 90; i+=3) {
					StartLoadingDialog.this.setOpacity((float) (Math.cos(Math.toRadians(i))));
					try {
						Thread.sleep(7);
					} catch (InterruptedException ex) {
					}
				}
				// loadingArea.getAnimation().stop();
				StartLoadingDialog.super.dispose();
			}
		}.start();
	}
}