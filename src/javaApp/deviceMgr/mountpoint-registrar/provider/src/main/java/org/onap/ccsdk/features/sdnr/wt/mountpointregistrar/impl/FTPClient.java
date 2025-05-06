package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
//import java.nio.file.Path;
//import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public class FTPClient {
	 private static final Logger LOG = LoggerFactory.getLogger(FTPClient.class);

	
	private JSch jsch;
	private Session session;
	private Channel channel;
	private ChannelSftp sftpChannel;
	


	public void connect(String host, Integer port, String user, String password) {
		
		//System.out.println("connecting..."+host);
		LOG.info("connecting... {} to ",host);
		try {
			jsch = new JSch();
			LOG.info(">>>> connecting...  ");
			LOG.info("user {} ", user);
			LOG.info("host {} ", host);
			LOG.info("port {} ", port);
			LOG.info("password {} ", password);
			session = jsch.getSession(user, host,port);
			session.setConfig("StrictHostKeyChecking", "no");
			session.setPassword(password);
			try{
				session.connect();

				channel = session.openChannel("sftp");
				channel.connect();
				sftpChannel = (ChannelSftp) channel;
			}
		 	catch (Exception ex) {
			LOG.error("Connect Exception...{} ", ex.getMessage());
		}

		} catch (JSchException e) {
			LOG.error("JSchException... {}", e.getMessage());
		}

	}
	
	public void disconnect() {
		//System.out.println("disconnecting...");
		LOG.info("disconnecting... ");
		sftpChannel.disconnect();
		channel.disconnect();
		session.disconnect();
	}
	
	public void upload(String fileName, String remoteDir ,String host, Integer port, String user, String password) {

		FileInputStream fis = null;
		connect( host,port,user,password);
		try {
			// Change to output directory
			sftpChannel.cd(remoteDir);

			// Upload file
			File file = new File(fileName);
			fis = new FileInputStream(file);
			sftpChannel.put(fis, file.getName());

			fis.close();
			LOG.info("File uploaded successfully - {}",file.getAbsolutePath());
			//System.out.println("File uploaded successfully - "+ file.getAbsolutePath());
 
			if (file.delete()) {
				LOG.info("Local File deleted successfully");
			}
			else {
				LOG.info("Local Failed to delete the file");
			}

		} catch (Exception e) {
			LOG.error("Exception in FTP upload {}",e.getMessage());
			//e.printStackTrace();
		}
		disconnect();
	}
	
	public void download(String fileName, String localDir,String host, Integer port, String user, String password) {

		byte[] buffer = new byte[1024];
		BufferedInputStream bis;
		connect(host,port,user,password);
		try {
			// Change to output directory
			LOG.info("fileName >>>> -{} ",fileName);
			String cdDir = fileName.substring(0, fileName.lastIndexOf("/") + 1);
			LOG.info("cdDir >>>> -{} ",cdDir);
			sftpChannel.cd(cdDir);

			File file = new File(fileName);
			bis = new BufferedInputStream(sftpChannel.get(file.getName()));

			File newFile = new File(localDir + "/" + file.getName());
			
			// Download file
			OutputStream os = new FileOutputStream(newFile);
			BufferedOutputStream bos = new BufferedOutputStream(os);
			int readCount;
			while ((readCount = bis.read(buffer)) > 0) {
				bos.write(buffer, 0, readCount);
			}
			bis.close();
			bos.close();
			LOG.info("File downloaded successfully - {} ",file.getAbsolutePath());
			//System.out.println("File downloaded successfully - "+ file.getAbsolutePath());

		} catch (Exception e) {
			LOG.error("Exception in FTP download  {}",e.getMessage());
			//e.printStackTrace();
		}
		disconnect();
	}

	// public static void main(String[] args) {
	// 	String s = System.getProperty("user.dir");
	// 	System.out.println("<<<< Working Directory = " + System.getProperty("user.dir"));
	// 	LOG.info("Current absolute path is: {}" + s);
		
	// 	File dir = new File(s+"/MeasurementFiles");
	// 	String localPath = "";
	// 	LOG.info("Current absolute path MeasurementFiles with  is: {} " + s+"/MeasurementFiles");
	// 	System.out.println("Current absolute path MeasurementFiles with  is: " + s+"/MeasurementFiles");
	// 	if (dir.exists()) {
	// 		localPath=dir+"/";
	// 	}
	// 	if(dir.mkdirs()) {
	// 		localPath=dir+"/";
	// 	}
		
	// 	String remotePath = "/home/rnacumos/";
	// 	String filename = "settings.xml";

	// 	FTPClient ftp = new FTPClient();
	// 	ftp.download(remotePath+filename, localPath,"192.168.128.77", 22, "rnacumos", "test123");

	// 	 remotePath = "/home/manish/rn-ems-gui-dev/";
		 
	// 	 ftp.upload(localPath+filename, remotePath,"192.168.129.70", 22, "manish", "Test@123");

	// }

}