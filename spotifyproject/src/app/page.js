"use client";
import { useEffect, useRef } from "react";
import redirectToAuthPage from "./redirect-to-auth";

export default function Home() {
  const initialized = useRef(false);

  useEffect(() => {
    async function redirect() {
      if (!initialized.current) {
        initialized.current = true;
        await redirectToAuthPage();
      }
    }
    redirect();
  }, []);
  return <></>;
}
