import React, { Component } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

class Search extends Component {
  state = {
    query: '',
  };

  getInfo = (event) => {
    event.preventDefault();
    this.props.submitSearch(this.state.query);
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
  };

  render() {
    return (
      <form className='my-10' onSubmit={this.getInfo}>
        <label className="block relative text-gray-600">
         
          <input 
          ref={(input) => (this.search = input)}
          onChange={this.handleInputChange}
          className="
          pr-10
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  "  type="search" name="search" placeholder="Search questions..."/>
                  <button type="submit" className="absolute right-0 top-0 mt-4 mr-4 ">
            <MagnifyingGlassIcon className='text-gray-600 h-5 w-5 fill-current' />
          </button>
        </label>
       

      </form>
    );
  }
}

export default Search;
