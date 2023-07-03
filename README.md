# :checkered_flag: Site de anúncios 
Site para fazer ver e fazer anúncios online.

## :technologist: Membros da equipe

André Luis Carvalho da Silva - 474137 Engenharia de software 
Lucas André Pacheco de Oliveira - 475597 Ciência de computação 

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Usuário público.
Usuário com login.
Usuário admin.


## :spiral_calendar: Entidades ou tabelas do sistema
Usuários que poderiam criar anúncios.
Anúncios disponíveis para a visualização.
Comentários que usuário logados poderiam deixar nos anúncios.
Administradores podem excluir anúncios e banir usuários.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação
Cadastrar usuários.
Criar anúncios.
Comentários disponíveis nos anúncios.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Vue-3 Javascript, Bootstrap, bootstrapIcons, Vite.

**Backend:**

Strapi, Axios, Pinia, VueRouter.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário public |  |  X  |  |  |
| Usuário login | X |  X  | X  | X |
| Usuário Admin | X |  X  | X | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api.get(/anuncios)  api.get(/categorias)  api.get(/users)  api.get(/upload)
| POST | api.post(/anuncios)  api.post(/upload)  api.post(/auth) |
| PUT | api.put(/anuncios)  api.put(/upload)  api.put(/user) |
| DELETE | api.delete(/anuncios)  api.delete(/upload)  api.delete(/user) |
