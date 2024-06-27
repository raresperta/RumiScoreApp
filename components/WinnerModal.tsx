import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dialog, Button, Portal } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';

interface WinnerModalProps {
    visible: boolean;
    winner: string;
    tie: boolean;
    onClose: () => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        error: string;
    };
}

const WinnerModal: React.FC<WinnerModalProps> = ({ visible, winner, tie, onClose, colors }) => {
    return (
        <Portal>
            <Dialog 
                visible={visible} 
                onDismiss={onClose}
                style={{ backgroundColor: colors.surface }}
            >
                <Dialog.Title style={{ color: colors.text }}>
                    {tie ? 'Tie' : 'Winner'}
                </Dialog.Title>
                <Dialog.Content>
                    <Text style={[styles.winnerText, { color: colors.text }]}>
                        {winner}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose} theme={{ colors: { primary: colors.primary } }}>Close</Button>
                </Dialog.Actions>
            </Dialog>
            {visible && <ConfettiCannon autoStartDelay={0} count={150} origin={{ x: -10, y: 0 }} />}
        </Portal>
    );
};

const styles = StyleSheet.create({
    winnerText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default WinnerModal;
