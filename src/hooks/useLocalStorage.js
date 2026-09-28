import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [showData, setShowData] = useState(() => {
    const getItem = localStorage.getItem(key);
    return getItem ? JSON.parse(getItem) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(showData));
  }, [key, showData]);

  return [showData, setShowData];
}
