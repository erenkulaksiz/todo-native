import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './modules/screens/main'

const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TabStack" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

