import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  padding: 0 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border-bottom-color:#A74F4F;
  border-bottom-width:1;
  margin-top:20px;

  ${(props) =>
    props.isErrored &&
    css`
      border-bottom-color:#c53030;
      border-bottom-width:1;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width:1;
      border-bottom-color:#fff;
    `}

    ${(props) =>
    props.editable == false &&
    css`
      border-bottom-width:0;  
    `}

    ${(props) =>
    props.desc &&
    css`
    
     height:100px;
    `}
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  flex:1;
  height:100px;
  font-family:'Montserrat_100Thin';
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 5px;
  color:#666360;
  ${(props) =>
    props.isField &&
    css`
    color:#A74F4F;
    `}
    ${(props) =>
    props.isFocused &&
    css`
    color:#fff;
    `}
    ${(props) =>
    props.editable == false &&
    css`
    color:#A74F4F;
    `}
`;
