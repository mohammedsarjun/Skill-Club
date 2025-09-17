export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const doc = new this.model(data);
        return await doc.save();
    }
    async findOne(filter) {
        return await this.model.findOne(filter).exec();
    }
    async findById(id) {
        return await this.model.findById(id).exec();
    }
    async findAll(filter = {}) {
        return await this.model.find(filter).exec();
    }
    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
//# sourceMappingURL=baseRepository.js.map