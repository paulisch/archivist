@echo off

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
	powershell -c "saps standalone.bat -windowstyle hidden"
	rem ## start "" wildfly-10.1.0.Final\bin\standalone.bat > NUL
)


rem ## start "" http://localhost:8080/archivist/