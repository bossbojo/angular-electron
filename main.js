const { app, ipcMain, BrowserWindow } = require('electron')
const iconv  = require('iconv-lite');

let win;


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 748,
        frame: false
    })


    win.loadURL(`http://localhost:4200`)
    //win.loadURL(`file://${__dirname}/src/index.html`)

    //// uncomment below to open the DevTools.
     win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
var count = 0;
ipcMain.on('ping', (event, arg) => {
    setInterval(() => {
        event.sender.send('count', ++count);
    }, 500);
})


var  a = Buffer.from('b9d2c223bbc3e0c1c8c3ec2323cad4a7cbeca2c3b3ec', 'hex');
console.log(a);

var body = iconv.decode(a, "TIS-620");
console.log(body);

var d = Buffer.from('กาก', 'utf8').toString('hex');
console.log(d);

var e = Buffer.from(d, 'hex').toString('utf8');
console.log(e);
