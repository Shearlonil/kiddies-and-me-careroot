import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Datetime from "react-datetime";
import { format } from "date-fns";
import { Controller, useForm } from 'react-hook-form';

import { useAuth } from '../../app-context/auth-user-context';
import { schema } from '../../shemas/yup-schemas/event-schema';
import eventController from '../../controllers/event-controller';
import handleErrMsg from '../../Utils/error-handler';
import ErrorMessage from '../../Components/ErrorMessage';
import IMAGES from '../../assets/images';
import ConfirmDialog from '../../Components/DialogBoxes/ConfirmDialog';
import { ThreeDotLoading } from '../../Components/Indicators';
import Skeleton from 'react-loading-skeleton';

const EventUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { handleRefresh, logout } = useAuth();
    
    const [networkRequest, setNetworkRequest] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [confirmDialogEvtName, setConfirmDialogEvtName] = useState(null);
    const [selectedDateIndex, setSelectedDateIndex] = useState(-1);

    const [dates, setDates] = useState([]);
    const [eventForm, setEventForm] = useState(null);
    
    const dateSchema = yup.object().shape({
        date: yup
            .date()
            // .transform( (value, originalValue) => {
            //     const result = parse(originalValue, "dd.MM.yyyy", new Date());
            //     return result;
            // })
            .typeError("please enter a valid date")
            .required(),
    });

	const {
		handleSubmit: handleDateSubmit,
		control,
	} = useForm({
		resolver: yupResolver(dateSchema),
	});

	const {
		register,
		handleSubmit: handleEventSubmit,
        setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: null,
			venue: null,
			time: null,
		},
	});
        
    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        try {
			setNetworkRequest(true);
            const response = await eventController.findById(id);

            if (response && response.data) {
                setValue('title', response.data.title);
                setValue('venue', response.data.venue);
                setValue('time', response.data.time);
                const arr = [];
                response.data.EventDates.forEach(eventDate => {
                    arr.push(new Date(eventDate.date))
                });
                setDates(arr);
            }
			setNetworkRequest(false);
        } catch (error) {
            // Incase of 408 Timeout error (Token Expiration), perform refresh
			try {
				if(error.response?.status === 408){
					await handleRefresh();
					return initialize();
				}
				// display error message
				toast.error(handleErrMsg(error).msg);
			} catch (error) {
				// if error while refreshing, logout and delete all cookies
				logout();
			}
			setNetworkRequest(false);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

	const onSubmit = async (formData) => {
        if(dates.length <= 0){
            toast.error('Please add dates');
            return;
        }
        const arr = [];
        dates.forEach(date => arr.push(date.toISOString()));
        formData.id = id;
        formData.dates = arr;
        setEventForm(formData);
        setConfirmDialogEvtName('update');
        setDisplayMsg("Update event?");
        setShowModal(true);
	};

	const markdone = async (formData) => {
        setConfirmDialogEvtName('markdone');
        setDisplayMsg("Mark event as done?");
        setShowModal(true);
	};

	const onDateSubmit = (formData) => {
        const arr = [...dates];
        arr.push(formData.date);
        setDates(arr);
	};

	const handleConfirmAction = async () => {
        setShowModal(false);
        switch (confirmDialogEvtName) {
            case 'update':
                try {
                    setNetworkRequest(true);
                    await eventController.update(eventForm);
                    toast.info('Update successful');
                    navigate('/dashboard/events/all');
                    setNetworkRequest(false);
                } catch (error) {
                    // Incase of 408 Timeout error (Token Expiration), perform refresh
                    try {
                        if(error.response?.status === 408){
                            await handleRefresh();
                            return handleConfirmAction();
                        }
                        // display error message
                        toast.error(handleErrMsg(error).msg);
                    } catch (error) {
                        // if error while refreshing, logout and delete all cookies
                        logout();
                    }
                    setNetworkRequest(false);
                }
                break;
            case 'date':
                //  date removal from list
                dates.splice(selectedDateIndex, 1);
                setDates(dates);
                break;
            case 'markdone':
                try {
                    setNetworkRequest(true);
                    await eventController.markdone(id);
                    toast.info('Update successful');
                    navigate('/dashboard/events/all');
                    setNetworkRequest(false);
                } catch (error) {
                    // Incase of 408 Timeout error (Token Expiration), perform refresh
                    try {
                        if(error.response?.status === 408){
                            await handleRefresh();
                            return handleConfirmAction();
                        }
                        // display error message
                        toast.error(handleErrMsg(error).msg);
                    } catch (error) {
                        // if error while refreshing, logout and delete all cookies
                        logout();
                    }
                    setNetworkRequest(false);
                }
                break;
        }
	}

    const buildAddedDates = () => {
        return dates.map((date, index) => (
            <div key={index}  className={`m-3 bg-primary-subtle text-dark rounded-3 fw-bold p-2 fs-6 d-flex align-items-center justify-content-between`} >
                <small className="pe-2 me-2 m-0">{format(date, "dd-MM-yyyy")}</small>
                <div className="d-flex gap-2">
                    <CloseButton 
                        className="p-0" aria-label="Hide"
                        onClick={() => {
                            setDisplayMsg(`Remove ${format(date, "dd-MM-yyyy")} from the list?`);
                            setSelectedDateIndex(index);
                            setConfirmDialogEvtName('date');
                            handleOpenModal();
                        }} />
                </div>
            </div>
        ));
    };

    const buildSkeleton = () => {
        return <div className="bg-light p-4 rounded-4 border border-2 container">
            <Form.Group className="mb-3" controlId="title">
                <Row>
                    <Col sm={"12"} md="3">
                        <Skeleton />
                    </Col>
                    <Col sm={"12"} md="9">
                        <Skeleton />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="venue">
                <Row>
                    <Col sm={"12"} md="3">
                        <Skeleton />
                    </Col>
                    <Col sm={"12"} md="9">
                        <Skeleton />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
                <Row>
                    <Col sm={"12"} md="3">
                        <Skeleton />
                    </Col>
                    <Col sm={"12"} md="9">
                        <Skeleton />
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dates">
                <Row>
                    <Col sm={"12"} md="3">
                        <Skeleton />
                    </Col>
                    <Col sm={"12"} md="9">
                        <Skeleton />
                    </Col>
                </Row>
            </Form.Group>
            <div className="text-center">
                <Skeleton />
            </div>
        </div>
    };

    return (
        <div className="container my-5" style={{minHeight: '65vh'}}>
			<h2 className="paytone-one text-white fw-bold p-2 orange-btn">Update Event</h2>
            <div className="justify-content-center align-items-center d-flex flex-column" >
                <div className="text-center">
                    <img className="mb-2" src={IMAGES.logo} alt="" height="200" width={'100%'} />
                </div>
                {networkRequest && buildSkeleton()}
                {!networkRequest && <div className="bg-light p-4 rounded-4 border border-2">
                    <Form.Group className="mb-3" controlId="title">
                        <Row>
                            <Col sm={"12"} md="3">
                                <Form.Label>Title</Form.Label>
                            </Col>
                            <Col sm={"12"} md="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    {...register("title")}
                                />
                                <ErrorMessage source={errors.title} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="venue">
                        <Row>
                            <Col sm={"12"} md="3">
                                <Form.Label>Venue</Form.Label>
                            </Col>
                            <Col sm={"12"} md="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Venue"
                                    {...register("venue")}
                                />
                                <ErrorMessage source={errors.venue} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="time">
                        <Row>
                            <Col sm={"12"} md="3">
                                <Form.Label>Time</Form.Label>
                            </Col>
                            <Col sm={"12"} md="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Time"
                                    {...register("time")}
                                />
                                <ErrorMessage source={errors.time} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="dates">
                        <Row>
                            <Col sm={"12"} md="3">
                                <Form.Label>Dates</Form.Label>
                            </Col>
                            <Col sm={"12"} md="9">
                                <div className="d-flex flex-row gap-2">
                                    <Controller
                                        name="date"
                                        control={control}
                                        render={({ field }) => (
                                            <Datetime
                                                {...field}
                                                timeFormat={false}
                                                closeOnSelect={true}
                                                dateFormat="DD/MM/YYYY"
                                                inputProps={{
                                                    placeholder: "Add date",
                                                    className: "form-control",
                                                    readOnly: true, // Optional: makes input read-only
                                                }}
                                                value={field.value ? new Date(field.value) : null}
                                                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                                                /*	react-hook-form is unable to reset the value in the Datetime component because of the below bug.
                                                    refs:
                                                        *	https://stackoverflow.com/questions/46053202/how-to-clear-the-value-entered-in-react-datetime
                                                        *	https://stackoverflow.com/questions/69536272/reactjs-clear-date-input-after-clicking-clear-button
                                                    there's clearly a rendering bug in component if you try to pass a null or empty value in controlled component mode: 
                                                    the internal input still got the former value entered with the calendar (uncontrolled ?) despite the fact that that.state.value
                                                    or field.value is null : I've been able to "patch" it with the renderInput prop :*/
                                                renderInput={(props) => {
                                                    return <input {...props} value={field.value ? props.value : ''} />
                                                }}
                                            />
                                        )}
                                    />
                                    <Button
                                        variant="success"
                                        type="submit"
                                        onClick={handleDateSubmit(onDateSubmit)}
                                        disabled={networkRequest}
                                    >
                                        {networkRequest && <ThreeDotLoading color={"#ffffff"} />}
                                        {!networkRequest && "Add"}
                                    </Button>
                                </div>
                                {dates && buildAddedDates()}
                            </Col>
                        </Row>
                    </Form.Group>
                    <div className="text-center d-flex flex-column gap-3 align-items-center">
                        <Button
                            variant="success"
                            type="submit"
                            className='w-75'
                            onClick={handleEventSubmit(onSubmit)}
                            disabled={networkRequest}
                        >
                            {networkRequest && <ThreeDotLoading color={"#ffffff"} />}
                            {!networkRequest && "Update"}
                        </Button>

                        <Button
                            type="submit"
                            className='w-75 orange-btn'
                            onClick={handleEventSubmit(markdone)}
                            disabled={networkRequest}
                        >
                            {networkRequest && <ThreeDotLoading color={"#ffffff"} />}
                            {!networkRequest && "Mark Done"}
                        </Button>
                    </div>
                </div>}
            </div>
            <ConfirmDialog show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmAction} message={displayMsg} />
        </div>
    )
}

export default EventUpdate;