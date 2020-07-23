Deployment auf Google Cloud Platform 
-
Die Entwicklung von GCP-konformen Applikationen (heutzutage gerne als App bezeichnet) ist 
[von Google ausführlich dokumentiert (Link auf Python Standard Environment).](https://cloud.google.com/appengine/docs/standard/python3/).
Die Dokumentation wird laufend überarbeitet, so dass es schwierig ist, stets konsistente Bezüge 
(z.B. Links) anzugeben. Sämtliche nachfolgend skizzierten Installationsschritte werden in 
der Google-Dokumentation (siehe oben) genauer beschrieben. Nachfolgend soll lediglich etwas zu
den Hintergründen gesagt oder ergänzende Hinweise gegeben werden. 

### Google Cloud SDK
Das Deployment (dt. Auslieferung) des Service bzw. Ihrer App geschieht vollständig auf Basis von GCP.
Hierzu ist insbesondere das Programm ```gcloud``` auf der Kommandozeile (engl. Console) von Bedeutung.
Sie müssen also zunächst dieses Programm installieren. Es ist Bestandteil des *Google Cloud SDK*
(SDK = Software Development Kit).

### Datenbank (Google Cloud SQL)
Als erstes ist eine Datenbank in der Cloud anzulegen und zu befüllen. Allgemeine Informationen
gibt es hierzu in der begleitenden Vorlesung.

### Google App Engine (GAE)
Das Python-Projekt muss auch in die Lage versetzt werden, auf die Google App Engine deployed
zu werden. Auch hierzu gibt es allgemeine Informationen in der begleitenden Vorlesung.

Zusammenfassend sind die Dateien ```app.yaml```, ```requirements.txt``` sowie ```.gcloudignore```
erforderlich, um die App auf GCP zu deployen. Diese Dateien müssen Sie selbst erstellen. 

Mit ```.gcloudignore``` geben Sie an, welche Dateien beim Deployment *nicht* in die Cloud 
transportiert werden müssen. Dies wird hauptsächlich bei Dateien und Verzeichnissen der Fall sein,
die wir nur zur Entwicklungszeit (engl. Build Time) auf unserem Entwicklungsrechner benötigen.

In der Datei ```requirements.txt``` geben wir sämtliche Packages an, die wir auch in der Cloud neben
unserem eigenen Code benötigen, um unsere App starten zu können. In unserem Fall wären dies z.B.
Flask, Flask-RestX, Clask-Cors. Wir geben also über diese Datei nur an, welche Packages in welcher
Version benötigt werden und laden jene Packages nicht selbst hoch. ```gcloud``` stößt dann in der Cloud 
die Beschaffung jener Packages auf Grundlage unserer Datei ```requirements.txt``` an.

Mit ```app.yaml``` können Sie zahlreiche Eigenschaften der App konfigurieren. Bitte lesen Sie
dies in der Google-Dokumentation nach, da dies den Rahmen sprengen würde. YAML steht für *YAML Ain't
Markup Language*, also eine rekursive Definition des Namens wie etwas bei PHP auch.

Es bietet sich an, das Hauptprogramm der App (also, womit die App startet) in einer Datei bzw. 
einem Module namens ```main.py``` unterzubringen. Da dies eine Konvention von Google App Engine 
für Python ist, wurde in dieser Fallstudie entsprechend verfahren. Natürlich wären auch andere 
Namen möglich. Jedoch haben Sie bei Verwendung von ```main.py``` den geringsten Konfigurationsaufwand.



####Datenabnk

####Backend



####Frontend

Über das Kommando ```npm run build``` können die einzelnen Clients für ein Deployment unter flask vorbereitet werden.
Die jeweilige App wird daraufhin produktionsreif und performanzoptimiert in dem jeweiligen Vereichnis unter `/build` zur Verfügung gestellt. 

Die React-App ist für ein Deployment im flask Verzeichnis `/static/reactclient` konfiguriert.
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
