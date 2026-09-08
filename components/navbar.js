'use client'; // Important for Next.js App Router

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const Navbar = () => {
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.in",
      }
    );
  }, []);

  return (
    <nav className="h-[10vh] flex items-center justify-between px-4 mx-auto text-white font-semibold text-lg shadow-md shadow-purple-800/40 backdrop-blur-sm">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 drop-shadow-md">
        <Link href={'/'}>Dyslexi Ai</Link>
      </div>
      <div className="navigation flex md:gap-10 gap-4">
        {["/", "/about", "/community", "/doctors"].map((path, i) => (
          <Link
            key={i}
            href={path}
            className="hover:text-pink-400 hover:underline transition"
            ref={(el) => (linksRef.current[i] = el)}
          >
            {path === "/" ? "Home" :
             path === "/about" ? "About" :
             path === "/community" ? "Our Community" :
             "Get Help"}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
