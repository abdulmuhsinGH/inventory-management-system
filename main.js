var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        labels: {
            cut: 'Configured Cut',
            copy: 'Configured Copy',
            paste: 'Configured Paste',
            save: 'Configured Save Image',
            copyLink: 'Configured Copy Link',
            inspect: 'Configured Inspect'
        },
        // only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});
// referência global para manter a instância da janela até que sejam fechadas pelo usuário então ele irá ser fechado quando o JavaScript fizer Garbage collection
var mainWindow = null;

// Sair da aplicação quando todas as janelas forem fechadas
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

 //Instatiate Express App
  app.server = require(__dirname+ '/src/app')

  // Create a new browser.
  mainWindow = new BrowserWindow({width: 1200, height: 700});

  // Carrega o arquivo html principal.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // aber o DevTools. (console, inspecionar elemento, etc)
  // mainWindow.webContents.openDevTools(); 

  // Evento emitido quando a janela é fechada, usado para destruir instancia.
  mainWindow.on('closed', function() {

    mainWindow = null;
  });
});