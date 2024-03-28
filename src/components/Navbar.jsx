import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <ul className='hidden md:flex'>
        <li>Home</li>
        <li>Products</li>
        <li>Blogs</li>
        <li>About</li>
      </ul>
      <div className='flex md:hidden justify-around'>
        <div className='text-2xl font-semibold tracking-widest pr-2 py-2 '>Dictionary</div> <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-dictionary-of-english-language-icon-cartoon-style-png-image_5161985.jpg" className='p-1 rounded-lg ' alt="Dictionary Logo"></img>
      </div>
    </nav>
  )
}

export default Navbar
