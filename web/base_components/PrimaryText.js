import styled from 'styled-components';
import Color from '../../src/constants/colors';

const PrimaryText = styled.div`
  width: 100%;
  color: ${props => (props.color ? props.color : Color.primaryColor)};
  font-family: 'Roboto Slab';
  text-align: ${props => (props.align ? props.align : 'center')};
  font-weight: ${props => (props.bold ? 'bold;' : 'normal;')};
  font-size: ${props => (props.size ? props.size : '16px')};
`;


export default PrimaryText;
