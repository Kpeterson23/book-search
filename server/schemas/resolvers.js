const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsersAll: async () => User.find({}),
    getSingleUser: async (_, __, context) => {
      const foundUser = await User.findById(context.user._id);
      if (!foundUser) {
        throw new Error("Cannot find a user with this id or username!");
      }
      return foundUser;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      if (!user) {
        throw new Error("Something went wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { input }, context) => {
      const { user } = context;
      if (!user) {
        throw new Error(
          "Authentication required. Please sign in to save a book."
        );
      }

      try {
        return User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input.book } },
          { new: true, runValidators: true }
        );
      } catch (err) {
        console.log(err);
        throw new Error("Error saving the book");
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    deleteBook: async (_, { bookId }, context) => {
      const { user } = context;

      if (!user) {
        throw new Error(
          "Authentication required. Please sign in to delete a book."
        );
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error deleting the book");
      }
    },
  },
};

module.exports = resolvers;
