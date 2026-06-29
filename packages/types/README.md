# Moekoe Music 渲染进程接口类型定义

## 使用方法
1. 添加依赖
```sh
pnpm add -D @latedream/moekoe-types
```

2. 引入类型定义
```ts
// 修改 tsconfig.json
{
  "compilerOptions": {
	// ...,
    "types": ["@latedream/moekoe-types"]
  }
}

// 或者在任意 .d.ts 文件中添加下面任意一行
import '@latedream/moekoe-types';
/// <reference types="@latedream/moekoe-types" />
```
