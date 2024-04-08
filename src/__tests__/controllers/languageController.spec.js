const { post } = require('../../modules/language/languageController'); 
const languageService = require('../../modules/language/languageService');
const sequelize = require('../../config/database'); 
const Language = require('../../modules/language/languageModel');

// Mock request and response objects
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('POST /language', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('should create language successfully', async () => {
    const req = mockRequest({ Name: 'English' });
    const res = mockResponse();

    // Mocking sequelize functions
    const mockAuthenticate = jest.spyOn(sequelize, 'authenticate').mockResolvedValue();
    const mockQuery = jest.spyOn(sequelize, 'query').mockResolvedValue();
    const mockSync = jest.spyOn(Language, 'sync').mockResolvedValue();
    const mockCreateLanguage = jest
      .spyOn(languageService, 'createLanguage')
      .mockResolvedValue({ id: 1, Name: 'English' });

    await post(req, res);

    expect(mockAuthenticate).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`,
    );
    expect(mockSync).toHaveBeenCalledWith({ force: false });
    expect(mockCreateLanguage).toHaveBeenCalledWith(expect.objectContaining({ Name: 'English' }));

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'SUCCESS',
      data: { id: 1, Name: 'English' },
    });
  });

  test('should return 500 if an error occurs', async () => {
    const req = mockRequest({ Name: 'English' });
    const res = mockResponse();

    // Mocking sequelize authenticate to throw an error
    const mockAuthenticate = jest
      .spyOn(sequelize, 'authenticate')
      .mockRejectedValue(new Error('Database connection failed'));

    await post(req, res);

    expect(mockAuthenticate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating language' });
  });
});
