const useCalculateAspectRatio = (maxWidth, srcWidth, maxHeight, srcHeight) => {
  let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

export default useCalculateAspectRatio;
