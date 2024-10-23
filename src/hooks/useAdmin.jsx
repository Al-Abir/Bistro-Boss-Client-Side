import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useAdmin = () => {
    const { user ,loading} = UseAuth(); // Ensure that user is retrieved correctly
    const axiosSecure = useAxiosSecure(); // Secure Axios instance with token
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled:!loading,
        queryFn: async () => {
            if (!user?.email) return false; // In case user is not yet available
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin; // Return whether the user is an admin
        },
        // enabled: !!user?.email, // Only run the query if user email is available
        // staleTime: 5 * 60 * 1000, // Optional: Cache result for 5 minutes
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
