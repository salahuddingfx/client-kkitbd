"use client";

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-accent/[0.06] blur-[90px] animate-[pulse_7s_ease-in-out_infinite_1s]" />
    </div>
  );
}
