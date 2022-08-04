const azure = require("azure-storage");
const tableService = azure.createTableService(
  "souvikstorageacccount",
  process.env.azure_storage_access_key
);

const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableService.insertEntity(
      tableName,
      entity,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    );
  });
};
// echoContent: true will print the content of the entity to the console
// odata=nometadata will not add any metadata with the actual entity object

const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableService.queryEntities(
      tableName,
      query,
      null,
      { payloadFormat: "application/json;odata=nometadata" },
      function (error, result, response) {
        if (error) {
          reject(error);
        }
        resolve(response.body);
      }
    );
  });
};

const updateEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableService.mergeEntity(
      tableName,
      entity,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

const deleteEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableService.deleteEntity(
      tableName,
      entity,
      {
        echoContent: true,
        payloadFormat: "application/json;odata=nometadata",
      },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;
