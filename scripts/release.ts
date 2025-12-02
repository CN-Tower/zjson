import { removeSync, copySync } from 'fs-extra'
import { join } from 'path'
import chalk from 'chalk'
import { execSync } from 'child_process'

const cmd = process.argv[2]
const root = join(__dirname, '../')
const projectDist = join(root, 'dist')
const releasePath = join(root, 'release')
const releaseDist = join(releasePath, 'zjson/dist')

if (cmd === 'init') {
  execSync(`git checkout main && git pull --rebase`, { stdio: 'inherit', cwd: releasePath})
} else if (cmd === 'sync') {
  removeSync(releaseDist)
  copySync(projectDist, releaseDist)
  console.log(chalk.green('Sync submodule success!'))
} else if (cmd === 'push') {
  execSync(`git add . && git commit -m "feat: save" && git push`, { stdio: 'inherit', cwd: releasePath})
}
