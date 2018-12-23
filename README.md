#Nodepop

Configurar variables de entorno. Hacer una copia del fichero .env.example a .env y modificar los valores de configuración.

Arrancar la aplicación en modo desarrollo:
```shell
npm run dev
```

Arrancar el cluster:
```shell
npm run cluster
```

Recordatorio: Para arrancar el servidor de MongoDB:

```shell
bin/mongod --dbpath ./data/db --directoryperdb
```