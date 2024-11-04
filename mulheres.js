const express = require('express')// estou iniciando express
const router = express.Router()// aqui estou iniciando a primeira parte da rota
const cors = require('cors')//trazendo o pct cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados')// estou ligando ao arquivo banco de dados
conectaBancoDeDados ()// chama a função que conecta ao banco de dados
const Mulher = require('./mulherModel')
const app = express ()// estou inicinado o app
app.use(express.json())
app.use(cors())
const porta = 3333// estou iniciando a porta

//GET
async function mostraMulheres(request, response) {
    try{
      const mulheresVindasDoBancoDeDados = await Mulher.find()
      
      
      response.json(mulheresVindasDoBancoDeDados)

    }catch (erro) {
      console.log(erro)

    }
}

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({ 
            nome: request.body.nome,
            imagem: request.body.imagem,
            minibio: request.body.minibio,
            citacao: request.body.citacao
    })
    try{
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
    } catch (erro) {
      console.log(erro)
    }   
}

//PATCH

async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)
    
    if (request.body.nome) {
 
    mulherEncontrada.nome = request.body.nome
  }
    if (request.body.minibio) {
 
    mulherEncontrada.minibio = request.body.minibio
 
  }
    if (request.body.imagem) {
 
    mulherEncontrada.imagem = request.body.imagem
  }
    if (request.body.citacao) {
 
    mulherEncontrada.citacao = request.body.citacao
  }
  const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
  response.json(mulherAtualizadaNoBancoDeDados)

  } catch(erro){
    console.log(erro)
  }

}

//DELETE

async function deletaMulher(request, response) {
  try{
      await Mulher.findByIdAndDelete(request.params.id)
      response.json({ mensagem: 'Mulher deletada com sucesso!'})
  } catch(erro) {
    console.log(erro)
  }

}
//ROUTER
app.use(router.patch('/mulheres/:id', corrigeMulher))// configurei a rota PATCH/mulheres
app.use(router.delete('/mulheres/:id', deletaMulher))//configurei a rota DELETE/mulheres
app.use(router.get('/mulheres', mostraMulheres))// configurei a rota GET/mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei a rota POST/mulheres

//PORTA
function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}
app.listen(porta, mostraPorta)// servidor ouvindo a PORTA