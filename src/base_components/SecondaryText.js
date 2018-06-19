import styled from 'styled-components';
import Color from '../constants/colors';

const SecondaryText = styled.Text`
  color: ${Color.secondaryColor};
  font-family: 'Roboto Slab';
  width: 100%;
  text-align: ${props => (props.align ? props.align : 'left')};
`;


export default SecondaryText;
