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

let IconExchangerate: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M849.53 224c-17.67 0-32 14.33-32 32v98.02C760.3 243.52 644.94 168 511.91 168c-178.17 0-324.7 135.45-342.24 309-1.9 18.76 13 35 31.86 35 16.35 0 30.17-12.31 31.81-28.58 2.79-27.73 9.67-54.67 20.55-80.39 14.1-33.33 34.3-63.29 60.03-89.02 25.74-25.74 55.69-45.93 89.02-60.03C437.42 239.39 474.09 232 511.91 232s74.49 7.39 108.97 21.98c33.33 14.1 63.29 34.3 89.02 60.03 20.74 20.74 37.87 44.21 51.12 69.99h-71.5c-17.67 0-32 14.33-32 32s14.33 32 32 32h128c35.35 0 64-28.65 64-64V256c0.01-17.67-14.32-32-31.99-32zM769.94 620.97c-14.1 33.33-34.3 63.29-60.03 89.02-25.74 25.74-55.69 45.93-89.02 60.03C586.4 784.61 549.74 792 511.91 792s-74.49-7.39-108.97-21.98c-33.33-14.1-63.29-34.3-89.02-60.03-20.74-20.74-37.87-44.21-51.12-69.99h71.67c17.67 0 32-14.33 32-32s-14.33-32-32-32h-128c-35.35 0-64 28.65-64 64v128c0 17.67 14.33 32 32 32s32-14.33 32-32v-97.69C263.76 780.63 379.02 856 511.91 856c178.02 0 324.44-135.22 342.19-308.55 1.92-18.77-12.98-35.04-31.85-35.04-16.34 0-30.15 12.29-31.81 28.55-2.81 27.6-9.67 54.41-20.5 80.01z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconExchangerate.defaultProps = {
  size: 18,
};

IconExchangerate = React.memo ? React.memo(IconExchangerate) : IconExchangerate;

export default IconExchangerate;
