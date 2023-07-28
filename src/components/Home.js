
import design1_image1 from '../assets/img/design1_image1.jpg';
import home_image2 from '../assets/img/home_image2.jpg'
import { Navigation } from './Navigation';

export const Home = ()=> {
  return(
   <>
      <Navigation/> 
      <div className="card " >
        <img src={design1_image1} className='photo1' alt="..."></img>
        <div className="card-body">
          <h1 className="card-text">  Northside Youth Soccer League </h1>
      	</div>
      </div>
      <div className="card " >
        <img src={home_image2} className='photo2'  alt="..."></img>
        <div className="card-body">
          <h1 className="card-text">  </h1>
      	</div>
      </div>
         
   </>
  )
}

