import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Authcontext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/Sociallogin/SocialLogin";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, upDateUserProfile } = useContext(Authcontext);
    const navigate = useNavigate();
     const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        createUser(data.email, data.password) 
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            upDateUserProfile(data.name, data.photoURL) // Fixed typo here
              .then(() => {
                const userInfo = { name: data.name, email: data.email };
                axiosPublic.post('/users', userInfo) // Use axiosPublic
                  .then(res => {
                    if (res.data.insertedId) {
                        console.log("Data added the data base")
                      reset();
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Sign Up successful!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/');
                    }
                  });
              })
              .catch((error) => {
                console.error("Profile update error:", error);
              });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              Swal.fire({
                icon: "error",
                title: "Email Already in Use",
                text: "This email is already registered. Please use a different email or log in."
              });
            } else {
              console.error("Sign up error:", error);
              Swal.fire({
                icon: "error",
                title: "Sign Up Failed",
                text: error.message
              });
            }
          });
      };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: "Photo URL is required" })} // Fixed typo
                                    placeholder="Enter your photo URL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <span className="text-red-500">{errors.photoURL.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6,20}$/
                                    })}
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain at least one uppercase, one lowercase, and one special character</p>}
                                <label className="label">
                                    <Link to="/reset-password" className="label-text-alt link link-hover">Forgot password?</Link> {/* Added link */}
                                </label>
                            </div>

                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                </div>
                        </form>
                        <p className="px-6"><small>Already have an account? <Link to="/login">Log in</Link></small></p> {/* Fixed login link */}
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;