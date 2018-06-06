import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="container app drop-shadow">
        <div className="row">
          <div className="col center">
            <h1 className="title">The Photo Stitcher</h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="drop-zone inset-shadow container">
              <div className="row image-row">
                <div className="image col-3 temp-image-1"></div>
                <div className="image col-3 temp-image-2"></div>
                <div className="image col-3 temp-image-3"></div>
                <div className="image col-3 temp-image-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row btn-wrapper">
          <div className="col center">
            <button type="button" className="btn">Upload image</button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="stitch-view inset-shadow"></div>
          </div>
        </div>

        <div className="row btn-wrapper">
          <div className="col center">
            <button type="button" className="btn">Download image</button>
          </div>
        </div>
      </div>
    );
  };
};
