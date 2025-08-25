


class UserTable {
    constructor() {
        this.users = new Map();
        this.autoIncrement = 1;
    };


    create({ name, email, password, address, gender, role }) {
        for (const user of this.users.values()) {
            if (user.email === email) throw new Error('EMAIL ALREADY EXISTS!');
        };

        const id = this.autoIncrement++;
        const user = { id, name, email, password, address, gender, role: role ?? 'user' };
        this.users.set(id, user);

        return user;
    };


    findAll() {
        return Array.from(this.users.values()) || [];
    };

    findAllUser() {
        return Array.from(this.users.values()).filter(item => item.role === 'user') || [];
    };


    findOne(id) {
        return Array.from(this.users.values()).find((user) => user?.id === id) || null;
    };

    findAllByEmail(email) {
        return Array.from(this.users.values()).find((user) => user?.email === email) || null;
    };
};


const User = new UserTable();

export default User;
