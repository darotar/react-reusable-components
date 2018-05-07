import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SvgIcon extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  _getUserTag = () => {
    const iconId = this._getIconId();

    if (!iconId) {
      return null;
    }

    return `<use xlink:href=${iconId}></use>`;
  }

  _getIconId = () => {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    return icon.id ? `#${icon.id}` : icon;
  }

  render() {
    const userTag = this._getUserTag();
    const { style, className, onClick } = this.props;

    if (!userTag) {
      return null;
    }

    return <svg
      style={style}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: userTag }}
    />;
  }
}