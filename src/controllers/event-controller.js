import httpService from "../axios/http-service";

//  fetch in stock items for sales/shelf view
const create = async (data) => {
    return await httpService.post(`/event/create`, data);
}

const fetchAll = async (reqBody, pageSpan) => {
    return await httpService.post(`/event/all/${pageSpan}`, reqBody);
}

export default {
    create,
    fetchAll,
}