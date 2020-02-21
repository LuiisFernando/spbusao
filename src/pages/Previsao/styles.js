import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 80px;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin-bottom: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 4;
`;

export const Onibus = styled.TouchableWithoutFeedback``;

export const OnibusContainer = styled.View`
  height: 90px;
  padding-left: 24px;
  border-bottom-width: 1px;
  border-color: #eee;
  flex-direction: column;
  /* align-items: flex-start; */
`;

export const WrapLetreiro = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 0;
`;

export const Letreiro = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export const OrigemDestino = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  color: #999;
`;
