import { app, BrowserWindow } from 'electron'
import path from 'path'
import { pathToFileURL } from 'url'

let mainWindow: Electron.BrowserWindow | null

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 700,
		backgroundColor: '#191622',
		webPreferences: {
			nodeIntegration: true,
		},
	})

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:4000')
	} else {
		mainWindow.loadURL(
			pathToFileURL(path.join(__dirname, 'renderer/index.html')).toString(),
		)
	}

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('ready', createWindow)
