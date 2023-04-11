import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers  from './resolvers';
import typeDefs from './typeDefs';

async function startApolloServer() {
    const app = express();
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    server.applyMiddleware({ app });

    const port = 4000;
    await new Promise<void>((resolve) => app.listen({ port }, resolve));

    console.log(`Server listening on http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer().catch((err) => {
    console.error(err);
    process.exit(1);
});
