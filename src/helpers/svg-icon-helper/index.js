import React from 'react';

import IconResource from './icon-resource';
import SvgIcon from '../../components/svg-icon';

class SvgIconHelper {
    get({ name }) {
      return IconResource[name] || IconResource.smile;
    }

    getJsx({
        name, style, className, onClick, file
    }) {
        const icon = _isFile(file) ? file : this.get({ name });
        return <SvgIcon icon={icon} style={style} className={className} onClick={onClick} />;
    }
}

function _isFile(file) {
    return file && file.content;
}

export default new SvgIconHelper();
