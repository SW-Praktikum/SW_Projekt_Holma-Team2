# Holma - Shared-Shopping-List-System

Herzlich Willkommen zu **Holma**, einem Shared-Shopping-List-System, dass dir erlaubt
deine Shopping-Listen mit Freunden und Verwandten zu erstellen und zu verwalten.

Holma ist aufgeteilt in zwei Clients. <br>
**Client 1**, nachfolgend Haupt-Client genannt, beinhaltet die Hauptfunktionen
der Anwendung. Darunter fallen bspw. das Anlegen von Gruppen, Shopping-Listen 
und Einträgen sowie die Verwaltung dieser. 

**Client 2**, nachfolgend Statistic-Client genannt, beinhaltet die Funktionen zur 
Ausgabe verschiedener Statistiken zum Einkaufsverhalten. Dabei kann zwischen User-
Statistik und Gruppen-Statistik unterschieden werden. 

Inhalt 
-

Zur Übersicht befinden sich verschiedene Markdown-Dokumente innerhalb der
einzelnen Verzeichnisse des Projekts.

- [INSTALLATION.md](INSTALLATION.md) 
    - Informationen zur Installation der Anwendung, um es
    auf dem lokalen Rechner starten zu können.
    
- [RUN.md](RUN.md)
    - Nachdem die Installation erfolgt ist, kann die Anwendung
    gestartet werden. Das starten der Anwendung beinhaltet das Starten
    der Datenbank, des Backends und des Frontends.
    
- [ResourceNaming.md](ResourceNaming.md)
    - Dokumentiert alle REST-Service-Ressourcen die das Backend beeinhaltet.

---

- [/holma-app](/holma-app)
    - Dieses Verzeichnis beinhaltet den seperaten Source-Code des Haupt-Client.

- [/holma-statistic](/holma-statistic)
    - Dieses Verzeichnis beinhaltet den seperaten Source-Code des Statistic-Client

- [/src](/src) 
    - Dieses Verzeichnis beinhaltet den Source-Code der Anwendung. Haupt-Client und
    Statistic-Client greifen auf diesen zu (Backend).

- [/mysql](/mysql)
    - In diesem Verzeichnis befindet sich der mySQL-Dump. Dieser wird
    benötigt, um die Datenbank lokal aufzusetzen.
    

