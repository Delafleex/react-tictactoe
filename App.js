import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
    if (!squares.includes(null)) setWinner('Draw');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity key={index} style={styles.square} onPress={() => handlePress(index)}>
            <Text style={styles.symbol}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {winner && (
        <Text style={styles.winner}>
          {winner === 'Draw' ? 'Game Draw!' : `Winner: ${winner}`}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.btnText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0d1b2a' },
  title: { fontSize:32, color:'#fff', marginBottom:20, fontWeight:'bold' },
  board: { width:300, flexDirection:'row', flexWrap:'wrap' },
  square: { width:100, height:100, borderWidth:1, borderColor:'#fff', justifyContent:'center', alignItems:'center' },
  symbol: { fontSize:36, color:'#f4a261' },
  winner: { fontSize:24, color:'#fff', marginTop:20 },
  button: { marginTop:20, backgroundColor:'#1b263b', padding:10, borderRadius:8 },
  btnText: { color:'#fff', fontWeight:'bold' },
});
