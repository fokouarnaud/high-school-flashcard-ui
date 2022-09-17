import React, { Component } from 'react';
import Question from './Question';
import Search from './Search';
import axios from '../axios'

class QuestionView extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      page: 1,
      totalQuestions: 0,
      categories: {},
      currentCategory: null,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    axios.get(`/questions?page=${this.state.page}`, {})
      .then(res => {
        const result = res.data
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          categories: result.categories,
          currentCategory: result.current_category,
        });

      })
      .catch((error) => {
        alert('Unable to load questions. Please try your request again');
      })

  };

  selectPage(num) {
    this.setState({ page: num }, () => this.getQuestions());
  }

  createPagination() {
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalQuestions / 10);
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button

            className={`page-num ${i === this.state.page ? 'page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300  text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md' : 'page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'}`}
            onClick={() => {
              this.selectPage(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  }

  getByCategory = (id) => {
    axios.get(`/categories/${id}/questions`, {})
      .then(res => {
        const result = res.data
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category,
        });

      })
      .catch((error) => {
        alert('Unable to load questions. Please try your request again');
      })

  };

  submitSearch = (searchTerm) => {
    axios.post('/questions',{
      isSearch: "ok",
      searchTerm: searchTerm
    })
      .then(function (res) {
        const result = res.data;
        console.log(res.data)
        this.setState({
          questions: result.questions,
          totalQuestions: result.total_questions,
          currentCategory: result.current_category,
        });

      })
      .catch(function (error) {
        alert('Unable to load questions. Please try your request again');
      });

  };

  questionAction = (id) => (action) => {
    if (action === 'DELETE') {
      if (window.confirm('are you sure you want to delete the question?')) {
        axios.delete(`/questions/${id}`, {})
          .then(res => {
            this.getQuestions();

          })
          .catch((error) => {
            alert('Unable to load questions. Please try your request again');
          })


      }
    }
  };

  render() {
    return (
      <>
        <div className='w-full order-3 md:order-1 max-w-full md:max-w-[calc(75% - 64px)] pr-0 md:pr-24'>
          <h2 className='text-5xl text-[#3d3d4d] font-bold mb-10'>Questions</h2>
          {this.state.questions.map((q, ind) => (
            <Question
              key={q.id}
              question={q.question}
              answer={q.answer}
              category={this.state.categories[q.category]}
              difficulty={q.difficulty}
              questionAction={this.questionAction(q.id)}
            />
          ))}
          <div className='flex justify-center'>
            <nav >
              <ul className='flex list-style-none'>
                {this.createPagination()}
              </ul>
            </nav>

          </div>
        </div>
        <div className=' relative md:sticky top-auto md:top-0 order-[0] md:order-2 pt-0 md:pt-28 max-h-[calc(-72px + 100vh)] overflow-x-hidden overflow-y-auto w-full max-w-full md:max-w-xs ml-0'>


          <h2
            className='uppercase text-base text-left tracking-widest my-0 mr-0 mb-6 ml-0 text-[#3d3d4d]'
            onClick={() => {
              this.getQuestions();
            }}
          >
            Categories
          </h2>
          <nav>
            <ul>
              {Object.keys(this.state.categories).map((id) => (
                <li
                  className='cursor-pointer hover:text-gray-900 flex items-center flex-row ml-3 text-[#6c6c80] font-normal transition-all break-words leading-4'
                  key={id}
                  onClick={() => {
                    this.getByCategory(id);
                  }}
                >


                  <img
                    className='w-10 h-8 text-center mr-2'
                    alt={`${this.state.categories[id].toLowerCase()}`}
                    src={`${this.state.categories[id].toLowerCase()}.svg`}
                  />
                  {this.state.categories[id]}

                </li>
              ))}
            </ul>
          </nav>
          <Search submitSearch={this.submitSearch} />
        </div>
      </>

    );
  }
}

export default QuestionView;
