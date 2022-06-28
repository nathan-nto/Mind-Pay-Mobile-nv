import styled,{css} from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 80%;
  height: 50px;
  background: #D52247;
  border-radius: 8px;
  margin-top: 30px;
  align-self:center;
  justify-content: center;
  align-items: center;
  ${(props) =>
        props.secudary &&
        css`
        background: transparent;
        margin-top: 10px;
    `}
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 19px;
  font-family: 'Montserrat_100Thin';

`;
