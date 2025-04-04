import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    venue: yup.string().required("Venue is required"),
    time: yup.string().required("required"),
});

export { schema };