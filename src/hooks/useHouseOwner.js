import { useEffect, useState } from "react";

const useHouseOwner = (email) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isOwnerLoading, setIsOwnerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/house-owner/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsOwner(data.isHouseOwner);
          setIsOwnerLoading(false);
        });
    }
  }, [email]);
  return [isOwner, isOwnerLoading];
};

export default useHouseOwner;
