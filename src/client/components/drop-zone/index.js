import React from 'react';

export default class DropZone extends React.Component {
  constructor() {
    super();

    this.handleUpload = this.handleUpload.bind(this);
    this.renderImages = this.renderImages.bind(this);

    this.inputBtnRef = React.createRef();
  };

  handleUpload(evt) {
    this.props.handleUpload(evt);

    // reset the input value so the same image can be uploaded twice
    this.inputBtnRef.current.value = '';
  };

  renderImages() {
    return this.props.images.map((image, i) => {
      return (
        <div className="image-wrapper col-3" key={i}>
          <img className="image" src={image.translated} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col squeeze-col">

          <div className="row drop-zone inset-shadow">
            {this.renderImages()}
          </div>

          <div className="row">
            <div className="col center">
              <input type="file" className="hidden" id="image-upload" ref={this.inputBtnRef} onInput={this.handleUpload}></input>
              <label className="btn btn-primary btn-wide" htmlFor="image-upload">Upload image</label>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
