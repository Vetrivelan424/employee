/**
  * Custom Bottom for navigate to bottom component.
  * @name useBottom
  * @param {any} value - The value to be string.
  * @returns {Function} - The  value as a componet.
  * @version 1.0.0
 */


import { useState, useEffect } from 'react';

export default function useBottom(ref) {
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const handleScroll = () => {
        const rect = element.getBoundingClientRect();
        setBottom(window.innerHeight - (rect.top + rect.height) + window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call initially to set bottom position

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [ref]);

  return bottom;
}


// ******* How can use this ***** //
// import useTop from './useTop';
// import useBottom from './useBottom';

// function MyComponent() {
//   const elementRef = useRef(null);
//   const top = useTop(elementRef);
//   const bottom = useBottom(elementRef);

//   return (
//     <div ref={elementRef}>
//       <p>This element is at the top: {top}px</p>
//       <p>This element is {bottom}px from the bottom of the viewport.</p>
//     </div>
//   );
