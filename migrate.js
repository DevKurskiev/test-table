const { MongoClient } = require("mongodb")
const client = new MongoClient('mongodb+srv://admin:admin@cluster0.tlmzl.mongodb.net/my-db?retryWrites=true&w=majority')

async function main () {
  await client.connect()
  const collection = client.db("my-db").collection("cars")
  await collection.drop()
  await collection.insertMany([
    { date: new Date("2021-01-02 23:59:59"), distance: 13233, quantity: 10, name: "BMW" },
    { date: new Date("2021-02-10 23:59:59"), distance: 112233, quantity: 14, name: "Mersedes" },
    { date: new Date("2020-11-12 23:59:59"), distance: 1233, quantity: 101, name: "Mersedes" },
    { date: new Date("2021-01-02 23:59:59"), distance: 133, quantity: 10, name: "Kia" },
    { date: new Date("2021-03-25 23:59:59"), distance: 100, quantity: 5, name: "Audi" },
    { date: new Date("2021-11-13 23:59:59"), distance: 342, quantity: 3, name: "Lamborgini" },
    { date: new Date("2021-02-25 23:59:59"), distance: 10000, quantity: 105, name: "Lada" },
    { date: new Date("2021-04-26 23:59:59"), distance: 34444, quantity: 45, name: "Opel" },
    { date: new Date("2021-05-12 23:59:59"), distance: 80500, quantity: 24, name: "Mazda" },
    { date: new Date("2021-02-13 23:59:59"), distance: 12221, quantity: 6, name: "Tesla" },
    { date: new Date("2021-07-25 23:59:59"), distance: 13343, quantity: 142, name: "Nissan" },
    { date: new Date("2021-12-01 23:59:59"), distance: 453, quantity: 19, name: "Porshe" },
    { date: new Date("2021-08-17 23:59:59"), distance: 203, quantity: 4, name: "Ferrari" },
    { date: new Date("2021-08-28 23:59:59"), distance: 5, quantity: 2, name: "Bugatti" }
  ])
  console.log("Inserted")
}
main()
