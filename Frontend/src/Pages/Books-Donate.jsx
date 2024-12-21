import { useSmoothScroll } from '../Navigation';
import '../css/form.css';
import { Helmet } from 'react-helmet';

const currentYear = new Date().getFullYear();

// Function to scroll the invalid input to the middle of the page
const scrollToMiddle = (element) => {
  const offset = window.innerHeight / 2 - element.getBoundingClientRect().height / 2;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth',
  });
};

// Handle the form validation on submit
const handleFormSubmit = (event) => {
  event.preventDefault(); // Prevent the form from submitting

  const form = event.target;
  const inputs = form.querySelectorAll('input[required], textarea[required]'); // All required inputs
  
  for (let input of inputs) {
    if (!input.value) {
      input.style.borderColor = 'red';
      scrollToMiddle(input); // Scroll to the first invalid input and break
      input.focus();
      break;
    } else {
      input.style.borderColor = '';
    }
  }
};

const handleInputChange = (event) => {
  const enteredYear = parseInt(event.target.value);
  if (enteredYear > currentYear || enteredYear < 1000) {
    event.target.style.borderColor = 'red';
  } else {
    event.target.style.borderColor = '';
  }
};

export default function EResources() {
  useSmoothScroll();
  
  return (
    <div className='font-serif mt-28'>
      <div className='mx-40' id='Donate-books'>
        <div className='flex items-center justify-center w-full h-40'>
          <div>
            <div className='flex justify-center text-4xl font-bold'>
              <p>Donate Books</p>
            </div>
            <div className="mx-auto mt-2 mb-10 border-b-4 border-blue-700 w-44"></div>
          </div>
        </div>
        <form 
          id="donate-books-form" 
          className="p-4 flex-col border bg-[#f3f2ed] rounded-2xl 
          shadow-2xl w-3/4 h-auto mx-40 "
          onSubmit={handleFormSubmit} // Attach custom submit handler
          noValidate // Disable browser's default validation
        >
          <h2>Donor Information</h2>
          <div className="grid">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="donor_name" required/>

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required/>

            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" rows="4" required/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>
          </div>

          <h2 className='mt-8'>Book Details</h2>
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

            <label htmlFor="condition">Condition of the Book:</label>
            <select id="condition" name="condition">
              <option value="choose">Choose Condition</option>
              <option value="new">New</option>
              <option value="used-good">Used (Good)</option>
              <option value="used-fair">Used (Fair)</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <h2 className='mt-8'>Agreement</h2>
          <div className='flex items-center'>
            <input className='w-1/3' type="checkbox" name="agreement" required/> 
            <label className="w-auto">I hereby declare that the information provided is true,
              and I agree to donate the book(s) as per the rules.</label>
          </div>

          <input className='' type="submit" value="Submit Donation"></input>
        </form>
      </div>

        <div className='flex items-center justify-center w-full h-32'/>
    </div>
  );
}
