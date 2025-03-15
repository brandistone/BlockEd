
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import HomePage from './Pages/home';
import KidsPage from './Pages/KidsPage';
import DevelopersPage from './Pages/DevelopersPage';
import BeginnersPage from './Pages/BeginnersPage';

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <HomePage />,
  
  },
  {
    path: "/kids",
    element: <KidsPage />
  },

  {
    path: "/developers",
    element: <DevelopersPage />
  },
  {
    path: "/beginners",
    element: <BeginnersPage />
  }



 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);