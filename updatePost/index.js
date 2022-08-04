const azure = require("azure-storage");
const { updateEntity } = require("../services/tableServices");

module.exports = async function (context, req) {
  try {
    if (!req.body) {
      context.res = {
        status: 400,
        body: "please pass a request body",
      };
      return;
    }

    const { title, content } = req.body;

    if (!content && !title) {
      context.res = {
        status: 400,
        body: "please pass a title or a content",
      };
      return;
    }

    const { blog, id } = context.bindingData;

    const entity = {
      PartitionKey: { _: blog },
      RowKey: { _: id.toString() },
    };

    if (title) entity.title = { _: title };
    if (content) entity.content = { _: content };

    await updateEntity("posts", entity);

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
