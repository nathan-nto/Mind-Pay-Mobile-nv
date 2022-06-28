import React from 'react';
import { Container, ButtonText } from './styles';



const Button = ({ children, secudary,...rest }) => (
  <Container secudary={secudary} {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
