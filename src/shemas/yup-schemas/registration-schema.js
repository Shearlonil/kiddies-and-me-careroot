import * as yup from "yup";

const schema = yup.object().shape({
    f_name: yup.string().required("First Name is required"),
    l_name: yup.string().required("Last Name is required"),
    no_attending: yup.number().typeError('Must be a number').positive("Must be greater than 0").required("required"),
    city: yup.string().required("City is required"),
    province: yup.string().required("Location is required"),
    zip: yup.string().required("Postcode is required"),
    phone_no: yup.string()
        .matches(/^\d{10,11}$/, "Invalid phone number")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    locations: yup.array().typeError('Please select a location').min(1, "Please select a location").of(yup.string().required('A location is required')).required('A location is required'),
});

export { schema };