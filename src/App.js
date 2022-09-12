import React, {  useMemo, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormView from './components/FormView';
import QuestionView from './components/QuestionView';
import Header from './components/Header';
import QuizView from './components/QuizView';
import Layout from './components/Layout';
import { MenuContext } from './MenuContext';

const App =() => {
  
  const { on,updateMenu } = useContext(MenuContext);
  const styleMenu = useMemo(() => {
    return on ? 'after:block': 'after:hidden';
  }, [on]);

    return (
      <div className='outline-none' tabIndex="-1">
        <div onClick={updateMenu} className={`after:content-[''] after:fixed after:w-full after:h-full after:left-0 after:right-0 after:bottom-0 after:bg-black/[.6] after:z-[999] ${styleMenu}`}></div>
        <div className='w-full max-w-screen-2xl my-0  mx-auto p-9 md:py-0 md:px-6  grid grid-cols-[100%] md:grid-cols-[280px_calc(100%-320px)] grid-flow-row gap-16'>
          <Header path />
          <Layout>
          <Router>
            <Routes>
              <Route path='/' element={<QuestionView />} />
              <Route path='/add' element={<FormView />} />
              <Route path='/play' element={<QuizView />} />
              <Route element={<QuestionView />} />
            </Routes>
          </Router>
          </Layout>
        </div>

      </div>
    );
  }

export default App;