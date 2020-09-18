export const isCompatible = version => {
  if (typeof version !== 'string') {
    return false;
  }
  const versionPatterns = version.split('.');
  const minVersionPatterns = process.env.MIN_SDK_VERSION.split('.');
  if (minVersionPatterns.length !== versionPatterns.length) {
    return false;
  }
  for (let index = 0; index < versionPatterns.length; index += 1) {
    const pattern = Number(versionPatterns[index]);
    const minPattern = Number(minVersionPatterns[index]);
    if (pattern > minPattern) {
      return true;
    } else if (pattern < minPattern) {
      return false;
    } else if (index === versionPatterns.length - 1 && pattern >= minPattern) {
      return true;
    }
  }
  return false;
};

export const version = '1.0.0';

export default {
  isCompatible,
  version,
};
