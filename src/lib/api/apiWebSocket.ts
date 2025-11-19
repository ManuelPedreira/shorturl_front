"use client";

import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { Dispatch, SetStateAction } from "react";

const serverHost = process.env.NEXT_PUBLIC_SERVER_HOST
  ? process.env.NEXT_PUBLIC_SERVER_HOST
  : window.location.origin;
const WS_URL = `${serverHost}/ws`;

export type UrlUpdateMessage = {
  shortCode: string;
  originalUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
};

type apiWebSocketProps = {
  shortCode: string;
  message: UrlUpdateMessage | null;
  setMessage: Dispatch<SetStateAction<UrlUpdateMessage | null>>;
};

const apiWebSocket = ({ shortCode, message, setMessage }: apiWebSocketProps) => {
  const socket = new SockJS(WS_URL);
  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 0,
    debug: (str) => console.log("[STOMP]", str),
  });

  stompClient.onConnect = async () => {
    console.log("WebSocket connected....");

    stompClient.subscribe(`/topic/url.${shortCode}`, (msg: IMessage) => {
      const data: UrlUpdateMessage = JSON.parse(msg.body);
      console.log("Message recibed:", data);

      if (data.status === "done") setMessage(data);

      if (data.status === "done" || data.status === "error") {
        console.log("Closing connection...");
        setTimeout(() => {
          stompClient.deactivate();
        }, 1000);
      }
    });
  };

  stompClient.onStompError = (frame) => {
    console.log("Error STOMP:", frame);
  };

  stompClient.activate();

  // close connection when component disarm
  return () => {
    stompClient.deactivate();
  };
};

export default apiWebSocket;
