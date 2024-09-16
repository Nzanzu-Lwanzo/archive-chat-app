import { Sequelize } from "sequelize";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const db = join(dirname(fileURLToPath(import.meta.url)),"./sqlite.db");

const sequelize = new Sequelize({
    storage : db,
    dialect : 'sqlite',
    logging :false,
    database : "chat-app",
    sync : {force:true},
    define : {
        underscored : true,
        updatedAt : false,
    }
})


export default sequelize;
