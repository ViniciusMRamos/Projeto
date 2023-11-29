const swaggerAutogen = require('swagger-autogen')()

output = './api_livro_doc.json'
endpoints = ['./app.js']

const doc = {
    info : {
        version: '1.0',
        title: 'Controle de Livros',
        description: 'API REST para controle de livros'
    }
}

swaggerAutogen(output, endpoints, doc)