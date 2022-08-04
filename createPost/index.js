const { insertEntity } = require("../services/tableServices");

module.exports = async function (context, req) {
  try {
    if (!req.body) {
      context.res = {
        status: 400,
        body: "please pass a request body",
      };
      return;
    }

    const { blog, title, content } = req.body;

    if (!blog || !title || !content) {
      context.res = {
        status: 400,
        body: "please pass all the required fields",
      };
      return;
    }

    function genNumber() {
      return Math.floor(Math.random() * 1000000);
    }

    const entity = {
      PartitionKey: { _: blog },
      RowKey: { _: new Date().getTime().toString() },
      // RowKey: { _: ingestion_time() },
      title: { _: title },
      content: { _: content },
    };

    const result = await insertEntity("posts", entity);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
