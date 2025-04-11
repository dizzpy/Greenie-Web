import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_CONFIG } from '../../../config/api.config';

export const useFeedSocket = (onNewPost) => {
  useEffect(() => {
    console.log('🟢 Setting up WebSocket connection...');

    const socket = new SockJS(API_CONFIG.SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('[WebSocket]', str),
      onConnect: () => {
        console.log('✅ WebSocket Connected');

        client.subscribe('/topic/feed', (message) => {
          console.log('📩 Raw message from WebSocket:', message.body);

          try {
            const body = JSON.parse(message.body);
            console.log('✅ Parsed WebSocket body:', body);

            if (body.type === 'post') {
              console.log('📨 New post via WebSocket:', body.payload);
              onNewPost(body.payload); // This updates the UI
            }
          } catch (e) {
            console.error('❌ Error parsing WebSocket message:', e);
          }
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [onNewPost]);
};
