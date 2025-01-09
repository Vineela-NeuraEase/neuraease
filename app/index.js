import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

// Optional: If you want to call your backend, import your config or fetch methods
// import { submitUserLog, fetchUserLogs } from '../config'; // example

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [moodScore, setMoodScore] = useState('');
  const [notes, setNotes] = useState('');

  // Example submit function
  function handleSubmit() {
    console.log('Submitting Mood Score + Notes:', moodScore, notes);
    // If you want to call your backend, do it here:
    // submitUserLog({ userId: 'testUser', moodScore, notes });
    // Clear fields after
    setMoodScore('');
    setNotes('');
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autism Meltdown Tracker</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00C49A' }]}
        onPress={() => console.log('Fetch Latest Data tapped!')}
      >
        <Text style={styles.buttonText}>Fetch Latest Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF00FF' }]}
        onPress={() => console.log('View History tapped!')}
      >
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6C5CE7' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Log My Status</Text>
      </TouchableOpacity>

      {/* Modal for "Log My Status" */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Your Current Status</Text>

            <Text style={styles.label}>Mood Score (1-10):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={moodScore}
              onChangeText={setMoodScore}
            />

            <Text style={styles.label}>Notes:</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: '70%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

