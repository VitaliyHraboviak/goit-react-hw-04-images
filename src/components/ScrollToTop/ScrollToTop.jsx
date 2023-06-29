// import React, { Component } from 'react';
// import { ReactComponent as CircleIcon } from '../Icons/circleUp.svg';
// import IconButton from '../Button/IconButton/IconButton';

// export default class ScrollToTop extends Component {
//   state = {
//     isScroll: false,
//   };

//   scrollToTop() {
//     const start = document.querySelector('#header');
//     return window.scrollTo({ top: start, behavior: 'smooth' });
//   }

//   handleScrollToTop() {
//     const GOLDEN_RATIO = 0.5;
//     document.documentElement.scrollTop > GOLDEN_RATIO
//       ? this.setState({ isScroll: true })
//       : this.setState({ isScroll: false });
//   }

//   render() {
//     return (
//       <IconButton
//         type="button"
//         variant="scroll-to-top"
//         aria-label="Arrow up"
//         onClick={this.scrollToTop}
//       >
//         <CircleIcon width="30" heighth="30" />
//       </IconButton>
//     );
//   }
// }

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ReactComponent as CircleIcon } from '../Icons/circleUp.svg';
import IconButton from '../Button/IconButton/IconButton';

const ScrollToTop = () => {
  // const [setIsScroll] = useState(false);
  const startRef = useRef(null);
  // const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current = startRef.current.offsetTop;
  }, []);

  const scrollToTop = () => {
    const start = scrollToRef.current;
    window.scrollTo({ top: start, behavior: 'smooth' });
  };

  const handleScrollToTop = useCallback(() => {
    const GOLDEN_RATIO = 0.5;
    document.documentElement.scrollTop > GOLDEN_RATIO
      ? setIsScroll(true)
      : setIsScroll(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollToTop);
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  return (
    <div ref={startRef} id="header">
      <IconButton
        type="button"
        variant="scroll-to-top"
        aria-label="Arrow up"
        onClick={scrollToTop}
      >
        <CircleIcon width="30" height="30" />
      </IconButton>
    </div>
  );
};

export default ScrollToTop;
