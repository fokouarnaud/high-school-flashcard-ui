import React,{useContext } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { MenuContext } from '../MenuContext';



function Layout({children}) {
  const {updateMenu } = useContext(MenuContext);
  return (
    <main className='h-full pt-0 pb-14 md:py-14 w-full flex flex-col lg:flex-row justify-start relative '>
    <header className='flex md:hidden h-16 mb-10 justify-start items-center'>
      <button className='mr-6 hover:bg-gray-100 rounded-md p-2 hover:text-gray-600' onClick={updateMenu}> <Bars3Icon className="h-8 w-8 " /></button>
      <h2 className='text-2xl text-[#3d3d4d]'>Learn concepts</h2>
    </header>
    {children}
    </main>
  )
}

export default Layout;