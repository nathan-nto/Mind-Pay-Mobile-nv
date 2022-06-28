import styled from "styled-components/native";
import LottieView from "lottie-react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Animation = styled(LottieView)`
  background-color: #000000;
  width: 100px;
  height: 50px;
`;