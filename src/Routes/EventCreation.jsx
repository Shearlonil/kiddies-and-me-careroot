import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ConfirmDialog from '../Components/DialogBoxes/ConfirmDialog';
import { ThreeDotLoading } from '../Components/Indicators';

import editorSchema from "../shemas/quill-schema";
import Editor from '../Components/quill/quill-editor';
import Quill from 'quill';
import Ajv from "ajv";
import { useAuth } from '../app-context/auth-user-context';
import eventController from '../controllers/event-controller';

const Delta = Quill.import('delta');
import handleErrMsg from '../Utils/error-handler';

const EventCreation = () => {

    const ajv = new Ajv({allErrors: true}); // options can be passed, e.g. {allErrors: true}
	const navigate = useNavigate();
    
    const { handleRefresh, logout } = useAuth();
    
	// Use a ref to access the quill instance directly
	const quillRef = useRef();
    const [networkRequest, setNetworkRequest] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");

    const handleOpenModal = () => {
        setDisplayMsg("Create new event?");
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

	const handleConfirmAction = async () => {
        setShowModal(false);
		try {
            setNetworkRequest(true);
            const { ops } = quillRef.current.getContents();
            const isValid = ajv.validate(editorSchema, ops);
            if (!isValid) {
                toast.error("Please input valid event");
            }else {
			    await eventController.create(ops);
            }
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
	}

    return (
        <div className="container my-5" style={{minHeight: '65vh'}}>
			<h2 className="paytone-one text-white fw-bold p-2 orange-btn">New Event</h2>

            <div id="body" className="mb-3">
                <Editor ref={quillRef} />
            </div>
            <Button variant="" className="btn-outline-primary" style={{minWidth: '150px'}} onClick={() => handleOpenModal()} disabled={networkRequest}>
                {!networkRequest && 'Save'}
                { networkRequest && <ThreeDotLoading color="#ffffff" size="small" variant = "pulsate" />}
            </Button>
            <ConfirmDialog show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmAction} message={displayMsg} />
        </div>
    )
}

export default EventCreation;