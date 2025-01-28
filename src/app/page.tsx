"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SpotlightHero from "./components/hero2";
import NavBar from "./components/navbar";
import  ServicesGrid  from "./components/serviceGrid";
import SolutionsGrid from "./components/solutionGrid";
import  AdditionalComponents  from "./additionalComponents";

export default function Home() {
  return (
    <>
      <SpotlightHero />
      <ServicesGrid />
      <SolutionsGrid />
      <AdditionalComponents />
    </>
  );
}
