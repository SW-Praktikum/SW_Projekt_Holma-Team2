#So wird Holma gestartet

In Folgendem wird erklärt, wie sie Holma auf ihrem lokalen Rechner
starten können.

1 DB starten
-
Voraussetzungen:
mySQL (Workbench)
1. Starten Sie mySQL Workbench
2. Erstellen Sie eine neue Connection (+)
3. Starten Sie die Connection 
4. Kopieren Sie den Inhalt der Datei ```/mysql/MySQL-Dump.sql``` in eine Query.
   und führen Sie diese aus.
5. Es wird eine Datenbank (holma) mit Beispieldaten erstellt.

2 Starten des Backend
-
Voraussetzungen: Installierte Packages / Virtual Enviroment 
([INSTALLATION.md](INSTALLATION.md)) 
1. Starten Sie die Datei ```/src/main.py```. 

3 Starten des Frontend
-
Voraussetzungen: Installierte Dependencies
([INSTALLATION.md](INSTALLATION.md)) 

1. Wählen Sie das jeweilige Verzeichnis der React-App aus.
2. Im Terminal geben Sie das Kommando ```npm start``` ein
3. Über localhost:3000 ist die Anwendung auf ihrem lokalen Rechner
aufrufbar.