'use client'

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import Image from "next/image";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-slate-700 p-4 border-b-[1px] border-emerald-500 flex items-center justify-between relative">
      <NavLeft setIsOpen={setIsOpen} />
      {/* <NavRight /> */}
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <Image
    src="/images/GoBCircleNoBG.png" // Located at public/images/local-image.png
    alt="Local Image"
    width={120}
    height={80}
    layout="fixed"
  />  
  );
};

const NavLeft = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      <NavLink text="Media Gallery" />
      <NavLink text="Player Profiles" />
      <NavLink text="Merchandise" />
      <NavLink text="News/Blog" />
      <NavLink text="Contact" />
    </div>
  );
};

const NavLink = ({ text }: { text: string }) => {
  return (
    <a
      href="#"
      rel="nofollow"
      className="hidden lg:block"
    >
      <WetPaintButton text={text} />
    </a>
  );
};

const WetPaintButton: React.FC<WetPaintButtonProps> = ({ text }) => {
  // Generate 3 random drips for this button
  const drips = generateRandomDrips(3);

  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative inline-flex items-center justify-center rounded bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-500">
      {text}
      {/* Render the drips */}
      {drips.map((drip, index) => (
        <Drip key={index} {...drip} />
      ))}
    </motion.button>
  );
};

interface DripProps {
  left: string;
  height: number;
  delay: number;
}
// Helper function to generate random drip properties
const generateRandomDrips = (count: number): DripProps[] => {
  return Array.from({ length: count }, () => ({
    left: `${Math.floor(Math.random() * 80 + 10)}%`, // Random between 10% and 90%
    height: Math.floor(Math.random() * 15 + 10),     // Random between 10 and 25
    delay: Math.random() * 2,                        // Random between 0 and 2 seconds
  }));
};
const Drip: React.FC<DripProps> = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{
        left,
      }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-emerald-500 transition-colors group-hover:bg-fuchsia-600"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-emerald-500 transition-colors group-hover:fill-fuchsia-600"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-emerald-500 transition-colors group-hover:fill-fuchsia-600"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-emerald-500 transition-colors group-hover:fill-fuchsia-600"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-emerald-500 transition-colors group-hover:fill-fuchsia-600"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-emerald-500 transition-colors group-hover:bg-fuchsia-600"
      />
    </motion.div>
  );
};

interface WetPaintButtonProps {
  text: string;
}


// const NavRight = () => {
//   return (
//     <div className="flex items-center gap-4">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-fuchsia-500 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
//       >
//         Sign in
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-fuchsia-500 text-white font-medium rounded-md whitespace-nowrap"
//       >
//         Sign up
//       </motion.button>
//     </div>
//   );
// };

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="Media Gallery" />
      <MenuLink text="Player Profiles" />
      <MenuLink text="Merchandise" />
      <MenuLink text="News/Blog" />
      <MenuLink text="Contact" />
    </motion.div>
  );
};

const MenuLink = ({ text }: { text: string }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href="#"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default NavBar;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};