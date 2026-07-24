import { motion, useAnimationFrame } from "framer-motion";
import { FiRss } from "react-icons/fi";
import { useRef } from "react";

export default function FloatingRSS() {
  const ref = useRef(null);

  let x = 0;
  let y = 0;
  let dx = 1.5;
  let dy = 1.5;

  useAnimationFrame(() => {
    if (!ref.current) return;

    const parent = ref.current.parentElement;
    if (!parent) return;

    const maxX = parent.clientWidth - 48;
    const maxY = parent.clientHeight - 48;

    x += dx;
    y += dy;

    if (x <= 0 || x >= maxX) dx *= -1;
    if (y <= 0 || y >= maxY) dy *= -1;

    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
  });

  return (
    <motion.div ref={ref} className="absolute top-0 left-0">
      <FiRss className="h-12 w-12 text-blue-300 opacity-30" />
    </motion.div>
  );
}
