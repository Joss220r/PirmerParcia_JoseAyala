Autor: José Ayala
Carnet: 22-1035
Producción: https://joseayala22-1035.netlify.app/
Repositorio: https://github.com/Joss220r/PirmerParcia_JoseAyala.git

Descripción
Página estática (HTML/CSS/JS) que consume la API pública del Censo 2018 para el departamento de El Progreso y muestra la mayor cantidad de datos posible por municipio. Permite elegir el municipio desde un selector o mediante parámetro en la URL ?cod=.

Tecnologías
- HTML5, CSS3 (archivo style1.css)
- Bootstrap 5.3 (CDN)
- JavaScript (Fetch API) — archivo JSproyect.js

API usada
Base:
https://censopoblacion.azurewebsites.net/API/indicadores/2/{codigo}

Códigos válidos para El Progreso:
999 (Departamento), 201 Guastatoya, 202 Morazán, 203 San Agustín Acasaguastlán,
204 San Cristóbal Acasaguastlán, 205 El Jícaro, 206 Sansare, 207 Sanarate, 208 San Antonio La Paz

Funcionalidades
- Selector de municipio (incluye 999 y 201–208).
- Botón "Cargar datos" que hace fetch al endpoint correspondiente.
- Soporte de URL con query ?cod= (ej.: .../?cod=206).
- Render genérico para mostrar muchos campos:
  * Arreglos de objetos -> tabla
  * Listas simples -> lista <ul>
  * Pares clave–valor -> párrafos
- Diseño responsivo (móvil/tablet/escritorio).

Estructura del proyecto
/
├─ index.html        # UI y layout
├─ style1.css        # Estilos (navbar y tarjetas)
├─ JSproyect.js      # Lógica: lectura de ?cod, fetch y render

Cómo usar
1) Abrir el sitio publicado o index.html en el navegador.
2) Elegir un municipio y presionar "Cargar datos".
3) También se puede entrar directo con ?cod= (por ejemplo, ?cod=201).

Correr en local
- Abrir index.html directamente en el navegador.
- Si hay bloqueo CORS, usar un servidor simple (ej. Live Server de VS Code)
  o publicar en Netlify / GitHub Pages.

Despliegue
- Netlify: Importar repo -> sin build, publicar desde la raíz.

Evidencia (Postman)
image.png
