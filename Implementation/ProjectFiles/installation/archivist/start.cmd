@echo off
call install.cmd
start "" "start.html"
rem ## start "mysql" "Portable.Mysql.5.5.13-Very.Small\start.exe
rem ## call wildfly-10.1.0.Final\bin\jboss-cli.bat --connect command=:shutdown
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO TaskKill.exe /PID %%P /F
del "wildfly-10.1.0.Final\standalone\deployments\archivist.war.undeployed"
del "wildfly-10.1.0.Final\standalone\deployments\archivist.war.failed"
echo archivist.war>"wildfly-10.1.0.Final\standalone\deployments\archivist.war.deployed"
start "" mini_server_11\mysql_start.bat > NUL
rem ## start "" wildfly-10.1.0.Final\bin\standalone.bat > NUL
cd wildfly-10.1.0.Final\bin
powershell -c "saps standalone.bat -windowstyle hidden"
echo Bitte warten, System wird gestartet
timeout /t 20 > NUL
start "" http://localhost:8080/archivist/