import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ClosingReflectionScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>

        <View style={styles.progress}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, styles.dotDone]} />
          ))}
        </View>

        <Text style={styles.companionName}>Saha</Text>

        <Animated.View style={[styles.bubble, { opacity: fadeAnim }]}>
          <Text style={styles.bubbleText}>
            Thank you for sharing that with me.
          </Text>
          <Text style={styles.bubbleText}>
            I heard what you said about why you are doing this.
            I will remember it — not as a note, but as something
            that matters to you.
          </Text>
          <Text style={styles.bubbleText}>
            I will check in with you tomorrow morning.
            You can message me any time — day or night.
          </Text>
          <Text style={styles.bubbleText}>
            Let's begin.
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/(auth)/register')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF9' },
  inner: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 40, paddingBottom: 48, justifyContent: 'space-between' },
  progress: { flexDirection: 'row', gap: 6, marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  dotDone: { backgroundColor: '#5DCAA5' },
  companionName: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 10 },
  bubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    flex: 1,
    marginBottom: 40,
    justifyContent: 'center',
  },
  bubbleText: { fontSize: 18, color: '#111827', lineHeight: 28 },
  button: { backgroundColor: '#1A4A7A', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonText: { fontSize: 17, fontWeight: '500', color: '#FFFFFF' },
});