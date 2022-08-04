const azure = require("azure-storage");
const { queryEntities } = require("../services/tableServices.js");

module.exports = async function (context, req) {
  try {
    let blog = context.bindingData.blog;

    // let blog1 = req.param.blog
    // console.log(blog1)

    let query = new azure.TableQuery().where("PartitionKey eq ?", blog);

    let result = await queryEntities("posts", query);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
  }
};
