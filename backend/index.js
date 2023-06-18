const express = require('express');
const bodyParser = require('body-parser');
const ZombieRouter = require("./routes/ZombieRouter");

const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/zombie", ZombieRouter);

app.listen(8000, () => {
    console.log("is listening port 8000");
});