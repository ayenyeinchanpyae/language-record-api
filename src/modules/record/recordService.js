const Record = require('./recordModel');

exports.createRecord = async (recordData) => {
  try {
    const record = await Record.create(recordData);
    // Handle language associations if needed (based on your specific implementation)
    return record;
  } catch (error) {
    throw new Error(`Error creating record: ${error.message}`);
  }
};

exports.getAll = async () => {
  try {
    const records = await Record.findAll();
    return records;
  } catch (error) {
    throw new Error(`Error fetching records: ${error.message}`);
  }
};

exports.getById = async (id) => {
  try {
    const record = await Record.findByPk(id);
    if (!record) return null;
    return record;
  } catch (error) {
    throw new Error(`Error fetching record with ID ${id}: ${error.message}`);
  }
};

exports.update = async (id, updateItem) => {
  try {
    const [numAffectedRows, updatedRecord] = await Record.update(updateItem, {
      where: { id: id },
    });

    // Check if any rows were affected
    if (numAffectedRows === 0) {
      // Handle the case where no records were updated
      return null;
    }

    // Return the updated record
    return updatedRecord;
  } catch (error) {
    throw new Error(`Error updating record with ID ${id}: ${error.message}`);
  }
};

exports.remove = async (id) => {
  try {
    const deletedRows = await Record.destroy({
      where: { id: id },
    });

    // Check if any rows were deleted
    if (deletedRows === 0) {
      // Handle the case where no records were deleted
      return null;
    }

    // Return success or some indication of the deleted record
    return { success: true };
  } catch (error) {
    throw new Error(`Error deleting record with ID ${id}: ${error.message}`);
  }
};
