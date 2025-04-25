import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import FeatureOneScreen from '../screens/FeatureOneScreen';
import FeatureTwoScreen from '../screens/FeatureTwoScreen';
import FeatureThreeScreen from '../screens/FeatureThreeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import type { RootStackParamList, DrawerParamList, MainStackParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const HeaderLeft = () => {
    const navigation = useNavigation();
    const route = useRoute();

    if (route.name === 'Home') {
        return (
            <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
                <Text style={styles.headerButtonText}>☰</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
        >
            <Icon name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
    );
};

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#1a1a1a',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderLeft />,
            }}
        >
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'My App',
                }}
            />
            <MainStack.Screen
                name="FeatureOne"
                component={FeatureOneScreen}
                options={{
                    title: 'Video Upload',
                }}
            />
            <MainStack.Screen
                name="FeatureTwo"
                component={FeatureTwoScreen}
                options={{
                    title: 'Weather',
                }}
            />
            <MainStack.Screen
                name="FeatureThree"
                component={FeatureThreeScreen}
                options={{
                    title: 'Checklist',
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => {
                                // Handle notification press
                                console.log('Notification pressed');
                            }}
                        >
                            <Icon name="notifications-outline" size={24} color="#1a1a1a" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </MainStack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        padding: 8,
        marginLeft: 8,
    },
    headerButtonText: {
        fontSize: 24,
    },
});

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#fff',
                        width: 280,
                    },
                    drawerActiveBackgroundColor: '#1a73e8',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#1a1a1a',
                }}
            >
                <Drawer.Screen
                    name="MainStack"
                    component={MainStackNavigator}
                    options={{
                        title: 'Home',
                    }}
                />
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: true,
                        swipeEnabled: false,
                    }}
                />
                <Drawer.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        headerShown: true,
                        swipeEnabled: false,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator; 