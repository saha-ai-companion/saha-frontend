import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CompanionMessageProps {
  content: string;
  companionName?: string;
  timestamp?: string;
}

export const CompanionMessage: React.FC<CompanionMessageProps> = ({
  content,
  companionName = 'Saha',
  timestamp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{companionName}</Text>
      <View style={styles.bubble}>
        <Text style={styles.content}>{content}</Text>
      </View>
      {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginVertical: 6,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  bubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  content: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 5,
    marginLeft: 4,
  },
});