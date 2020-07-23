Deployment auf Google Cloud Platform 
-

In Folgenden geht es um das Deployment (dt. Auslieferung) der Anwendung. Es handelt sich hier aber ausdrücklich
nicht um eine Schritt für Schritt Anleitung, da sich die Dokumentation zu GCP laufend ändert. 
[GCP Dokumentation](https://cloud.google.com/appengine/docs/standard/python3/).

Für das Deployment über GCP ist vorallem das Programm ```gcloud``` auf der Kommandozeile von Bedeutung.
Es muss also zunächst dieses Programm installiert werden. [Google Cloud SDK Installationsprogramm](https://cloud.google.com/sdk/docs/downloads-interactive?hl=de). 


### Datenbank (Google Cloud SQL)
Als erstes ist eine Datenbank in der Cloud anzulegen. Dafür muss der beigelegte mySQL-Dump 
in einen sogenannten Bucket geladen werden. Von dort kann einer erstellten DB-Instanz die Datenbankstruktur
"übergeben" werden. Über eine zugewiesene Adresse kann dann die DB angesteuert werden.

####Backend (Google App Engine)
Weiter muss das hier vorhandene Python-Projekt "deploy-fähig" gemacht werden. 
Eine genaue Anleitung gibt es dafür in der oben stehenden Dokumentation. 

Zusammenfassend sind die Dateien ```app.yaml```, ```requirements.txt``` sowie ```.gcloudignore```
erforderlich, um die App auf GCP zu deployen. Diese Dateien müssen selbst erstellt werden.

In der ```app.yaml``` können verschiedene Eigenschaften der App konfiguriert werden. 

In der Datei ```requirements.txt``` werden alle Packages angegeben, die für das Starten der Anwendung 
benötigt werden (z.B. Flask, Flask-Cors, Flask-RestX) 

In ```.gcloudignore``` wird angegeben welche Dateien beim Deployment *nicht* berücksichtigt werden müssen.

####Frontend

Über das Kommando ```npm run build``` können die einzelnen Clients für ein Deployment unter flask vorbereitet werden.
Die jeweilige App wird daraufhin produktionsreif und performanzoptimiert in dem jeweiligen Vereichnis unter `/build` zur Verfügung gestellt. 

Weiter muss eine ````app.yaml```` in das Hauptverzeichnis der React-App eingefügt werden.

Diese beeinhaltet diie folgenden Konfigurationen:

<pre><code>
# [START env settings] 
env: standard 
runtime: nodejs12 
service: app 
# [END env settings]  

# [START handlers] 
handlers:     
    - url: /       
      static_files: build/index.html       
      upload: build/index.html     
    - url: /       
      static_dir: build 
# [END handlers] 
</code></pre>

