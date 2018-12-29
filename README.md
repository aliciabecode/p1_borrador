# Nodepop

Configurar variables de entorno. Hacer una copia del fichero .env.example a .env y modificar los valores de configuración.


### Arrancar la aplicación en modo desarrollo:
```shell
npm run dev
```

### Arrancar el cluster:
```shell
npm run cluster
```

### Recordatorio: Para arrancar el servidor de MongoDB:

```shell
bin/mongod --dbpath ./data/db --directoryperdb
```

## API:

http://localhost:3000/usuarios/login

Introduzco email y clave del usuario y recibo un TOKEN para acceder a anuncios.

http://localhost:3000/usuarios/anuncios

Introduzco el TOKEN y filtro los anuncios según mis preferencias:

* Por tag: tendremos que buscar incluyendo una condición por tag.
* Tipo de anuncio (venta o búsqueda): true / false.
* Rango de precio (precio mínimo y precio máximo)
* Nombre del artículo: que empiece por el dato buscado en el parámetro nombre

Ejemplo de petición de lista de anuncios:
http://localhost:3000/apiv1/anuncios?tag=mobile&venta=true&nombre=ip&precio=50-&start=0&limit=2&sort=precio&token=eyjosf89e8hfsjad98dfh
