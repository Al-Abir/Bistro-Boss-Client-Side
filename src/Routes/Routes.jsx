import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashbord from "../Layout/Dashbord";
import Cart from "../pages/Dashbord/Cart/Cart";
import AllUsers from "../pages/Dashbord/AllUsers/AllUsers";
import AddItems from "../pages/Dashbord/AddItems.jsx/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashbord/ManageItems/ManageItems";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
         {
          path:'/login',
          element:<Login></Login>
         },{
          path: 'signup',
          element: <SignUp></SignUp>
         },
         {
          path: 'secret',
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
         }
      ]
    },
    {
      path:'dashboard',
      element:  <PrivateRoute> <Dashbord></Dashbord></PrivateRoute>,
      children: [
        //normal user routes
        {
          path: 'cart',
          element:<Cart></Cart>
        },
        // admin Routes
        {
          path:'addItems',
          element:<AdminRoute> <AddItems></AddItems>  </AdminRoute>
        },
        {
            path:'manageItems',
            element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        }
      ]
    }
  ]);