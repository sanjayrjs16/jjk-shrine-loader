import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shrine_audio from "/shrine_audio.mp3";
import "./ShrineFullScreenLoader.css";

const overlayVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 1 } }, // Fades to black at 0:07
};

const sukunaVariants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0, duration: 1.5 } }, // Moves Sukuna from the bottom to his position
  exit: { opacity: 0, transition: { delay: 0.5 } },
};

const shrineVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 4.8 } }, // Adjusted for 0:04
  exit: { opacity: 0, transition: { delay: 0.5 } },
};

function ShrineFullScreenLoader({ setLoading }) {
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const [showRipple, setShowRipple] = useState(false);

  const [showAnimation, setShowAnimation] = useState(true);
  useEffect(() => {
    if (audioLoaded) {
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 6000); // Ends at 0:04
    }
  }, [audioLoaded]);

  useEffect(() => {
    if (audioLoaded) {
      setTimeout(() => setDisplayText("Domain expansion"), 1000); // Changes text at 0:01
      setTimeout(() => setDisplayText("Malovalent shrine!"), 4000); // Changes text at 0:04
      setTimeout(() => setDisplayText(""), 6000);
      setTimeout(() => setShowAnimation(false), 8000); // Unmounts component after 8 seconds
      setTimeout(() => setLoading(false), 9000); // Unmounts component after 9 seconds
    }
  }, [audioLoaded]);

  useEffect(() => {
    if (audioRef.current) {
      if (audioLoaded) {
        setTimeout(() => audioRef.current.play(), 700);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [audioLoaded]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <>
          <motion.div
            className="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <audio
              ref={audioRef}
              src={shrine_audio}
              onLoadedData={() => setAudioLoaded(true)}
            />
            <motion.img
              src="/sukuna.png"
              className="sukuna"
              variants={sukunaVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.img
              src="/shrine.jpg"
              className="shrine"
              variants={shrineVariants}
            />
            <>
              {showRipple && (
                <>
                  {" "}
                  <div className="ripple ripple1"></div>
                  <div className="ripple ripple2"></div>
                  <div className="ripple ripple3"></div>
                  <div className="ripple ripple4"></div>
                </>
              )}
            </>
            <motion.div className="text" variants={overlayVariants}>
              {displayText}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ShrineFullScreenLoader;
