import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.View`
  height: 50px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 18px;
`;

const Title = () => (
  <TitleContainer>
    <TitleText>
      Cart Items
    </TitleText>
  </TitleContainer>
);
export default Title;
