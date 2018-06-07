import React from 'react';

export default class DropZone extends React.Component {
  constructor() {
    super();

    this.state = { showHighlight: false };

    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.renderImages = this.renderImages.bind(this);

    this.dropZoneHighlightRef = React.createRef();
    this.inputBtnRef = React.createRef();
  };

  componentDidMount() {
    window.addEventListener('dragenter', this.handleDragEnter);
    window.addEventListener('dragover', this.handleDragOver);
    window.addEventListener('drop', this.handleDragLeave);
    window.addEventListener('mouseup', this.handleDragLeave);
    this.dropZoneHighlightRef.current.addEventListener('dragenter', this.handleDragEnter);
    this.dropZoneHighlightRef.current.addEventListener('dragleave', this.handleDragLeave);
    this.dropZoneHighlightRef.current.addEventListener('drop', this.handleDrop);
  }

  handleDragEnter(evt) {
    this.setState({ showHighlight: true });
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }

  handleDragLeave(evt) {
    this.setState({ showHighlight: false });
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }

  handleDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  }

  handleDrop(evt) {
    evt.preventDefault();
    const payload = { target: { files: evt.dataTransfer.files }};
    this.handleUpload(payload);
    this.setState({ showHighlight: false });
    return false;
  }

  handleUpload(evt) {
    this.props.handleUpload(evt);

    // reset the input value so the same image can be uploaded twice
    this.inputBtnRef.current.value = '';
  };

  renderImages() {
    return this.props.images.map((image, i) => {
      return (
        <div className="image-wrapper col-3" key={i} onClick={() => this.props.handleRemoveImage(i)}>
          <img className="image" src={image.translated} />
        </div>
      );
    });
  };

  render() {
    const highlightClass = ['drop-zone-highlight'];
    if(!this.state.showHighlight) {
      highlightClass.push('hidden');
    }

    return (
      <div className="row">
        <div className="col squeeze-col">

          <div className="row drop-zone inset-shadow">
            <div className={highlightClass} ref={this.dropZoneHighlightRef}></div>
            {this.renderImages()}
          </div>

          <div className="row">
            <form className="col center">
              <input type="file" className="hidden" id="image-upload" ref={this.inputBtnRef} onInput={this.handleUpload}></input>
              <label className="btn btn-primary btn-lg" htmlFor="image-upload">Upload image</label>
            </form>
          </div>
        </div>
      </div>
    );
  };
};
