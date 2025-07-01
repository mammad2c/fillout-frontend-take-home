import { genId } from ".";

describe("genId", () => {
  it("should generate a unique identifier", () => {
    const id1 = genId();
    const id2 = genId();
    expect(id1).not.toEqual(id2);
  });
});
