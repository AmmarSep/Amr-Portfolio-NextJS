// Page Components START----------

import {
  FadeContainer,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "@content/FramerMotionVariants";

import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { BlogPost } from "@lib/interface/sanity";
import BlogsSection from "@components/Home/BlogsSection";
import Contact from "@components/Contact";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";
// import InstagramSection from "@components/Instagram/InstagramSection";
import Link from "next/link";
import Metadata from "@components/MetaData";
import React from "react";
import SkillSection from "@components/Home/SkillSection";
import generateSitemap from "@lib/sitemap";
import { getAllPostsMeta } from "@lib/sanityContent";
import getRSS from "@lib/generateRSS";
import { homeProfileImage } from "@utils/utils";
import { motion } from "framer-motion";
import pageMeta from "@content/meta";

export default function Home({ blogs }: { blogs: BlogPost[] }) {
  return (
    <>
      <Metadata
        title="Ammar S S"
        description={"Full Stack Software Engineer specializing in Java, Spring Boot, Microservices, APIs, and modern web development."}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />
      <div className="relative max-w-4xl mx-auto dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              className="relative flex items-center justify-center p-3 rounded-full w-44 h-44 xs:w-52 xs:h-52 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
            >
              <Image
                src={homeProfileImage}
                className="rounded-full shadow filter saturate-0"
                width={933}
                height={933}
                alt="cover Profile Image"
                quality={75}
                priority
                // style={{
                //   maxWidth: "100%",
                //   height: "auto",
                // }}
              />
            </motion.div>

            <div className="flex flex-col w-full gap-3 p-5 text-center select-none ">
              <div className="flex flex-col gap-1">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl font-bold lg:text-6xl font-sarina"
                >
                  Ammar S S
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-lg text-[#383838] dark:text-gray-200"
                >
                  Full Stack Software Engineer at{" "}
                  <Link
                    href="https://www.capgemini.com/"
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    Capgemini
                  </Link>
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className=" text-[#474747] dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                Results-oriented IT professional specializing in Java development, APIs and microservices with Spring Boot, JSP, and JavaScript; also experienced in HTML, CSS and Bootstrap.
              </motion.p>
            </div>

            <Link
              href="/Ammar%20s%20s.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 transition-transform border border-gray-500 rounded-md outline-none select-none dark:border-gray-400 hover:bg-white dark:hover:bg-neutral-800 active:scale-95"
            >
              <FiDownload />
              <p>Resume</p>
            </Link>
          </div>
        </motion.section>

        <div>
          {/* About Me */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
            className="px-5 py-4"
          >
            <HomeHeading title="About Me" />
            <p className="mt-2 text-sm md:text-base text-[#474747] dark:text-gray-300">
              I am a results-oriented IT professional with extensive experience in Java development. I specialize in developing APIs, integrating microservices, and working with frameworks like Spring Boot, JSP, and JavaScript for efficient and scalable solutions. I also have expertise in HTML, CSS and Bootstrap.
            </p>
          </motion.section>

          {/* Professional Experience */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
            className="px-5 py-4"
          >
            <HomeHeading title="Professional Experience" />
            <ul className="mt-4 space-y-4 text-sm md:text-base">
              <li>
                <p className="font-semibold">Capgemini <span className="font-normal">— Feb 2022 – Present</span></p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Leveraged Liferay portal development for interactive, user‑friendly web applications.</li>
                  <li>Utilized JavaScript, AJAX, JSP and other frontend technologies to build dynamic UIs.</li>
                  <li>Proficient with IDEs like VS Code, IntelliJ IDEA, Eclipse, and STS to optimize development workflows.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold">Accenture <span className="font-normal">— Aug 2021 – Feb 2022</span></p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Developed Java‑based applications leveraging frameworks like Spring Boot for rapid, efficient delivery.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold">Asta Systech <span className="font-normal">— Dec 2019 – July 2021</span></p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Debugged Java projects across frontend and backend, using IDE debugging tools and techniques.</li>
                  <li>Managed project tasks and workflows with Jira, ensuring timely completion of deliverables.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold">Non‑IT (3 years) <span className="font-normal">— Nov 2015 – Dec 2019</span></p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Used AutoCAD and Revit for designing and drafting mechanical/electrical systems with industry standards.</li>
                  <li>Created drawings, layouts, and schematics for HVAC, plumbing, drainage, fire‑fighting equipment, and safety systems.</li>
                </ul>
              </li>
            </ul>
          </motion.section>

          {/* Education */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
            className="px-5 py-4"
          >
            <HomeHeading title="Education Background" />
            <ul className="mt-4 space-y-2 text-sm md:text-base">
              <li>
                <p className="font-semibold">National Engineering College — Bachelor of Engineering</p>
                <p className="text-xs md:text-sm opacity-80">Completed in 2015</p>
              </li>
              <li>
                <p className="font-semibold">Rosemary Matric Higher Secondary School — Higher Secondary</p>
                <p className="text-xs md:text-sm opacity-80">Completed in 2011</p>
              </li>
              <li>
                <p className="font-semibold">Don Bosco Matric Higher Secondary School — Primary Schooling</p>
                <p className="text-xs md:text-sm opacity-80">Completed in 2009</p>
              </li>
              <li>
                <p className="font-semibold">Pursuing MCA (Distance) — Tamilnadu Open University</p>
                <p className="text-xs md:text-sm opacity-80">Passed 1st year; scheduled to complete in 2025</p>
              </li>
            </ul>
          </motion.section>

          {/* Tech Stack */}
          <SkillSection />

          {/* Blogs */}
          <BlogsSection blogs={blogs} />
          {/* <InstagramSection /> */}

          {/* Contact Details */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
            className="px-5 py-4"
          >
            <HomeHeading title="Contact" />
            <ul className="mt-3 text-sm md:text-base space-y-1">
              <li>Email: <a className="underline" href="mailto:s.s.ammar@outlook.com">s.s.ammar@outlook.com</a></li>
              <li>Phone: <a className="underline" href="tel:+919751883398">+91 9751883398</a></li>
              <li>Location: Whitefield, Bangalore</li>
              <li>Portfolio: <Link className="underline" href="/" rel="noopener noreferrer">Visit Portfolio</Link></li>
            </ul>
          </motion.section>

          {/* Contact Form */}
          <Contact />
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-2 text-2xl sm:text-3xl font-bold text-left font-inter"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = await getAllPostsMeta(3);

  await getRSS();
  await generateSitemap();

  return {
    props: { blogs },
  };
}
