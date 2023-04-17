# Prisma-FirstStep
Start with prisma
Remember to add packages and libraries as prisma and graphql

Install :

npm install prisma --save-dev
npx prisma init --datasource-provider sqlite //This is just for prisma
npx prisma generate

npm install graphql-codegen --save-dev

npx graphql-codegen --config src/codegen.yml
if this no works use de command line under

npm install -g graphql-codegen

npx graphql-codegen --config codegen.yml

npm install express --save

npm install express apollo-server-express @graphql-tools/schema

npm install apollo-server graphql

npm install @apollo/client react

//To run index
npx ts-node ./src/index.ts  
