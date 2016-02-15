'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Spacebrew
var spacebrew = require('./spacebrew')
  , persister = require('./spacebrew_live_persist')
  , logger = require('./logger')
  ;

var defaultPort = 9000
  , forceClose = false
  , doPing = true
  , persist = true
  , help = false
  ;

/**
 * Set the port to open for ws connections. defaults to 9000. 
 * 
 * @type {Number}
 */
var setDefaultPort = function(newPort){
    var tempPort = parseInt(newPort, 10);
    //check that tempPort != NaN
    //and that the port is in the valid port range
    if (tempPort == tempPort &&
        tempPort >= 1 && tempPort <= 65535){
        defaultPort = tempPort;
    }
  logger.log("info", "[setDefaultPort] port set to " + defaultPort);

};

var closeTimeout = 10000;//default to 10 seconds
var setCloseTimeout = function(newTimeout){
    var tempTimeout = parseInt(newTimeout);
    if (tempTimeout == tempTimeout && tempTimeout > 0){
        closeTimeout = tempTimeout;
    }
};

var pingIntervalTime = 1000;//every second
var setPingIntervalTime = function( newInterval ){
    var tempInterval = parseInt(newInterval);
    if (tempInterval == tempInterval && tempInterval > 0){
        pingIntervalTime = tempInterval;
    }
};

/**
 * method that is used to set the log level when user sets log level via command line
 * 
 * @param {String} newLevel   New log level - "error", "warn", "debug", or "info"
 */
var setLogLevel = function( newLevel ) {
  logger.debugLevel = newLevel;
  logger.log("info", "[setLogLevel] log level set to " + logger.debugLevel);
}

/**
 * Method that handles key app functions including printing app startup message, processing
 *    command line arguments, and starting up the spacebrew and persistent servers
 */

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // first, setup spacebrew server

  // to-do: this should be stopped/started by a gui
  // on the page!
  var server_configs = {}
    , persist_configs = {}
    ;

  // if app command included help flag then don't run app
  // if (help) {
  //  process.exit();
  // } 

  // if app command did not include help flag then start-up persist server
  server_configs = { 
    "port": defaultPort, 
    "forceClose": forceClose, 
    "ping": doPing, 
    "pingInterval": pingIntervalTime, 
    "closeTimeout": closeTimeout, 
    "logLevel": logger.debugLevel 
  }
  persist_configs = { 
    "host": "localhost", 
    "port": defaultPort, 
    "logLevel": logger.debugLevel 
  }
  spacebrew.createServer( server_configs );
  if (persist) persister.persistRoutes( persist_configs); 

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});