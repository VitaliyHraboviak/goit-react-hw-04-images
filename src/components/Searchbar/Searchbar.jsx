// import React, { Component } from 'react';
// import { ReactComponent as SearchIcon } from '../Icons/search.svg';
// import IconButton from '../Button/IconButton/IconButton';
// // import NotifyMessages from '../NotifyMessages/NotifyMessages';
// import css from './Searchbar.module.css';
// import { onFetchError, onNullSearchQuery, onTotalImages } from '../NotifyMessages/NotifyMessages';

// // const notify = new NotifyMessages();

// class Searchbar extends Component {
//   state = { searchQuery: '' };

//   handleChange = e => {
//     this.setState({ searchQuery: e.target.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchQuery.trim() === '') {
//       onNullSearchQuery();
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

import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import IconButton from '../Button/IconButton/IconButton';
import { onNullSearchQuery } from '../NotifyMessages/NotifyMessages';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      onNullSearchQuery();
      return;
    }

    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar} id="header">
      <form className={css.form} onSubmit={handleSubmit}>
        <IconButton type="submit" variant="search" aria-label="Search images">
          <SearchIcon width="20" heigth="20" />
        </IconButton>
        <input
          className={css.input}
          onChange={handleChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
