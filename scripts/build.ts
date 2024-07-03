import { execSync } from 'child_process'
import glob from 'glob'
import inquirer from 'inquirer'
import { basename, join } from 'path'

inquirer.registerPrompt('search-list', require('inquirer-search-list'))

const root = join(__dirname, '../')
const projectList = glob.sync(join(root, 'packages/*')).map(proj => basename(proj))
const isDev = process.argv.includes('--dev')

const questions = [
  {
    type: 'search-list',
    name: 'project',
    message: `请选择需要${isDev ? '启动' : '构建'}的项目`,
    choices: projectList
  }
]

inquirer.prompt(questions, {}).then(({ project }) => {
  const projectPath = join(root, `packages/${project}`)
  console.log(projectPath)
  if (isDev) {
    execSync(`pnpm dev`, { cwd: projectPath, stdio: 'inherit' })
  } else {
    execSync(`pnpm build`, { cwd: projectPath, stdio: 'inherit' })
  }
})
