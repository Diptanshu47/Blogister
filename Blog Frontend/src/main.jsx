import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import App from './App.jsx'
import Params from "./pages/Params.jsx";
import Trending from './pages/Trending.jsx';
import Tags from './pages/Tags.jsx';
import Newpost from './pages/Newpost.jsx'
import Edit from './pages/Edit.jsx';
import Delete from './pages/Delete.jsx';
import Tagspage from './pages/Tagspage.jsx';

const router = createBrowserRouter([
  {path: "/",element :<App />},
  {path: "/tags",element:<Tags />},
  {path: "/trending",element:<Trending />},
  {path: "/posts/:id",element:<Params />},
  {path: "/compose",element:<Newpost />},
  {path: "/edit/:id",element:<Edit />},
  {path: "/delete/:id",element:<Delete />},
  {path: "/tags/:id",element:<Tagspage />}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <SnackbarProvider
      style={{ fontSize: '15px' }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
)
