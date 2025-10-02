import { FadeContainer, popUp } from "../../content/FramerMotionVariants";
import { motion } from "framer-motion";
import { useDarkMode } from "@context/darkModeContext";
import * as WindowsAnimation from "@lib/windowsAnimation";
import skills from "@content/skillsData";
import React from "react";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { headingFromLeft } from "@content/FramerMotionVariants";

export default function SkillSection() {
  const { isDarkMode } = useDarkMode();

  return (
    <section className="mx-5">
      <AnimatedHeading
        className="w-full my-2 text-2xl sm:text-3xl font-bold text-left font-inter"
        variants={headingFromLeft}
      >
        My Top Skills
      </AnimatedHeading>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4 my-10"
      >
        {skills.map((skill, index) => {
          const Icon = skill.Icon;
          return (
            <motion.div
              variants={popUp}
              key={index}
              title={skill.name}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
                WindowsAnimation.showHoverAnimation(e, isDarkMode)
              }
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                WindowsAnimation.removeHoverAnimation(e)
              }
              className="flex items-center justify-center gap-4 p-4 origin-center transform border border-gray-300 rounded-sm sm:justify-start bg-gray-50 hover:bg-white dark:bg-darkPrimary hover:dark:bg-darkSecondary dark:border-neutral-700 md:origin-top group"
            >
              <div className="relative transition pointer-events-none select-none group-hover:scale-110 sm:group-hover:scale-100">
                {/* @ts-ignore */}
                {Icon ? <Icon className="w-8 h-8" /> : <span className="w-8 h-8" />}
              </div>
              <p className="hidden text-sm font-semibold pointer-events-none select-none sm:inline-flex md:text-base">
                {skill.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
