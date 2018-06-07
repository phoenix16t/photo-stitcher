import React from 'react';
import DropZone from '../drop-zone';

const reader = new FileReader();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { images: [] };

    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.translateImage = this.translateImage.bind(this);
  }

  componentDidMount() {
    reader.addEventListener('load', this.translateImage);
  }

  componentWillUnmount() {
    reader.removeEventListener('load', this.translateImage);
  }

  handleRemoveImage(idx) {
    const images = this.state.images;
    images.splice(idx, 1);
    this.setState({ images });
  }

  handleUpload(evt) {
    if(evt.target.files && evt.target.files[0]) {
      const images = this.state.images;
      if(images.length >= 4) {
        images.length = 3;
      }
      images.push({ orig: evt.target.files[0] });
      this.setState({ images });

      reader.readAsDataURL(evt.target.files[0]);
    }
  }

  translateImage(e) {
    if(e && e.target) {
      const images = this.state.images;
      images[images.length - 1].translated = e.target.result;
      this.setState({ images });
    }
  }

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

          <div className="row">
            <div className="col">
              <div className="stitch-view inset-shadow"></div>
            </div>
          </div>

          <div className="row">
            <div className="col center">
              <button type="button" className="btn">Download image</button>
            </div>
          </div>
      </div>
    );
  };
};
