// import React, { Component } from 'react';
// import { ReactComponent as SearchIcon } from '../Icons/search.svg';
// import IconButton from '../Button/IconButton/IconButton';
// import NotifyMessages from '../NotifyMessages/NotifyMessages';
// import css from './Searchbar.module.css';

// const notify = new NotifyMessages();

// class Searchbar extends Component {
//   state = { searchQuery: '' };

//   handleChange = e => {
//     this.setState({ searchQuery: e.target.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchQuery.trim() === '') {
//       notify.onNullSearchQuery();
//       return;
//     }

//     this.props.onSubmit(this.state.searchQuery);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     const { searchQuery } = this.state;

//     return (
//       <header className={css.searchbar} id="header">
//         <form className={css.form} onSubmit={this.handleSubmit}>
//           <IconButton type="submit" variant="search" aria-label="Search images">
//             <SearchIcon width="20" heigth="20" />
//           </IconButton>
//           <input
//             className={css.input}
//             onChange={this.handleChange}
//             value={searchQuery}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;

import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import IconButton from '../Button/IconButton/IconButton';
import css from './Searchbar.module.css';
import { onNullSearchQuery } from '../NotifyMessages/NotifyMessages';

// const onFetchError = () => {
//   Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// };

// const onNullSearchQuery = () => {
//   Notify.info(
//     "We're sorry, but you should enter some name in the search box."
//   );
// };

// const onTotalImages = (total) => {
//   Notify.success(`Hooray! We found ${total} images.`);
// };

class Searchbar extends Component {
  state = { searchQuery: '' };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      onNullSearchQuery();
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className={css.searchbar} id="header">
        <form className={css.form} onSubmit={this.handleSubmit}>
          <IconButton type="submit" variant="search" aria-label="Search images">
            <SearchIcon width="20" heigth="20" />
          </IconButton>
          <input
            className={css.input}
            onChange={this.handleChange}
            value={searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
