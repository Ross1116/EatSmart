import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export default function Paragraph({paragraph}: {paragraph: string}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.5"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className="mt-60 text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-justify w-1/2"
    >
    {
      words.map( (word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
    </p>
  )
}

const Word = ({children, progress, range}: {children: React.ReactNode, progress: any, range: number[]}) => {
    const opacity = useTransform(progress, range, [0, 1])
    return <span className="relative mr-5 mt-3">
        <span className="absolute opacity-20">{children}</span>
        <motion.span style={{opacity: opacity}}>{children}</motion.span>
    </span>
}
