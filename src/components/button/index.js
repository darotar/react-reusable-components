import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Type, Size, Color, GroupPosition } from './enums';
import buttonHelper from './button-helper';
import SvgIcon from '../svg-icon';
import Loader from '../loader';

import style from './style.scss';

const cn = classnames.bind(style);

export default class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false
        };
    }

    onClick = (e) => {
      const { loading, onClick } = this.props;

      if (loading) {
        return null;
      }

      onClick(e);

      return this.setState({ focus: false });
    }

    onFocus = () => {
      return this.setState({
          focus: true
      });
    }

    onBlur = () => {
      return this.setState({
        focus: false
      });
    }

    getFontColor = () => {
      const { disabled, fontColor } = this.props;

      return disabled ? null : fontColor;
    }

    getClassNames = () => {
      const {
        className,
        size,
        loading,
        groupPosition,
        active,
        type
      } = this.props;

      return cn(
        className,
        'button',
        `button--${size}`,
        `button--${buttonHelper.getColor({ props: this.props })}`, {
          'button--focus': this.state.focus,
          'button--loading': loading,
          [`button--${groupPosition}`]: groupPosition,
          'button--active': active,
          [`button__${type}`]: type
        }
      );
    }

    getLoader = () => {
        if (!this.props.loading) {
          return null;
        }

        const loaderColor = this.getLoaderColor();

        return <Loader color={loaderColor} className={style.button__loader} />;
    }

    getLoaderColor = () => {
      return (buttonHelper.getColor({ props: this.props }) !== Color.White) ? '#fff' : undefined;
    }

    filterEmptyChild = () => {
      return React.Children.toArray(this.props.children).filter(child => {
        return !!child;
      });
    }

    stylizeSvg = (svg, i) => {
      const props = {
        className: classnames(
          svg.props.className,
          style.button__icon, {
            [style['button__icon--left']]: i === 0,
            [style['button__icon--right']]: i === React.Children.count(this.props.children) - 1
          }
        ),
        style: { fill: this.getFontColor() }
      };

      return React.cloneElement(svg, props);
    }

    mapChildren = () => {
      return this.filterEmptyChild().map((child, i) => {
        if (child.type && child.type === SvgIcon) {
          return this.stylizeSvg(child, i);
        }

        return child;
      });
    }

    render() {
      return (
        <button
          type="button"
          style={{ color: this.getFontColor() }}
          className={this.getClassNames()}
          disabled={this.props.disabled}
          onClick={this.onClick}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {this.getLoader()}
          {this.mapChildren()}
        </button>
      );
    }
}

Button.defaultProps = {
    disabled: false,
    size: Size.Standart,
    loading: false,
    active: false,
    type: Type.Default
};

Button.propTypes = {
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(Object.values(Size)),
    fontColor: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    groupPosition: PropTypes.oneOf(Object.values(GroupPosition)),
    active: PropTypes.bool,
    type: PropTypes.oneOf(Object.values(Type))
};