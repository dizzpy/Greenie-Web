import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useFeedSocket = (onNewPost) => {
  useEffect(() => {
    console.log('🟢 Setting up WebSocket connection...');

    const socket = new SockJS('http://localhost:8080/ws-feed');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('[WebSocket]', str),
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        client.subscribe('/topic/feed', (message) => {
          try {
            const body = JSON.parse(message.body);
            if (body.type === 'post') {
              console.log('📨 New post received via WebSocket:', body.payload);
              onNewPost(body.payload);
            }
          } catch (e) {
            console.error('❌ Error parsing message', e);
          }
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error', frame);
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [onNewPost]);
};
