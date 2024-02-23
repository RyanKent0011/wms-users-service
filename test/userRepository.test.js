const {findUserByUsername, createUser} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection");
const {User} = require("../src/entities/user");

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB()
    });

    const username = 'Pietro0096'
    const expectedUser = {
        "_name": "Pietro",
        "_surname": "Lelli",
    };

    it("should create a new user",async () =>{
        const result=await createUser(new User("000867",username,"$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW","Pietro","Lelli","Operational"))
        expect(result).toBeDefined()
    })

    it('should find a user by username', async () => {
        const user = await findUserByUsername(username);
        expect(user._name).toEqual(expectedUser._name);
        expect(user._surname).toEqual(expectedUser._surname);
    });

    it('should return null if user is not found', async () => {
        const username = 'nonexistentuser';
        const user = await findUserByUsername(username);

        expect(user).toBeNull();
    });

});