import * as yup from "yup";
import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../Components/ErrorMessage";
import { useAuth } from '../app-context/auth-user-context';
import staffController from "../controllers/staff-controller";
import handleErrMsg from "../Utils/error-handler";
import IMAGES from "../assets/images";
import { ThreeDotLoading } from "../Components/Indicators";
import ConfirmDialog from "../Components/DialogBoxes/ConfirmDialog";

const ChangePassword = () => {
	const navigate = useNavigate();

	const schema = yup.object().shape({
		current_pw: yup.string().required("Enter current password"),
		new_pw: yup
			.string()
			.min(6, "Password must be a min of 6 characters!")
			.required("Input correct password"),
		confirm_new_pw: yup
			.string()
			.oneOf([yup.ref("new_pw"), "Passwords must match"], "Passwords must match")
			.required("Password Not a match!"),
	});

	const [networkRequest, setNetworkRequest] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [formData, setFormData] = useState({});

	const { authUser, handleRefresh, logout } = useAuth();

	// Yup Integration with "react-hook-form"
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

    const handleOpenModal = () => {
        setDisplayMsg(`Set new Password?`);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

	const handleConfirmAction = async () => {
        setShowModal(false);
		setNetworkRequest(true);
        try {
			await staffController.updatePassword(formData);
			setNetworkRequest(false);
			toast.info("Password update successful");
			navigate("/dashboard");
		} catch (error) {
			// Incase of 408 Timeout error (Token Expiration), perform refresh
			try {
				if(error.response?.status === 408){
					await handleRefresh();
					return handleConfirmAction(formData);
				}
				// display error message
				toast.error(handleErrMsg(error).msg);
			} catch (error) {
				// if error while refreshing, logout and delete all cookies
				logout();
			}
			setNetworkRequest(false);
		}
	}

	const onSubmit = async (data) => {
		setFormData(data);
		handleOpenModal();
	};

	return (
		<>
			<div className="container border rounded-3 bg-light px-4 pt-5 my-4 shadow-sm" style={{minHeight: '70vh'}}>
				<div className="text-center">
					<img className="mb-4" src={IMAGES.logo} height="120" />
					<h1 className="h3 mb-3 fw-normal">Change Password</h1>
				</div>
				<div className="container mx-auto row">
					<div className="col-12 col-md-6">
						<div className="ps-md-5 pe-md-5">
							<Form className="text-dark">
								<Form.Group className="mb-3" controlId="current_pw">
									<Form.Label className='fw-bold'>Current Password</Form.Label>
									<Form.Control
										{...register("current_pw")}
										type="password"
										placeholder="Current Password..."
									/>
									<ErrorMessage source={errors.current_pw} />
								</Form.Group>

								<Form.Group className="mb-3" controlId="new_pw">
									<Form.Label className='fw-bold'>New Password</Form.Label>
									<Form.Control
										{...register("new_pw")}
										type="password"
										placeholder="New Password..."
									/>
									<ErrorMessage source={errors.new_pw} />
								</Form.Group>

								<Form.Group className="mb-3" controlId="confirm_new_pw">
									<Form.Label className='fw-bold'>Confirm New Password</Form.Label>
									<Form.Control
										{...register("confirm_new_pw")}
										type="password"
										placeholder="Confirm New Password..."
									/>
									<ErrorMessage source={errors.confirm_new_pw} />
								</Form.Group>
								<div className="text-center">
									<button
										className="btn btn-outline-secondary w-50 my-2 py-2"
										type="submit"
										onClick={handleSubmit(onSubmit)}
										disabled={networkRequest}
									>
										{ networkRequest && <ThreeDotLoading color={'#0d6efd'} /> }
										Submit
									</button>
								</div>
								<p className="mt-5 mb-3 text-white">&copy; 2024</p>
							</Form>
						</div>
					</div>
					<div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
						<img src={IMAGES.authentication} />
					</div>
				</div>
            	<ConfirmDialog show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmAction} message={displayMsg} />
			</div>
		</>
	);
};

export default ChangePassword;
