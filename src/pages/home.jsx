import React, {useState} from 'react';
import { Main } from "../components/main/main";


const Home = ({convertPrice}) => {
const[products, setProducts]= useState([]);

  return( 
  <Main 
  products={products} 
  setProducts={setProducts} 
  convertPrice={convertPrice}/>
  )
};

export default Home;
