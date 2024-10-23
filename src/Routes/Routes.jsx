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
import Dashbord from "../Layout/Dashboard";
import Cart from "../pages/Dashbord/Cart/Cart";
import AllUsers from "../pages/Dashbord/AllUsers/AllUsers";
import AddItems from "../pages/Dashbord/AddItems.jsx/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashbord/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashbord/UpdateItem/UpdateItem";
import Dashboard from "../Layout/Dashboard";
import Payment from "../pages/Dashbord/Payment/Payment";
import PaymentHistory from "../pages/Dashbord/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashbord/UserHome/UserHome";
import AdminHome from "../pages/Dashbord/AdminHome.jsx/AdminHome";


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
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
         path:'userHome',
         element:<UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },

      // admin only routes
      {
         path:'AdminHome',
         element:<AdminRoute><AdminHome></AdminHome></AdminRoute>

      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }

    ]
  }
]);