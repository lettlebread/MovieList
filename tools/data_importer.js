import { createReadStream } from 'fs'
import { program } from 'commander'
import csvParser from 'csv-parser'
import { exit } from 'process'

import { getMongo, insertCollectionDoc } from '../utils/mongodb.js'

main()

async function main() {
  try {
    const { path } = getArgs()
    
    await getMongo()
    let rows = await parseCSVData(path)
    await importData(rows)
    console.log(`import ${ rows.length} rows of data`)
  } catch (e) {
    console.log(`process failed with error ${ e }`);
  } finally {
    exit();
  }
}

function getArgs() {
  program
    .requiredOption("-p, --path <csv path>")
  
  program.parse(process.argv);

  return program.opts();
}

async function parseCSVData(path) {
  return new Promise((resolve, reject) => {
    let results = []

    try {
      createReadStream(path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results)
      });
    } catch (e) {
      reject(e)
    }
  })
}

async function importData(rows) {
  try {
    for (let i = 0; i < rows.length; i++) {
      await insertCollectionDoc("movies", rows[i])
    }
  } catch (e) {
    console.log("insert data failed with error", e)
    throw e
  }
}