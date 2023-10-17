import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from './components/pages/Start';
import Board from './components/pages/Board';
import './index.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/game",
    element: <Board />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
