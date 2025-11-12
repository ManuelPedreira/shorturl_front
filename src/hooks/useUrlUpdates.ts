"use client";

import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import consoleLog from "@/lib/actions/consoleLog";

const WS_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/ws` || "http://localhost:8080/ws";

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
      debug: (str) => consoleLog("[STOMP]", str),
    });

    stompClient.onConnect = async () => {
      consoleLog("WebSocket connected....");
      setConnected(true);

      stompClient.subscribe(`/topic/url.${shortCode}`, (msg: IMessage) => {
        const data: UrlUpdateMessage = JSON.parse(msg.body);
        consoleLog("Message recibed:", data);

        if (data.status === "done") setMessage(data);

        if (data.status === "done" || data.status === "error") {
          consoleLog("Closing connection...");
          setTimeout(() => {
            stompClient.deactivate();
            setConnected(false);
          }, 1000);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      consoleLog("Error STOMP:", frame);
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
