'use client'
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import CardCarousel from "./CardCarousel";

type ListOrderItem = "front" | "middle" | "back";

const Hero = () => {
  return (
    <section
      className="overflow-hidden bg-gradient-to-br from-teal-500 via-purple-500 to-indigo-500 px-8 pb-6 text-slate-50"
    >
      <div>
        <Image
          src="/images/GoBNoBG.png"
          alt="Local Image"
          width={960}
          height={720}
          layout="responsive"
        />  
      </div>
      <CardCarousel/>   
    </section>
  );
};

export default Hero;

