import { execSync } from 'child_process'
import glob from 'glob'
import inquirer from 'inquirer'
import { basename, join } from 'path'

inquirer.registerPrompt('search-list', require('inquirer-search-list'))

const root = join(__dirname, '../')
const projectList = glob.sync(join(root, 'packages/*')).map(proj => basename(proj))

const questions = [
  {
    type: 'search-list',
    name: 'project',
    message: `请选择一个启动项目`,
    choices: projectList
  }
]

inquirer.prompt(questions, {}).then(({ project }) => {
  const projectPath = join(root, `packages/${project}`)
  console.log(projectPath)
  execSync(`pnpm dev`, { cwd: projectPath, stdio: 'inherit' })
})
