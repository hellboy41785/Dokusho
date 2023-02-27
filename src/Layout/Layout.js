import Navbar from '@/components/Navbar/Navbar'
import Search from '@/components/Search/Search'

import React from 'react'
import { useNovelUpStore } from '@/store/useStore'

const Layout = ({children}) => {
  const searchToggle =useNovelUpStore((state)=>state.searchToggle)
  return (
    <>
    {searchToggle && <Search/>}
    
     {children}
     <Navbar/>
    </>
  )
}

export default Layout