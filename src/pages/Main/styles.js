import styled from 'styled-components';


export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    flex: 2;
    background: red;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false
})`
    flex: 4;
`;

export const OnibusContainer = styled.View`
    height: 90px;
    padding-left: 20px;
    border-bottom-width: 1px;
    border-color: #eee;
    flex-direction: column;
    align-items: flex-start;
`;

export const HeaderImage = styled.Image`
    flex: 1;
`;

export const Letreiro = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
`;

export const OrigemDestino = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
    color: #999;
`;