import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import { headingFromLeft } from "@content/FramerMotionVariants";
import { InstagramData } from "@lib/interface";
import InstagramPost from "./InstagramPost";
import InstagramPostLoading from "./InstagramPostLoading";
import Link from "next/link";
import React from "react";
import fetcher from "@lib/fetcher";
import socialMedia from "@content/socialMedia";
import useSWR from "swr";

export default function InstagramSection() {
  const { data: instaData } = useSWR<InstagramData>(
    "/api/posts/insta",
    fetcher
  );
  return (
    <section className="mx-5 mb-5">
      <AnimatedHeading
        className="w-full my-2 text-2xl sm:text-3xl font-bold text-left font-inter"
        variants={headingFromLeft}
      >
        Recent Instagram Posts
      </AnimatedHeading>

      <div className="grid grid-cols-1 gap-4 mx-auto mt-5">
        <div className="grid grid-cols-3 gap-0.5">
          {instaData === undefined ? (
            <InstagramPostLoading count={9} />
          ) : (
            instaData?.data.slice(0, 9).map((post) => {
              return <InstagramPost key={post.id} post={post} />;
            })
          )}
        </div>

        <Link
          href={socialMedia.find((item) => item.title === "Instagram")?.url!}
          className="flex items-center justify-center gap-1 font-medium transition border-transparent font-inter active:scale-95 active:border-black w-fit group"
        >
          <span className="group-hover:underline">View More on Instagram</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 ml-1 transition group-hover:translate-x-2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}
