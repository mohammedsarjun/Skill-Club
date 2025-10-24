export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const doc = new this.model(data);
    return await doc.save();
  }
  async findOne(filter, options) {
    let query = this.model.findOne(filter);
    if (options?.populate) {
      query = query.populate(options.populate);
    }
    return await query.exec();
  }
  async findById(id) {
    return await this.model.findById(id).exec();
  }
  async findAll(filter = {}, options) {
    let query = this.model.find(filter);
    if (options?.skip) query = query.skip(options.skip);
    if (options?.limit) query = query.limit(options.limit);
    if (options?.populate) query = query.populate(options.populate);
    return await query.exec();
  }
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async delete(id) {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async count(filter = {}) {
    return await this.model.countDocuments(filter).exec();
  }
}
//# sourceMappingURL=baseRepository.js.map
