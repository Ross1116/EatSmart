import { FC, useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';

export interface LazyLoaderProps {
  delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ({
  delay = 250,
  ...props
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <DotLoader color="#adc030" /> : null;
};

export { LazyLoader as default };