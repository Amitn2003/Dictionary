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
      <div className='flex'>
        <div>Dictionary</div> 
      </div>
    </nav>
  )
}

export default Navbar
