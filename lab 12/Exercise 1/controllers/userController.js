// In-memory data store for users
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};

// @desc    Get single user
// @route   GET /api/users/:id
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found with id ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

// @desc    Create new user
// @route   POST /api/users
exports.createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name and email'
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        data: newUser
    });
};

// @desc    Update user
// @route   PUT /api/users/:id
exports.updateUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found with id ${req.params.id}`
        });
    }

    const { name, email } = req.body;

    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    res.status(200).json({
        success: true,
        data: users[userIndex]
    });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
exports.deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found with id ${req.params.id}`
        });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
};
