const fs = require('fs-extra')
const minify = require('minify')

const CWD = process.cwd()

const main = async () => {
  const file = await minify(`${CWD}/build/index.js`)
  await fs.outputFile(`${CWD}/build/index.js`, file)
  
  console.log('\nSuccessfully minified files!')
}

main()