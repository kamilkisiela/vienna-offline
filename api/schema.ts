import { makeExecutableSchema } from 'graphql-tools';

import * as notes from './data';

const typeDefs = `
  type Note {
    id: String!
    title: String
    text: String
  }

  input NoteInput {
    title: String
    text: String
  }

  type Query {
    note(id: String!): Note
    notes: [Note]
  }

  type Mutation {
    add(input: NoteInput!): Note
    remove(id: String!): Note
    update(id: String!, input: NoteInput!): Note
  }
`;

const resolvers = {
  Query: {
    notes: () => notes.all(),
    note: (_, { id }) => notes.single(id),
  },
  Mutation: {
    add: (_, { input }) => notes.add(input),
    remove: (_, { id }) => notes.remove(id),
    update: (_, { id, input }) => notes.update(id, input),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
