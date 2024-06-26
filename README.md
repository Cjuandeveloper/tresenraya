## *Tres en raya*
Bienvenido al juego clásico de "Tres en Raya" implementado en HTML, CSS y JavaScript. Este proyecto es una versión simple del juego donde dos jugadores alternan turnos para colocar sus fichas (X y O) en un tablero de 3x3. El objetivo es conseguir tres fichas del mismo tipo en línea, ya sea horizontal, vertical o diagonalmente.

## *Demostración*
Para ver una demostración del juego, acceda a la pagina del desarrollador https://tresenraya.webmastercol.com

## *Funcionalidades*
Jugador vs Jugador: Dos jugadores se turnan para hacer clic en las celdas del tablero.

Jugador vs Computadora: Juega contra la computadora con opciones de dificultad fácil y difícil.

Marcador: El juego lleva un registro de las victorias de X y O.

Animaciones: Se incluyen animaciones sutiles para resaltar las jugadas ganadoras y mejorar la experiencia visual.

## *Instalación y uso*
Clona este repositorio o descárgalo como archivo ZIP.

Abre el archivo index.html en tu navegador web para comenzar a jugar.

Selecciona el modo de juego desde el menú principal.

Sigue las instrucciones en pantalla para jugar.

## *Lógica del juego*
El juego sigue la siguiente lógica implementada en JavaScript:

Tablero: El tablero está representado como un array de longitud 9 (boardState) donde cada celda puede contener "X", "O" o null.

Turnos: Inicialmente, el jugador "X" empieza. Se alternan turnos con el jugador "O".

Verificación de Victoria: El juego verifica si hay un ganador después de cada movimiento. Comprueba todas las combinaciones posibles de líneas ganadoras (horizontal, vertical y diagonal) utilizando un conjunto predefinido de patrones de victoria.

Finalización del Juego: El juego termina cuando se alcanza una línea ganadora o cuando todas las celdas están ocupadas sin un ganador.

Modo Jugador vs Computadora: Cuando se selecciona este modo, la computadora elige movimientos basados en un algoritmo de búsqueda (minimax) que evalúa todas las posibles jugadas y elige la mejor opción disponible.

## *Tecnologías utilizadas*
HTML: Estructura básica de la página web.

CSS: Estilos para la apariencia visual del juego.

JavaScript: Lógica del juego y manejo de eventos.
