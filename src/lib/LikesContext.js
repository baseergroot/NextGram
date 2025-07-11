// context/LikeContext.js
import { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export function LikeProvider({ children, initialLikes = 0  }) {
  const [likes, setLikes] = useState(initialLikes); // or any shared state

  return (
    <LikeContext.Provider value={{ likes, setLikes }}>
      {children}
    </LikeContext.Provider>
  );
}

export const useLike = () => useContext(LikeContext);
