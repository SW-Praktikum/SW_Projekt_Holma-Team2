# Installationsanleitung (lokal)

## Clients
Die Clients bauen auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des Haupt-Clients liegt im Verzeichnis 
`/holma-app`, und der des Statistics-Clients im Verzeichnis `/holma-statistic`

### Vorbereitende Schritte
1. Node.js (siehe https://nodejs.org/) 

Vor dem Start müssen über das Kommando `npm install` im Terminal die Dependencies installiert werden. 
Folgende Abhängigkeiten müssen für beide Clients installiert werden:
- [React Router-Dom](https://reacttraining.com/react-router/web/guides/quick-start)
  - `npm install --save react-router-dom`
- [Material-UI](https://material-ui.com)
  - `npm install @material-ui/core`
  - `npm install @material-ui/lab`
  - `npm install @material-ui/icons`
  - `npm install @material-ui/pickers`
  - `npm install @date-io/date-fns`
  - `npm install date-fns`
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)
  - `npm install --save firebase`



### Wie wird der React-Server gestartet?
React bringt einen eignen Echzeit
Development-Server mit.

Dieser wird in einem Terminal mit dem Kommando 
`npm start` gestartet. Zuvor muss das Verzeichnis des jeweiligen Clients ausgewählt werden.
Für den Haupt-Client das Verzeichnis [/holma-app](/holma-app), für den Statistics-Client
das Verzeichnis [/holma-statistic](/holma-statistic)
Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.


## Server/Service-Seite
Die Server-Seite baut auf Python, Flask (Cors) sowie RestX auf.

### Was wird vorab benötigt?
1. Python (Version 3.7 oder höher)
2. Flask (inkl. *Jinja* und *Werkzeug*)
3. flask-cors 
4. flask-restx
5. requests
6. google-auth

Flask, flask-cors sowie flask restx können per pip (und dem 
zugehörigen Befehl ```pip install```) installiert werden.

Eine weitere Möglichkeit besteht darin, in PyCharm ein Virtual Environment 
für das Projekt anzuelgen und darin die Packages ```flask```, ```flask-restx``` und ```flask-cors``` 
zu installieren. Diese Packages ziehen die Installation der Packages ```google-auth``` und ```requests``` 
nach sich.






