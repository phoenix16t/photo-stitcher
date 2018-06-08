import React from 'react';
import mergeImages from 'merge-images';

export default class StitchView extends React.Component {
  constructor() {
    super();

    this.state = { mergedImage: '' };
  }

  // once 4 images are uploaded, this will kick off the process
  // to render the images together
  componentWillReceiveProps(props) {
    if(props.images.length === 4) {
      const maxHeight = props.images.map(image => image.rendered.height)
        .reduce((prev, curr) => prev < curr ? prev : curr);
      let accumulatedWidth = 0;

      // resize the 4 images dynamically so they're all the same
      // height as the shortest image
      const newImageData = props.images.map(image => {
        const ratio = maxHeight / image.rendered.height;
        const newWidth = image.rendered.width * ratio;

        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.height = maxHeight;
        canvas.width = newWidth;
        ctx.drawImage(image.rendered, 0, 0, newWidth, maxHeight);

        const imageData = { src: canvas.toDataURL() };
        imageData.x = accumulatedWidth;
        imageData.y = 0;
        accumulatedWidth += newWidth;
        return imageData;
      });

      // use the "mergeImages" tool to create the final image
      mergeImages(newImageData, {
        height: maxHeight,
        width: accumulatedWidth
      })
        .then(mergedImage => {
          this.setState({ mergedImage: mergedImage });
        });
    }
    else {
      this.setState({ mergedImage: '' });
    }
  };

  render() {
    // disable the download button if there aren't enough images
    const btnClasses = ['btn', 'btn-primary', 'btn-lg'];
    let href = this.state.mergedImage;
    if(this.props.images.length !== 4 ) {
      btnClasses.push('disabled');
      href = 'false';
    }

    return (
      <div className="row">
        <div className="col squeeze-col">
          <div className="row stitch-view inset-shadow">
            <img className="image" src={this.state.mergedImage} />
          </div>

          <div className="row">
            <div className="col center">
              <a className={btnClasses.join(' ')}
                href={href}
                download>Download image</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
