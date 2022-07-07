type TArrayCheckBody = {
  name: string;
  type: string;
};
function checkBody(body: { [key: string]: any }, keys: Array<TArrayCheckBody>): any {
  const data = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (!body[key.name]) throw { message: `Not enough ${key.name} field` };
    if (typeof body[key.name] !== key.type) throw { message: `The type of ${key.name} should be ${key.type}` };
    data[key.name] = body[key.name];
  }
  return <any>data;
}

export { checkBody };
