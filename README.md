Beschreibung
Das CustomerModul ist eine Anwendung zur Verwaltung von Kundeninformationen. Es besteht aus drei Hauptkomponenten: der Datenbank, dem Server und dem Frontend. Die Datenbank wird von MongoDB bereitgestellt, der Server ist eine Node.js-Anwendung und das Frontend ist eine Vue.js-Anwendung.

Installation
Um das CustomerModul auszuführen, müssen Sie zunächst Docker und Docker Compose auf Ihrem System installieren. Anschließend können Sie die folgenden Schritte ausführen:

Klonen Sie dieses Repository auf Ihren lokalen Computer:

git clone https://github.com/IhrGitHubBenutzername/CustomerModul.git

Navigieren Sie zum Repository-Ordner:

cd CustomerModulV2
Schauen Sie die .env.example Dateie an und Ergänzen sie Ihre .env Dateien um die nötigen Daten. 

Starten Sie die Anwendung:

docker-compose up

Verwendung
Nachdem Sie die Anwendung gestartet haben, können Sie auf das Frontend zugreifen, indem Sie Ihren Webbrowser öffnen und die folgende URL eingeben:

http://localhost:

Sie sollten nun die Startseite des CustomerModuls sehen.

Eine Register Page gibt es nicht. Die erste Registrierung eines Users muss über Postman/Thunderclient oder ähnlichen durchgeführt werden. 

Technologien
Das CustomerModul wurde mit den folgenden Technologien erstellt:

MongoDB: Die Datenbank zur Speicherung von Kundeninformationen.
Node.js: Die Server-Anwendung, die die API bereitstellt.
Vue.js 3/Bootstrap: Die Frontend-Anwendung, die die Benutzeroberfläche bereitstellt.
Docker: Die Container-Technologie, die die Anwendung virtualisiert.
