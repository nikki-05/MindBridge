import React from 'react';
import '../component/alphabet.css';
import A from '../images/A.png';
import B from '../images/B.png';
import C from '../images/C.jpg';
import D from '../images/D.jpg';
import E from '../images/E.jpg';
import F from '../images/F.jpg';
import G from '../images/G.jpg';
import H from '../images/H.jpg';
import I from '../images/I.jpg';
import J from '../images/J.jpg';
import K from '../images/K.jpg';
import L from '../images/L.jpg';
import M from '../images/M.jpg';
import N from '../images/N.jpg';
import O from '../images/O.png';
import P from '../images/P.png';
import Q from '../images/Q.jpg';
import R from '../images/R.jpg';
import S from '../images/S.jpg';
import T from '../images/T.png';
import U from '../images/U.png';
import V from '../images/V.jpg';
import W from '../images/W.jpg';
import X from '../images/X.png';
import Y from '../images/Y.jpg';
import Z from '../images/Z.png';

const Alphabet = () => {
  const alphabets = [
    { english: 'A', handSign: A, hindi: 'अ' },
    { english: 'B', handSign: B, hindi: 'ब' },
    { english: 'C', handSign: C, hindi: 'स' },
    { english: 'D', handSign: D, hindi: 'ड' },
    { english: 'E', handSign: E, hindi: 'इ' },
    { english: 'F', handSign: F, hindi: 'फ' },
    { english: 'G', handSign: G, hindi: 'ग' },
    { english: 'H', handSign: H, hindi: 'ह' },
    { english: 'I', handSign: I, hindi: 'ई' },
    { english: 'J', handSign: J, hindi: 'ज' },
    { english: 'K', handSign: K, hindi: 'क' },
    { english: 'L', handSign: L, hindi: 'ल' },
    { english: 'M', handSign: M, hindi: 'म' },
    { english: 'N', handSign: N, hindi: 'न' },
    { english: 'O', handSign: O, hindi: 'ओ' },
    { english: 'P', handSign: P, hindi: 'प' },
    { english: 'Q', handSign: Q, hindi: 'क्व' },
    { english: 'R', handSign: R, hindi: 'र' },
    { english: 'S', handSign: S, hindi: 'स' },
    { english: 'T', handSign: T, hindi: 'ट' },
    { english: 'U', handSign: U, hindi: 'उ' },
    { english: 'V', handSign: V, hindi: 'व' },
    { english: 'W', handSign: W, hindi: 'व' },
    { english: 'X', handSign: X, hindi: 'क्ष' },
    { english: 'Y', handSign: Y, hindi: 'य' },
    { english: 'Z', handSign: Z, hindi: 'ज़' }
  ];

  return (
    <div className="alphabet-container bg-white">
      <h1>English to Hindi Alphabet with Hand Signs</h1>
      <table className="alphabet-table">
        <thead>
          <tr>
            <th>English Alphabet</th>
            <th>Hand Sign</th>
            <th>Hindi Alphabet</th>
          </tr>
        </thead>
        <tbody>
          {alphabets.map((item, index) => (
            <tr key={index}>
              <td>{item.english}</td>
              <td>
                <img src={item.handSign} alt={`Sign for ${item.english}`} className="hand-sign" />
              </td>
              <td>{item.hindi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alphabet;
