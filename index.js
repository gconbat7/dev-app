const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())



//------------------------------------------------------MÉTODOS HTTP------------------------------------------------------------------

const users = []


//Middleware
const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()

}


//GET (READ) → Utilizado para ler ou recuperar uma representação de um recurso
app.get("/users", (request, response) => {
    return response.json(users)
})


//POST (CREATE) → Utilizado para criar novos recursos. Em csao de sucesso, retorna o status code 200(OK) 201(CREATED)
app.post("/users", (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})


//PUT (UPDATE) → Utilizado para modificar um recurso, colocando um recurso conhecido no body da requisição contendo novas informações
app.put("/users/:id", checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }

    
    users[index] = updateUser


    return response.json(updateUser)
})


//DELETE (DELETE) → Utilizado para remover um recurso indentificado por uma URI. Em uma deleção bem sucedida retorna status 200(OK)
app.delete("/users/:id", checkUserId, (request, response) => {

    const index = request.userIndex
   
    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(3000, () =>{
    console.log("💥💥🚀Executado com sucesso👍🏾")
})