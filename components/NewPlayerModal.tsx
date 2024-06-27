// components/NewPlayerModal.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Portal, Dialog } from 'react-native-paper';

interface NewPlayerModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        error: string;
    };
}

const NewPlayerModal: React.FC<NewPlayerModalProps> = ({ visible, onClose, onAdd, colors }) => {
    const [playerName, setPlayerName] = useState<string>('');

    useEffect(() => {
        setPlayerName('');
    }, [visible]);

    const handleAdd = () => {
        if (playerName.trim()) {
            onAdd(playerName.trim());
            setPlayerName('');
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={{ backgroundColor: colors.surface }}>
                    <Dialog.Title style={{ color: colors.text }}>Add New Player</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Player Name"
                            value={playerName}
                            onChangeText={setPlayerName}
                            style={styles.input}
                            mode="outlined"
                            autoFocus
                            onSubmitEditing={handleAdd}
                            theme={{ colors: { text: colors.text, primary: colors.primary, background: colors.surface } }}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button 
                            onPress={onClose} 
                            theme={{ colors: { primary: colors.error } }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onPress={handleAdd} 
                            theme={{ colors: { primary: colors.primary } }}
                        >
                            Add
                        </Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
    },
    dialogContent: {
        padding: 20, // Adjust padding to suit your design
        borderRadius: 10, // Adjust border radius for rounded corners
    },
});

export default NewPlayerModal;
