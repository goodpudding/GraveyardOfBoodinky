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
      className="overflow-hidden bg-slate-900 px-8 pb-6 text-slate-50"
      >
      <div>
      <Image
      src="/images/Graveyardofboodinky.png" // Located at public/images/local-image.png
      alt="Local Image"
      width={640}
      height={480}
      layout="responsive"
    />  
    </div>
     <CardCarousel/>   
    
    </section>
  );
};

interface CardProps {
  handleDragEnd: Function;
  dragProgress: MotionValue<number>;
  testimonial: string;
  position: ListOrderItem;
  imgUrl: string;
  author: string;
  setDragging: Dispatch<SetStateAction<boolean>>;
  dragging: boolean;
}

const Card = ({
  handleDragEnd,
  dragProgress,
  testimonial,
  position,
  imgUrl,
  author,
  setDragging,
  dragging,
}: CardProps) => {
  const dragX = useMotionValue(0);

  useMotionValueEvent(dragX, "change", (latest) => {
    // When component first mounts, dragX will be a percentage
    // due to us setting the initial X value in the animate prop.
    if (typeof latest === "number" && dragging) {
      dragProgress.set(latest);
    } else {
      // Default back to 0 so that setInterval can continue
      dragProgress.set(0);
    }
  });

  const onDragStart = () => setDragging(true);

  const onDragEnd = () => {
    setDragging(false);
    handleDragEnd();
  };

  const x = position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
  const rotateZ =
    position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
        x: dragX,
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
      />
      <span className="text-center text-lg italic text-slate-400">
        "{testimonial}"
      </span>
      <span className="text-center text-sm font-medium text-indigo-400">
        {author}
      </span>
    </motion.div>
  );
};

export default Hero;
