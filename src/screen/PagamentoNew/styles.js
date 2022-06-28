import styled, { css } from 'styled-components/native';
import {Dimensions} from 'react-native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #2E2E2E;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    min-height:100%;
    height:${Dimensions.get('window').height + 50};
`;

export const Image = styled.Image`
    margin-top: 40px;
    align-self: center;
    width: 250px;
    height: 150px;
    align-content: flex-start;
    resize-mode: contain;
`;

export const TxtEdit = styled.Text`
    color: #FFF;
    align-self: center;
    margin-left: 2%;
    margin-top: 10px;
    font-size:18px;
    opacity: 0.75px;
    font-family: 'Montserrat_100Thin';
`;

export const Txt = styled.Text`
    color: #FFF;
    align-self: flex-start;
    margin-left: 2%;
    margin-top: 30px;
    font-size:15px;
    opacity: 0.75px;
    font-weight:bold;
    font-family: 'Montserrat_100Thin';
`;


