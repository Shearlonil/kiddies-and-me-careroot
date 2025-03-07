import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import ErrorMessage from '../Components/ErrorMessage';
import { schema } from '../yup-schemas/registration-schema';
import { ThreeDotLoading } from '../Components/Indicators';
import IMAGES from "../assets/images";

const Registration = () => {
    const [networkRequest, setNetworkRequest] = useState(false);
            
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

	const onSubmit = async (formData) => {
	};

    return (
        <div className='container-fluid'>
            <div className="row m-3">
                <div className="col-sm-12 col-md-4 my-3">
                    <Form className="d-flex flex-column gap-3">
                        {/* First Name */}
                        <div>
                            <label className="fw-bold">First Name:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="Name"
                                {...register("f_name")}
                            />
                            <ErrorMessage source={errors.f_name} />
                        </div>

                        {/* Last Name */}
                        <div className='my-1'>
                            <label className="fw-bold">Last Name:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="Name"
                                {...register("l_name")}
                            />
                            <ErrorMessage source={errors.l_name} />
                        </div>
            
                        {/* Phone Number */}
                        <div>
                            <label className="fw-bold">Phone Number:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="Phone Number"
                                {...register("phone_no")}
                            />
                            <ErrorMessage source={errors.phone_no} />
                        </div>

                        <div>
                            <label className="fw-bold">E-mail:</label>
                            <input
                                type="email"
                                className="form-control mb-2 shadow-sm"
                                placeholder="example@gmail.com"
                                {...register("email")}
                            />
                            <ErrorMessage source={errors.email} />
                        </div>
            
                        {/* Address */}
                        <div>
                            <label className="fw-bold">Address:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="Address"
                                {...register("address")}
                            />
                            <ErrorMessage source={errors.address} />
                        </div>
            
                        {/* City */}
                        <div>
                            <label className="fw-bold">City:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="City"
                                {...register("city")}
                            />
                            <ErrorMessage source={errors.city} />
                        </div>
            
                        {/* State / Province */}
                        <div>
                            <label className="fw-bold">State / Province:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="State / Province"
                                {...register("province")}
                            />
                            <ErrorMessage source={errors.province} />
                        </div>
            
                        {/* Zip*/}
                        <div>
                            <label className="fw-bold">Postal / Zip Code:</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                placeholder="Postal / Zip Code"
                                {...register("zip")}
                            />
                            <ErrorMessage source={errors.zip} />
                        </div>

                        <Button
                            className="mx-auto w-50 donate-btn btn-lg"
                            // variant="primary"
                            disabled={networkRequest}
                            onClick={handleSubmit(onSubmit)}
                        >
                            { (networkRequest) && <ThreeDotLoading color="#ffffff" size="small" /> }
                            { (!networkRequest) && `Join Us` }
                        </Button>
                    </Form>
                </div>
                <div className="col-sm-12 col-md-8 my-3">
                    <img src={IMAGES.flyer} className="volunteer-img w-100" style={{height: '75vh'}} />
                </div>
            </div>
        </div>
    )
}

export default Registration;