import axios from "axios";
import API_BASE_URL from "../api/api";

export const loginRecruiter = async (email, password) => {

    const response = await axios.post(

        `${API_BASE_URL}/login`,

        {
            email,
            password
        }

    );

    return response.data;
};

export const registerRecruiter = async (name, email, password) => {

    const response = await axios.post(
        `${API_BASE_URL}/register`,
        {
            name,
            email,
            password
        }
    );

    return response.data;
};