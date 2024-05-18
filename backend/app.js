const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const Task = require('./model/task');
const User = require('./model/user');

const { verifyToken, generateToken } = require('./helper/jwtUtils');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://deepakkumarcopy:25PBG8BpamIv7mSe@cluster0.5vguryb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user);
        res.status(200).json({ user, token, message: 'User registered successfully', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: true });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password', success: true });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password', success: true });
        }
        const token = generateToken(user);
        res.status(200).json({ token, user, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

// Create a task
app.post('/create_task', async (req, res) => {
    try {
        if (verifyToken(req.headers.token) == null) {
            res.status(401).json({ message: 'User not authorized', success: false });
        } else {
            const task = new Task(req.body);
            await task.save();
            res.status(200).json({ message: 'Task created successfully', task, success: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

// Update a task by ID
app.post('/update_task/:id', async (req, res) => {
    try {
        if (verifyToken(req.headers.token) == null) {
            res.status(401).json({ message: 'User not authorized', success: false });
        }

        const { id } = req.params;
        const { title, description, status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.status(200).json({ task, success: true, message: 'Task updated successfully', });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

// Get all tasks
app.get('/get_tasks/:user', async (req, res) => {
    try {
        if (verifyToken(req.headers.token) == null) {
            res.status(401).json({ message: 'User not authorized', success: false });
        } else {
            const { user } = req.params;
            const tasks = await Task.find({ user });
            res.status(200).json({ tasks, success: true });
        }

    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

// Delete a task by ID
app.delete('/delete_task/:id', async (req, res) => {
    try {
        if (verifyToken(req.headers.token) == null) {
            res.status(401).json({ message: 'User not authorized', success: false });
        }

        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});



// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });