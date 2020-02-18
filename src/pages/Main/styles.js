import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  flex: 2;
  background: red;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 4;
`;

export const Onibus = styled.TouchableWithoutFeedback``;

export const OnibusContainer = styled.View`
  height: 90px;
  padding-left: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
  flex-direction: column;
  /* align-items: flex-start; */
`;

export const HeaderImage = styled.Image`
  flex: 1;
`;

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchTextInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  border-radius: 25px;
  font-size: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.75);
  padding: 0 20px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

export const WrapLetreiro = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 0;
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
