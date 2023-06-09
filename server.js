//what licence to choose
//where to host
require("dotenv").config();
const connectDb = require("./config/connectDB");
const { app } = require("./app");

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
