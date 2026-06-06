function toStringValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

export function buildReqFullName(firstNameValue: unknown, lastNameValue: unknown) {
  const firstName = toStringValue(firstNameValue)?.trim();
  const lastName = toStringValue(lastNameValue)?.trim();

  if (firstName && lastName) {
    return firstName === lastName ? firstName : `${firstName} ${lastName}`;
  }

  return firstName ?? lastName;
}
