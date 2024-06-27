import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Provider as PaperProvider, Appbar, FAB, Portal } from 'react-native-paper';
import Player from './components/Player';
import ScorePromptModal from './components/ScorePromptModal';
import NewPlayerModal from './components/NewPlayerModal';
import TargetScoreModal from './components/TargetScoreModal';
import WinnerModal from './components/WinnerModal';


interface Player {
    name: string;
    score: number;
}

// Define the color palette
const colors = {
    primary: '#12372A',
    secondary: '#436850',
    background: '#ADBC9F',
    surface: '#FBFADA',
    text: '#000000',
    error: '#B00020',
};



const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([
        { name: 'Rares', score: 0 },
        { name: 'Nelu', score: 0 },
        { name: 'Luci', score: 0 },
    ]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
    const [targetScoreModalVisible, setTargetScoreModalVisible] = useState<boolean>(false);
    const [winnerModalVisible, setWinnerModalVisible] = useState<boolean>(false);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [targetScore, setTargetScore] = useState<number>(0);
    const [winner, setWinner] = useState<string>('');
    const [tie, setTie] = useState<boolean>(false);

    const handleScoreChange = (playerName: string, newScore: number) => {
        setPlayers(players.map(player =>
            player.name === playerName ? { ...player, score: newScore } : player
        ));
    };

    const handleNameChange = (oldName: string, newName: string) => {
        setPlayers(players.map(player =>
            player.name === oldName ? { ...player, name: newName } : player
        ));
    };

    const addPlayer = (name: string) => {
        setPlayers([...players, { name, score: 0 }]);
        setModalVisible(false);
    };

    const startScoreUpdate = () => {
        setCurrentPlayerIndex(0);
        setScoreModalVisible(true);
    };

    const handleScoreSubmit = (score: number) => {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex].score += score;
        setPlayers(updatedPlayers);

        const nextIndex = currentPlayerIndex + 1;
        if (nextIndex < players.length) {
            setCurrentPlayerIndex(nextIndex);
        } else {
            setScoreModalVisible(false);
            setTimeout(() => checkForWinner(updatedPlayers), 100);
        }
    };

    const checkForWinner = (updatedPlayers: Player[]) => {
        const playersReachedTarget = updatedPlayers.filter(player => player.score >= targetScore);
        if (playersReachedTarget.length > 0) {
            const maxScore = Math.max(...playersReachedTarget.map(player => player.score));
            const winners = playersReachedTarget.filter(player => player.score === maxScore);

            if (winners.length === 1) {
                setWinner(winners[0].name);
                setTie(false);
            } else {
                setWinner(winners.map(player => player.name).join(', '));
                setTie(true);
            }
            setWinnerModalVisible(true);
        }
    };

    const handleTargetScoreSubmit = (score: number) => {
        setTargetScore(score);
        setTargetScoreModalVisible(false);
    };

    return (
        <PaperProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <View style={[styles.container, { backgroundColor: colors.background}]}>
                    <Appbar.Header style={styles.appBar}>
                        <Appbar.Content 
                            title={`RUMI Game - Target Score: ${targetScore}`} 
                            titleStyle={styles.appBarContent} 
                        />
                    </Appbar.Header>
                    <ScrollView style={styles.scrollView}>
                        {players.map(player => (
                            <Player
                                key={player.name}
                                name={player.name}
                                score={player.score}
                                onNameChange={(newName) => handleNameChange(player.name, newName)}
                                colors={colors}
                            />
                        ))}
                    </ScrollView>
                    <FAB
                        style={[styles.fab, { backgroundColor: colors.primary }]}
                        icon="plus"
                        label="Add Player"
                        color={colors.surface}
                        onPress={() => setModalVisible(true)}
                    />
                    <FAB
                        style={[styles.fabUpdate, { backgroundColor: colors.primary }]}
                        icon="pencil"
                        label="Update Scores"
                        color={colors.surface}
                        onPress={startScoreUpdate}
                    />
                    <FAB
                        style={[styles.fabTarget, { backgroundColor: colors.primary }]}
                        icon="target"
                        label="Set Target Score"
                        color={colors.surface}
                        onPress={() => setTargetScoreModalVisible(true)}
                    />
                    <Portal>
                        <NewPlayerModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onAdd={addPlayer}
                            colors={colors}
                        />
                        {scoreModalVisible && (
                            <ScorePromptModal
                                visible={scoreModalVisible}
                                player={players[currentPlayerIndex].name}
                                onClose={() => setScoreModalVisible(false)}
                                onSubmit={handleScoreSubmit}
                                colors={colors}
                            />
                        )}
                        <TargetScoreModal
                            visible={targetScoreModalVisible}
                            onClose={() => setTargetScoreModalVisible(false)}
                            onSetTargetScore={handleTargetScoreSubmit}
                            colors={colors}
                        />
                        <WinnerModal
                            visible={winnerModalVisible}
                            winner={winner}
                            tie={tie}
                            onClose={() => setWinnerModalVisible(false)}
                            colors={colors}
                        />
                    </Portal>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        marginTop:20,
        marginBottom: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 140,
    },
    fabUpdate: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
    },
    fabTarget: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    winnerText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    appBar: {
        backgroundColor: '#12372A',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    appBarContent: {
        color: '#FBFADA',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default App;
