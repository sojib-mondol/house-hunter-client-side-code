import { useEffect, useState } from 'react';

const useHouseRenter = email => {
    const [isRenter, setIsRenter] = useState(false);
    const [isRenterLoading, setIsRenterLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://house-hunter-server-side.vercel.app/users/house-renter/${email}`)
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    setIsRenter(data.isHouseRenter);
                    setIsRenterLoading(false);
                })
        }
    }, [email])
    return [isRenter, isRenterLoading]
};

export default useHouseRenter;