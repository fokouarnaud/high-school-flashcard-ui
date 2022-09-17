import React, { Component } from 'react';
import { FaceSmileIcon, FaceFrownIcon } from '@heroicons/react/24/solid'

import axios from '../axios'



const questionsPerPlay = 5;

class QuizView extends Component {
  constructor(props) {
    super();
    this.state = {
      quizCategory: null,
      previousQuestions: [],
      showAnswer: false,
      categories: {},
      numCorrect: 0,
      currentQuestion: {},
      guess: '',
      forceEnd: false,
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

  selectCategory = ({ type, id = 0 }) => {
    this.setState({ quizCategory: { type, id } }, this.getNextQuestion);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getNextQuestion = () => {
    const previousQuestions = [...this.state.previousQuestions];
    if (this.state.currentQuestion.id) {
      previousQuestions.push(this.state.currentQuestion.id);
    }
    axios.post('/quizzes', {
      previous_questions: previousQuestions,
        quiz_category: this.state.quizCategory
    })
    .then(function (res) {
       const result = res.data;
       this.setState({
        showAnswer: false,
        previousQuestions: previousQuestions,
        currentQuestion: result.question,
        guess: '',
        forceEnd: result.question ? false : true,
      });

    })
    .catch(function (error) {
      alert('Unable to load question. Please try your request again');
    });

  };

  submitGuess = (event) => {
    event.preventDefault();
    let evaluate = this.evaluateAnswer();
    this.setState({
      numCorrect: !evaluate ? this.state.numCorrect : this.state.numCorrect + 1,
      showAnswer: true,
    });
  };

  restartGame = () => {
    this.setState({
      quizCategory: null,
      previousQuestions: [],
      showAnswer: false,
      numCorrect: 0,
      currentQuestion: {},
      guess: '',
      forceEnd: false,
    });
  };

  renderPrePlay() {
    return (

      <div>
        <div className='w-full order-3 md:order-1 max-w-full md:max-w-[calc(75% - 64px)] pr-0 md:pr-24'>
          <h2 className='text-5xl text-[#3d3d4d] font-bold mb-10'>Choose Category</h2>

          <div className=''>
            <div className='text-xl hover:text-blue-500  cursor-pointer' onClick={this.selectCategory}>
              ALL
            </div>
            {Object.keys(this.state.categories).map((id) => {
              return (
                <div
                  key={id}
                  value={id}
                  className='text-xl hover:text-blue-500 cursor-pointer'
                  onClick={() =>
                    this.selectCategory({ type: this.state.categories[id], id })
                  }
                >
                  {this.state.categories[id]}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }

  renderFinalScore() {
    return (

      <div className='w-full order-3 md:order-1 max-w-full md:max-w-[calc(75% - 64px)] pr-0 md:pr-24'>
        <div className=' w-full break-words  flex-grow flex-shrink basis-auto font-normal '>
          <div className='break-words'>
            <div className='pb-3 tracking-normal text-2xl font-bold leading-9 text-[#292929] cursor-pointer ' > Your Final Score is {this.state.numCorrect}</div>
          </div>
          <div className='py-12'>
            <div className='flex justify-between break-words font-normal'>
              <button className=' cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={this.restartGame}>
                Play Again?
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  evaluateAnswer = () => {
    const formatGuess = this.state.guess
      // eslint-disable-next-line
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();
    const answerArray = this.state.currentQuestion.answer
      .toLowerCase()
      .split(' ');
    return answerArray.every((el) => formatGuess.includes(el));
  };

  renderCorrectAnswer() {
    let evaluate = this.evaluateAnswer();
    return (

      <div className='w-full order-3 md:order-1 max-w-full md:max-w-[calc(75% - 64px)] pr-0 md:pr-24'>
        <div className=' w-full break-words  flex-grow flex-shrink basis-auto font-normal '>
          <div className='break-words'>
            <div className='pb-3 tracking-normal text-2xl font-bold leading-9 text-[#292929]' > {this.state.currentQuestion.question}</div>
            <div>
              <p className='text-[#292929]'>
                {this.state.currentQuestion.answer}
              </p>
            </div>
          </div>
          <div className='py-4'>
            <div className='flex justify-between break-words font-normal'>
              <div className='flex flex-grow flex-shrink-0 basis-auto items-center'>
                <div className={`pr-3 ${evaluate ? 'text-[#5def5b]' : 'text-[#ef5b5b]'}`}>
                  {evaluate ? <FaceSmileIcon className='h-6 w-6' /> : <FaceFrownIcon className='h-6 w-6' />}
                </div>
                <div className={`text-xl  font-normal ${evaluate ? 'text-[#5def5b]' : 'text-[#ef5b5b]'}`} >

                  {evaluate ? 'You were correct!' : 'You were incorrect'}
                </div>
              </div>


              <button className=' cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={this.getNextQuestion}>
                {' '}
                Next Question{' '}
              </button>

            </div>
          </div>
        </div>
      </div>


    );
  }

  renderPlay() {
    console.log(this.state.previousQuestions.length, questionsPerPlay);
    return this.state.previousQuestions.length === questionsPerPlay ||
      this.state.forceEnd ? (
      this.renderFinalScore()
    ) : this.state.showAnswer ? (
      this.renderCorrectAnswer()
    ) : (

      <div className='w-full order-3 md:order-1 max-w-full md:max-w-[calc(75% - 64px)] pr-0 md:pr-24'>
        <div className=' w-full break-words  flex-grow flex-shrink basis-auto font-normal '>
          <div className='break-words'>
            <div className='pb-3 tracking-normal text-2xl font-bold leading-9 text-[#292929]' > {this.state.currentQuestion.question}</div>
          </div>
          <div className='py-4'>
            <div className='flex justify-between break-words font-normal'>

              <form className='m-0' onSubmit={this.submitGuess}>

                <label className="block mb-3">

                  <input className="
                
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                  " type='text' name='guess' onChange={this.handleChange} placeholder="Your Answer" />
                </label>
                <div className="flex space-x-2 justify-start py-3">
                  <input type='submit' className=" cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value='Submit Answer' />
                </div>

              </form>
              <div></div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  render() {
    return this.state.quizCategory ? this.renderPlay() : this.renderPrePlay();
  }
}

export default QuizView;
