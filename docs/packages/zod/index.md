# Zod

## 动机

通过使用 `zod` 来验证数据结构的可靠性。

例如常规情况下的一个数据结构 

```ts
interface User {
  username: string
}
```

在使用中，例如从后端拿到的数据结构：

```ts
function buildUser(from: any) {
  return { ...from } as User
}
```

由于 TS 只存在于编译期，那么实际上在运行期，这样的代码是不安全的。

所以就可以

```ts
const userSchema = z.object({
  username: z.string()
})

function buildUser(from: any) {
  // 假设 from 无法满足 userSchema 的要求，则这里会报错，在开发阶段就能发现问题
  return userSchema.parse(from)
}
```
```

## 基础用法