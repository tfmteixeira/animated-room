import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import "./scroll-progress.styles.css";
import animation from "./lottie-animation.json";

const ScrollProgress: React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(scrolled);
  };

  const handleAnimationProgress = (progress: number) => {
    if (lottieRef.current) {
      const frame =
        // @ts-ignore
        (progress / 100) * lottieRef.current.animationItem?.totalFrames;
      lottieRef.current.goToAndStop(frame, true);
    }
  };

  useEffect(() => {
    handleAnimationProgress(scrollProgress);
  }, [scrollProgress]);

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress);
    window.addEventListener("resize", calculateScrollProgress);

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, []);

  return (
    <div className="progress-container">
      <div className="lottie-container">
        <Lottie
          loop={false}
          autoplay={false}
          animationData={animation}
          rendererSettings={{
            preserveAspectRatio: "xMidYMax meet",
          }}
          style={{
            width: "236px",
            height: "70vh",
          }}
          lottieRef={lottieRef}
        />
        <p>Scroll down to see the animation playing!</p>
        <p>scroll progress: {Math.round(scrollProgress)}%</p>
      </div>
    </div>
  );
};

export default ScrollProgress;
