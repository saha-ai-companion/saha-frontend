import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const FRAMEWORK_OPTIONS = [
  { id: 'aa', title: '12-step / AA approach', description: 'Steps, sponsor, meetings, higher power' },
  { id: 'smart', title: 'CBT / SMART Recovery', description: 'Tools, motivation, rational thinking' },
  { id: 'spiritual', title: 'Spiritual but not AA', description: 'A personal spiritual path' },
  { id: 'undecided', title: 'Not sure yet', description: 'Still figuring it out' },
];

export default function FrameworkScreen() {
  const { sobriety_status } = useLocalSearchParams<{ sobriety_status: string }>();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>

        <View style={styles.progress}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
          ))}
        </View>

        <Text style={styles.companionName}>Saha</Text>

        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>
            Different people find different things helpful in recovery.
          </Text>
          <Text style={styles.bubbleText}>
            Which of these feels closest to how you think about it?
          </Text>
        </View>

        <View style={styles.options}>
          {FRAMEWORK_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, selected === option.id && styles.optionCardSelected]}
              onPress={() => setSelected(option.id)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View style={[styles.radio, selected === option.id && styles.radioSelected]}>
                  {selected === option.id && <View style={styles.radioDot} />}
                </View>
              </View>
              <View style={styles.optionRight}>
                <Text style={[styles.optionTitle, selected === option.id && styles.optionTitleSelected]}>
                  {option.title}
                </Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={() =>
            selected &&
            router.push({
              pathname: '/trigger',
              params: {
                sobriety_status,
                framework: selected,
              },
            })
          }
          disabled={!selected}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, !selected && styles.buttonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>

      </ScrollView>
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
    marginBottom: 28,
    gap: 10,
  },
  bubbleText: { fontSize: 17, color: '#111827', lineHeight: 25 },
  options: { gap: 10, marginBottom: 28 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
  },
  optionCardSelected: { borderColor: '#1A4A7A', backgroundColor: '#EBF2FA' },
  optionLeft: { flexShrink: 0 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: '#1A4A7A' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1A4A7A' },
  optionRight: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 3 },
  optionTitleSelected: { color: '#1A4A7A' },
  optionDescription: { fontSize: 13, color: '#6B7280', lineHeight: 19 },
  button: { backgroundColor: '#1A4A7A', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#E5E7EB' },
  buttonText: { fontSize: 17, fontWeight: '500', color: '#FFFFFF' },
  buttonTextDisabled: { color: '#9CA3AF' },
});