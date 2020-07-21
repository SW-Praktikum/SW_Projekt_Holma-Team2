# Installationsanleitung

## Client-Seite 
Die Clients bauen auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des Haupt-Clients liegt im Verzeichnis 
`/holma-app`, und der des Statistics-Clients im Verzeichnis `/holma-statistic`

### Was wird vorab benötigt?
1. Node.js (siehe https://nodejs.org/ oder Installation via [Homebrew](https://brew.sh) 

Vor dem Start müssen über das Kommando `npm install` im Terminal die Dependencies installiert werden. 
Folgende Abhängigkeiten müssen für den Haupt-Client installiert werden:
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



### Wie wird der Development-Server gestartet?
React bringt einen eignen Development-Server mit, mit welchem zur Echtzeit der React-Code in JavaScript übersetzt wird. Dies erfolgt im Hintergrund auf Basis von [Babel](https://babeljs.io), einem JavaScript Compiler.

Der Dev-Server wird in einem Terminal mit dem Kommando `npm start` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

## Server/Service-Seite
Die Server-Seite baut auf Python, Flask sowie RestX auf.

### Was wird vorab benötigt?
1. Aktuelle Python-Installation (siehe python.org)
2. Flask (darin enthalten sind auch *Werkzeug* und *Jinja*)
3. flask-restx
4. flask-cors 
5. google-auth
6. requests

Flask, flask-restx und flask-cors müssen für die Python-Installation erreichbar sein. 
Hierzu kann ```pip``` verwendet werden. EInfacher geht es, wenn man PyCharm
installiert hat, sich im Projekt ein Virtual Environment anlegt und darin dann
zunächst das Package ```flask``` und danach ```flask-restx``` und ```flask-cors``` 
installiert. Diese Packages ziehen die Installation weiterer Packages nach sich.
```google-auth``` und ```requests``` werden für Firebase Authentication benötigt (vgl.
Module ```SecurityDecorator.py```).

