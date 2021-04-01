import React, { Component } from 'react';

class InputForm extends Component {
  state = {
    movie: '',
    year: '',
    loader: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { movie, year } = this.state;
    this.props.handleSubmit(movie, year, this.handleLoader);
  };

  handleLoader = () => {
    this.setState({ loader: !this.state.loader });
  };

  render() {
    return (
      <form className='form-container' onSubmit={this.handleSubmit}>
        <label>
          Movie Title: <br />
          <input
            type='text'
            id='movie'
            value={this.state.movie}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <label>
          Release Year: <br />
          <input
            type='number'
            id='year'
            value={this.state.year}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <button className='submit-button'>Submit</button>
        {this.state.loader && <div className='spinner'></div>}
      </form>
    );
  }
}

export default InputForm;
