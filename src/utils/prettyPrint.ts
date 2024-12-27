export function prettyPrint(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}
