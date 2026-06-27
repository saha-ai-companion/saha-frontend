import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface UserMessageProps {
  content: string;
  timestamp?: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ content, timestamp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.content}>{content}</Text>
      </View>
      {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginVertical: 6,
    marginHorizontal: 16,
  },
  bubble: {
    backgroundColor: '#1A4A7A',
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  content: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 4,
  },
});