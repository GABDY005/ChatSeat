let users = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email:'JohnDoe@gmail.com',
        password:'123456',
        role: 'listener',
    }
];

export const getUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

export const createUser = (newUser) => {
    const id = users.length + 1;
    const userWithId = { id, ...newUser };
    users.push(userWithId);
    return userWithId;  
};