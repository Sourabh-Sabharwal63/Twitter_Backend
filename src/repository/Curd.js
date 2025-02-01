class CURD {
  constructor(model ) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(ID){
    try {
      const response=await this.model.findById(ID);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async destroy(ID){
    try {
      const response=await this.model.findByIdAndDelete(ID);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAll(){
    try {
      const list=await this.model.find();
      return list;
    } catch (error) {
      throw error;
    }
  }

  async updateById(ID,data){
    try {
      const response=await this.model.findByIdAndUpdate(ID,data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}


module.exports=CURD;