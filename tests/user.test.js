const request = require('supertest')
const app = require('../src/index')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should register a new user', async () => {
    const response = await request(app)
                            .post('/users')
                            .send(userOne)
                            .expect(201)
    //assert that databse was changed correctly

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

})  