import styled, { css } from 'styled-components/native';
// import {} from 'react-native-keyboard-aware-scroll-view'

export const Container = styled.View`
    flex: 1;
    background-color: #2E2E2E;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    max-height: 100%;
    padding-bottom:40px;
`;

export const Image = styled.Image`
    margin-top: 40px;
    align-self: center;
    width: 150px;
    height: 150px;
    align-content: flex-start;
    border-radius: 100px;
`;

export const TxtEdit = styled.Text`
    color: #FFF;
    align-self: center;
    margin-left: 2%;
    margin-top: 10px;
    opacity: 0.75px;
    font-family: 'Montserrat_100Thin';
`;

export const TxtRegister = styled.Text`
    color: #fff;
    font-size: 16px;
    align-self: flex-start;
    margin-top: 30px;
    margin-left: 5%;
    font-family: 'Montserrat_100Thin';
`;

export const BtnAlterar = styled.TouchableOpacity`
    width: 90%;
    margin-top:20px;
    margin-left:5%;
    height: 50px;
    background-color: #D52247;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const TxtBtn = styled.Text`
    font-family: 'Montserrat_100Thin';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 21px;
    color: #FFFFFF;
`;

export const BtnEdit = styled.TouchableOpacity`
    align-self: flex-end;
    margin-right: 30px;
    margin-top: 10px;
`;
