@echo off
rem ## call install.cmd
rem ###################################################################################################
set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

rem ## %cd% will give you the current working directory (variable)
rem ## %~dp0 will give you the full path to the batch file's directory (static)

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\Archivist.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%cd%\Archivist.jar" >> %SCRIPT%
echo oLink.WorkingDirectory = "%cd%" >> %SCRIPT%
echo oLink.IconLocation = "%cd%\archivist.ico" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

rem ## oLink.Arguments
rem ## oLink.Description
rem ## oLink.HotKey
rem ## oLink.IconLocation
rem ## oLink.WindowStyle
rem ## oLink.WorkingDirectory

cscript /nologo %SCRIPT%
del %SCRIPT%
rem ###################################################################################################



rem ## start "" "start.html"

SET START_SERVER="TRUE"

rem ## start "mysql" "Portable.Mysql.5.5.13-Very.Small\start.exe
rem ## call wildfly-10.1.0.Final\bin\jboss-cli.bat --connect command=:shutdown
rem ## FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO TaskKill.exe /PID %%P /F

FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO (
	IF NOT %%P == 0 (
		%START_SERVER%="FALSE"
	)
)

start "" mini_server_11\mysql_start.bat > NUL

if %START_SERVER% == "TRUE" (
	rem ## start "" wildfly-10.1.0.Final\bin\standalone.bat > NUL
	
	del "wildfly-10.1.0.Final\standalone\deployments\archivist.war.undeployed"
	del "wildfly-10.1.0.Final\standalone\deployments\archivist.war.failed"
	echo archivist.war>"wildfly-10.1.0.Final\standalone\deployments\archivist.war.deployed"
	
	cd wildfly-10.1.0.Final\bin
	rem ## powershell -c "saps standalone.bat -windowstyle hidden"
	start "" wildfly-10.1.0.Final\bin\standalone.bat > NUL
)


rem ## start "" http://localhost:8080/archivist/