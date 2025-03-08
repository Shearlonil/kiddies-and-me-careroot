import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ErrorMessage from "../Components/ErrorMessage";
import { useAuth } from "../app-context/auth-user-context";
import { ThreeDotLoading } from "../Components/Indicators";
import handleErrMsg from "../Utils/error-handler";
import IMAGES from "../assets/images";

const Login = () => {
    const navigate = useNavigate();

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { login, authUser, getCurrentYear } = useAuth();
    const user = authUser();

    const schema = yup.object().shape({
		email: yup
			.string()
			.email("A correct email format johndoe@gmail.com is required")
			.required("Email is required"),
		pw: yup
			.string()
			.min(6, "Password must be a min of 6 characters!")
			.required("Input correct password"),
    });

    // Yup Integration with "react-hook-form"
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user) {
          navigate("/");
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsLoggingIn(true);
            await login(data);
            setIsLoggingIn(false);
            navigate("/");
        } catch (ex) {
            setIsLoggingIn(false);
            toast.error(handleErrMsg(ex).msg);
        }
    };

    return (
        <div className="mt-auto mb-auto d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="container-fluid">
                <div className="container-md p-4 rounded">
                    <div className="row">
                        <div className="col-12 col-md-6 my-auto">
                            <main className="form-signin m-auto" style={{ minWidth: "320px", maxWidth: "350px" }} >
                                <Form className="text-center text-dark">
                                    <img className="mb-4" src={IMAGES.logo} alt="" height="200" width={'100%'} />
                                    <h1 className="h3 mb-3 fw-normal">Sign In Page</h1>

                                    <div className="form-floating mb-3">
                                        <input 
                                            type="text"
                                            className="form-control rounded-bottom-0 mb-1" 
                                            id="floatingInput" placeholder="name@example.com"
                                            {...register("email")}
                                        />
                                        <label htmlFor="floatingInput">Email</label>
                                        <ErrorMessage source={errors.email} />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control rounded-top-0 mb-1"
                                            id="floatingPassword"
                                            placeholder="Password"
                                            {...register("pw")}
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                        <ErrorMessage source={errors.pw} />
                                    </div>
                                    <button
                                        className="btn btn-outline-secondary w-100 my-2 py-2"
                                        type="submit"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        {isLoggingIn && (
                                          <ThreeDotLoading
                                            color="#0000ff"
                                            size="medium"
                                            text=""
                                            textColor="#f78419"
                                          />
                                        )}
                                        {!isLoggingIn && `Sign In`}
                                    </button>
                                    <p className="mb-3">&copy; {getCurrentYear()}</p>
                                </Form>
                            </main>
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            <img
                                src={IMAGES.authentication}
                                style={{ width: "80vh", maxWidth: "100%", minHeight: "400px" }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
