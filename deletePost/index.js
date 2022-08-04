const azure = require("azure-storage");
const { deleteEntity } = require("../services/tableServices");

module.exports = async function (context, req) {
  const { blog, id } = context.bindingData;

  const entity = {
    PartitionKey: { _: blog },
    RowKey: { _: id.toString() },
  };

  await deleteEntity("posts", entity);

  try {
    context.res = {
      status: 200 /* Defaults to 200 */,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
