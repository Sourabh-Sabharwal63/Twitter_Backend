const {
  TweetRepository,
  HashtagsRepository,
  RepostsRepository,
} = require("../repository");

class TweetService {
  constructor(
    tweetRepository = new TweetRepository(),
    hashtagsRepository = new HashtagsRepository(),
    repostsRepository = new RepostsRepository()
  ) {
    this.tweetRepository = tweetRepository;
    this.hashtagsRepository = hashtagsRepository;
    this.repostsRepository = repostsRepository;
  }

  async createTweet(data) {
    try {
      const content = data.content;
      const HashtagsList = content.match(/#\b[a-zA-Z0-9_]+/g);
      console.log("HashtagsList", HashtagsList);

      const tweet = await this.tweetRepository.create({
        ...data,
        hashTags: HashtagsList,
      });
      console.log("tweet = ", tweet);

      const presentHashtag = await this.hashtagsRepository.getHashtagByName(
        HashtagsList
      );
      const textPresentTags = presentHashtag.map((tag) => tag.text);
      console.log("presentHashtag ", presentHashtag);
      const validHashTags = HashtagsList.filter(
        (tag) => !textPresentTags.includes(tag)
      );
      console.log("validHashTags", validHashTags);

      const BulkHashTag = validHashTags.map((tag) => {
        return { text: tag, tweets: [tweet.id], Ranking: 0 };
      });

      const hashtagBulkResponse = await this.hashtagsRepository.createBulk(
        BulkHashTag
      );
      console.log("hashtagBulkResponse", hashtagBulkResponse);

      presentHashtag.forEach(async (tag) => {
        tag.tweets.push(tweet._id);
        tag.save();
      });
    } catch (error) {
      console.log("error.message = ", error.message);
      console.log("Something went wrong on createTweet");
    }
  }

  async deleteTweet(tweetId) {
    try {
      const response = await this.tweetRepository.destroy(tweetId);
      if (response) {
        const repostsResponse =
          await this.repostsRepository.destroyAllRepostsWithTweetId(
            response._id
          );
        console.log("repostsResponse", repostsResponse);
      }
      return response;
    } catch (error) {
      console.log("something went wrong on Service layer in delete Tweet");
      throw error;
    }
  }

  async getAllReposts(tweetId){
try {
  const list =await this.repostsRepository.findAllWithTweetID(tweetId);
  return list;
} catch (error) {
  console.log("something went wrong on Service layer in getAllReposts",error.message);
  throw error;
}
  }

  async getUserAllTweet(userId){
    try {
      const list=await this.tweetRepository.getUserAllTweet(userId);
      return list;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TweetService();
