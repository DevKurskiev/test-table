const express = require('express')
const { MongoClient } = require("mongodb")

const app = express()
const client = new MongoClient('mongodb+srv://admin:admin@cluster0.tlmzl.mongodb.net/my-db?retryWrites=true&w=majority')

async function main () {
  await client.connect()
  const collection = client.db("my-db").collection("cars")

  app.get('/api/table', async (req, res) => {
    const { sort, skip, take, filter } = req.query
    const options = {}
    const query = {}
    
    // Сортировка
    if (sort) {
      const [name, value] = sort.split(",")
      
      if (value) {
        options.sort = {
          [name]: +value
        }
      }
    }

    // Фильтр
    if (filter) {
      const [column, condition, value] = filter.split(",")
      let normalizedValue = value

      // Валидация даты
      if (column === "date") {
        if (isNaN(new Date(value).getTime())) {
          return res.status(400).send({ 
            status: "error", 
            message: "Неверный формат даты" 
          })
        }
        
        normalizedValue = new Date(value)
        normalizedValue.setHours(23);
        normalizedValue.setMinutes(59);
        normalizedValue.setSeconds(59);
      }

      // Валидация дистанции
      if (column === "distance") {
        normalizedValue = +value
        if (isNaN(normalizedValue)) {
          return res.status(400).send({ 
            status: "error",
            message: "Неправильно указана дистанция" 
          })
        }
      }

      // Валидация количества
      if (column === "quantity") {
        normalizedValue = +value
        if (isNaN(normalizedValue)) {
          return res.status(400).send({ 
            status: "error",
            message: "Неправильно указано количество" 
          })
        }
      }
      
      // Создаем фильтр
      if (column === "name") {
        query.name = {
          $regex: condition === "match" ? normalizedValue: `^${normalizedValue}$`,
          $options:"i"
        }
      } else {
        query[column] = condition === "equal" ? normalizedValue : {
          [condition === "lt" ? "$lt" : "$gt"]: normalizedValue
        }
      }
    }

    const count = await collection.count(query)
    const table = await collection.find(query, options).skip(+skip).limit(+take).toArray()

    res.send({
      count,
      table
    })
  })
  
  app.listen(3001, () => {
    console.log("Example app listening at http://localhost:3001")
  })
}

main().catch(console.error)