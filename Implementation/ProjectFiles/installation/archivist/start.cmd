start "mysql" Portable.Mysql.5.5.13-Very.Small\bin\mysqld.exe > NUL
start "wildfly" wildfly-10.1.0.Final\bin\standalone.bat > NUL
rem ## cd wildfly-10.1.0.Final\bin
rem ## powershell -c "saps standalone.bat -windowstyle hidden"
timeout /t 20
start "" http://localhost:8080/archivist/