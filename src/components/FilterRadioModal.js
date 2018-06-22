import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import styled from 'styled-components';
import Modal from 'react-native-modalbox';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import { Dimensions, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoundButton from '../base_components/RoundButton';
import BR from '../base_components/BR';
import Colors from '../constants/colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalBase = styled.View`
  flex: 1;
  flex-direction: column;
  background: #f5f5f5;
`;

const FilterHeadWrap = styled.View`
  padding: 20px 20px 10px;
  flex-direction: row;
  background: #f5f5f5;
  justify-content: space-between;
  align-items: center;
`;

const FilterHeading = styled.Text`
  font-size: 16px;
  flex: 1;
  font-weight: bold;
`;

const CheckWrap = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  margin: 10px;
`;

const RadioText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

class FilterRadioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeToClose: true,
      filterData: this.props.data,
      selectedValue: null,
      selectedIndex: null,
    };
  }

  onClose = () => {
    const { selectedValue } = this.state;
    this.props.onClose(selectedValue);
  };

  onOpen = () => {
    this.props.onOpen();
  };

  onClosingState = (state) => {
    this.props.onClosingState();
  };

  onSelect = (index, item) => {
    this.setState((s, p) => ({
      selectedValue: item,
      selectedIndex: index,
    }));
  };

  closeModal = () => {
    this.props.close();
  };

  render() {
    const { filterData } = this.state;
    const { heading } = this.props;

    return (
      <Modal
        ref={this.props.pRef}
        swipeToClose={this.state.swipeToClose}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        position="center"
        style={{
          justifyContent: 'flex-start',
        }}
        onClosingState={this.onClosingState}
      >
        <ModalBase>
          <FilterHeadWrap>
            <FilterHeading>{heading}</FilterHeading>
            <Ionicons
              size={26}
              color="#888"
              name="md-close"
              onPress={this.closeModal}
            />
          </FilterHeadWrap>
          <CheckWrap>
            <RadioGroup
              selectedIndex={this.state.selectedIndex}
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton
                style={{
                  padding: 15,
                }}
                key={-1}
                value={null}
              >
                <RadioText>All</RadioText>
              </RadioButton>

              {
                map(filterData, (item, index) => (
                  <RadioButton
                    style={{
                      padding: 15,
                    }}
                    disabled={item.disabled}
                    key={index}
                    value={item.value}
                  >
                    <RadioText>{item.label || item.value}</RadioText>
                  </RadioButton>
                ))
              }
            </RadioGroup>
            <BR />
            <RoundButton
              buttonColor={Colors.moneyColor}
              small
              title="Apply"
              onPress={this.closeModal}
            />
          </CheckWrap>
        </ModalBase>
      </Modal>
    );
  }
}

FilterRadioModal.defaultProps = {
  heading: 'Filter',
  onOpen: () => {
  },
  onClose: () => {
  },
  onClosingState: () => {
  },
};

FilterRadioModal.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClosingState: PropTypes.func,
  close: PropTypes.func.isRequired,
  pRef: PropTypes.func.isRequired,
};

export default FilterRadioModal;
