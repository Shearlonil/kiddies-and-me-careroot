import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ErrorMessage from '../Components/ErrorMessage';
import { schema } from '../yup-schemas/registration-schema';
import { ThreeDotLoading } from '../Components/Indicators';
import IMAGES from "../assets/images";
import ConfirmDialog from '../Components/DialogBoxes/ConfirmDialog';
import handleErrMsg from '../Utils/error-handler';
import registrantController from '../controllers/registrant-controller';

const Registration = () => {
    const navigate = useNavigate();

    const [networkRequest, setNetworkRequest] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [formData, setFormData] = useState({});
            
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleOpenModal = () => {
        setDisplayMsg('Submit Registration form?');
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

	const handleConfirmOK = async () => {
        setShowModal(false);
		try {
			setNetworkRequest(true);
			await registrantController.onboarding(formData);
			
			toast.info('Form submission successful');
			setNetworkRequest(false);
			navigate("/");
		} catch (error) {
			// display error message
			setNetworkRequest(false);
			toast.error(handleErrMsg(error).msg);
		}
	}

	const onSubmit = async (data) => {
		setFormData(data);
		handleOpenModal();
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
            
                        {/* Number of people attending */}
                        <div>
                            <label className="fw-bold">Number of people attending:</label>
                            <input
                                type="number"
                                className="form-control shadow-sm"
                                placeholder="Phone Number"
                                {...register("no_attending")}
                            />
                            <ErrorMessage source={errors.no_attending} />
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
                                type="number"
                                className="form-control shadow-sm"
                                placeholder="Postal / Zip Code"
                                {...register("zip")}
                            />
                            <ErrorMessage source={errors.zip} />
                        </div>
            
                        <div>
                            <p>
                                We will be holding our events at different locations around Medway. Please click one you will be attending. Data and location will be
                                confirmed on all our social media networks. Facebook and Instagram 
                            </p>
                        </div>
            
                        {/* Locations */}
                        <div className='d-flex flex-wrap gap-4'>
                            <div className='d-flex gap-1'>
                                <input
                                    type="checkbox"
                                    className="shadow-sm"
                                    name='Walderslade'
                                    value='Walderslade'
                                    {...register("locations")}
                                />
                                <label className="fw-bold">Walderslade</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    className="shadow-sm"
                                    name='Lordswood'
                                    value='Lordswood'
                                    {...register("locations")}
                                />
                                <label className="fw-bold">Lordswood</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    className="shadow-sm"
                                    name='Wayfield'
                                    value='Wayfield'
                                    {...register("locations")}
                                />
                                <label className="fw-bold">Wayfield</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    className="shadow-sm"
                                    name='Rochester'
                                    value='Rochester'
                                    {...register("locations")}
                                />
                                <label className="fw-bold">Rochester</label>
                            </div>
                            <div className='d-flex gap-2'>
                                <input
                                    type="checkbox"
                                    className="shadow-sm"
                                    name='Maidstone'
                                    value='Maidstone'
                                    {...register("locations")}
                                />
                                <label className="fw-bold">Maidstone</label>
                            </div>
                        </div>
                        <ErrorMessage source={errors.locations} />

                        <Button
                            className="mx-auto w-50 orange-btn btn-lg"
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
                    <img src={IMAGES.flyer} className="volunteer-img w-100" style={{height: '80vh'}} />
                </div>
            </div>
            <ConfirmDialog
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmOK}
                message={displayMsg}
            />
        </div>
    )
}

export default Registration;