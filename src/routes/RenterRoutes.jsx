import { Navigate, useLocation } from "react-router-dom";
import useHouseRenter from "../hooks/useHouseRenter";
import Loading from "../pages/shared/loading/Loading";


const RenterRoutes = ({children}) => {

    const user = JSON.parse(localStorage?.getItem("user"));
    const [isRenter, isRenterLoading] = useHouseRenter(user?.email);

    const location = useLocation();

    if (isRenterLoading) {
        return <Loading/>
    }

    if (user && isRenter) {
        return children;
    }


    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default RenterRoutes;