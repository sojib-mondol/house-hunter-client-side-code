import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
    //modal state
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState("");
  const [singleUser, setSingleUser] = useState([]);

  const getSIngleUser = (id) => {
    fetch(`http://localhost:5000/house/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleUser(data));
  };


  const user = JSON.parse(localStorage?.getItem("user"));
  

  const {
    data: houses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["houses"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/houses/${user?.email}`
      );
      const houses = await res.json();
      setItems(houses);
      return houses;
    },
  });

  // for delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/house/${id}`, {
      method: "DELETE",
      headers: {
        //authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          setModal(false);
          toast.success(`Deleted successfully!`);
        }
      });
  };

    return (
        <div className="flex flex-col  my-10 items-center justify-center ">
      
      <Link to='/add-house'><button className="btn btn-primary">Add New House</button></Link>
      <div className="mt-5">
        <section className="container   mx-auto ">
          <div className="inline-block  mx-auto py-2  align-middle  ">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      ID
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Image
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Rent per month
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Bedrooms
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Availability date
                    </th>
                   
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                       
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {items?.length === 0 ? (
                    <p className="px-[15px] py-[5px]">
                      No user avilabe. Please add user
                    </p>
                  ) : (
                    items?.map((user, i) => (
                      <tr onClick={() => getSIngleUser(user?._id)} key={i}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {i + 1}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={user?.img} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user?.name}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user?.city}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user?.rent}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user?.bedrooms}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user?.availabilityDate}
                        </td>
                       
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <Link to={`/update-house/${user?._id}`}>
                            <button className="ml-[20px] mt-[10px] btn-primary text-white px-[20px] text-[16px] py-[2px] rounded-[4px]">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => setModal(true)}
                            className="ml-[20px] mt-[10px] btn-secondary  text-white px-[20px] text-[16px] py-[2px] rounded-[4px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {modal && (
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                  <div className="bg-white px-16 py-14 rounded-md text-center">
                    <h1 className="text-xl mb-4 font-bold text-slate-500">
                      Do you Want Delete
                    </h1>
                    <button
                      onClick={() => setModal(false)}
                      className=" bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(singleUser?._id)}
                      className=" bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          
        </section>
      </div>
    </div>
    );
};

export default OwnerDashboard;