import { useState } from 'react'
import '../styles/PathNotFound.css'
import catdig from '/images/cat_dig.gif';
import { Link } from 'react-router-dom';

function PathNotFound() {

  return (
    <div className="page-not-found-container">
      <div>
        <img src={catdig}/>
        <div>Why Are You Here?</div>
        <div>What Are Looking For?</div>
        <div>Feeling Lost?</div>
        <div>I Know The Feeling. Why Dont You <Link to={"home"} className="go-back">Go Back?</Link></div>
      </div>
    </div>
  )
}

export default PathNotFound
