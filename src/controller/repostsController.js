const { RepostsService } = require("../services");

const createReposts = async (req, res) => {
  try {
    const { userId, tweetId } = req.query;
    const response = await RepostsService.createReposts({ userId, tweetId });
    res.status(200).json({
      success: true,
      data: response,
      message: "data is created",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    });
  }
};

const getAllUserReposts = async (req, res) => {
  try {
    const lists = await RepostsService.getAllUserReposts(req.query.userId);
    res.status(200).json({
      success: true,
      data: lists,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

module.exports = { createReposts, getAllUserReposts };
