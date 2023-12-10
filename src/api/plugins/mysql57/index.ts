import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/status'),
  // 重载
  reload: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/reload'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/config', { config }),
  // 获取错误日志
  errorLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/errorLog'),
  // 清空错误日志
  clearErrorLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/clearErrorLog'),
  // 获取慢查询日志
  slowLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/slowLog'),
  // 清空慢查询日志
  clearSlowLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/clearSlowLog'),
  // 获取 root 密码
  rootPassword: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql57/rootPassword'),
  // 修改 root 密码
  setRootPassword: (password: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/rootPassword', { password }),
  // 数据库列表
  databases: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql57/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/databases', database),
  // 删除数据库
  deleteDatabase: (database: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql57/databases', { params: { database } }),
  // 备份列表
  backups: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql57/backups', { params: { page, limit } }),
  // 创建备份
  createBackup: (database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/backups', { database }, { timeout: 0 }),
  // 上传备份
  uploadBackup: (backup: any): Promise<AxiosResponse<any>> =>
    request.put('/plugins/mysql57/backups', backup, { timeout: 0 }),
  // 删除备份
  deleteBackup: (name: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql57/backups', { params: { name } }),
  // 还原备份
  restoreBackup: (backup: string, database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/backups/restore', { backup, database }, { timeout: 0 }),
  // 用户列表
  users: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql57/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any): Promise<AxiosResponse<any>> => request.post('/plugins/mysql57/users', user),
  // 删除用户
  deleteUser: (user: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql57/users', { params: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/users/password', { user, password }),
  // 设置用户权限
  setUserPrivileges: (user: string, database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql57/users/privileges', { user, database })
}
