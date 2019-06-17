import React, { Component } from "react";

class SimpleHeading extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="simple-heading">
        <h2 className="simple-heading__title">{title}</h2>
        {description && (
          <p className="simple-heading__description">{description}</p>
        )}
      </div>
    );
  }
}

export default SimpleHeading;
