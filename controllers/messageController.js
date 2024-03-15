const User = require('../models/User');
const Message = require('../models/Message');

async function sendMessage(req, res) {
    try {
        const { username, textcontent } = req.body;

        const sender = req.user;
        const receiver = await User.findOne({ username: username });
        console.log(receiver)
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'Sender or receiver not found' });
        }

        const message = new Message({
            sender: sender._id,
            receiver: receiver._id,
            textContent: textcontent
        });
        await message.save();

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getConversation(req, res) {
    try {
        const { username } = req.params;

        const sender = req.user
        const receiver = await User.findOne({ username });

        if (!receiver) {
            return res.status(404).json({ error: 'user not found' });
        }
        await Message.updateMany({
            sender: receiver._id,
            receiver: sender._id
        }, { seen: true })
        const conversation = await Message.find({
            $or: [
                { sender: sender._id, receiver: receiver._id },
                { sender: receiver._id, receiver: sender._id }
            ]
        }).sort({timestamp:-1}).populate('sender receiver', 'username');


        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    sendMessage,
    getConversation
};
