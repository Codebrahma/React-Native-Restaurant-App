import React from 'react';
import styled from 'styled-components';
import { lightGrey } from '../../src/constants/colors';
// import '../styles/LoginForm.css';

const FormContainer = styled.div`
  
  width: '60%';
  border-color: ${lightGrey};
  border-style: 'solid';
  margin: '0 auto'
`;
// const formStyle = {
//   width: '60%',
//   border-color: lightGrey,
// }
// style={{width: '60%', borderColor: lightGrey, borderStyle: 'solid', margin: '0 auto',}}
//  <div className="FormContainer">
const LoginForm = () => (
  <div style={{
width: '60%', borderColor: lightGrey, borderStyle: 'solid', margin: '0 auto',
}}>
    <input type="text" name="username" />
  </div>
);

export default LoginForm;
