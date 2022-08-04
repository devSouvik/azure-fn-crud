const azure = require("azure-storage");
const { queryEntities } = require("../services/tableServices");

module.exports = async function (context, req) {
  try {
    const { blog, id } = context.bindingData;

    const query = new azure.TableQuery().where(
      "PartitionKey eq ? and RowKey eq ?",
      blog,
      id.toString()
    );

    const result = await queryEntities("posts", query);

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
