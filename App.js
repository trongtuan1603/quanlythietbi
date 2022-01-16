import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Account} from './src/containers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Styles from './src/styles/index';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import Login from './src/containers/Login';
import {store} from './src/redux/index';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
};
const Stacks = () => {
  const user = useSelector(state => state.user);
  return (
    <Stack.Navigator>
      {user.id ? (
        <Stack.Screen
          name={'Main'}
          component={Screens}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};
const Screens = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tài khoản') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarStyle: {
          paddingTop: 20,
          height: 90,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Styles.COLORS.mainColor,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name={'Trang chủ'}
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen name={'Tài khoản'} component={Account} />
    </Tab.Navigator>
  );
};
export default App;
