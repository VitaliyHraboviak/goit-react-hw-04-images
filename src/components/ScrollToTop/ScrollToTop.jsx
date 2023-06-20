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

import React, { useState, useEffect } from 'react';
import { ReactComponent as CircleIcon } from '../Icons/circleUp.svg';
import IconButton from '../Button/IconButton/IconButton';

const ScrollToTop = () => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollToTop = () => {
    const start = document.querySelector('#header');
    return window.scrollTo({ top: start, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    const GOLDEN_RATIO = 0.5;
    document.documentElement.scrollTop > GOLDEN_RATIO
      ? setIsScroll(true)
      : setIsScroll(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollToTop);
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  return (
    <IconButton
      type="button"
      variant="scroll-to-top"
      aria-label="Arrow up"
      onClick={scrollToTop}
      style={{ display: isScroll ? 'block' : 'none' }}
    >
      <CircleIcon width="30" height="30" />
    </IconButton>
  );
};

export default ScrollToTop;

