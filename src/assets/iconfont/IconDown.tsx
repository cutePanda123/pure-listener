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

let IconDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M910.363 344.66a22.047 22.047 0 0 1 14.769 5.67c9.055 8.15 9.788 22.121 1.639 31.176L528.407 824.024c-8.171 9.077-22.099 9.767-31.176 1.639-9.055-8.15-9.788-22.12-1.639-31.176l398.363-442.518c4.356-4.852 10.372-7.309 16.408-7.309z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M113.637 344.66c6.037 0 12.052 2.458 16.407 7.309l398.363 442.518c8.15 9.055 7.417 23.026-1.639 31.176s-23.026 7.46-31.176-1.639L97.23 381.506c-8.15-9.055-7.417-23.026 1.639-31.176a22.038 22.038 0 0 1 14.768-5.67z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDown.defaultProps = {
  size: 18,
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;
