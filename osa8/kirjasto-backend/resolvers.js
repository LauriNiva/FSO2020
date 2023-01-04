const { AuthenticationError, UserInputError } = require('apollo-server');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.countDocuments();
    },
    authorCount: async () => {
      return Author.countDocuments();
    },
    allBooks: async (root, args) => {
      const query = {};

      console.log('args', args);

      if (args.author) {
        query.author = await Author.find({ name: args.author });
      }

      if (args.genre) {
        query.genres = args.genre;
      }

      return await Book.find(query).populate('author');
    },
    allAuthors: async () => {
      const aurhorsToReturn = await Author.find({});
      return aurhorsToReturn;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    //no N+1
    bookCount: async (root) => {
      return (await Book.find({ author: root })).length;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        return await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let authorInDb = await Author.findOne({ name: args.author });
      if (!authorInDb) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        authorInDb = newAuthor;
      }
      const newBook = new Book({
        title: args.title,
        author: authorInDb._id,
        published: args.published,
        genres: args.genres,
      });

      try {
        const savedBook = (await newBook.save()).populate('author');
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });
        return savedBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) return null;
      authorToEdit.born = args.setBornTo;
      return authorToEdit.save();
    },
  },
};

module.exports = resolvers;
