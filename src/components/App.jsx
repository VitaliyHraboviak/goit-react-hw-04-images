// import React, { Component } from 'react';
// import fetchImages from '../components/Apiservice';
// import Searchbar from '../components/Searchbar/Searchbar';
// import Title from '../components/Title/Title';
// import ImageGallery from '../components/ImageGallery/ImageGallery';
// import TextButton from '../components/Button/Button';
// import Modal from '../components/Modal/Modal';
// import NotiflixLoading from '../components/NotiflixLoading/NotiflixLoading';
// import NotifyMessages from '../components/NotifyMessages/NotifyMessages';
// import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
// import css from './App.module.css';

// const notify = new NotifyMessages();
// const loader = new NotiflixLoading();

// const INITIAL_STATE = {
//   images: [],
//   searchQuery: '',
//   currentPage: 1,
//   pageSize: 12,
//   isLoading: false,
//   showModal: false,
//   showScroll: false,
//   error: null,
// };

// class App extends Component {
//   state = { ...INITIAL_STATE };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.getImages();
//     }
//   }

//   async getImages(e) {
    
//     this.setState({ isLoading: true });
//     const { currentPage, searchQuery, pageSize } = this.state;
//     const options = { searchQuery, currentPage, pageSize };

//     try {
//       const { data } = await fetchImages(options);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//         total: data.total,
//         totalHits: data.totalHits,
//         showScroll: true,
//         error: null,
//       }));
//       this.handleMessages(data);
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   handleFormSubmit = searchQuery => {
//     this.reset();
//     this.setState({ searchQuery });
//   };

//   handleLoadMore = () => {
//     this.incrementCurrentPage();
//   };

//   handleMessages = data => {
//     if (data.totalHits !== 0 && this.state.currentPage === 1) {
//       notify.onTotalImages(data.totalHits);
//     }
//     if (data.total === 0) {
//       return notify.onFetchError();
//     }
//   };

//   handleModal = (modalDescr, modalImg) => {
//     this.setState({ modalDescr, modalImg });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   incrementCurrentPage = () => {
//     this.setState(prevState => ({
//       currentPage: prevState.currentPage + 1,
      
//     }));

//   };

//   reset = () => {
//     this.setState({ ...INITIAL_STATE });
//   };

//   render() {
//     const {
//       images,
//       currentPage,
//       pageSize,
//       totalHits,
//       isLoading,
//       showModal,
//       showScroll,
//       modalImg,
//       modalDescr,
//       error,
//     } = this.state;

//     const totalPage = Math.ceil(totalHits / pageSize);
//     console.log(currentPage);
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {error && <Title text="Whoops, something went wrong" />}

//         {images.length === 0 && !error && (
//           <Title text="Let's find whatever you want!.." />
//         )}

//         {isLoading ? loader.onLoading() : loader.onLoaded()}

//         {images.length > 0 && !isLoading && (
//           <ImageGallery images={images} onImageClick={this.handleModal} />
//         )}

//         {currentPage < totalPage && !isLoading && (
//           <TextButton text="Load more" onClick={this.handleLoadMore} />
//         )}

//         {showModal && (
//           <Modal
//             onClick={this.toggleModal}
//             modalImg={modalImg}
//             modalDescr={modalDescr}
//           />
//         )}

//         {showScroll && images.length > 0 && !isLoading && <ScrollToTop />}
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from 'react';
import fetchImages from '../components/Apiservice';
import Searchbar from '../components/Searchbar/Searchbar';
import Title from '../components/Title/Title';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import TextButton from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import { onFetchError, onTotalImages } from './NotifyMessages/NotifyMessages';
import { onLoading, onLoaded } from './NotiflixLoading/NotiflixLoading';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import css from './App.module.css';

const INITIAL_STATE = {
  images: [],
  searchQuery: '',
  currentPage: 1,
  pageSize: 12,
  isLoading: false,
  showModal: false,
  showScroll: false,
  error: null,
};

const App = () => {
  const [images, setImages] = useState(INITIAL_STATE.images);
  const [searchQuery, setSearchQuery] = useState(INITIAL_STATE.searchQuery);
  const [currentPage, setCurrentPage] = useState(INITIAL_STATE.currentPage);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [showModal, setShowModal] = useState(INITIAL_STATE.showModal);
  const [showScroll, setShowScroll] = useState(INITIAL_STATE.showScroll);
  const [modalImg, setModalImg] = useState('');
  const [modalDescr, setModalDescr] = useState('');
  const [error, setError] = useState(INITIAL_STATE.error);
  const [totalHits, setTotalHits] = useState(0);
  const [pageSize, setPageSize] = useState(INITIAL_STATE.pageSize);

   const handleMessages = (data) => {
    if (data.totalHits !== 0 && currentPage === 1) {
      onTotalImages(data.totalHits);
    }
    if (data.total === 0) {
      return onFetchError();
    }
  };
  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      const options = {
        searchQuery,
        currentPage,
        pageSize: INITIAL_STATE.pageSize,
      };

      try {
        const { data } = await fetchImages(options);
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
        handleMessages(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim() !== '' || currentPage !== 1) {
      getImages();
    }
  }, [searchQuery, currentPage]);

  const handleFormSubmit = (query) => {
    reset();
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

 

  const handleModal = (descr, img) => {
    setModalDescr(descr);
    setModalImg(img);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const reset = () => {
    setImages(INITIAL_STATE.images);
    setSearchQuery(INITIAL_STATE.searchQuery);
    setCurrentPage(INITIAL_STATE.currentPage);
    setIsLoading(INITIAL_STATE.isLoading);
    setShowModal(INITIAL_STATE.showModal);
    setShowScroll(INITIAL_STATE.showScroll);
    setError(INITIAL_STATE.error);
  };

  const totalPage = Math.ceil(totalHits / pageSize);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <Title text="Whoops, something went wrong" />}

      {images.length === 0 && !error && (
        <Title text="Let's find whatever you want!.." />
      )}

      {isLoading ? onLoading() : onLoaded()}

      {images.length > 0 && !isLoading && (
        <ImageGallery images={images} onImageClick={handleModal} />
      )}

      {currentPage < totalPage && !isLoading && (
        <TextButton text="Load more" onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal onClick={toggleModal} modalImg={modalImg} modalDescr={modalDescr} />
      )}

      {showScroll && images.length > 0 && !isLoading && <ScrollToTop />}
    </div>
  );
};

export default App;
