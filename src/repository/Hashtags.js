const { Hashtags } = require("../models");
const CURD=require("./Curd");
class HashtagsRepository extends CURD {
  constructor(){
    super(Hashtags);
  }
  // async createHashtag(data) {
  //   try {
  //     const response = await Hashtags.create(data);
  //     console.log("response ", response);
  //   } catch (error) {
  //     console.log(
  //       "Something went wrong on Repository layer on  createHashTags "
  //     );
  //   }
  // }

  // async getHashtag(tagId) {
  //   try {
  //     const response = await Hashtags.findById(tagId);
  //     return response;
  //   } catch (error) {
  //     console.log("something went wrong on Repository layer in getHashtag");
  //   }
  // }
  async getHashtagTweets(tagId){
    try {
      const response=await Hashtags.findById(tagId).populate("tweets")
      return response;
    } catch (error) {
      
    }
  }
  async getHashtagByName(name){
    try {
      const response=await Hashtags.find({text:name});
      return response;
    } catch (error) {
      console.log("something went wrong on Repository layer in getHashtagByName");
    }
  }

  // async getAllHashtags() {
  //   try {
  //     const list = await Hashtags.find();
  //     return list;
  //   } catch (error) {
  //     console.log("something went wrong on Repository layer in getAllHash");
  //   }
  // }

  // async deleteHashtag(tagId) {
  //   try {
  //     const response = await Hashtags.findByIdAndDelete(tagId);
  //     return response;
  //   } catch (error) {
  //     console.log("something went wrong on Repository layer in deleteHashtag");
  //   }
  // }

  async createBulk(data){
    try {
      const response=await Hashtags.insertMany(data);
      return response;
    } catch (error) {
      console.log("something went wrong on Repository layer in createBulk");
    }
  }
}

module.exports = HashtagsRepository;
