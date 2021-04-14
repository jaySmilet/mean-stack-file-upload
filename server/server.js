require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


//parse json/application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
const fileUploadRouter = require('./routes/file-upload/user');
const { json } = require('body-parser');

// cors
app.use(cors());

// Make "public" Folder Publicly Available
app.use('/public', express.static('public'));

app.use('/file-upload', fileUploadRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is live at:${process.env.PORT}`);
})
