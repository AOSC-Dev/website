---
categories:
  - advisories
title: "PostgreSQL 因打包方式变化需要手动介入升级"
date: 2025-06-21T16:00:00+08:00
important: true
home: false
---

由于 PostgreSQL 属于多分支维护的服务端软件、且大版本之间并不兼容，而安同 OS 的 PostgreSQL 由于没有按照大版本独立打包，导致源内 PostgreSQL 版本较为落后。因此我们在此次 PostgreSQL 维护之际，对 PostgreSQL 的打包方式做出了一些改动：

- `postgresql` 软件包不再包含二进制，仅包含指向当前最新 PostgreSQL 大版本的可执行及库文件的兼容性软链接
- PostgreSQL 拆分为 `postgresql` 及 `postgresql-runtime` 软件包，以减少非服务端用户的依赖大小
- 开始打包并维护 PostgreSQL 官方支持的所有 LTS 版本，所有软件包均以 `postgresql-大版本` 及 `postgresql-runtime-大版本` 格式命名，如 `postgresql-17` 及 `postgresql-runtime-17`
- `postgresql-大版本` 软件包将会安装至 `/usr/lib/postgresql-大版本` 目录下，所有二进制文件均带有大版本后缀，如 `psql-17` 等
- `postgresqld.service` 根据大版本重新命名至 `postgresqld-大版本.service`，如 `postgresqld-17.service`

在该更新推送至主线后，您会在升级期间收到打包方式出现变动的提示。如果您并没有使用系统中的 PostgreSQL 提供数据库服务，您可以直接继续升级。

针对正在使用系统 PostgreSQL 提供数据库服务的用户的提示
---

如果您在本次推送之前已经通过系统的 PostgreSQL 提供数据库服务，您需要在升级前暂时停止所有连接了系统 PostgreSQL 的应用及服务，然后再停止 PostgreSQL 服务，以免造成数据库损坏；如果您的数据库涉及到关键服务，请您自行计划维护时间：

```bash
sudo systemctl stop postgresqld.service
```

在升级期间，您也会收到需要停止 PostgreSQL 服务的提示。同时，由于系统之前使用的 PostgreSQL 大版本并未自动安装至系统中，因此您需要手动安装之前发行的 PostgreSQL 13：

```bash
sudo oma install postgresql-13
sudo systemctl start postgresqld-13.service
```

在安装 PostgreSQL 13 后，您可以选择继续使用 PostgreSQL 13 为您的应用或服务提供数据库服务，或者将现有数据迁移至 PostgreSQL 17。

我们为此带来的不便表示歉意，如您在升级过程中遇到任何问题，请及时分享日志，或将问题截图或拍照发送至社区各群组。
