import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Password from './src/screens/Password';
import Perfil from './src/screens/Perfil';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Password"
                    component={Password}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

registerRootComponent(App);
