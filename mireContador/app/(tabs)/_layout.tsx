import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator
>(Navigator);

export default function TabLayout() {
    return (
        <MaterialTopTabs
            tabBarPosition="bottom"
            screenOptions={{
                tabBarActiveTintColor: '#4F46E5',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarIndicatorStyle: { height: 0 },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F1F5F9',
                    height: 65,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    textTransform: 'none',
                    marginTop: -5,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarShowIcon: true,
                swipeEnabled: true,
            }}
        >
            <MaterialTopTabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={24} name={focused ? "home" : "home-outline"} color={color} />
                    ),
                }}
            />
            <MaterialTopTabs.Screen
                name="create"
                options={{
                    title: 'Novo',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={24} name={focused ? "add-circle" : "add-circle-outline"} color={color} />
                    ),
                }}
            />
            <MaterialTopTabs.Screen
                name="list"
                options={{
                    title: 'Balanços',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={24} name={focused ? "layers" : "layers-outline"} color={color} />
                    ),
                }}
            />
        </MaterialTopTabs>
    );
}
