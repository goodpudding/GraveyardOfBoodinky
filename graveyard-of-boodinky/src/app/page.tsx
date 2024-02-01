import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <NavBar/>
      <Hero/>
    </main>
  );
}
