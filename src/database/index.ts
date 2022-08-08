import { DataSource } from "typeorm";

const appDataSource = new DataSource ({
  type: "sqlite",
  database: "src/database/database.sqlite"
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

module.exports = appDataSource