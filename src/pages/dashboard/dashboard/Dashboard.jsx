import useHouseOwner from "../../../hooks/useHouseOwner";
import useHouseRenter from "../../../hooks/useHouseRenter";
import OwnerDashboard from "../ownerDashboard/OwnerDashboard";
import RenterDahsboard from "../renterDashboard/RenterDahsboard";


const Dashboard = () => {

    const user = JSON.parse(localStorage?.getItem("user"));

    const [isOwner] = useHouseOwner(user?.email); // custome hook
    const [isRenter] = useHouseRenter(user?.email); // custome hook

    return (
        <div>
            <h2 className="text-center my-[40px] font-poppins font-[600] text-2xl">{isOwner? "House Owner" : "House Renter"} Dashboard</h2>
            {
                isOwner && <OwnerDashboard/>
            }
            {
                isRenter && <RenterDahsboard/>
            }
            

        </div>
    );
};

export default Dashboard;