import React from "react";
import design1_image1 from '../assets/img/design1_image1.jpg';
import home_image2 from '../assets/img/home_image2.jpg'
import { Navigation } from './Navigation';
import { signInWithGoogle, signOut,useUserState } from '../utilites/firebase'; 


export const Home = () => {

  const SignInButton = () => (
    <button className="Mybutton"
      onClick={() => signInWithGoogle()}>
      Login
    </button>
  );

  const SignOutButton = () => (
    <button className="Mybutton"
      onClick={() => signOut()}>
      Logout
    </button>
  );

 const [user] = useUserState(); 

 
  return (
    <>
      <h1 style={{ marginTop: '16%' }}></h1>
      <Navigation />
      <div className="card " >
        <img src={design1_image1} alt="..."></img>
        <div className="card-body">
          <h1 className="card-text">  Northside Youth Soccer League </h1>
        </div>
      </div>
      <div className="card " >
        <img src={home_image2} alt="..."></img>
        <div className="card-body">
          <h1 className="card-text">  </h1>
        </div>
      </div>
      {user ? <SignOutButton /> : <SignInButton />}
      
    </>

  )
}


