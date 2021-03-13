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

let IconStar: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M93.013333 420.693333A20.906667 20.906667 0 0 1 85.333333 397.653333l3.413334-10.666666a20.906667 20.906667 0 0 1 18.773333-14.933334l272.64-21.76 104.533333-251.306666a21.76 21.76 0 0 1 21.76-13.653334h11.093334a20.906667 20.906667 0 0 1 20.053333 13.653334l104.96 251.306666 272.64 21.76a20.906667 20.906667 0 0 1 18.773333 14.933334l3.413334 10.666666a20.906667 20.906667 0 0 1-6.4 23.04L725.333333 597.333333l63.146667 264.96a21.76 21.76 0 0 1-8.106667 22.613334l-12.373333 6.826666a21.333333 21.333333 0 0 1-23.893333 0L512 750.933333l-233.386667 142.08a21.333333 21.333333 0 0 1-23.893333 0l-9.386667-6.4a21.76 21.76 0 0 1-8.106666-22.613333L298.666667 597.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconStar.defaultProps = {
  size: 18,
};

IconStar = React.memo ? React.memo(IconStar) : IconStar;

export default IconStar;
