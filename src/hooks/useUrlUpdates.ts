import apiWebSocket, { UrlUpdateMessage } from "@/lib/api/apiWebSocket";
import { useEffect, useState } from "react";

export const useUrlUpdates = (shortCode: string) => {
  const [message, setMessage] = useState<UrlUpdateMessage | null>(null);

  useEffect(() => {
    apiWebSocket({ shortCode, onMessageReceived: (message) => setMessage(message) });
  }, [shortCode]);

  return { message };
};
