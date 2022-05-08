const { User, Thought } = require('../models')

const resolvers = {

	Query: {
		thoughts: async(parent, { username }) => {
			try {
				const params = username ? { username } : {}
				return Thought.find(params).sort({ createdAt: -1 })
			} catch (error) {}		
		},

		thought: async(parent, { _id }) => {
			return Thought.findOne({ _id })
		},

		users: async() => {
			return User.find()
				.select('-__v -password')
				.populate('friends')
				.populate('thoughts')
		},

		user: async(parent, { username }) => {
			try {
				return User.findOne({ username })
			} catch (error) {}
		}
	}


}

module.exports = resolvers