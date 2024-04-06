import { motion } from 'framer-motion';

export default function Button({ isActive, toggleMenu }: { isActive: boolean, toggleMenu: () => void }) {
  return (
    <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-3xl overflow-hidden">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="w-full h-full bg-primary-500 flex justify-center items-center hover:transform hover:rotate-x-90 hover:duration-[750ms] hover:ease-[cubic-bezier(0.76,0,0.24,1)]"
          onClick={() => toggleMenu()}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="w-full h-full bg-background-50 flex justify-center items-center"
          onClick={() => toggleMenu()}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: any }) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full transition-transform  hover:-translate-y-7">
        <p
          className="m-0 mt-7 transition-transform hover:opacity-0"
        >
          {label}
        </p>
        <p
          className="m-0 mt-1 transition-transform origin-center opacity-0 hover:opacity-100"
        >
          {label}
        </p>
      </div>
    );
  }