import { removeSync, copySync } from 'fs-extra'
import { join } from 'path'
import chalk from 'chalk'

const root = join(__dirname, '../')
const releasePath = join(root, 'release')
const releaseDist = join(releasePath, 'zjson/dist')
const projectDist = join(root, 'packages/client/dist')

removeSync(releaseDist)
copySync(projectDist, releaseDist)
console.log(chalk.green('Sync submodule success!'))