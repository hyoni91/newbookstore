import { useState, useEffect } from "react";

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default useWindowWidth;
