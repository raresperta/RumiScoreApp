import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Button, TextInput, Portal } from 'react-native-paper';

interface TargetScoreModalProps {
    visible: boolean;
    onClose: () => void;
    onSetTargetScore: (score: number) => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        error: string;
    };
}

const TargetScoreModal: React.FC<TargetScoreModalProps> = ({ visible, onClose, onSetTargetScore, colors }) => {
    const [score, setScore] = useState<number>(0);

    const handleSubmit = () => {
        onSetTargetScore(score);
        onClose();
    };

    return (
        <Portal>
            <Dialog 
                visible={visible}   
                onDismiss={onClose}
                style={{ backgroundColor: colors.surface }}
            >
                <Dialog.Title style={{ color: colors.text }}>Set Target Score</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Target Score"
                        keyboardType="numeric"
                        onChangeText={(text) => setScore(Number(text))}
                        style={styles.input}
                        mode="outlined"
                        onSubmitEditing={handleSubmit}
                        autoFocus
                        theme={{ colors: { text: colors.text, primary: colors.primary, background: colors.surface } }}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose} theme={{ colors: { primary: colors.error } }}>Cancel</Button>
                    <Button onPress={handleSubmit} theme={{ colors: { primary: colors.primary } }}>Set</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
    },
});

export default TargetScoreModal;
