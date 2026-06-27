import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TheirWhyScreen() {
  const [answer, setAnswer] = useState('');

  const canContinue = answer.trim().length > 4;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.progress}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.dot, i === 3 && styles.dotActive]} />
            ))}
          </View>

          <Text style={styles.companionName}>Saha</Text>

          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              Last thing — and this one matters most.
            </Text>
            <Text style={styles.bubbleText}>
              Why are you doing this?
            </Text>
            <Text style={styles.bubbleSubText}>
              Not what you think you should say.
              The real reason, in your own words.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Write as much or as little as you want..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <Text style={styles.hint}>No character limit. Take your time.</Text>

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={() => canContinue && router.push('/closing')}
            disabled={!canContinue}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
              Continue
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF9' },
  inner: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 40, paddingBottom: 48 },
  progress: { flexDirection: 'row', gap: 6, marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  dotActive: { backgroundColor: '#1A4A7A', width: 24 },
  companionName: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 10 },
  bubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 24,
    gap: 10,
  },
  bubbleText: { fontSize: 18, color: '#111827', lineHeight: 26, fontWeight: '500' },
  bubbleSubText: { fontSize: 15, color: '#6B7280', lineHeight: 22 },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    minHeight: 160,
  },
  input: { fontSize: 16, color: '#111827', lineHeight: 26, padding: 16, minHeight: 160 },
  hint: { fontSize: 13, color: '#9CA3AF', marginBottom: 28, textAlign: 'center' },
  button: { backgroundColor: '#1A4A7A', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#E5E7EB' },
  buttonText: { fontSize: 17, fontWeight: '500', color: '#FFFFFF' },
  buttonTextDisabled: { color: '#9CA3AF' },
});