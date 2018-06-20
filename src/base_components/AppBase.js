import { Platform } from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/colors';


const AppBase = styled.View`
  background: ${Colors.baseColor};
  flex: 1;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  ${Platform.OS === 'ios' ? 'padding-top: 20px;' : ''}
`;


export default AppBase;
