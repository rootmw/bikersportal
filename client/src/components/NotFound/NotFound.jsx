import React from 'react'
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <>
    <section className='page notfound'>
      <div className='content'>
        <img src="https://png.pngtree.com/background/20220726/original/pngtree-404-error-page-not-found-picture-image_1822651.jpg" alt="notfound" height={200} width={400} />
        <Link to={"/"}>RETURN TO HOME</Link>
        
      </div>

    </section>
    </>
  )
}

export default NotFound
