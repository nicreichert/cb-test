const crypto = require("crypto");
const {
  deterministicPartitionKey,
  getCandidateFromEvent,
} = require("./dpk.js");

const mockCryptoCreateHash = (fn) => {
  jest.spyOn(crypto, "createHash").mockImplementation(
    fn.mockImplementation(() => ({
      update: () => ({
        digest: () =>
          "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862",
      }),
    }))
  );
};

describe("getCandidateFromEvent", () => {
  it("Returns the literal '0' when no event is sent", () => {
    const candidate = getCandidateFromEvent();
    expect(candidate).toBe("0");
  });

  it("Returns partitionKey when provided in event", () => {
    const PARTITION_KEY = "duiashdiuashdiuashdi";

    const candidate = getCandidateFromEvent({ partitionKey: PARTITION_KEY });

    expect(candidate).toBe(PARTITION_KEY);
  });

  it("Calls creates hash when no event contains partitionKey", () => {
    const createHash = jest.fn();
    mockCryptoCreateHash(createHash);

    const PARTITION_KEY = "duiashdiuashdiuashdi";

    getCandidateFromEvent({ partitionKey: PARTITION_KEY });

    expect(createHash).not.toHaveBeenCalled();
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Does not call crypto.createHash when no event is sent", () => {
    const createHash = jest.fn();
    mockCryptoCreateHash(createHash);

    deterministicPartitionKey();
    expect(createHash).not.toHaveBeenCalled();
  });

  it("Does not call crypto.createHash when event contains partitionKey", () => {
    const createHash = jest.fn();
    mockCryptoCreateHash(createHash);

    const PARTITION_KEY = "duiashdiuashdiuashdi";

    deterministicPartitionKey({ partitionKey: PARTITION_KEY });

    expect(createHash).not.toHaveBeenCalled();
  });

  it("Calls crypto.createHash when event is sent", () => {
    const createHash = jest.fn();
    mockCryptoCreateHash(createHash);

    deterministicPartitionKey({});
    expect(createHash).toHaveBeenCalled();
  });

  it("Transforms the number to string", () => {
    const PARTITION_KEY = 1111111;

    const key = deterministicPartitionKey({ partitionKey: PARTITION_KEY });
    expect(key).toBe("1111111");
  });

  it("Regenerates if length exceeds limit", () => {
    const createHash = jest.fn();
    mockCryptoCreateHash(createHash);

    deterministicPartitionKey({ partitionKey: "1234" }, 3);
    expect(createHash).toHaveBeenCalled();
  });
});
