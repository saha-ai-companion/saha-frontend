import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import { saveTokens } from '../../lib/storage';
import { registerUser, saveOnboarding } from '../../services/api';

export default function RegisterScreen() {
  const { sobriety_status, framework, trigger_map, their_why } = useLocalSearchParams<{
    sobriety_status: string;
    framework: string;
    trigger_map: string;
    their_why: string;
  }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canRegister =
    email.trim().length > 3 &&
    password.trim().length >= 8 &&
    confirmPassword.trim().length >= 8;

  const handleRegister = async () => {
    if (!canRegister) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await registerUser(email.trim(), password);

      // Save tokens first — required before any authenticated API call
      await saveTokens(data.access_token, data.refresh_token);

      // Save onboarding answers now that we have a token
      try {
        await saveOnboarding({
          sobriety_status,
          framework_orientation: framework,
          trigger_map: trigger_map ? JSON.parse(trigger_map) : undefined,
          their_why,
        });
      } catch (onboardingErr) {
        console.log('Onboarding save failed:', onboardingErr);
      }

      router.replace('/chat');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <View style={styles.header}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Start your recovery journey with Saha
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                placeholder="Minimum 8 characters"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
              <Text style={styles.hint}>
                Must contain at least one letter and one number
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
                placeholder="Repeat your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, (!canRegister || loading) && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={!canRegister || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={[styles.buttonText, !canRegister && styles.buttonTextDisabled]}>
                  Create account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF9' },
  inner: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 60, paddingBottom: 48 },
  header: { marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '600', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', lineHeight: 24 },
  form: { gap: 20, marginBottom: 40 },
  fieldGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151' },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  hint: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  error: {
    fontSize: 14,
    color: '#A32D2D',
    backgroundColor: '#FCEBEB',
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#1A4A7A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: '#E5E7EB' },
  buttonText: { fontSize: 17, fontWeight: '500', color: '#FFFFFF' },
  buttonTextDisabled: { color: '#9CA3AF' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 15, color: '#6B7280' },
  footerLink: { fontSize: 15, color: '#1A4A7A', fontWeight: '500' },
});