const Message = require("../models/Message");

// Get All Messages
const getMessages = async (req, res) => {

  try {

    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({

      success: true,
      data: messages,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

// Create Message
const createMessage = async (req, res) => {

  try {

    const message = await Message.create(req.body);

    res.status(201).json({

      success: true,
      data: message,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

// Delete Message
const deleteMessage = async (req, res) => {

  try {

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({

      success: true,
      message: "Message deleted",

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

// Mark Message as Read
const markAsRead = async (req, res) => {

  try {

    const message = await Message.findByIdAndUpdate(

      req.params.id,

      {
        isRead: true,
      },

      {
        returnDocument: "after",
      }

    );

    res.status(200).json({

      success: true,
      data: message,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

module.exports = {

  getMessages,
  createMessage,
  deleteMessage,
  markAsRead,

};