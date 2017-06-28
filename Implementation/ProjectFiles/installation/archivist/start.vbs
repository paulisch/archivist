Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "start.cmd" & chr(34), 0
Set WshShell = Nothing