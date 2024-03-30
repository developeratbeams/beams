export const getCloudUrl =async () => {
  return `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_ID}/image/upload`;
};
