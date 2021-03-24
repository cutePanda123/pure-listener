/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconMore from './IconMore';
import IconLike from './IconLike';
import IconUser from './IconUser';
import IconStar from './IconStar';
import IconDiscovery from './IconDiscovery';
import IconCart from './IconCart';
import IconHomehomepagemenu from './IconHomehomepagemenu';

export type IconNames = 'icon-more' | 'icon-like' | 'icon-user' | 'icon-star' | 'icon-Discovery' | 'icon-cart' | 'icon-Homehomepagemenu';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-more':
      return <IconMore key="1" {...rest} />;
    case 'icon-like':
      return <IconLike key="2" {...rest} />;
    case 'icon-user':
      return <IconUser key="3" {...rest} />;
    case 'icon-star':
      return <IconStar key="4" {...rest} />;
    case 'icon-Discovery':
      return <IconDiscovery key="5" {...rest} />;
    case 'icon-cart':
      return <IconCart key="6" {...rest} />;
    case 'icon-Homehomepagemenu':
      return <IconHomehomepagemenu key="7" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
