import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import MusicList from './components/MusicList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/top-tracks",
        element: <MusicList />,
      },
      {
        path: "/favourites",
        element: <MusicList />,
      },
      {
        path: "/recently-played",
        element: <MusicList />,
      },
     
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
 );
