import httpService from "../axios/http-service";

//  fetch in stock items for sales/shelf view
const create = async (data) => {
    return await httpService.post(`/events/create`, data);
}

const recent = async () => {
    return await httpService.get(`/events/recent`);
}

const fetchUpComing = async () => {
    return await httpService.get(`/events/upcoming`);
}

const fetchAll = async (reqBody, pageSpan) => {
    return await httpService.post(`/events/all/${pageSpan}`, reqBody);
}

export default {
    create,
    recent,
    fetchUpComing,
    fetchAll,
}