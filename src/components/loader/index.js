import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colorString from 'color-string';

import style from './style.css';
import loader from './img/loader.m.svg';

export default class Loader extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    color: '#209AC4'
  }

  getFilter = () => {
    const matrix = colorString.get.rgb(this.props.color).map(color => {
      return Math.round((color * 100) / 255) / 100;
    });
    return <defs xmlns="http://www.w3.org/2000/svg">
      <filter id={this.filterId()}>
        <feColorMatrix
          colorInterpolationFilters="sRGB"
          type="matrix"
          values={`${matrix[0]} 0 0 0 0   0 ${matrix[1]} 0 0 0    0 0 ${matrix[2]} 0 0    0 0 0 1 0 `}
        />
      </filter>
    </defs>;
  }

  getClassNames = () => {
    return classnames(
      'qa-loader',
      this.props.className,
      style.loader
    );
  }

  filterId = () => {
    return `loaderColor${colorString.get.rgb(this.props.color).join('')}`;
  }

  render() {
    return (
      <svg className={this.getClassNames()}>
        {this.getFilter()}
        <g filter={`url(#${this.filterId()})`}>
          <use xlinkHref={`#${loader.id}`} />
        </g>
      </svg>
    );
  }
}