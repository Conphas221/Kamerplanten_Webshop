import React, { Component } from 'react';

class PageHero extends Component {
  render() {
    const { image, type, intro, title, description } = this.props;
    return (
      <section
        className={`page-hero${type ? ` page-hero--${type}` : ''}`}
        style={{
          backgroundImage: `url(${image})`
        }}>
        {intro && (
          <div className="wrapper">
            <h1 className="page-hero__title">{title}</h1>
            {description && (
              <p className="page-hero__description">{description}</p>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default PageHero;
