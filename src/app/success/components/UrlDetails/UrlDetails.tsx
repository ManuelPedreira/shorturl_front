"use client";

import { useUrlUpdates } from "@/hooks/useUrlUpdates";

const UrlDetails = ({ urlCode }: { urlCode: string }) => {
  const { connected, message } = useUrlUpdates(urlCode);

  if (!message) return null;

  return (
    <div>
      <p>Title: {message?.title}</p>
      <p>Description:{message?.description}</p>

      {message?.imageUrl ? <img src={message.imageUrl} /> : null}
      <p>Status: {message?.status}</p>
    </div>
  );
};

export default UrlDetails;
