
import './App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import ImageMain from './components/ImageMain.jsx';
import Home from './components/Home.jsx';
import {createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <Home/>
      </>
    ),
  },{
    path: "/text",
    element: (
      <>
        <Header/>
        <Main/>
      </>
    ),
  },{
    path: "/image",
    element: (
      <>
        <Header/>
        <ImageMain/>
      </>
    ),
  },
]);

function App() {
 
  return (
   <>
      <RouterProvider router={router} />
   </>
  );
}

export default App;
