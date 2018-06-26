/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const BaseWrap = styled.View`
  flex-direction: row;
  justify-content: ${props => (props.jc ? props.jc : 'center')};
  align-items: ${props => props.ai};
`;

const ViewRow = ({ jc, ai, ...props }) => (
  <BaseWrap
    jc={jc}
    ai={ai}
    style={props.style}
  >
    {props.children}
  </BaseWrap>
);
ViewRow.defaultProps = {
  style: {},
  jc: 'center',
  ai: 'stretch',
};


ViewRow.propTypes = {
  ai: PropTypes.string,
  jc: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any.isRequired,
};


export default ViewRow;
