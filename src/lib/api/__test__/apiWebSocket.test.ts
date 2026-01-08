import apiWebSocket, { UrlUpdateMessage } from "../apiWebSocket";

let subscribedTopic: string;
let subscribeCallback: (msg: any) => void;
const mockDeactivate = jest.fn();

jest.mock("@stomp/stompjs", () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      const client: any = {
        subscribe: jest.fn((topic, callback) => {
          subscribedTopic = topic;
          subscribeCallback = callback;
          client.deactivate();
        }),
        activate: jest.fn(() => {
          client.onConnect?.();
        }),
        deactivate: mockDeactivate,
      };
      return client;
    }),
  };
});

describe("apiWebSocket", () => {
  const shortCode = "abc123";

  const wsMessage: UrlUpdateMessage = {
    shortCode,
    originalUrl: "https://example.com",
    title: "Title",
    description: "Description",
    imageUrl: "image.png",
    status: "done",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("subscribes and sets message when status is done and closes the transmission", () => {
    const onMessageReceived = jest.fn();

    apiWebSocket({
      shortCode,
      onMessageReceived,
    });

    subscribeCallback({
      body: JSON.stringify(wsMessage),
    });

    expect(onMessageReceived).toHaveBeenCalledWith(wsMessage);
    expect(subscribedTopic).toBe(`/topic/url.${shortCode}`);
    expect(mockDeactivate).toHaveBeenCalled();
  });
});
