@ECHO OFF
ECHO =======================================================================
ECHO ====================== START INIT GULP! ===============================
ECHO =======================================================================

ECHO ====================== START Run command "npm i gulp" ===============================
call npm i gulp
ECHO ====================== END Run command "npm i gulp" ===============================

ECHO ====================== START Run command "npm i" ===============================
call npm i
ECHO ====================== END Run command "npm i" ===============================

ECHO ====================== START Run command "npm i bower" ===============================
call npm i bower
ECHO ====================== END Run command "npm i bower" ===============================
ECHO ====================== START Run command "bower i" ===============================
call bower i
ECHO ====================== END Run command "bower i" ===============================

ECHO =======================================================================
ECHO ====================== END INIT GULP! ===============================
ECHO =======================================================================
