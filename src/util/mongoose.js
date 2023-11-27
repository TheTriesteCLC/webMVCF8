module.exports = {
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map(ele => ele.toObject());
    },
    mongooseToObject: function (mongooseElement) {
        return mongooseElement ? mongooseElement.toObject() : mongooseElement;
    }
}