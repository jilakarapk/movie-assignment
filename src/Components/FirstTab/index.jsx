import React, { Component } from 'react';
import axios from 'axios';

import InputForm from '../common/inputForm';
import { paginate } from '../../utilities/paginate';
import Pagination from '../common/pagination';

class FirstTab extends Component {
  state = {
    movies: [],
    error: null,
    response: null,
    pageSize: 3,
    currentPage: 1,
    modalMovie: {},
    showModal: false,
    loader: false,
  };

  handleSubmit = async (movie, year, handleLoader) => {
    this.setState({ movies: [], error: null, currentPage: 1 });
    handleLoader();
    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${movie}&y=${year}&apikey=4d604b6c`
    );
    const { Search, Error } = data;
    if (Error) {
      this.setState({ error: true });
    } else this.setState({ movies: Search });
    handleLoader();
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  showMovieInfo = async (id) => {
    this.loaderToggle();
    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=${id}&plot=full&apikey=4d604b6c`
    );
    this.setState({ modalMovie: data });
    this.modalToggle();
    this.loaderToggle();
  };

  modalToggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  loaderToggle = () => {
    this.setState({ loader: !this.state.loader });
  };

  render() {
    const { movies, error, pageSize, currentPage } = this.state;
    const pagedMovies = paginate(movies, currentPage, pageSize);
    return (
      <div className='firstTab'>
        <p className='tab'>First tab</p>
        <div className='container'>
          <InputForm handleSubmit={this.handleSubmit} />
          {error && <p className='notfound'>Movies not found!</p>}
          <ul className='firsttab-list'>
            {pagedMovies.map((movie) => (
              <div key={movie.imdbID}>
                <li>{movie.Title} </li>
                <button onClick={() => this.showMovieInfo(movie.imdbID)}>
                  more info
                </button>
              </div>
            ))}
          </ul>
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        {this.state.showModal && (
          <div className='modal'>
            <div className='movie-details'>
              <h2>{this.state.modalMovie.Title}</h2>
              <p>Actors: {this.state.modalMovie.Actors}</p>
              <p>Director: {this.state.modalMovie.Director}</p>
              <p>Writer: {this.state.modalMovie.Writer}</p>
              <p>Runtime: {this.state.modalMovie.Runtime}</p>
              <p>Rating: {this.state.modalMovie.imdbRating}</p>
              <p>Language: {this.state.modalMovie.Language}</p>
              <p>
                Box Office:{' '}
                <span
                  className={
                    this.state.modalMovie.imdbRating >= 7 ? 'hit' : 'flop'
                  }
                >
                  {this.state.modalMovie.imdbRating >= 7 ? 'Hit' : 'Flop'}
                </span>
              </p>
            </div>
            <button className='modal-close' onClick={this.modalToggle}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default FirstTab;
