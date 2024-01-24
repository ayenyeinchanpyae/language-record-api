const Language = require('./languageModel');

exports.createLanguage = async (data) => {
  const language = await Language.create(data);
  return language;
};

exports.getAllLanguages = async () => {
  try {
    const languages = await Language.findAll();
    return languages;
  } catch (error) {
    throw new Error(`Error fetching languages: ${error.message}`); 
  }
};

exports.getById = async (id) => {
  try {
    const language = await Language.findByPk(id); // Find language by primary key (ID)
    if (!language) return null; // Return null if not found
    return language; // Return the language object
  } catch (error) {
    throw new Error(`Error fetching language with ID ${id}: ${error.message}`); // Handle and propagate error
  }
};


// ... other CRUD operations for languages
