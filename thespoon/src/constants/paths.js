let BACKEND = "localhost:80";

const paths = {
    restApi: {
        registrationRestaurantOwner: "http://" + BACKEND + "/api/user/owner/registration",
        registrationCustomer: "http://" + BACKEND + "/api/user/customer/registration",
        login: "http://" + BACKEND + "/api/user/login"
    },
};

export default paths;