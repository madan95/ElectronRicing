const { app, BrowserWindow } = require('electron')
const path = require('path');

let window

function createWindow () {
  window = new BrowserWindow({
    width: 450,
    height: 660,
    icon: path.join(__dirname, 'app/icon/icon.png'),
    frame: false,
    titleBarStyle: 'hidden',
  })
  window.loadFile('index.html')
  //window.webContents.openDevTools()
  window.on('closed', () => { window = null })
}

app.on('ready', createWindow);

//Mac support
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
