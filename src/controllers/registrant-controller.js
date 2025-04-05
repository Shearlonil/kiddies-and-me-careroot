import httpService from "../axios/http-service";

//  fetch in stock items for sales/shelf view
const onboarding = async (registrant) => {
    return await httpService.post(`/registrants/onboarding`, registrant);
}

const fetchAll = async (reqBody, pageSpan) => {
    return await httpService.post(`/registrants/all/${pageSpan}`, reqBody);
}

export default {
    onboarding,
    fetchAll,
}
