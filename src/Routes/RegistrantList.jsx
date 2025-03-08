import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { format } from "date-fns";

import handleErrMsg from "../Utils/error-handler";
import { useAuth } from "../app-context/auth-user-context";
import registrantController from "../controllers/registrant-controller";
import PaginationLite from '../Components/PaginationLite';
import { OrbitalLoading } from "../Components/Indicators";
import EllipsisText from "../Components/EllipsisText";

const RegistrantLists = () => {

    // for pagination
    const [pageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
    const [totalRegistrantCount, setTotalRegistrantCount] = useState(0);

    //  data returned from DataPagination
    const [pagedData, setPagedData] = useState([]);

    const { handleRefresh, logout } = useAuth();

	const [registrants, setRegistrants] = useState([]);

	const [networkRequest, setNetworkRequest] = useState(false);

    const [reqBody, setReqBody] = useState({
        limit: pageSize,
		idOffset: 0,
    });

    useEffect( () => {
		initialize();
    }, []);

	const initialize = async () => {
		try {
			setNetworkRequest(true);
            const response = await registrantController.fetchAll(reqBody, 1);  // 1 represents the pageSpan

			setRegistrants(response.data.registrants);
			setTotalRegistrantCount(response.data.count);
			setNetworkRequest(false);
		} catch (error) {
			// Incase of 408 Timeout error (Token Expiration), perform refresh
			try {
				if(error.response?.status === 408){
					await handleRefresh();
					return initialize();
				}
				setNetworkRequest(false);
				// display error message
				toast.error(handleErrMsg(error).msg);
			} catch (error) {
				// if error while refreshing, logout and delete all cookies
				logout();
			}
		}
	};

    const setPageChanged = async (pageNumber) => {
        const startIndex = (pageNumber - 1) * pageSize;
        if(pageNumber === 1) {
            setPagedData(registrants.slice(startIndex, startIndex + pageSize));
        }else if(pageNumber > 1) {
            if(registrants.length > startIndex) {
                const arr = registrants.slice(startIndex, startIndex + pageSize);
                setPagedData(arr);
            }else {
                // get id of last element in registrants array to use as query offset
                const body = {...reqBody};
                body.idOffset = registrants[registrants.length - 1].id;
                setReqBody(body);
				paginateFetch(body, pageNumber, pageNumber - currentPage);
            }
        }
    };

    const paginateFetch = async (reqBody, pageNumber, pageSpan) => {
        try {
            setNetworkRequest(true);
            const response = await registrantController.fetchAll(reqBody, pageSpan);

            //  check if the request to fetch indstries doesn't fail before setting values to display
            if(response && response.data){
                setRegistrants([...registrants, ...response.data.registrants]);
                /*  normally, we would call setPagedData(response.data.registrants) here but that isn't necessary because calling setCurrentPage(pageNumber)
                    would cause PaginationLite to re-render as currentPage is part of it's useEffect dependencies. This re-render triggers setPageChanged to be
                    called with currentPage number. the 'else if' block then executes causing setPagedData to be set  */
					setNetworkRequest(false);
            }
            // update page number
            setCurrentPage(pageNumber);
        } catch (error) {
            // Incase of 408 Timeout error (Token Expiration), perform refresh
            try {
                if(error.response?.status === 408){
                    await handleRefresh();
                    return paginateFetch(reqBody, pageNumber, pageSpan);
                }
                // display error message
                toast.error(handleErrMsg(error).msg);
            } catch (error) {
                // if error while refreshing, logout and delete all cookies
                logout();
            }
        }
    }
	return (
		<div className="container my-5" style={{minHeight: '65vh'}}>
			<h2 className="paytone-one text-white fw-bold p-2 orange-btn">Registrants</h2>

            <div className="justify-content-center d-flex">
                {networkRequest && <OrbitalLoading color='red' />}
            </div>

			<Table striped className="border" responsive="sm">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>City</th>
						<th>State / Province</th>
						<th>Locations</th>
						<th>Address</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{pagedData.map((registrant, i) => (
						<tr key={registrant.id}>
							<td> { registrant.fname } </td>
							<td> { registrant.lname } </td>
							<td> { registrant.email } </td>
							<td> { registrant.phone_number } </td>
							<td> { registrant.city } </td>
							<td> { registrant.province } </td>
							<td> <EllipsisText message={registrant.locations.split('+').join(', ') } maxLength={20} /> </td>
                            <td> <EllipsisText message={registrant.address} maxLength={20} /> </td>
                            <td> {format(registrant.createdAt, "dd/MM/yyyy HH:mm:ss")} </td>
						</tr>
					))}
				</tbody>
			</Table>
			<PaginationLite itemCount={totalRegistrantCount} pageSize={pageSize} setPageChanged={setPageChanged} pageNumber={currentPage} />
		</div>
	);
};

export default RegistrantLists;
