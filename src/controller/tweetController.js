const { TweetService } = require("../services");

const createTweet = async (req, res) => {
  try {
    const response = await TweetService.createTweet(req.body);
    res.status(200).json({
      data: response,
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
      message: "unable to create User",
    });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const response = await TweetService.deleteTweet(req.query.tweetId);
    res.status(200).json({
      success: true,
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
      message: "something went wrong",
    });
  }
};

const getReposts = async (req, res) => {
  try {
    const list = await TweetService.getAllReposts(req.query.tweetId);
    res.status(200).json({
      data: list,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong ",
      error: error.message,
    });
  }
};

const getUserAllTweet = async (req, res) => {
  try {
    const list = await TweetService.getUserAllTweet(req.query.userId);
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  getReposts,
  getUserAllTweet,
};
