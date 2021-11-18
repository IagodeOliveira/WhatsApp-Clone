import React, { useState } from "react";
import { Container } from  './styles';
import whatsAppImage from './whatsappImage.jpg';

export const ChatDefault: React.FC = () => {
  return (
    <Container>
      <img src={whatsAppImage} alt="Connection Required" />
      <h1>Keep your phone connected</h1>
      <h2>WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</h2>
    </Container>
  );
}