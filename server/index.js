const express = require('express');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));