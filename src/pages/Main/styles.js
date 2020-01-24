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
    flex-direction: row;
    align-items: center;
`;

export const HeaderImage = styled.Image`
    flex: 1;
`;