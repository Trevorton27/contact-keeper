const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect database
connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({msg: 'Alas we welcome you to yon school contact keeper. Verily that thou wouldst thus for thee and whatnot.'})
);

app.listen(PORT, () => console.log(`Server done started on port ${PORT}`));