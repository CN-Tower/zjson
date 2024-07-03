import { execSync } from 'child_process'
import { join } from 'path'

const root = join(__dirname, '../')
const releasePath = join(root, 'release')

execSync(`git add . && git commit -m "feat: save" && git push`, { stdio: 'inherit', cwd: releasePath})
