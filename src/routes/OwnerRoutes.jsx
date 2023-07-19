import { Navigate, useLocation } from "react-router-dom";
import useHouseOwner from "../hooks/useHouseOwner";
import Loading from "../pages/shared/loading/Loading";

const OwnerRoutes =  ({children}) => {

    const user =  JSON.parse(localStorage?.getItem("user"));
    const [isOwner, isOwnerLoading] =  useHouseOwner(user?.email);

    const location = useLocation();

    if (isOwnerLoading) {
        return <Loading/>
    }

    if (user && isOwner) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default OwnerRoutes;