import React, { createContext, useRef } from 'react';

// Create a context for the topDivRef
const TopDivContext = createContext(null);

const TopDivProvider = ({ children }) => {
  const topDivRef = useRef(null);

  return (
    <TopDivContext.Provider value={topDivRef}>
      <div ref={topDivRef} style={{ overflowY: 'auto', height: '100vh' }}>
        {children}
      </div>
    </TopDivContext.Provider>
  );
};

export { TopDivContext, TopDivProvider };
