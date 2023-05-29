## How to run this project

### Pre-queries

- install Node.js 
- install Docker

### Start Project

- start MongoDB instance:
    - docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo
- start server
    - npm install
    - npm run dev

    
## Example Api Call

- after Login
  - http://localhost:3000/api/hotel/Slovenia/150