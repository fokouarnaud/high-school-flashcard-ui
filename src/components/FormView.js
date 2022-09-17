import React, { Component } from 'react';
import axios from '../axios'


class FormView extends Component {
  constructor(props) {
    super();
    this.state = {
      question: '',
      answer: '',
      difficulty: 1,
      category: 1,
      categories: {},
    };
  }

  componentDidMount() {
    axios.get(`/categories`, {})
      .then(res => {
        const result = res.data
        this.setState({ categories: result.categories });

      })
      .catch((error) => {
        alert('Unable to load categories. Please try your request again');
      })

  }

  submitQuestion = (event) => {
    event.preventDefault();
    axios.post('/questions', {
      question: this.state.question,
      answer: this.state.answer,
      difficulty: this.state.difficulty,
      category: this.state.category,
    })
      .then((res) => {

        this.setState({
          question: '',
          answer: '',
          difficulty: 1,
          category: 1,
        })

      })
      .catch((error) => {
        alert('Unable to add question. Please try your request again');
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (


      <>
        <div className='w-full max-w-[calc(75% - 64px)] pr-24'>
          <h2 className='text-5xl text-[#3d3d4d] font-bold mb-10'>Add a New Trivia Question</h2>

          <form
            className='form-view'
            id='add-question-form'
            onSubmit={this.submitQuestion}
          >
            <label className="block mb-3">
              <span className="text-gray-700">Question</span>
              <input required className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  " type='text' name='question' onChange={this.handleChange} placeholder="Your Question" />
            </label>
            <label className="block   mb-3">
              <span className="text-gray-700">Answer</span>
              <input required className="
              
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  " type='text' name='answer' onChange={this.handleChange} placeholder="Your Answer" />
            </label>
            <label className="block mb-3">
              <span className="text-gray-700">Difficulty?</span>
              <select name='difficulty' onChange={this.handleChange} className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  ">
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>

            <label className="block mb-3">
              <span className="text-gray-700">Category</span>
              <select name='category' onChange={this.handleChange} className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  ">
                {Object.keys(this.state.categories).map((id) => {
                  return (
                    <option key={id} value={id}>
                      {this.state.categories[id]}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="flex space-x-2 justify-center py-12">
              <input type='submit' className=" cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value='Submit' />
            </div>
          </form>
        </div>
      </>

    );
  }
}

export default FormView;
