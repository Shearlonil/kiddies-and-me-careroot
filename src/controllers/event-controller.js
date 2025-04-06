import httpService from "../axios/http-service";

const create = async (data) => {
    return await httpService.post(`/events/create`, data);
}

const update = async (data) => {
    return await httpService.post(`/events/update`, data);
}

const markdone = async (id) => {
    return await httpService.post(`/events/update/${id}`);
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

const findById = async (id) => {
    return await httpService.get(`/events/find/${id}`);
}

export default {
    create,
    update,
    markdone,
    recent,
    fetchUpComing,
    fetchAll,
    findById,
}