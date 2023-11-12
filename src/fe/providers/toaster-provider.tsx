'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';


const ToasterProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isMounted) return <Toaster />;
};

export default ToasterProvider;