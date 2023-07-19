import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "border-[1px] focus:ring-2 focus:ring-transparent focus:border-none input focus-visible:border-red-500 dark:border-[#D0D5DD] w-full py-2 md:py-2.5 px-2.5 md:px-3 rounded-[8px] mt-1 dark:bg-[#8A8F98] bg-[#F8FFF9]  text-black dark:placeholder-[white] text-sm md:text-base";

const AddHouse = () => {
  const user = JSON.parse(localStorage?.getItem("user"));
  const navigate = useNavigate();
  const imageBBhostKey = import.meta.env.VITE_IMGBBKEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleAddData = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageBBhostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          //console.log(imgData.data.url);
          const houseDetails = {
            name: data?.name,
            address: data?.address,
            city: data?.city,
            bedrooms: data?.bedrooms,
            bathrooms: data?.bathrooms,
            roomSize: data?.roomSize,
            availabilityDate: data?.availabilityDate,
            rent: data?.rent,
            phone: data?.phone,
            img: imgData.data.url,
            description: data?.description,
            email: user?.email,

            
          };

          //console.log(houseDetails);
          
          // save user to the database
          fetch("http://localhost:5000/houses", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(houseDetails),
          })
            .then((res) => res.json())
            .then((result) => {
              //console.log(result);
              toast.success(`Added successfully`);
              navigate("/");
            });

          reset();
        }
      });

    //console.log("houseDetails :", houseDetails);
  };

  return (
    <div className="w-[80%] md:w-[70%] lg:w-[50%] mx-auto my-[60px]">
      <div className=" flex flex-col border-[1px] dark:bordder-[#8A8F98] justify-between gap-5 bg-[#D1FFD0] dark:bg-[#1C202A] p-5 md:p-10 rounded-[10px]">
        <h2 className="text-2xl font-semibold">Add House</h2>
        <form
          onSubmit={handleSubmit(handleAddData)}
          className="flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="name"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Name
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter you name"
              className={`${inputStyle}`}
              {...register("name", { required: "Enter you name" })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p role="alert" className="text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Address
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter your address"
              className={inputStyle}
              {...register("address", { required: "Enter your address" })}
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address && (
              <p role="alert" className="text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              City
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="city"
              type="text"
              placeholder="Enter your city"
              className={inputStyle}
              {...register("city", { required: "Enter your city" })}
              aria-invalid={errors.city ? "true" : "false"}
            />
            {errors.city && (
              <p role="alert" className="text-red-600">
                {errors.city.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="bedrooms"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Bedrooms
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="bedrooms"
              type="number"
              placeholder="Enter your bedrooms"
              className={inputStyle}
              {...register("bedrooms", { required: "Enter your bedrooms" })}
              aria-invalid={errors.bedrooms ? "true" : "false"}
            />
            {errors.bedrooms && (
              <p role="alert" className="text-red-600">
                {errors.bedrooms.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="bathrooms"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              bathrooms
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="bathrooms"
              type="number"
              placeholder="Enter your bathrooms"
              className={inputStyle}
              {...register("bathrooms", { required: "Enter your bathrooms" })}
              aria-invalid={errors.bathrooms ? "true" : "false"}
            />
            {errors.bathrooms && (
              <p role="alert" className="text-red-600">
                {errors.bathrooms.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="roomSize"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Room size
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="roomSize"
              type="number"
              placeholder="Enter your room size"
              className={inputStyle}
              {...register("roomSize", { required: "Enter your room size" })}
              aria-invalid={errors.roomSize ? "true" : "false"}
            />
            {errors.roomSize && (
              <p role="alert" className="text-red-600">
                {errors.roomSize.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="availabilityDate"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Availability date
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="availabilityDate"
              type="date"
              placeholder="Enter your availability date"
              className={inputStyle}
              {...register("availabilityDate", {
                required: "Enter your availability date",
              })}
              aria-invalid={errors.availabilityDate ? "true" : "false"}
            />
            {errors.availabilityDate && (
              <p role="alert" className="text-red-600">
                {errors.availabilityDate.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="rent"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Rent per month
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="rent"
              type="number"
              placeholder="Enter your rent per month"
              className={inputStyle}
              {...register("rent", { required: "Enter your rent per month" })}
              aria-invalid={errors.rent ? "true" : "false"}
            />
            {errors.rent && (
              <p role="alert" className="text-red-600">
                {errors.rent.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Phone Number
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="01711223344"
              className={inputStyle}
              {...register("phone", {
                required: "Enter your phone number",
                pattern: {
                  value: /^(?:\+?88)?01[3-9]\d{8}$/,
                  message: "Please input Bangladeshi phone number",
                },
              })}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p role="alert" className="text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="img"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Pictre
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <input
              name="img"
              type="file"
              placeholder="input profile picture"
              className={`${inputStyle}`}
              {...register("img", { required: "Input profile picture" })}
              aria-invalid={errors.img ? "true" : "false"}
            />
            {errors.img && (
              <p role="alert" className="text-red-600">
                {errors.img.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="dark:text-[#E4E4E4] text-xs md:text-sm"
            >
              Description
              {/* <span className="text-[#EB5757]">*</span> */}
            </label>
            <textarea
              name="description"
              type="text"
              placeholder="Enter your description"
              className={inputStyle}
              rows={4}
              {...register("description", {
                required: "Enter your rent description",
              })}
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && (
              <p role="alert" className="text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-[#00A3FF] rounded-[25px] p-2 md:p-3 mt-5 text-sm md:text-base hover:transition hover:duration-5000 hover:ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHouse;
