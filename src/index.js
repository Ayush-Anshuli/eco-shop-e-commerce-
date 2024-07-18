import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Electronic from './components/Electronic';
import Jewelery from './components/Jewelery';
import MenCloth from './components/MenCloth';
import WomenCloth from './components/WomenCloth';
import Hero from './components/Hero';
import Productdetails from './components/Productdetails';
import Login from './components/Login';
import Register from './components/Register';
import { FirebaseProvider } from './utils/firebase';
import Profile from './components/Profile';

const router = createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
            path:'/',
            element:<Hero/>
        },
        {
          path:'/electronic',
          element:<Electronic/>
        },
        {
          path:'/jewelery',
          element:<Jewelery/>
        },
        {
          path:'/mens clothing',
          element:<MenCloth/>
        },
        {
          path:'/womens clothing',
          element:<WomenCloth/>
        },
        {
          path:'/productsdetails/:id',
          element:<Productdetails/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/users/:uid",
          element:<Profile/>
        }
      ],
    },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider> 
      <FirebaseProvider>
     <RouterProvider router={router}/>
     </FirebaseProvider>
    </ChakraProvider>
    
  
);


