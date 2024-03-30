import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dictionary from './components/Dictionary'
import Footer from './components/Footer'


// function handleClick(e) {
//   // setDict(word.value)
//   word.value = ""
//   e.preventDefault();
// }

function App() {
  const [form, setForm] = useState([])
  const [dict, setDict] = useState("")
  function handleChange(e) {
    // console.log(e);
    // console.log(e.target.value);
    // setDict(e.target.value)
  }
  function submitClicked(e) {
    e.preventDefault()
    // console.log(word.value)
    setDict(word.value)
  }
  return (
    <> 
    <style>@import url('https://fonts.googleapis.com/css2?family=Voces&display=swap')</style>
    <Navbar />
    <div className=' pt-6   bg-yellow-400/25 dark:bg-slate-800 dark:text-white  min-h-[95vh] 
    text-xl tracking-wide flec flex-col justify-around
    '>
    <div className='hidden md:flex justify-evenly  text-3xl m-8'>Welcome to Dictionary!!</div>
        <form>
          <input type="search" name="word" id="word" className='dark:text-black ' placeholder='Enter the word...' onChange={handleChange} autoFocus />
          <button type="submit" id='submitBtn' onClick={submitClicked}>Search</button>
        </form>
        {
          //dict=="" ? <span >Search a word</span> : ""
        }
        <Dictionary word={dict} />

        </div>
        <Footer className=''/>
        
    </>
  )
}

export default App
