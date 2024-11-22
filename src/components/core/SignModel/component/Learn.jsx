import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Learn.css';

function Learn() {
  return (
    <div className="learn w-full">
      <h1>Learn Sign Language</h1>
      <div className="lesson-grid">
        <div className="lesson-card m-4">
          <Link to="/signmodel/learn/alphabet"> {/* Add Link component */}
            <h2 className='text-black'>Alphabet</h2>
            <p className='text-black'>Learn the basics of finger spelling</p>
            <button className='hover:scale-110 hover:text-yellow-100'>Start Lesson</button>
          </Link>
        </div>
        <div className="lesson-card m-4">
        <Link to="/signmodel/learn/numbers">
          <h2 className='text-black'>Numbers</h2>
          <p  className='text-black'>Master signing numbers from 0 to 100</p>
          <button className='hover:scale-110 hover:text-yellow-100'>Start Lesson</button>
          </Link>
        </div>
        <div className="lesson-card m-4">
        <Link to="/signmodel/learn/commonphrases">
          <h2 className='text-black'>Common Phrases</h2>
          <p  className='text-black'>Learn everyday expressions</p>
          <button className='hover:scale-110 hover:text-yellow-100'>Start Lesson</button>
          </Link>
        </div>
        {/* Add more lesson cards as needed */}
      </div>
    </div>
  );
}

export default Learn;