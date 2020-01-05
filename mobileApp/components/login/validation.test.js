import Validate from './validation';

const usernameError = "Please enter a username";
const passwordError = "Please enter a password";

describe("Validate function", () => {
    it("Should give error when too short username", () => {
        const username = "";
        const result = Validate("username", username);
        expect(result).toBe(usernameError);
    });
    it("Should give error when too short password", () => {
        const password = "";
        const result = Validate("password", password);
        expect(result).toBe(passwordError);
    });
    it("Should work when username is long enough", () => {
        const username = "test";
        const result = Validate("username", username);
        expect(result).toBeUndefined();
    });
    it("Should work when password is long enough", () => {
        const password = "test";
        const result = Validate("password", password);
        expect(result).toBeUndefined();
    })
});