import React, { useState, useEffect } from 'react';
import '../component/commonphrases.css';

function CommonPhrases() {
  const [selectedPhrase, setSelectedPhrase] = useState(() => {
    // Get the saved phrase from localStorage or set to null
    return localStorage.getItem('selectedPhrase') || null;
  });

  const phrases = [
    'Hello', 'Thank you', 'Please', 'How are you?', 'My name is...', 
    'Nice to meet you', 'Goodbye', 'Yes', 'No', 'Help'
  ];

  const handlePhraseClick = (phrase) => {
    setSelectedPhrase(phrase);
    localStorage.setItem('selectedPhrase', phrase); // Save the selected phrase to localStorage
  };

  // YouTube video IDs
  const tutorialVideos = {
    "Hello": "SsLvqfTXo78",
    "Thank you": "EPlhDhll9mw",
    "Please": "wtNN6H27L3k",
    "How are you?": "uKtIdUxUqcA",
    "My name is...": "D1lzwJQUolE",
    "Nice to meet you": "33miaL9KFj4",
    "Goodbye": "evr40BNeIfM",
    "Yes": "0X8RoDuhCt0",
    "No": "zKDPRl7Vv0I",
    "Help": "Euz1g9E-Mrw"
  };

  const recommendedCourses = {
    blind: [
      { title: "Braille Basics", description: "Learn the fundamentals of Braille reading and writing.", url: "https://www.brailleinstitute.org/learn-braille" },
      { title: "Assistive Technology", description: "Explore various technologies designed for the visually impaired.", url: "https://www.afb.org/blindness-and-low-vision/using-technology" },
    ],
    deaf: [
      { title: "ASL for Beginners", description: "Start your journey in American Sign Language.", url: "https://www.gallaudet.edu/asl-connect/" },
      { title: "Lip Reading Techniques", description: "Improve your lip reading skills with expert guidance.", url: "https://www.lipreading.org/" },
    ],
    mute: [
      { title: "Non-Verbal Communication", description: "Master the art of communicating without words.", url: "https://www.verywellmind.com/types-of-nonverbal-communication-2795397" },
      { title: "Text-to-Speech Tools", description: "Learn to use various text-to-speech technologies effectively.", url: "https://www.understood.org/articles/en/text-to-speech-technology-what-it-is-and-how-it-works" },
    ],
  };

  const handleLearnMore = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    // Cleanup function to remove the selected phrase from localStorage if needed
    return () => {
      // Optionally clear the selected phrase on unmount
      // localStorage.removeItem('selectedPhrase');
    };
  }, []);

  return (
    <div className="common-phrases">
      <h1>Common Phrases in Sign Language</h1>
      <div className="content-container">
        <div className="phrases-container">
          <h2>Common Phrases</h2>
          <div className="phrases-list">
            {phrases.map(phrase => (
              <button
                key={phrase}
                onClick={() => handlePhraseClick(phrase)}
                className={`${selectedPhrase === phrase ? 'active' : ''} bg-blue-300 hover:scale-110 hover:bg-blue-500 rounded-md`}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedPhrase && (
        <div className="tutorial-container">
          <h2>Tutorial: {selectedPhrase}</h2>
          {tutorialVideos[selectedPhrase] ? (
            <div className="video-wrapper">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${tutorialVideos[selectedPhrase]}`}
                title={`Tutorial for ${selectedPhrase}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="video-placeholder">
              <p>Video tutorial for "{selectedPhrase}" is not available yet.</p>
            </div>
          )}
        </div>
      )}
      <div className="recommended-courses">
        <h2>Recommended Courses</h2>
        <div className="courses-container">
          {Object.entries(recommendedCourses).map(([category, courses]) => (
            <div key={category} className="course-category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              {courses.map((course, index) => (
                <div key={index} className="course-card">
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <button onClick={() => handleLearnMore(course.url)}>Learn More</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommonPhrases;