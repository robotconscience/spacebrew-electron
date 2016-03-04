#Running
* Clone this
* Cd to this directory
* Install electron 
	* Option A: locally, for dev
		``` npm install electron-prebuilt --save-dev ```
		* Run
		``` 
			$ cd src
			$ ./node_modules/.bin/electron . 
		```
	* Option B: globally
		```npm install -g electron-prebuild```
		* Run
		``` 
			$cd src
			$electron .
		```
* Someone better at me than Node stuff can advise if this is crazy.

#Building
* Install Gulp
	* Globally? Why not?
	```
		$npm install --global gulp-cli`` 
	```
* Install Gulp electron plugin
	```
	$npm install gulp-electron
	```
* Run Gulp Electron from this dir
	```
	$gulp electron
	```
* Windows and Mac apps should now be in a 'releases' folder.