'use client';

import { Navigation } from '@/components/navigation';
import { ChatInterface } from '@/components/chat-interface';
import { useApp } from '@/lib/context';
import { mockChatMessages } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@/lib/types';

export default function ChatbotPage() {
  const { currentUser } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Filter messages for current user
      const userMessages = mockChatMessages.filter((m) => m.user_id === currentUser.id);
      setMessages(userMessages);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ChatInterface userId={currentUser.id} initialMessages={messages} />
        </div>
      </main>
    </>
  );
}
