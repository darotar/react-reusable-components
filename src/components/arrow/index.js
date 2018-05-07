import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.css';
import svgIconHelper from '../../helpers/svg-icon-helper';

const Direction = {
  Down: 'down',
  Up: 'up'
};

export default class Arrow extends PureComponent {

  static propTypes = {
    direction: PropTypes.oneOf(Object.values(Direction)),
    style: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    direction: Direction.Down
  }

  getClassNames = () => {
    const { className, direction } = this.props;

    return classnames(
      'qa-arrow-component',
      className,
      style.arrow,
      style[`arrow--${direction}`]
    );
  }

  render() {
    const { style, onClick } = this.props;

    return svgIconHelper.getJsx({
      name: 'dropdownArrow',
      style,
      className: this.getClassNames(),
      onClick
    });
  }
}