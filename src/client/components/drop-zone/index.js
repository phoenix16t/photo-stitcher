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

  // mounting drag and drop event listeners
  componentDidMount() {
    window.addEventListener('dragenter', this.handleDragEnter);
    window.addEventListener('dragover', this.handleDragOver);
    window.addEventListener('drop', this.handleDragLeave);
    window.addEventListener('mouseup', this.handleDragLeave);
    this.dropZoneHighlightRef.current.addEventListener('dragenter', this.handleDragEnter);
    this.dropZoneHighlightRef.current.addEventListener('dragleave', this.handleDragLeave);
    this.dropZoneHighlightRef.current.addEventListener('drop', this.handleDrop);
  };

  // unmounting drag and drop event listeners
  componentWillUnmount() {
    window.removeEventListener('dragenter', this.handleDragEnter);
    window.removeEventListener('dragover', this.handleDragOver);
    window.removeEventListener('drop', this.handleDragLeave);
    window.removeEventListener('mouseup', this.handleDragLeave);
    this.dropZoneHighlightRef.current.removeEventListener('dragenter', this.handleDragEnter);
    this.dropZoneHighlightRef.current.removeEventListener('dragleave', this.handleDragLeave);
    this.dropZoneHighlightRef.current.removeEventListener('drop', this.handleDrop);
  }

  // drag listener function for highlighting the drop zone
  handleDragEnter(evt) {
    this.setState({ showHighlight: true });
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  };

  // drag listener function for highlighting the drop zone
  handleDragLeave(evt) {
    this.setState({ showHighlight: false });
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  };

  // drag listener function for highlighting the drop zone
  handleDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  };

  // drop listener function for handling the drop action
  handleDrop(evt) {
    evt.preventDefault();
    const payload = { target: { files: evt.dataTransfer.files }};
    this.handleUpload(payload);
    this.setState({ showHighlight: false });
    return false;
  };

  handleUpload(evt) {
    this.props.handleUpload(evt);

    // reset the input value so the same image can be uploaded twice
    this.inputBtnRef.current.value = '';
  };

  renderImages() {
    return this.props.images.map((image, i) => {
      return (
        <div className="image-wrapper col-3" key={i} onClick={() => this.props.handleRemoveImage(i)}>
          <img className="image" src={image.src} />
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
        <div className="col squeeze-col drop-zone-wrapper">

          <div className="row drop-zone inset-shadow">
            <div className={highlightClass} ref={this.dropZoneHighlightRef}></div>
            {this.renderImages()}
          </div>

          <div className="row">
            <ul className="notes">
              <li>Adding more than 4 images will cause the last image to be replaced.</li>
              <li>Click on an image to remove it from the list.</li>
            </ul>
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
