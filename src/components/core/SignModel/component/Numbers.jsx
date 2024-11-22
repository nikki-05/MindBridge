import React from 'react';
import './numbers.css';
import zero from '../images/zero.jpeg';
import one from '../images/one.jpeg';
import two from '../images/two.jpeg';
import three from '../images/three.jpeg';
import four from '../images/four.jpeg';
import five from '../images/five.jpeg';
import six from '../images/six.jpeg';
import seven from '../images/seven.jpeg';
import eight from '../images/eight.jpeg';
import nine from '../images/nine.jpeg';

const Numbers = () => {
    const numbers = [
        { number: '0', handSign: zero, hindi: '०' },
        { number: '1', handSign: one, hindi: '१' },
        { number: '2', handSign: two, hindi: '२' },
        { number: '3', handSign: three, hindi: '३' },
        { number: '4', handSign: four, hindi: '४' },
        { number: '5', handSign: five, hindi: '५' },
        { number: '6', handSign: six, hindi: '६' },
        { number: '7', handSign: seven, hindi: '७' },
        { number: '8', handSign: eight, hindi: '८' },
        { number: '9', handSign: nine, hindi: '९' },
    ];

  return (
    <div className="numbers-container bg-white">
      <h1>Numbers 0-9 with Hand Signs and Hindi Numerals</h1>
      <table className="numbers-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Hand Sign</th>
            <th>Hindi Numeral</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((item, index) => (
            <tr key={index}>
              <td>{item.number}</td>
              <td>
                <img src={item.handSign} alt={`Sign for ${item.number}`} className="hand-sign" />
              </td>
              <td>{item.hindi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Numbers;
