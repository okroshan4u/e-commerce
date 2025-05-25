import React from 'react'
import './DescriptionBox.css'


const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus impedit eos, soluta quae repudiandae reiciendis sapiente possimus reprehenderit pariatur nesciunt, omnis quisquam et eius? Quasi debitis minima minus earum iusto? Exercitationem excepturi atque illum.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti corrupti at eveniet laudantium aliquid, libero autem placeat mollitia! Aperiam eaque recusandae, praesentium tenetur assumenda in.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
