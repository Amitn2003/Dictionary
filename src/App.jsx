import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dictionary from './components/Dictionary'


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
  function submitClicked (e) {
    e.preventDefault()
    console.log(word.value)
    setDict(word.value)
  }
  return (
    <>
      <Navbar />
      <style>
@import url('https://fonts.googleapis.com/css2?family=Voces&display=swap')
</style>
      <form>
        <input type="search" name="word" id="word" placeholder='Enter the word...' onChange={handleChange} autoFocus/>
        <button type="submit" id='submitBtn' onClick={submitClicked}>Search</button>
      </form>
      {
        //dict=="" ? <span >Search a word</span> : ""
      }
      <Dictionary word={dict} />
    </>
  )
}

export default App
