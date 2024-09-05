const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'autres', 'icons.ico'),
    webPreferences: {
      nodeIntegration: false, // Désactive l'intégration de Node.js
      contextIsolation: true, // Active l'isolement du contexte
      preload: path.join(__dirname, 'preload.js') // Assurez-vous que le fichier preload.js est correct
    },
  });

  win.loadFile('index.html');

  // Ajouter un écouteur d'événements pour le dossier sélectionné
  ipcMain.handle('dialog:openFolder', async () => {
    try {
      const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
      });
      console.log('Dialog result:', result.filePaths); // Déboguer le résultat du dialogue
      if (result.filePaths.length > 0) {
        return result.filePaths[0]; // Retourne le chemin complet du dossier sélectionné
      } else {
        return 'No folder selected';
      }
    } catch (error) {
      console.error('Error opening folder:', error); // Déboguer toute erreur
      return 'Error opening folder';
    }
  });
}

Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
