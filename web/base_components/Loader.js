import React from 'react';
import styled, { keyframes } from 'styled-components';


const animate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`;

const LoadingView = styled.div`
&:empty {
  position: absolute;
  top: calc(50% - 4em);
  left: calc(50% - 4em);
  width: 2em;
  zIndex: 1;
  height: 2em;
  border: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #000000;
  border-radius: 50%;
  animation: ${animate} 1.1s infinite linear;
}`;

const Loader = () => (
  <LoadingView />
);

export default LoadingView;
