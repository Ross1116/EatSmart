import Link from "next/link";
import { links } from "../../_utils/navLinks";
import { motion } from "framer-motion";

const perspective = {
    initial: {
        opacity: 0,
        rotateX: 90,
        translateY: 80,
        translateX: -20,
    },
    enter: (i: any) => ({
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: 0,
        transition: {
            duration: 0.65, 
            delay: 0.3 + (i * 0.1), 
            ease: [.215,.61,.355,1],
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1]}
    }
}

export default function SideMenuNav () {
    return (
        <div className="flex flex-col justify-between pt-32 px-10 pb-12 h-full box-border">
           <div className="flex gap-12 flex-col">   
            {
    
                links.map( (link, i) => {
                    const { title, href } = link;    
                    return (
                            <div key={`b_${i}`} className="perspective-[120px] perspective-origin-bottom">    
                                <motion.div    
                                    custom={i}    
                                    variants={perspective}    
                                    initial="initial"    
                                    animate="enter"    
                                    exit="exit"    
                                >    
                                    <Link href={`/iteration1${href}`} className="hover:text-text-950 text-5xl text-text-50 font-medium">    
                                        {title}    
                                    </Link>    
                                </motion.div>    
                            </div>    
                    )    
                })
            }
           </div>
        </div>    
      );    
    }