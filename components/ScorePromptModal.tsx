// components/ScorePromptModal.tsx

import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Alert, TextInput as RNTextInput } from 'react-native';
import { Button, TextInput, Portal, Dialog } from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import {Audio} from 'expo-av';

interface ScorePromptModalProps {
    visible: boolean;
    player: string;
    onClose: () => void;
    onSubmit: (score: number) => void;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        error: string;
    };
}

const ScorePromptModal: React.FC<ScorePromptModalProps> = ({ visible, player, onClose, onSubmit, colors }) => {
    const [score, setScore] = useState<string>('');
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const inputRef = useRef<RNTextInput>(null);

    useEffect(() => {
        setScore('');
        checkPermissions();
    }, [visible, player]);

    const handleSubmit = () => {
        const parsedScore = parseInt(score, 10) || 0;
        onSubmit(parsedScore);
        setScore('');
        // Refocus the input after a brief delay to keep the keyboard open
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };

    const checkPermissions = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Permission to access microphone is required to use voice recognition.');
        }
    };

    const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e:any) => {
    setStarted(true);
  };

  const onSpeechEnd = (e:any) => {
    setStarted(false);
  };

  const onSpeechResults = (e:any) => {
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

    return (
        <Portal>
            <Dialog 
                visible={visible} 
                onDismiss={onClose} 
                style={{ backgroundColor: colors.surface }}
            >
                <Dialog.Title style={{ color: colors.text }}>Enter Score</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        ref={inputRef}
                        label={`Score for ${player}`}
                        value={score}
                        onChangeText={setScore}
                        keyboardType="numeric"
                        style={styles.input}
                        mode="outlined"
                        onSubmitEditing={handleSubmit}
                        autoFocus
                        theme={{ colors: { text: colors.text, primary: colors.primary, background: colors.surface } }}
                    />
                    <Button onPress={startRecognizing} mode="contained" style={{ backgroundColor: colors.primary }}>
                        Speak Score
                    </Button>
                    <Button onPress={stopRecognizing} mode="contained" style={{ backgroundColor: colors.primary }}>
                        Speak Score
                    </Button>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose} theme={{ colors: { primary: colors.error } }}>Cancel</Button>
                    <Button onPress={handleSubmit} theme={{ colors: { primary: colors.primary } }}>Submit</Button>
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

export default ScorePromptModal;
