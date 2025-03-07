import * as yup from "yup";

const schema = yup.object().shape({
    f_name: yup.string().required("First Name is required"),
    l_name: yup.string().required("Last Name is required"),
    no_attending: yup.number().positive("Must be greater than 0").required("required"),
    city: yup.string().required("City is required"),
    province: yup.string().required("State/Province is required"),
    zip: yup.number().positive("Must be greater than 0").required("required"),
    phone_no: yup.string()
        .matches(/^\d{10,11}$/, "Invalid phone number")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});

export { schema };