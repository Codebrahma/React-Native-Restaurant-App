import styled from 'styled-components';
import Color from '../../src/constants/colors';

export const PrimaryText = styled.div`
  width: ${props => (props.width ? props.width : '100%')};
  color: ${props => (props.color ? props.color : Color.primaryColor)};
  font-family: 'Roboto Slab';
  text-align: ${props => (props.align ? props.align : 'center')};
  font-weight: ${props => (props.bold ? 'bold;' : 'normal;')};
  font-size: ${props => (props.size ? props.size : '16px')};
`;

export const FormContainer = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-self: center;
  align-items: center;
`;

export const FormField = styled.input`
  width: 40%;
  margin: auto;
  padding: 1%;
`;

export const BR = styled.div`
  height: 20px;
`;

export const StatusBarView = styled.div`
  height: 8%;
  background-color: ${Color.lightGrey};
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 1%;
  align-items: center;
`;
