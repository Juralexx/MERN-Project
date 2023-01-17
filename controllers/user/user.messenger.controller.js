import UserModel from '../../models/user.model.js'

/**
 * Add selected conversation to favorite conversations
 * @param {*} conversationId ID of the conversation to add to favorite
 */

export const addConversationToFavorite = async (req, res) => {
    try {
        await UserModel.updateOne(
            {
                _id: req.params.id,
                conversations: {
                    $elemMatch: {
                        id: req.body.conversationId
                    }
                },
            },
            {
                $set: {
                    "conversations.$.favorite": true
                },
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

/**
 * Remove selected conversations from favorite conversations
 * @param {*} conversationId ID of the conversation to remove from favorite
 */

export const removeConversationFromFavorite = async (req, res) => {
    try {
        await UserModel.updateOne(
            {
                _id: req.params.id,
                conversations: {
                    $elemMatch: {
                        id: req.body.conversationId
                    }
                },
            },
            {
                $set: {
                    "conversations.$.favorite": false
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

/**
 * Define the last conversation user has seen to be the first conversation user will see when back on app
 * @param {*} conversationId ID of the last conversation user has seen
 */

export const setLastConversation = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    last_conversation: req.body.conversationId,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

/**
 * Define the last message user has seen from the current conversation
 * @param {*} conversationId Conversation ID of the last message seen
 * @param {*} messageId ID of the last message user has seen
 */

export const setLastMessageSeen = async (req, res) => {
    try {
        await UserModel.updateOne(
            {
                _id: req.params.id,
                conversations: {
                    $elemMatch: {
                        id: req.body.conversationId
                    }
                },
            },
            {
                $set: {
                    "conversations.$.last_message_seen": req.body.messageId
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => res.status(400).send({ message: err }))
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}