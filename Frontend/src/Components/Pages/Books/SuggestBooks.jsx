// import React from 'react'
// import { Link } from 'react-router-dom'
import { useSmoothScroll } from '../../../CustomHooks/Navigation';
import './Books.css'

const currentYear = new Date().getFullYear()
const handleInputChange = (event) => {
    const enteredYear = parseInt(event.target.value);
    if (enteredYear > currentYear || enteredYear < 1000) {
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "";
    }
};

export default function EResources() {
    useSmoothScroll();
return (
    <div className='font-serif mt-28'>
        {/* <Link to='/academics'></Link> */}
        
        {/* Suggest Books */}
        <div className='mx-40' id='Suggest-books'>
            <div className='flex items-center justify-center w-full h-40'>
                <div>
                    <div className='flex justify-center text-4xl font-bold'>
                        <p>Suggest Books</p>
                    </div>
                    <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
                </div>
            </div>
            <form id="Suggest-books-form" 
            className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl 
            shadow-2xl w-3/4 h-auto mx-40 ">
                <div className="grid">
                    <label htmlFor="book-title">Book Title:</label>
                    <input type="text" id="book-title" name="book_title" required/>

                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" required/>

                    <label htmlFor="publisher">Publisher:</label>
                    <input type="text" id="publisher" name="publisher"/>

                    <label htmlFor="year">Year of Publication:</label>
                    <input type="number" id="year" name="year" min="1000" 
                    max={currentYear} onChange={handleInputChange}/>

                </div>

                <input className='' type="submit" value="Suggest Book"></input>
            </form>
        </div>

            <div className='flex items-center justify-center w-full h-32'>
            </div>
    </div>
  )
}