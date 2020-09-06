## Installation

```bash
$ npm install
```

Lerna will install necessary dependencies

## Running the app (production)

```bash
$ npm run start:prod
```
This command will build all packages and start application at ``http://localhost:4000``. In this case, all static files are served by ``nest.js`` application. Candles will be generated when ``nest.js`` are started.

## Running the app (development)

```bash
$ npm run server:watch
```
This command will watch for changes in ``packages/common`` and ``packages/server`` to rebuild it.
Note, that you have to manually start/restart the ``nest.js`` application: ``node packages/server/dist/main.js``.

```bash
$ npm run client:watch
```
This command will start ``webpack-dev-server`` for ``packages/client`` application and will handle its updates. Also, it starts dev React application at ``http://localhost:3000``

