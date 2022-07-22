import { faker } from "@faker-js/faker";

const login = {
    email: faker.internet.email(),
    password: faker.internet.password(10)
};

const wrongLoginEmail = {
    email: faker.name.findName(),
    password: faker.internet.password(10)
};

const wrongLoginPassword = {
    email: faker.internet.email(),
    password: faker.internet.password(9)
};

const userFactory = {
    login,
    wrongLoginEmail,
    wrongLoginPassword
};

export default userFactory;