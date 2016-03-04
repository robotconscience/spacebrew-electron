// Spacebrew
var spacebrew = require('./spacebrew')
  , persister = require('./spacebrew_live_persist')
  , logger = require('./logger')
  , spacebrew_server = exports
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
 * Make sure an object has at least some value for
 * a required parameter
 * @param  {Object} object 
 * @param  {String} param    Default value
 * @param  {Object | String | Number} def    Default value
 */
var testForDefualtParam = function(object, param, def){
  if (object[param] === null){
    object[param] = def;
  }
}

var populateDefaults = function( object, defaults ){
  for ( var param in object ){
    testForDefualtParam(object, param, defaults[param]);
  }
}

/**
 * Main server creation function
 * @param  {Object} server_configs  configs for server (see below)
 * @param  {Object} persist_configs
 * @return {Spacebrew}                 Spacebrew server
 */
spacebrew_server.createServer = function(server_configs, persist_configs){

  var serverDefaults = { 
    "port": defaultPort, 
    "forceClose": forceClose, 
    "ping": doPing, 
    "pingInterval": pingIntervalTime, 
    "closeTimeout": closeTimeout, 
    "logLevel": logger.debugLevel,
    "adminDir": "admin"
  }

  var persistDefaults = { 
    "host": "localhost", 
    "port": defaultPort, 
    "logLevel": logger.debugLevel 
  }

  if ( server_configs === undefined ){
    // if app command did not include help flag then start-up persist server
    server_configs = serverDefaults;
  } else {
    populateDefaults(server_configs, serverDefaults);
  }

  if ( persist_configs === undefined ){
    // if app command did not include help flag then start-up persist server
    persist_configs = persistDefaults;
  } else {
    populateDefaults(persist_configs, persistDefaults);
  }

  spacebrew.createServer( server_configs );
  if (persist) persister.persistRoutes( persist_configs); 

  return spacebrew;
}