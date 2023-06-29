// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// export default class NotifyMessages {
//   onFetchError() {
//     return Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }

//   onNullSearchQuery() {
//     return Notify.info(
//       "We're sorry, but you should enter some name in the search box."
//     );
//   }

//   onTotalImages(total) {
//     return Notify.success(`Hooray! We found ${total} images.`);
//   }
// }

import { Notify } from 'notiflix/build/notiflix-notify-aio';


 export const onFetchError = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

export const onNullSearchQuery = () => {
  Notify.info(
    "We're sorry, but you should enter some name in the search box."
  );
};

export const onTotalImages = (total) => {
  Notify.success(`Hooray! We found ${total} images.`);
};


// export default NotifyMessages;
