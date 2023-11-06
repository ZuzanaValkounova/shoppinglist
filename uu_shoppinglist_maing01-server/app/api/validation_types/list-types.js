const listCreateDtoInType = shape({
  name: string(1, 64).isRequired(),
  creatorUuId: uuIdentity().isRequired(),
  creatorName: string(1, 747).isRequired(),
  members: array(uuIdentity(), 100).isRequired(),
  items: array(shape({ name: string(1, 200).isRequired(), solved: boolean().isRequired() }), 500).isRequired(),
  archived: boolean().isRequired(),
});
