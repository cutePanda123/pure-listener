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

let IconLike: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-938.666667a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 669.013334a42.666667 42.666667 0 0 1-30.293333-12.373334l-180.906667-180.906666a170.666667 170.666667 0 0 1 213.333333-265.386667A170.666667 170.666667 0 0 1 725.333333 561.066667l-180.906666 180.906666a42.666667 42.666667 0 0 1-32.426667 12.373334zM421.546667 354.986667a85.333333 85.333333 0 0 0-60.586667 145.493333L512 651.52l151.04-151.04a85.333333 85.333333 0 0 0-120.746667-120.746667 42.666667 42.666667 0 0 1-60.586666 0 85.333333 85.333333 0 0 0-60.16-24.746666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLike.defaultProps = {
  size: 18,
};

IconLike = React.memo ? React.memo(IconLike) : IconLike;

export default IconLike;
