const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { v1: uuid } = require('uuid');
require('dotenv').config();
const Book = require('./models/book');
const Author = require('./models/author');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.countDocuments();
    },
    authorCount: async () => {
      return Author.countDocuments();
    },
    allBooks: async (root, args) => {
      return Book.find({}).populate('author');
      // let booksToReturn = [...books];
      // if (args.author) {
      //   booksToReturn = booksToReturn.filter(
      //     (book) => book.author === args.author
      //   );
      // }
      // if (args.genre) {
      //   booksToReturn = booksToReturn.filter((book) =>
      //     book.genres.includes(args.genre)
      //   );
      // }

      // return booksToReturn;
    },
    allAuthors: async () => {
      return Author.find({});
      let aurhorsToReturn = [];
      authors.forEach((author) =>
        aurhorsToReturn.push({
          ...author,
          bookCount: books.filter((book) => book.author === author.name).length,
        })
      );
      return aurhorsToReturn;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let authorInDb = await Author.findOne({ name: args.author });
      console.log(authorInDb)
      if (!authorInDb) {
        const newAuthor = new Author({ name: args.author });
        await newAuthor.save();
        authorInDb = newAuthor
        // authors.push({ name: args.author, id: uuid() });
      }
      const savedBook = new Book({
        title: args.title,
        author: authorInDb._id,
        published: args.published,
        genres: args.genres,
      });
      return (await savedBook.save()).populate('author');
    },
    editAuthor: (root, args) => {
      const authorToEdit = authors.find((author) => author.name === args.name);
      if (!authorToEdit) return null;
      authorToEdit.born = args.setBornTo;
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
