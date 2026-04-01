# @latedream/moekoe-plugin-utils
晚梦的 MoeKoe Music 插件开发工具

## 使用
```bash
pnpm add -D @latedream/moekoe-plugin-utils
# 或者全局安装
pnpm add -g @latedream/moekoe-plugin-utils
```

```log
utils/1.0.0-alpha.1

Usage:
  $ utils <command> [options]

Commands:
  gen-manifest [outputFilePath]  生成 manifest.json

For more info, run any command with the `--help` flag:
  $ utils gen-manifest --help

Options:
  -h, --help                     Display this message
  -v, --version                  Display version number
  -c, --config <configFilePath>  配置文件路径，支持 `package.json` 或 `lkp_utils.json`
```

## 配置文件
工具会自动从 `package.json` 或 `lkp_utils.json` 中加载配置，也可以通过 `--config`(或`-c`) 选项指定配置文件路径。

> [!NOTE]  
> `lkp_utils.json` 的优先级高于 `package.json`。

```jsonc
// package.json 示例
{
  // ...,
  "lkp_config": {
    // ...
  }
}

// lkp_utils.json 示例
{
  "$schema": "node_modules/@latedream/moekoe-plugin-utils/schema/lkp_utils.json",
  // ...
}
```
