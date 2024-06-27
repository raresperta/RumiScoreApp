// components/Player.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, TextInput } from 'react-native-paper';

interface PlayerProps {
    name: string;
    score: number;
    onNameChange: (newName: string) => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        error: string;
    };
}

const Player: React.FC<PlayerProps> = ({ name, score, onNameChange, colors }) => {
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [currentName, setCurrentName] = useState<string>(name);

    const handleNameChange = () => {
        onNameChange(currentName);
        setIsEditingName(false);
    };

    return (
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content style={styles.content}>
                {isEditingName ? (
                    <View style={styles.nameEditContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCurrentName}
                            value={currentName}
                            onBlur={handleNameChange}
                            mode="outlined"
                            theme={{ colors: { text: colors.text, primary: colors.primary, background: colors.surface } }}
                        />
                    </View>
                ) : (
                    <View style={styles.nameContainer}>
                        <Text style={[styles.name, { color: colors.text }]}>{currentName}</Text>
                        <IconButton
                            icon={() => <Text style={{color: colors.primary}}>✏️</Text>}
                            size={20}
                            onPress={() => setIsEditingName(true)}
                        />
                    </View>
                )}
                <Text style={[styles.score, { color: colors.text }]}>Score: {score}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameEditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',  // Adjust the width to be more compact
    },
    name: {
        fontSize: 18,
    },
    input: {
        flex: 1,
        marginRight: 10,
        height: 40,
    },
    score: {
        fontSize: 18,
    },
});

export default Player;
