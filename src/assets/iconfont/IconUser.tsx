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

let IconUser: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M576 706.612l0-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.06 57.502 198.104 128 237.832l0 52.78c-217.102 17.748-384 124.42-384 253.388l896 0c0-128.968-166.898-235.64-384-253.388z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconUser.defaultProps = {
  size: 18,
};

IconUser = React.memo ? React.memo(IconUser) : IconUser;

export default IconUser;
