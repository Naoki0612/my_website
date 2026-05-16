"use client";

import { useEffect, useState } from "react";

const greetings = [
  { text: "你好！", lang: "zh" },
  { text: "Hello!", lang: "en" },
  { text: "こんにちは！", lang: "ja" },
  { text: "안녕하세요!", lang: "ko" },
  { text: "Bonjour !", lang: "fr" },
  { text: "¡Hola!", lang: "es" },
  { text: "Ciao!", lang: "it" },
  { text: "Hallo!", lang: "de" },
  { text: "Olá!", lang: "pt" },
  { text: "नमस्ते!", lang: "hi" }
];

export function RotatingHello() {
  const [index, setIndex] = useState(0);
  const greeting = greetings[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % greetings.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <h1
      className="cyber-title hello-title glitch-text max-w-4xl font-black leading-none text-white"
      data-text={greeting.text}
      lang={greeting.lang}
    >
      {greeting.text}
    </h1>
  );
}
