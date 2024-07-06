const { useEffect, useState } = require("react");
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const useSocketStore = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    const connect = new HubConnectionBuilder()
      .withUrl(socketUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);

    return () => {
      connect.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on(
        "sendNotification",
        (notificationId, createdAt, seen, description) => {
          console.log(notificationId, createdAt, seen, description);
          console.log("notification message received");
        }
      );
    }

    return () => {
      if (connection) {
        connection.off("sendNotification");
      }
    };
  }, [connection]);

  const startConnection = async (id) => {
    console.log(connection, "Aadasdasdadasdas");
    if (connection) {
      try {
        await connection.start(id);
        console.log("connection started");
      } catch (error) {
        console.error("Connection couldn't be established", error.message);
      }
    }
  };

  const stopConnection = async () => {
    if (connection) {
      try {
        await connection.stop();
        console.log("SignalR Disconnected.");
      } catch (error) {
        console.error("SignalR disconnection Error", error.message);
      }
    }
  };

  return { connection, startConnection, stopConnection };
};
