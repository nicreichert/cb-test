const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const curry = (f) => (a) => (b) => f(a, b);

const pipe =
  (...operators) =>
  (input) =>
    operators.reduce((output, f) => f(output), input);

const getCandidateFromEvent = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  if (event.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const validateCandidateType = (candidate) =>
  typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

const validateCandidateLength = curry((maxLength, candidate) =>
  candidate.length > maxLength
    ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    : candidate
);

const deterministicPartitionKey = (
  event,
  lengthLimit = MAX_PARTITION_KEY_LENGTH
) =>
  pipe(
    getCandidateFromEvent,
    validateCandidateType,
    validateCandidateLength(lengthLimit)
  )(event);

module.exports = {
  deterministicPartitionKey,
  getCandidateFromEvent,
};
