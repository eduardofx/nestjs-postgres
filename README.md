
Backend
> Nestjs + Sequelize-Typescript + Postgresql + Swagger + Jest


## Execução

> docker-compose build

> docker-compose up -d

(Caso não inicie, rode novamente o comando "docker-compose up -d", pode haver conflitos)

# Teste
>  npm test

Documentação

http://localhost:3000/documentation/


![Panel](https://i.ibb.co/yXQBZnm/Sem-t-tulo.jpg)

Registre via post ou swagger

http://localhot:3000/users/register
```
{
  "email": "eduardok.fx@gmail.com",
  "password": "123456",
  "firstName": "Eduardo",
  "lastName": "Kawassaki",
  "gender": "male",
  "birthday": "1989-06-30"
}
```