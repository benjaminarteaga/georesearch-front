## Descripción

Front-End para consumo de API de Georesearch para la obteción de Puntos de Interés.
IMPORTATE: Disponibilizar el servicio de API [Georesearch API](https://github.com/benjaminarteaga/georesearch-api) antes de levantar este proyecto.

## Instalación

	git clone https://github.com/benjaminarteaga/georesearch-front.git
	cd georesearch-front
	npm install

## Disponibilizar

En la raíz del proyecto ejecutar el siguiente comando para levantar el server:

	docker build -t benjaminarteaga/georesearch-front .
  docker run -d -it -p 3011:80/tcp benjaminarteaga/georesearch-front

## Visualizar

En el navegador, abrir el siquiente enlace:

[http://localhost:3011/](http://localhost:3011/)