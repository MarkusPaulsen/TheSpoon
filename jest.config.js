module.exports = {
    testPathIgnorePatterns : ["/node_modules/", "/thespoon/", "/mobileApp/"],
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
};