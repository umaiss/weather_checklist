import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

const FeatureThreeScreen = () => {
    const navigation = useNavigation();
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState<ChecklistItem[]>([]);

    const addItem = () => {
        if (newItem.trim()) {
            setItems([
                ...items,
                {
                    id: Date.now().toString(),
                    text: newItem.trim(),
                    completed: false,
                },
            ]);
            setNewItem('');
            Keyboard.dismiss();
        }
    };

    const toggleItem = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const deleteItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const renderItem = ({ item }: { item: ChecklistItem }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleItem(item.id)}
            >
                <Icon
                    name={item.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.completed ? '#1a73e8' : '#666'}
                />
            </TouchableOpacity>
            <Text
                style={[
                    styles.itemText,
                    item.completed && styles.completedText,
                ]}
            >
                {item.text}
            </Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}
            >
                <Icon name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new item..."
                    value={newItem}
                    onChangeText={setNewItem}
                    onSubmitEditing={addItem}
                    returnKeyType="done"
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addItem}
                    disabled={!newItem.trim()}
                >
                    <Icon
                        name="add-circle"
                        size={32}
                        color={newItem.trim() ? '#1a73e8' : '#ccc'}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No items in the checklist. Add some!
                    </Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    checkbox: {
        marginRight: 12,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    deleteButton: {
        padding: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 32,
    },
});

export default FeatureThreeScreen; 