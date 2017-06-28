@echo off
rem ## start "mysql" "Portable.Mysql.5.5.13-Very.Small\start.exe"
start "wildfly" wildfly-10.1.0.Final\bin\standalone.bat
rem ## cd wildfly-10.1.0.Final\bin
rem ## powershell -c "saps standalone.bat -windowstyle hidden"
echo Bitte warten, System wird gestartet
timeout /t 20 > NUL
start "" http://localhost:8080/archivist/