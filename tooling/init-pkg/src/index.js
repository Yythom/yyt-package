const welcome = require('cli-welcome')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const pkgJSON = require('../package.json')

const packageTemplatePath = `${__dirname}/package-template`
const baseDir = path.join('..', '..')

const question = [
    {
        name: 'dirPath',
        type: 'list',
        message: '请选择你的包位置',
        choices: ['packages/ui', 'packages/feat', 'packages'],
    },
    {
        name: 'name',
        type: 'input',
        message: '输入你的包名',
        validate(val) {
            if (val === '') {
                return 'Name is required!'
            }
            return true
        },
    },
    {
        name: 'description',
        type: 'input',
        message: '请描述一下这是这个包是干啥的',
    },
    {
        name: 'author',
        type: 'input',
        message: '大佬你尊姓大名是',
    },
]

const getPackJsonName = (dirPath, name) => {
    const map = {
        'packages/ui': 'ui',
        'packages/feat': 'feat',
    }
    switch (dirPath) {
        case 'packages/ui':
        case 'packages/feat':
            return `yyt-${map[dirPath]}/${name}`
        case 'packages':
            return `yyt/${name}`
        default:
            return `yyt/${name}`
    }
}

const getPackagePath = (dirPath, name) => {
    return path.resolve(baseDir, `${dirPath}/${name}`)
}

function run() {
    welcome({
        title: 'VJSHI CLI',
        tagLine: 'init the package with a template\nStart creating amazing code!',
        version: pkgJSON.version,
        bgColor: '#02d4b1',
        color: '#FFFFFF',
        bold: true,
        clear: false,
    })

    inquirer
        .prompt(question)
        .then(answers => {
            const {
                dirPath,
                name,
                description,
                author,
            } = answers

            const packagePath = getPackagePath(dirPath, name)

            fs.copy(packageTemplatePath, packagePath, err => {
                if (err) return console.error(err)

                console.log(chalk.green('copy success!'))

                const packageJson = require(`${packagePath}/package.json`)

                packageJson.name = getPackJsonName(dirPath, name)

                packageJson.description = description

                packageJson.author = author

                fs.writeFile(`${packagePath}/package.json`, JSON.stringify(packageJson), 'utf-8', err => {
                    if (err) console.log(err)

                    const childProcss = require('child_process')

                    childProcss.execSync('yarn preconstruct init', {
                        stdio: 'inherit',
                        cwd: baseDir,
                    })

                    const packageString = fs.readFileSync(`${packagePath}/package.json`, { encoding: 'utf-8' })

                    const json = JSON.parse(packageString)

                    const main = json.main

                    json.types = main.replace('.js', '.d.ts')

                    fs.writeFile(`${packagePath}/package.json`, JSON.stringify(json, null, 4), 'utf-8', err => {
                        if (err) console.log(err)
                        console.log(chalk.green('package.json update successfully!\n'))
                        console.log(chalk.green('\n Generation completed!'))
                        console.log('\n To get started')
                        console.log(chalk.yellow(`\n cd ${packagePath} \n`))
                    })
                })
            })
        })
}

exports.run = run
