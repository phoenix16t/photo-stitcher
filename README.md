# Photo Stitcher

## Getting Started
Clone the repo:
```
git clone https://github.com/phoenix16t/photo-stitcher.git
```

### Installing
Open the project directory and install dependencies:
```
cd photo-stitcher
npm install
```

### Production mode
Once the installation is complete, the application can be started in production mode:
```
npm start
```
This will run the build and serve the project on localhost:3000. Please note - it may take a few moments for the build to finish. The build process and node server can be started manually:
```
webpack --config webpack.config.js --mode production
node ./src/server/index.js
```

### Development mode
The application can also be started in development mode:
```
npm run start-dev
```
This will enable the webpack watcher, which allows for live updating

## Versioning
Version | Update
--- | --- |
1.0.1 | Update to properly clone array values
1.0.0 | Cleaning up, MVP
0.0.5 | Added final image rendering, preview, ability to download
0.0.4 | Added drag and drop, ability to remove images
0.0.3 | Added basic drop zone
0.0.2 | Added bootstrap and README.md, and updated basic app structure
0.0.1 | Initial commit
