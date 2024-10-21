import { useContext } from "react";
import { Authcontext } from "../providers/AuthProvider";


const UseAuth = () => {
     const auth = useContext(Authcontext);
     return auth;
};

export default UseAuth;