import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Usecart from "../hooks/Usecart";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    const user = { email: "currentUserEmail" }; // Replace this with actual user authentication context.
    const [isAdmin, loading] = useAdmin(user.email);
    const [cart] = Usecart();

    if (loading) {
        return <p>Loading...</p>; // Optional: show loading state while fetching
    }

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-amber-950">
                <ul className="menu p-4">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome />Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils />Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList />Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaBook />Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUsers />All Users</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome"><FaHome />User Home</NavLink></li>
                            <li><NavLink to="/dashboard/paymentHistory"><FaCalendar />Payment History</NavLink></li> {/* Update here */}
                            <li><NavLink to="/dashboard/cart"><FaShoppingCart />My Cart ({cart.length})</NavLink></li>
                            <li><NavLink to="/dashboard/review"><FaAd />Add a Review</NavLink></li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                    <li><NavLink to="/order/salad"><FaSearch />Menu</NavLink></li>
                    <li><NavLink to="/order/contact"><FaEnvelope />Contact</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;