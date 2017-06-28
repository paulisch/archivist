@echo off

set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

rem ## %cd% will give you the current working directory (variable)
rem ## %~dp0 will give you the full path to the batch file's directory (static)

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\Archivist.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%cd%\start.vbs" >> %SCRIPT%
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