import React from 'react';
import { Button } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './pages/Card';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
 
} from "react-router-dom";
import ErrorURL from './pages/ErrorURL';
import Login from './pages/Login';
import Main from './pages/Main';
import Registration from './pages/Registration';
import Shop from './pages/Shop';
import Catalog from './pages/Catalog';
import CreateShop from './pages/Shop/CreateShop';
import UserPage from './pages/UserPage';
import BasketPage from './pages/BasketPage';
import ShopMain from './pages/Shop/ShopMain';
import LoginShop from './pages/Shop/LoginShop';

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
     
      {
        path: "/",
        element: <Navigate to="/login" />
      },
      {
        path:"/shops",
        element:<Main/>
      },
      {
        path:"/card/:id",
        element: <Card/>
      },
      {
        path:"/shop/:id",
        element: <Shop/>
      },
      {
        path:"/catalog",
        element: <Catalog/>
      },
      {
        path:"/userpage",
        element: <UserPage/>
      },
      {
        path:"/basketpage",
        element: <BasketPage/>
      },
    ]
  },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/registration",
      element: <Registration/>
    },
    {
      path: "/createshop",
      element: <CreateShop/>
    },
    {
      path: "/mainshop",
      element: <ShopMain/>
    },
    {
      path: "/loginshop",
      element: <LoginShop/>
    },
    {
      path: "*",
      element: <ErrorURL/>
    }
  
])
function App() {
  return (
    <div>
       <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
