import useAdmin from "../hooks/useAdmin";
import UseAuth from "../hooks/UseAuth";


import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => { // Destructure children prop
    const {user, loading} = UseAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>;
    }

    if (user && isAdmin) {
        return children;
    }
    
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminRoute;
