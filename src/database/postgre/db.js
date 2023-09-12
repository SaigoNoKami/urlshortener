/* eslint-disable @typescript-eslint/no-var-requires */
const sq = require('sequelize')
require('dotenv').config()

const sequelize = new sq.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_HOST, // Хост бази даних
    port: process.env.DB_PORT, // Порт бази даних
    dialect: process.env.DB_DIALECT, // Тип бази даних (в даному випадку PostgreSQL)
    pool: {
      max: 5, // Максимальна кількість з'єднань у пулі
      min: 0, // Мінімальна кількість з'єднань у пулі
      acquire: 30000, // Таймаут на з'єднання (30 секунд)
      idle: 10000 // Таймаут на бездіяльність (10 секунд)
    },
    logging: false // Вимкнути логування SQL-запитів (або встановити у true, щоб включити логування)
}
)
module.exports = sequelize

