"use client";

import dynamic from "next/dynamic";

const SignalHero = dynamic(() => import("@/components/SignalHero"), {
  ssr: false,
});

export default function SignalHeroLoader() {
  return <SignalHero />;
}
