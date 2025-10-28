"use client";

import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

// Ajusta la URL de tu backend Spring Boot
const WS_URL = "http://localhost:8080/ws";

type UrlUpdateMessage = {
  shortCode: string;
  originalUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
};

export const useUrlUpdates = (shortCode: string) => {
  const [message, setMessage] = useState<UrlUpdateMessage | null>(null);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(WS_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 0, //
      debug: (str) => console.log("[STOMP]", str),
    });

    stompClient.onConnect = () => {
      console.log("WebSocket connected....");
      setConnected(true);

      stompClient.subscribe(`/topic/url.${shortCode}`, (msg: IMessage) => {
        const data: UrlUpdateMessage = JSON.parse(msg.body);
        console.log("Message recibed:", data);
        setMessage(data);

        if (data.status === "done" || data.status === "error") {
          console.log("Closing connection...");
          setTimeout(() => {
            stompClient.deactivate();
            setConnected(false);
          }, 1000);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Error STOMP:", frame);
    };

    stompClient.activate();
    clientRef.current = stompClient;

    // Limpieza al desmontar
    return () => {
      stompClient.deactivate();
      setConnected(false);
    };
  }, [shortCode]);

  return { message, connected };
};
