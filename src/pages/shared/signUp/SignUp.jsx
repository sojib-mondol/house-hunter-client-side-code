import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // ract hook from
  const [signUpError, setSignUpError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/dashboard";

  // const handleSignUp = (data) => {
  //     console.log(data);
  //     setSignUPError('');

  // }

  const handleSignUp = async (data) => {
    setSignUpError("");
    const userData = {
      name: data?.name,
      phone: data?.phone,
      role: data?.role,
      email: data?.email,
      password: data?.password,
    };

    //console.log("userData ::", userData);

    try {
      const response = await fetch("https://house-hunter-server-side.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Handle successful registration, e.g., save the token to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user",(JSON.stringify(userData)));
        //console.log("token:", token);
        //console.log("user", user);
        toast.success("Registration successful!");
        navigate(from, { replace: true });
      } else {
        const errorData = await response.json();
        setSignUpError(errorData.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setSignUpError("An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              {...register("phone", {
                required: "Phone is Required",
                pattern: {
                  value: /^(?:\+?88)?01[3-9]\d{8}$/,
                  message: "Please input Bangladeshi phone number",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Please select your Role</span>
            </label>
            <select
            name="role"
              {...register("role", { required: "Role is required" })}
              className="input input-bordered w-full max-w-xs"
            >
              <option value="House Owner">House Owner</option>
              <option value="House Renter">House Renter</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
