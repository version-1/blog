import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [smartphone, setSmartPhone] = useState(false);
  useEffect(() => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      setSmartPhone(true)
    }
  }, []);

  return {
    smartphone
  }
};

