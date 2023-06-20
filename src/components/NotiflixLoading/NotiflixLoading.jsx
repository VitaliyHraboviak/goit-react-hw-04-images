// import { Loading } from 'notiflix/build/notiflix-loading-aio';

// export default class NotiflixLoading {
//   onLoading() {
//     return Loading.circle('Loading...', {
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       svgSize: '160px',
//       svgColor: '#0f5271',
//       messageFontSize: '20px',
//     });
//   }

//   onLoaded() {
//     return Loading.remove();
//   }
// }

import { Loading } from 'notiflix/build/notiflix-loading-aio';


 export const onLoading = () => {
    return Loading.circle('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.5)',
      svgSize: '160px',
      svgColor: '#0f5271',
      messageFontSize: '20px',
    });
  };

 export const onLoaded = () => {
    return Loading.remove();
  };
