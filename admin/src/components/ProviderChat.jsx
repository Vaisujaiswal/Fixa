import React, { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../context/ProviderContext";
import { socket } from "../socket";

const ProviderChat = () => {
  const { profileData } = useContext(ProviderContext);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!profileData) return;

    const providerId = profileData._id;

    socket.connect(); // connect once
    socket.emit("add-user", { id: providerId, type: "Provider" });

    socket.on("msg-receive", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("msg-receive");
      // do not disconnect here
    };
  }, [profileData]);

  const sendMessage = (userId) => {
    if (!msg) return;

    const msgData = {
      senderId: profileData._id,
      receiverId: userId, 
      senderType: "Provider",
      receiverType: "User",
      message: msg,
    };

    socket.emit("send-msg", msgData);
    setMessages((prev) => [...prev, { ...msgData, timestamp: new Date() }]);
    setMsg("");
  };

  return (
    <div>
      <h2>Provider Chat</h2>
      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.senderType === "Provider" ? "You" : "User"}</b>: {m.message}
        </div>
      ))}
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={() => sendMessage("PUT_USER_ID_HERE")}>Send</button>
    </div>
  );
};

export default ProviderChat;
