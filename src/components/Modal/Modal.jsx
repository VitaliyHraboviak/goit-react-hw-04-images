// import React, { Component } from 'react';
// import css from './Modal.module.css';

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClick();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClick();

//     }
//   };

//   render() {
//     const { modalImg, modalDescry } = this.props;
//     return (
//       <div className={css.backdrop} onClick={this.handleBackdropClick}>
//         <div className={css.modal}>
//           <img
//             className={css.modal_image}
//             src={modalImg}
//             alt={modalDescry}
//             width="1280"
//             height="960"
//           />
//         </div>
//       </div>
//     );
//   }
// }

import React, { useEffect, useCallback } from 'react';
import css from './Modal.module.css';

const Modal = ({ modalImg, modalDescry, onClick }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Escape') {
      onClick();
    }
  }, [onClick]);

  const handleBackdropClick = useCallback((e) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  }, [onClick]);

  useEffect(() => {
    const onKeyDown = (e) => handleKeyDown(e);
    const onBackdropClick = (e) => handleBackdropClick(e);

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleKeyDown, handleBackdropClick]);

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img
          className={css.modal_image}
          src={modalImg}
          alt={modalDescry}
          width="1280"
          height="960"
        />
      </div>
    </div>
  );
};

export default Modal;
