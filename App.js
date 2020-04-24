import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import productsReducer from './store/reducers/productsReducer';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>STUFF</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
