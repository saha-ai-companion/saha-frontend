import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
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

const TRIGGER_QUESTIONS = [
  'What times of day or week are hardest for you?',
  'What emotions tend to come up before you want to drink?',
  'Are there people or places that make it harder?',
  'What usually happens just before a craving hits?',
];

export default function TriggerMappingScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentAnswer = answers[currentQuestion];
  const canContinue = currentAnswer.trim().length > 1;
  const isLastQuestion = currentQuestion === TRIGGER_QUESTIONS.length - 1;

  const handleNext = () => {
    if (!canContinue) return;
    if (isLastQuestion) {
      router.push('/why');
      return;
    }
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setCurrentQuestion((prev) => prev + 1);
  };

  const updateAnswer = (text: string) => {
    const updated = [...answers];
    updated[currentQuestion] = text;
    setAnswers(updated);
  };

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
              <View key={i} style={[styles.dot, i === 2 && styles.dotActive]} />
            ))}
          </View>

          <Text style={styles.counter}>
            Question {currentQuestion + 1} of {TRIGGER_QUESTIONS.length}
          </Text>

          <Text style={styles.companionName}>Saha</Text>

          <Animated.View style={[styles.bubble, { opacity: fadeAnim }]}>
            <Text style={styles.bubbleText}>
              {TRIGGER_QUESTIONS[currentQuestion]}
            </Text>
          </Animated.View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentAnswer}
              onChangeText={updateAnswer}
              placeholder="Type here..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={300}
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <View style={styles.subProgress}>
            {TRIGGER_QUESTIONS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.subDot,
                  i === currentQuestion && styles.subDotActive,
                  i < currentQuestion && styles.subDotDone,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={handleNext}
            disabled={!canContinue}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
              {isLastQuestion ? 'Continue' : 'Next question'}
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
  progress: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  dotActive: { backgroundColor: '#1A4A7A', width: 24 },
  counter: { fontSize: 13, color: '#9CA3AF', marginBottom: 28, letterSpacing: 0.2 },
  companionName: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 10 },
  bubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 20,
  },
  bubbleText: { fontSize: 18, color: '#111827', lineHeight: 26, fontWeight: '500' },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    minHeight: 100,
  },
  input: { fontSize: 16, color: '#111827', lineHeight: 24, padding: 16, minHeight: 100 },
  subProgress: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 28 },
  subDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  subDotActive: { backgroundColor: '#1A4A7A' },
  subDotDone: { backgroundColor: '#5DCAA5' },
  button: { backgroundColor: '#1A4A7A', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#E5E7EB' },
  buttonText: { fontSize: 17, fontWeight: '500', color: '#FFFFFF' },
  buttonTextDisabled: { color: '#9CA3AF' },
});