## 创建组件指南

该章节的目标是明确本项目的流程，我们都应努力贡献出高质量、易读且易于贡献的代码，并朝着简单、极致、高效的方向发展。

开发组件包，最好是能前置的学习了解这些知识和工具，这能让你更好的理解该项目：

- monorepo
- peerdependencies
- yarn workspaces
- Preconstruct
- esm and cjs
- tree shaking
- typeScript with React
- lerna
- changeset
- Semantic Versioning

目前该仓库已支持部分包使用ts，但存在一些问题需要解决:

当父包是ts包，子包是js包，父包导入导出子包,

```js
// father/index.ts
export * from 'child'

// 实际使用，引入child时没有代码提示
import { child } from 'father'
```

创建一个组件一般分为五个流程

- 分享和讨论组件
- 创建组件包
- 测试组件
- 编写文档

### 分享和讨论

当你有新组件的想法或老组件的修改时可以第一时间讨论，为了能有高质量和真的适用的组件，一般要解决以下几点：

- 简单快速的表达想法，最好是文档的形式
- 老组件
    - 解决了什么问题
    - 解决方案
- 新组件
    - 现在/以后能用在哪些地方
- API examples
- 前端内部达成共识
- 和UI设计师达成共识
- 这个包应该放在哪个位置
- 依赖、对等依赖考虑

### 创建组件包
packages的根目录下执行
1.`yarn init:pkg`
2.你会遇到preconstruct的交互式命令，你默认回车就行，具体你可以看preconstruct官方的文档
3.如果成功的话，它已经创建好了，你可以试试它提示的命令，切换到你要开发的文件夹
4.At last, start writing code and show your code

> 需要注意的是，文件和文件夹名统一使用字母小写命名，多单词的使用`-`间隔

## 公共包贡献代码指南

前端团队每个人都可以为公共包作出贡献，为了更美好的明天而战！

### 能贡献什么

- 修复bug，你可以直接修复，也可以反馈给原开发人员
- 你和产品或ui新定制了组件或规范，或者新需求添加了新功能
- 添加/修改接口
- 有更好的实现方法

### 如何贡献

1.`git clone`到本地，基于develop分支新建一个特性分支， e.g. `feature-popover`。
2.开始你的工作
3.当开发工作结束后，需要执行`git rebase develop`并解决冲突。
4.运行`yarn changeset --since <git branch name>`创建你的修改详情描述，这个描述会在发布包时自动创建`changelog`
5.创建提交到远程，再向develop提交合并请求.

> 除了包之外的修改，例如：eslint、some config、root README等，你能运行`yarn changeset add --empty`创建一个`empty changeset`来记录这些更改。

> 代码评审由至少两名开发人通过后才能合并到develop。如果是全新的组件，需要附带文档，没有文档不予通过。

前端主管会根据当时的情况决定什么时候发布新版本。如果你的feature需要大范围提前测试，可以先不合并develop，由前端主管在你的远程分支上发布测试（alpha、beta）版本，测试没问题再走上诉流程。

### 提交规范

在合并前，需要检查你的commit message是否符合提交规范当你创建commit时，应满足category(scope/module): message，category主要是下列情况:

- `feat`：所有引入全新的代码或新功能
- `fix`：修复bug
- `refactor`：既不是feat也不是fix的代码修改
- `docs`：更改先有文档或添加新文档
- `build`：构建相关修改，修改依赖或添加新依赖
- `test`：添加测试用例或修改错误测试用例
- `chore`: 杂项，零星工作
- `revert`： `git revert `

scope包括`base`、`ui`、`feat`、`boundary`、`config`、`cookie`、`document`、`hooks`、`react-lazy`、`react-lazy-babel`、`react-lazy-server`、`react-lazy-webpack`、`react-query`、`react-utils`、`services`、`streaming`、`utils`、`tooling`


在推送时阿里云进行一些检查，提交的username、email必须和在阿里云云效设置的用户名、主邮箱一致，commit message必须满足下方的正则检查：

```js
/^(revert: )?(feat|fix|refactor|docs|build|test|chore)(\((base|ui|feat|boundary|config|cookie|document|hooks|react\-lazy|react\-lazy\-babel|react\-lazy\-server|react\-lazy\-webpack|react\-query|react\-utils|services|streaming|utils|tooling)(\/.+)?\)): .{1,50}/
```


> 在feat中提交的代码原则上不耦合请求

## todo
- ～~prettier：格式化代码~～
> prettier经过调研和试用已放弃，如果有人能说明有什么prettier能做而eslint做不了，会重新考虑使用prettier。
> prettier和eslint都是工具。所有的代码样式和格式都是开发人员应该关心和注意的，越依赖自动更正来编写你的代码，你对正在编写的代码理解就越少。你应该尝试编写符合lint条件的代码，而不是顺便写freeStyle并希望工具来帮你解决和修复它。
- ~~Modal Alert Confirm refactor~~
- ~~主题独立~~
- ui 全面ts化
- feat 迁移
- ~~减少chakra依赖(放弃)~~
- feat 全面ts化
- Next.js
- ~~StoryBook~~

chakra-ui 2.0.0和yyt/ui重构：
- ~~Modal~~： 因动画需求的修改，modal全部引用导出chkra组件，不在自己维护, 删除了withModal，添加了useImperativeModal、ImpModalProvider 支持命令式使用。
- ~~modal-with-action~~：新组件，导出了BaseModalWithAction、SelectActionModal、useSelectActionModal。
- ~~Alert~~：重构组件，基于BaseModalWithAction封装的Alert，基于useImperativeModal封装的useAlert。props type替换为status，okButtonProps替换为okProps，废弃了afterClose。
- ~~Confirm~~：重构组件，基于BaseModalWithAction封装的Confirm，基于useImperativeModal封装的useConfirm。props type替换为status，okButtonProps替换为okProps，cancelButtonProps替换为cancelProps，废弃了afterClose。
- ~~button~~: 无修改, 添加了interface导出。

主题ts
- foundations：
    - ~~blur~~：占位使用，暂时没有UI相关的规范，以后可能有。
    - ~~border~~： 定义了一些常用的borders。
    - ~~breakpoints~~：无修改，直接改为ts文件。
    - ~~color~~：使用了UI定义的颜色规范，不在使用colorScheme生成，全部写全便于查看。
    - ~~radii~~：定义了常用的圆角。
    - ~~shadow~~： 使用了UI定义的阴影规范。
    - ~~sizes~~：定义了少部分size，UI无更多具体规范，有的话需要加上。
    - ~~spacing~~：占位使用，暂时没有UI相关的规范，以后可能有。
    - ~~transition~~：定义了常用的transitionProperty和transitionDuration。
    - ~~typography~~：定义了常用的lineHeights、fontWeights、fontSizes，letterSpacings和fonts暂时没有需求。
    - ~~zindex~~：删除message。
- components：
    - ~~button~~：根据UI规范需求重构variant，使用foundations中的样式替换了一些样式，size有变化，使用的时候注意。
    - ~~modal~~：根据UI规范需求重构样式，使用foundations中的样式替换了一些样式，footer样式默认居中，size修改为sm、md、lg。
    - tip
    - Login
    - link
    - toast
    - card
    - chexkbox
    - form
    - input
    - number-input
    - ~~popover~~
    - radio
    - table
    - tabs
    - textarea
