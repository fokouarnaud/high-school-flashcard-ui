import React, {  useMemo, useContext } from 'react';
import { ArrowUpOnSquareStackIcon } from '@heroicons/react/24/solid'
import { MenuContext } from '../MenuContext';

const Header = () => {

  const { on } = useContext(MenuContext);
  const styleMenu = useMemo(() => {
    return on ? 'translate-3d-show': 'translate-3d-hide-left';
  }, [on]);

  const navTo = (uri) => {
    window.location.href = window.location.origin + uri;
  }


  return (
    <aside className={` w-full max-w-[75%] md:max-w-full min-w-fit md:min-w-full z-[1001] md:z-[0]  overflow-y-auto flex justify-between items-center flex-col  fixed md:sticky top-0 bottom-0 left-0 pt-12 md:pt-14 transition-transform bg-white md:bg-transparent ${styleMenu} md:translate-3d-show h-[calc(-1px+100vh)]`}>
      <div
        className='w-full'

      >
        <button onClick={() => {
          navTo('');
        }} className='pl-6 cursor-pointer hover:text-gray-900 flex items-center justify-start flex-row ml-3 text-[#6c6c80] font-bold text-xl  transition-all break-words leading-4'>
          <ArrowUpOnSquareStackIcon className='h-24 w-24' />
          Revi-stack
        </button>
      </div>
      <nav className='w-full pt-10 self-start grow shrink basis-0'>
        <ul className='w-full pl-0 flex justify-start items-center flex-col'>
          <li className='text-xl w-full transition-all py-0 px-8 cursor-pointer'

          >
            <button
              onClick={() => {
                navTo('');
              }}
              className='text-xl bg-white rounded-lg font-normal no-underline h-full w-full flex justify-start items-center cursor-pointer my-0 mx-auto transition-all text-[#6c6c80] py-2 px-4  hover:bg-gray-100 hover:text-gray-700'>
              Flashcard List
            </button>
          </li>
          <li className='text-xl w-full transition-all py-0 px-8 cursor-pointer'

          >
            <button
              className='text-xl bg-white rounded-lg font-normal no-underline h-full w-full flex justify-start items-center cursor-pointer my-0 mx-auto transition-all text-[#6c6c80] py-2 px-4 hover:bg-gray-100 hover:text-gray-700'
              onClick={() => {
                navTo('/add');
              }}
            >
              Add questions
            </button>
          </li>
          <li className='text-2xl w-full transition-all py-0 px-8 cursor-pointer'

          >
            <button
              onClick={() => {
                navTo('/play');
              }}
              className='text-xl bg-white rounded-lg font-normal no-underline h-full w-full flex justify-start items-center cursor-pointer my-0 mx-auto transition-all text-[#6c6c80] py-2 px-4  hover:bg-gray-100 hover:text-gray-700'
            >
              Play
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}


export default Header;
