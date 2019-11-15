let BACKEND = ''//"http://thespoon.herokuapp.com";

const paths = {
    restApi: {
        registrationRestaurantOwner: BACKEND + "/api/user/owner/register",
        registrationCustomer: BACKEND + "/api/user/customer/register",
        login: BACKEND + "/api/user/login"
    },
};

export default paths;