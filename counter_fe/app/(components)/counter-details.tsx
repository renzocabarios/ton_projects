"use client";
import { useCounterContract } from "@/hooks/useCounterContract";
import React from "react";

export default function CounterDetails() {
  const { value, address } = useCounterContract();

  return (
    <>
      <div className="Card">
        <b>Counter Address</b>
        <div className="Hint">{address?.slice(0, 30) + "..."}</div>
      </div>
      <div className="Card">
        <b>Counter Value</b>
        <div>{value ?? "Loading..."}</div>
      </div>
    </>
  );
}
