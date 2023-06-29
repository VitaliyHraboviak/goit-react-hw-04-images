import React, { Component } from 'react';
import fetchImages from '../components/Apiservice';
import Searchbar from '../components/Searchbar/Searchbar';
import Title from '../components/Title/Title';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import TextButton from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import NotiflixLoading from '../components/NotiflixLoading/NotiflixLoading';
import NotifyMessages from '../components/NotifyMessages/NotifyMessages';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import css from './App.module.css';

const notify = new NotifyMessages();
const loader = new NotiflixLoading();

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

class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  async getImages(e) {
    
    this.setState({ isLoading: true });
    const { currentPage, searchQuery, pageSize } = this.state;
    const options = { searchQuery, currentPage, pageSize };

    try {
      const { data } = await fetchImages(options);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        total: data.total,
        totalHits: data.totalHits,
        showScroll: true,
        error: null,
      }));
      this.handleMessages(data);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = searchQuery => {
    this.reset();
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.incrementCurrentPage();
  };

  handleMessages = data => {
    if (data.totalHits !== 0 && this.state.currentPage === 1) {
      notify.onTotalImages(data.totalHits);
    }
    if (data.total === 0) {
      return notify.onFetchError();
    }
  };

  handleModal = (modalDescr, modalImg) => {
    this.setState({ modalDescr, modalImg });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  incrementCurrentPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      
    }));

  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const {
      images,
      currentPage,
      pageSize,
      totalHits,
      isLoading,
      showModal,
      showScroll,
      modalImg,
      modalDescr,
      error,
    } = this.state;

    const totalPage = Math.ceil(totalHits / pageSize);
    console.log(currentPage);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <Title text="Whoops, something went wrong" />}

        {images.length === 0 && !error && (
          <Title text="Let's find whatever you want!.." />
        )}

        {isLoading ? loader.onLoading() : loader.onLoaded()}

        {images.length > 0 && !isLoading && (
          <ImageGallery images={images} onImageClick={this.handleModal} />
        )}

        {currentPage < totalPage && !isLoading && (
          <TextButton text="Load more" onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            onClick={this.toggleModal}
            modalImg={modalImg}
            modalDescr={modalDescr}
          />
        )}

        {showScroll && images.length > 0 && !isLoading && <ScrollToTop />}
      </div>
    );
  }
}

export default App;