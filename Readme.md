#Running

* Clone this

* Install node modules
``` 
	$cd /this/directory/
	$cd src
	$npm install 
```
* Install electron 
	* Option A: locally, for dev
		``` npm install electron-prebuilt --save-dev ```
		
	* Option B: globally
		```npm install -g electron-prebuild```
* Run
	* A: Local electron
	``` 
		$ cd src
		$ ./node_modules/.bin/electron . 
	```
	* B: Global electron
	``` 
		$cd src
		$electron .
	```

#Building
* Install Gulp
	* Globally? Why not?
	```
		$npm install --global gulp-cli
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