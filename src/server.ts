import chalk from "chalk";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();
const port = (+process.env.PORT || 4000);
app.listen(port, () => {
    console.log(chalk.bold.green(`Server running on port ${port}!`));
});