const { UserRepository } = require("../repository");

class UserService {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async createUser(data) {
    try {
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log("something went wrong on service layer in createUser");
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.userRepository.destroy(userId);
      return response;
    } catch (error) {
      console.log("something went wrong on service layer in deleteUser");
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const list = await this.userRepository.getAll();
      return list;
    } catch (error) {
      console.log("something went wrong on service layer in getAllUsers");
      throw error;
    }
  }

  async signIn(data) {
    try {
      var user = null;
      data.email
        ? (user = await this.userRepository.getUserByEmail(data.email))
        : (user = await this.userRepository.getUserByUserName(data.userName));
       
      if (!user) {
        throw new Error("User not available");
      }

      const isValid = await user.ComparePassword(data.password);
      if (!isValid) {
        throw new Error("User is not valid");
      }
      
      await user.createJwt();


    } catch (error) {}
  }
}
