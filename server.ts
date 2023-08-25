import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as express from 'express';
import { join } from 'path';
import * as useragent from 'express-useragent';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

/**
 *
 * window overrides
 */
const noop = (): any => undefined;
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const templateA = fs
  .readFileSync(path.join(__dirname, '../browser', 'index.html'))
  .toString();
const win = domino.createWindow(templateA);

win.Object = Object;
win.Math = Math;
win.navigator.language = 'en';
win.scroll = noop;

global['Event'] = null;
global['window'] = win;
global['document'] = win.document;
global['localStorage'] = win.localStorage;
global['sessionStorage'] = win.sessionstorage;
global['navigator'] = win.navigator;


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.use(useragent.express());
  server.disable('x-powered-by');
  const distFolder = join(__dirname, '../browser');

  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.engine('html', (_, options: any, callback: any) => {
    const protocol = options.req.protocol;
    const host = options.req.get('host');
    const engine = ngExpressEngine({
      bootstrap: AppServerModule,
      providers: [
        {
          provide: 'APP_BASE_URL',
          useFactory: () => `${protocol}://${host}`,
          deps: []
        },
        {
          provide: 'LOCALES',
          useValue: 'en',
        }
      ],
      inlineCriticalCss: true
    });
    engine(_, options, callback);
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  function handleReadFile(_req: any, res: any, fileName: string) {
    res.sendFile(fileName, (error: Error) => {
      if (error) {
        console.log(
          `File '${fileName}' not found!`,
          (error as any).status
        );
        res.statusMessage = 'File not found!';
        res.status((error as any).status)
          .json({ error: 'File not found!' })
          .end();
      }
    });
  }


  server.get('/favicon.ico', (req, res) => {
    handleReadFile(
      req,
      res,
      path.resolve(path.join(__dirname, '../browser/favicon.ico'))
    );
  });
  server.get('/assets/**', (req, res) => {
    handleReadFile(
      req,
      res,
      path.resolve(path.join(__dirname, '../browser/', req.path))
    );
  });

  server.get('/manifest.webmanifest', (req, res) => {
    handleReadFile(
      req,
      res,
      path.resolve(path.join(__dirname, '../browser', req.path))
    )
  })
  server.get('/config/**', (req, res) => {
    handleReadFile(
      req,
      res,
      path.resolve(path.join(__dirname, '../browser', req.path))
    );
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: req.baseUrl
        },
        { provide: REQUEST, useValue: req },
        { provide: RESPONSE, useValue: res }
      ]
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4001;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
