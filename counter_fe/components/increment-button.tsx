"use client";

import { useCounterContract } from "@/hooks/useCounterContract";
import useMounted from "@/hooks/useMounted";
import { useTonConnect } from "@/hooks/useTonConnect";
import React from "react";

export default function IncrementButton() {
  const { connected } = useTonConnect();
  const { sendIncrement } = useCounterContract();

  const mounted = useMounted();

  if (!mounted) {
    return <></>;
  }
  return (
    <a
      className={`Button ${connected ? "Active" : "Disabled"}`}
      onClick={() => {
        sendIncrement();
      }}
    >
      Increment
    </a>
  );
}
