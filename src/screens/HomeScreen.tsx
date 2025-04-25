import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    useWindowDimensions,
    FlatList,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { width } = useWindowDimensions();
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 48) / 2; // 16px padding on each side, 16px gap between cards

    const features = [
        {
            id: '1',
            title: 'Upload Video',
            description: 'Upload your best video',
            icon: 'star',
            screen: 'FeatureOne',
        },
        {
            id: '2',
            title: 'Weather',
            description: 'Check current weather conditions',
            icon: 'cloud',
            screen: 'FeatureTwo',
        },
        {
            id: '3',
            title: 'Checklist',
            description: 'Create and manage your tasks',
            icon: 'checkmark-circle',
            screen: 'FeatureThree',
        },
        {
            id: '4',
            title: 'Widgets',
            description: 'Create your widget',
            icon: 'settings',
            screen: '',
        },
    ];

    const renderItem = ({ item }: { item: typeof features[0] }) => (
        <TouchableOpacity
            style={[styles.card, { width: cardWidth }]}
            onPress={() => navigation.navigate(item.screen as keyof MainStackParamList)}
        >
            <View style={styles.iconContainer}>
                <Icon name={item.icon} size={24} color="#1a73e8" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to My App</Text>
                    <Text style={styles.subtitle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </View>

                <TouchableOpacity style={styles.getStartedButton}>
                    <Text style={styles.getStartedButtonText}>Get Started</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Features</Text>
                <FlatList
                    data={features}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.aboutSection}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    getStartedButton: {
        backgroundColor: '#1a73e8',
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    getStartedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginTop: 32,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    grid: {
        padding: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    aboutSection: {
        padding: 16,
        marginTop: 32,
    },
    aboutTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
});

export default HomeScreen; 