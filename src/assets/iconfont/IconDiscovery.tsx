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

let IconDiscovery: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 61.781334a364.885333 364.885333 0 1 0 0 729.770666 364.885333 364.885333 0 0 0 0-729.770666z m128.341333 197.845333a30.890667 30.890667 0 0 1 38.698667 38.698667l-65.578667 209.578666a30.890667 30.890667 0 0 1-20.224 20.224l-209.578666 65.578667a30.890667 30.890667 0 0 1-38.698667-38.698667l65.578667-209.578666a30.890667 30.890667 0 0 1 20.224-20.224z m-37.888 76.544l-137.813333 43.136-43.136 137.813333 137.813333-43.136 43.136-137.813333z"
        fill={getIconColor(color, 0, '#200E32')}
      />
    </Svg>
  );
};

IconDiscovery.defaultProps = {
  size: 18,
};

IconDiscovery = React.memo ? React.memo(IconDiscovery) : IconDiscovery;

export default IconDiscovery;
