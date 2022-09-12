import React, { Component } from 'react';
import { TrashIcon, ArrowUturnRightIcon } from '@heroicons/react/24/solid'
import FlipCard from './FlipCard';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      visibleAnswer: false,
    };
  }

  flipVisibility() {
    this.setState({ visibleAnswer: !this.state.visibleAnswer });
  }

  render() {


    return (
      <FlipCard
        data={this.props}

        frontData={({ question, category, difficulty, questionAction,handleClick }) => {

          return (
            <div className=' w-full break-words  flex-grow flex-shrink basis-auto font-normal '>
              <div className='break-words'>
                <div className='pb-3 tracking-normal text-xl md:text-2xl font-bold leading-9 text-[#292929] cursor-pointer '   onClick={handleClick}>{question}</div>
              </div>
              <div className='py-12'>
                <div className='flex justify-between break-words font-normal'>
                  <div className='flex flex-grow flex-shrink-0 basis-auto items-center'>
                    <div className='pr-3'>
                      <img
                        className=' h-6 w-6'
                        alt={`${category.toLowerCase()}`}
                        src={`${category.toLowerCase()}.svg`}
                      />
                    </div>
                    <div className='text-xl text-[#757575] font-normal' >Difficulty: {difficulty}</div>
                  </div>
                  <div>

                    <button  onClick={handleClick} className='mr-6 p-1 rounded text-blue-500 hover:text-blue-400 hover:bg-gray-100'>
                      <ArrowUturnRightIcon className="h-6 w-6 " />
                    </button>

                    <button className='text-[#757575] p-1 rounded  hover:text-blue-400 hover:bg-gray-100 ' onClick={() => questionAction('DELETE')}>
                      <TrashIcon className="h-6 w-6 " />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          );
        }}
        backData={({ answer, difficulty, questionAction, category ,handleClick}) => {
          return (
            <div className=' w-full break-words  flex-grow flex-shrink basis-auto font-normal '>
              <div className='break-words'>
                <div className='pb-3 tracking-normal text-2xl font-bold leading-9 text-[#292929]  cursor-pointer '   onClick={handleClick}>{answer}</div>
              </div>
              <div className='py-12'>
                <div className='flex justify-between break-words font-normal'>
                  <div className='flex flex-grow flex-shrink-0 basis-auto items-center'>
                    <div className='pr-3'>
                      <img
                        className=' h-6 w-6'
                        alt={`${category.toLowerCase()}`}
                        src={`${category.toLowerCase()}.svg`}
                      />
                    </div>
                    <div className='text-xl text-[#757575] font-normal' >Difficulty: {difficulty}</div>
                  </div>
                  <div>

                    <button  onClick={handleClick} className='mr-6 p-1 rounded text-blue-500 hover:text-blue-400 hover:bg-gray-100'>
                      <ArrowUturnRightIcon className="h-6 w-6 " />
                    </button>

                    <button className='text-[#757575] p-1 rounded  hover:text-blue-400 hover:bg-gray-100' onClick={() => questionAction('DELETE')}>
                      <TrashIcon className="h-6 w-6 " />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default Question;
