import { execSync } from 'child_process'
import { join } from 'path'

const root = join(__dirname, '../')
const releasePath = join(root, 'release')

execSync(`git checkout main && git pull --reb`, { stdio: 'inherit', cwd: releasePath})
