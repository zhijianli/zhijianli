# 云服务器部署

把当前仓库的 `main` 主干发布到云服务器上的个人网站。

用户说「部署」「上线」「更新服务器」或 @ 本文件时，按下面步骤完整执行，不要只口述步骤。

## 环境

| 项 | 值 |
|---|---|
| 主干分支 | `main` |
| SSH | `ssh -i "C:\Users\zoruf\.ssh\ningxin-aliyun" root@47.98.124.127` |
| 服务器目录 | `/home/mocuili/github/zhijianli/` |
| 启动脚本 | `start-prod.sh`（释放 8000 端口 → `npm run build` → 后台 `vite preview`） |

## 1. 提交并推送到主干

在本地仓库根目录：

1. 查看 `git status`、`git diff`、`git log`，确认改动。
2. 若有未提交改动：按仓库习惯提交（不要提交密钥、`.env`、`output.log`），再推送：

```bash
git push origin main
```

3. 若工作区已干净且已与 `origin/main` 同步：跳过提交，直接进入下一步。
4. 不要 `--force`，不要改 git config，不要跳过 hooks。

推送需要网络权限。没有推上去，服务器 `git pull` 拉不到新代码。

## 2. 登录服务器并发布

用一条远程命令完成更新和启动（需要能访问 SSH 私钥和公网）：

```bash
ssh -i "C:\Users\zoruf\.ssh\ningxin-aliyun" -o StrictHostKeyChecking=accept-new root@47.98.124.127 "cd /home/mocuili/github/zhijianli && git pull && bash start-prod.sh"
```

`start-prod.sh` 会构建，通常需要几十秒。等它跑完，确认输出里有预览进程 PID。

## 3. 确认

- 远程命令退出码为 0。
- 如需核对日志：在服务器上看 `/home/mocuili/github/zhijianli/output.log`。
- 站点走 8000 端口上的 Vite 生产预览。

## 注意

- 私钥路径仅本机有效：`C:\Users\zoruf\.ssh\ningxin-aliyun`
- 服务器上的 `git pull` 依赖远程 `origin/main` 已包含刚推送的提交
