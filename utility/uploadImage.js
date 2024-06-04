const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;

const UploadCloudinary = async (filePath, folder) => {
  cloudinary.config({
    cloud_name: "ddxqljriw",
    api_key: "985439851745886",
    api_secret: "_AACixLqkTxTxEZLi2vpKpBpwQA",
    secure: true,
  });

  try {
    const buffer = await fs.readFile(filePath);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder,
        },
        (error, result) => {
          if (error) {
            return reject(error.message);
          }
          resolve({
            public_id: result.public_id,
            url: result.url,
          });
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};

// delete old image from cloudinary
const DestroyCloudinary = async (public_id) => {
  cloudinary.config({
    cloud_name: "ddxqljriw",
    api_key: "985439851745886",
    api_secret: "_AACixLqkTxTxEZLi2vpKpBpwQA",
    secure: true,
  });

  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      throw new Error(
        `Failed to delete file from Cloudinary: ${error.message}`
      );
    }
    return result;
  });
};

module.exports = { UploadCloudinary, DestroyCloudinary };
