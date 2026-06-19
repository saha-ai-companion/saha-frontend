import React, { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ChatInput } from '../components/chat/ChatInput';
import { CompanionMessage } from '../components/chat/CompanionMessage';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { UserMessage } from '../components/chat/UserMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const HARDCODED_RESPONSES = [
  'Tell me more about that.',
  'That makes sense. What does that feel like for you right now?',
  'I hear you. What would help most in this moment?',
  'You mentioned something important there. Can you say more?',
  'I am here. Take your time.',
];

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: 'How are you doing today?',
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const responseIndex = useRef(0);

  const handleSend = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = HARDCODED_RESPONSES[responseIndex.current % HARDCODED_RESPONSES.length];
      responseIndex.current += 1;
      const companionMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, companionMessage]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.role === 'assistant') return <CompanionMessage content={item.content} />;
    return <UserMessage content={item.content} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saha</Text>
          <Text style={styles.headerSub}>Your companion</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        <ChatInput onSend={handleSend} disabled={isTyping} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF9' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '500', color: '#111827' },
  headerSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  messageList: { paddingTop: 16, paddingBottom: 12 },
});