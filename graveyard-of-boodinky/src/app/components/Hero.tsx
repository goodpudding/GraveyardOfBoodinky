'use client'
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

type ListOrderItem = "front" | "middle" | "back";

const Hero = () => {
  const dragProgress = useMotionValue(0);
  const [order, setOrder] = useState<ListOrderItem[]>([
    "front",
    "middle",
    "back",
  ]);
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = () => {
    const x = dragProgress.get();
    if (x <= -50) {
      const orderCopy = [...order];
      orderCopy.unshift(orderCopy.pop() as ListOrderItem);
      setOrder(orderCopy);
    }
  };

  useEffect(() => {
    const FIVE_SECONDS = 5000;

    // Automatically shuffle the list ever 5 seconds, so long
    // as it isn't being dragged
    const intervalRef = setInterval(() => {
      const x = dragProgress.get();
      if (x === 0) {
        setOrder((pv) => {
          const orderCopy = [...pv];
          orderCopy.unshift(orderCopy.pop() as ListOrderItem);
          return orderCopy;
        });
      }
    }, FIVE_SECONDS);

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <section
      style={{ pointerEvents: dragging ? "none" : undefined }}
      className="overflow-hidden bg-slate-900 px-8 py-24 text-slate-50"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
        <div>
        <Image
        src="/images/Graveyardofboodinky.png" // Located at public/images/local-image.png
        alt="Local Image"
        width={640}
        height={480}
        layout="responsive"
      />
        </div>
        <motion.div
          whileTap={{ scale: 0.985 }}
          className="relative h-[450px] w-[350px]"
        >
          <Card
            imgUrl="/imgs/head-shots/7.jpg"
            testimonial="I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning."
            author="Jenn F. - Marketing Director @ Square"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[0]}
            dragging={dragging}
            setDragging={setDragging}
          />
          <Card
            imgUrl="/imgs/head-shots/8.jpg"
            testimonial="My boss thinks I know what I'm doing. Honestly, I just read this newsletter."
            author="Adrian Y. - Product Marketing @ Meta"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[1]}
            dragging={dragging}
            setDragging={setDragging}
          />
          <Card
            imgUrl="/imgs/head-shots/9.jpg"
            testimonial="Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X."
            author="Devin R. - Growth Marketing Lead @ OpenAI"
            handleDragEnd={handleDragEnd}
            dragProgress={dragProgress}
            position={order[2]}
            dragging={dragging}
            setDragging={setDragging}
          />
        </motion.div>
      </div>
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
