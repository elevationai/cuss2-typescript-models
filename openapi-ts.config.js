/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default {
  input: 'CUSS2-API.yaml',
  output: 'src',
  plugins: [
    {
      name: '@hey-api/typescript',
    }
  ],
}
