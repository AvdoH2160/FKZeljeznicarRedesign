import React from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const scrollPositions = {};

const ScrollManager = () => {
  const location = useLocation();
  const { pathname, key } = location;

  useEffect(() => {
    if (scrollPositions[key] !== undefined) {
      window.scrollTo({ top: scrollPositions[key], behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleScroll = () => {
      scrollPositions[key] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, key]);

  return null;
};

export default ScrollManager;