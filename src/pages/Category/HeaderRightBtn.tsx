import {RootState} from '@/models/';
import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {
    isEditMode: category.isEditMode,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onEditModeChange: () => void;
}

class HeaderRightBtn extends React.Component<IProps> {
  render() {
    const {onEditModeChange, isEditMode} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEditMode ? 'Save' : 'Edit'} onPress={onEditModeChange} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightBtn);
