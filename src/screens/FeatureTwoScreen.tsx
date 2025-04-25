import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface WeatherData {
    location: {
        name: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        temp_f: number;
        condition: {
            text: string;
            icon: string;
        };
        wind_kph: number;
        humidity: number;
        feelslike_c: number;
    };
}

const FeatureTwoScreen = () => {
    const navigation = useNavigation();
    const [weatherData, setWeatherData] = useState<{
        london: WeatherData | null;
        newyork: WeatherData | null;
    }>({ london: null, newyork: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const [londonResponse, newyorkResponse] = await Promise.all([
                    fetch(
                        'https://api.weatherapi.com/v1/current.json?key=a478aafe7898400d9ac175542252304&q=London&aqi=no'
                    ),
                    fetch(
                        'https://api.weatherapi.com/v1/current.json?key=a478aafe7898400d9ac175542252304&q=New York&aqi=no'
                    ),
                ]);

                const londonData = await londonResponse.json();
                const newyorkData = await newyorkResponse.json();

                setWeatherData({
                    london: londonData,
                    newyork: newyorkData,
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    const WeatherCard = ({ data, city }: { data: WeatherData | null; city: string }) => {
        if (!data) return null;

        return (
            <View style={styles.weatherCard}>
                <View style={styles.weatherHeader}>
                    <View>
                        <Text style={styles.cityName}>{data.location.name}</Text>
                        <Text style={styles.countryName}>{data.location.country}</Text>
                        <Text style={styles.time}>{data.location.localtime}</Text>
                    </View>
                    <Image
                        source={{ uri: `https:${data.current.condition.icon}` }}
                        style={styles.weatherIcon}
                    />
                </View>

                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>{data.current.temp_c}°C</Text>
                    <Text style={styles.condition}>{data.current.condition.text}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Feels Like</Text>
                        <Text style={styles.detailValue}>{data.current.feelslike_c}°C</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Wind</Text>
                        <Text style={styles.detailValue}>{data.current.wind_kph} km/h</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Humidity</Text>
                        <Text style={styles.detailValue}>{data.current.humidity}%</Text>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1a73e8" />
                    <Text style={styles.loadingText}>Loading weather data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[weatherData.london, weatherData.newyork]}
                renderItem={({ item }) => (
                    <WeatherCard data={item} city={item?.location.name || ''} />
                )}
                keyExtractor={(item) => item?.location.name || ''}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        marginRight: 16,
    },
    headerContent: {
        flex: 1,
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
    weatherContainer: {
        padding: 16,
        gap: 16,
    },
    weatherCard: {
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
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cityName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    countryName: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    time: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    weatherIcon: {
        width: 64,
        height: 64,
    },
    temperatureContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    condition: {
        fontSize: 18,
        color: '#666',
        marginTop: 8,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginTop: 4,
    },
    grid: {
        padding: 16,
        gap: 16,
    },
});

export default FeatureTwoScreen; 