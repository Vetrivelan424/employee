/**
  * handling the top scrooling value in method.
  * @name useTop
  * @param {any} value - The value to be string.
  * @returns {string} - The  value as a value.
  * @version 1.0.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ containerRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [pathname, containerRef]);

  return null;
};

export default ScrollToTop;

// ***** how can use This *****/
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