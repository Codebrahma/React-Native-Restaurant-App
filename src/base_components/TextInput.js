import { Platform } from 'react-native';
import styled from 'styled-components';

const TextInput = styled.TextInput`
  font-family: 'Roboto Slab';
  padding: 15px;
  width: 100%;
  min-height: 42px;
  font-size: 18px;
  color: #989898;
  text-align: left;
  border: 0 solid #ddd;
  border-bottom-width: ${Platform.OS === 'ios' ? '1px' : '0px'};
  border-bottom-color: #ddd;
  `;
export default TextInput;
