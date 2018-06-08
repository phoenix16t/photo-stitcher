import React from 'react';
import DropZone from '../drop-zone';
import StitchView from '../stitch-view';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { images: [] };

    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.readFile = this.readFile.bind(this);
    this.renderDummyImage = this.renderDummyImage.bind(this);
    this.updateImageState = this.updateImageState.bind(this);
  };

  handleRemoveImage(idx) {
    const images = this.state.images;
    images.splice(idx, 1);
    this.setState({ images });
  };

  // image upload handler - begins promise chain that extracts pertinent
  // data from image
  handleUpload(evt) {
    if(evt.target.files && evt.target.files[0]) {
      this.readFile(evt.target.files[0])
        .then(this.renderDummyImage)
        .then(this.updateImageState);
    }
  };

  // reads the source image and returns a base64 encoded version
  readFile(file) {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if(evt && evt.target) {
          resolve(evt.target.result);
        }
        reject();
      };
      reader.readAsDataURL(file);
    });
  };

  // renders the image
  renderDummyImage(src) {
    return new Promise(function(resolve, reject) {
      const rendered = new Image();
      rendered.onload = () => {
        resolve({ src, rendered });
      };
      rendered.src = src;
    });
  };

  // updates the image array with the retrieved data
  updateImageState(image) {
    const images = this.state.images;
    if(images.length >= 4) {
      images.length = 3;
    }
    images.push(image);
    this.setState({ images });
  };

  render() {
    return (
      <div className="container app drop-shadow">

        <div className="row">
          <div className="col center">
            <h1 className="title">The Photo Stitcher</h1>
          </div>
        </div>

        <DropZone
          handleRemoveImage={this.handleRemoveImage}
          handleUpload={this.handleUpload}
          images={this.state.images} />

        <StitchView
          images={this.state.images} />

      </div>
    );
  };
};
