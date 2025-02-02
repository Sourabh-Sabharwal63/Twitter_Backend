const { TweetRepository, HashtagsRepository } = require("../repository");

class TweetService {
  constructor(
    tweetRepository = new TweetRepository(),
    hashtagsRepository = new HashtagsRepository()
  ) {
    this.tweetRepository = tweetRepository;
    this.hashtagsRepository = hashtagsRepository;
  }
  async getValidTags(HashtagsList, tweet) {
    try {
      const BulkHashtag = [];
      await Promise.all(
        HashtagsList.map(async (tag) => {
          console.log("inside forEach");
          const isAvailable = await this.hashtagsRepository.getHashtagByName(
            tag
          );
          console.log("isAvailable", isAvailable);
          if (!isAvailable) {
            BulkHashtag.push({
              text: tag,
              tweets: [tweet.id],
              Ranking: 0,
            });
          }
        })
      );

      console.log("BulkHashtag.length = ", BulkHashtag.length);
      return BulkHashtag;
    } catch (error) {
      console.log("Something went wrong on getValidTags");
    }
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
      console.log("tweet = ",tweet)

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
      console.log("error.message = ",error.message)
      console.log("Something went wrong on createTweet");
    }

  }

  async extractHashtags(str) {
    try {
      const list = [];
      let n = str.length,
        i = 0;
      while (i < n) {
        let char = str.charCodeAt(i);
        if (char == 35) {
          let word = "";
          word = word + String.fromCharCode(char);
          i++;
          char = str.charCodeAt(i);
          while (
            (char >= 65 && char <= 90) ||
            (char >= 97 && char <= 122) ||
            char == 95
          ) {
            word = word + String.fromCharCode(char);
            if (i + 1 == n || str.charCodeAt(i + 1) == 35) {
              break;
            }
            i++;
            char = str.charCodeAt(i);
          }
          word.length > 1 && list.push(word);
        }
        i++;
      }
      return list;
    } catch (error) {
      console.log("something went wrong  in Service Layer on TweetService");
    }
  }
}

module.exports = new TweetService();
