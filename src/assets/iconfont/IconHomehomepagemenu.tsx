/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconHomehomepagemenu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M874.666667 896H618.666667a21.333333 21.333333 0 0 1-21.333334-21.333333V640h-170.666666v234.666667a21.333333 21.333333 0 0 1-21.333334 21.333333H149.333333a21.333333 21.333333 0 0 1-21.333333-21.333333V405.333333a21.376 21.376 0 0 1 9.024-17.429333l362.666667-256a21.354667 21.354667 0 0 1 24.618666 0l362.666667 256A21.376 21.376 0 0 1 896 405.333333v469.333334a21.333333 21.333333 0 0 1-21.333333 21.333333z m-234.666667-42.666667h213.333333V416.405333L512 175.445333 170.666667 416.405333V853.333333h213.333333V618.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h213.333334a21.333333 21.333333 0 0 1 21.333333 21.333334z"
        fill={getIconColor(color, 0, '#646464')}
      />
    </Svg>
  );
};

IconHomehomepagemenu.defaultProps = {
  size: 18,
};

IconHomehomepagemenu = React.memo ? React.memo(IconHomehomepagemenu) : IconHomehomepagemenu;

export default IconHomehomepagemenu;
