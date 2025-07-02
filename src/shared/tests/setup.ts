import "@testing-library/jest-dom";

/**
 * Disable canvas context in test
 */
HTMLCanvasElement.prototype.getContext = function () {
  // return whatever getContext has to return
  return null;
};
