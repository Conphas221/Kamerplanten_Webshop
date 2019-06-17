import React, { Component } from "react";

class Loading extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="loading">
        <span className="loading__spinner" />
        {text}
      </div>
    );
  }
}

export default Loading;
