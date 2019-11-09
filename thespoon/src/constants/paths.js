let BACKEND = "";

const paths = {
    restApi: {
        registrationRestaurantOwner: BACKEND + "/api/user/owner/registration",
        registrationCustomer: BACKEND + "/api/user/customer/registration",
        login: BACKEND + "/api/user/login"
    },
};

export default paths;