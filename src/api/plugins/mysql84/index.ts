import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 运行状态
  status: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/status'),
  // 重载
  reload: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/reload'),
  // 重启
  restart: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/restart'),
  // 启动
  start: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/start'),
  // 停止
  stop: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/stop'),
  // 负载状态
  load: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/load'),
  // 获取配置
  config: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/config'),
  // 保存配置
  saveConfig: (config: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/config', { config }),
  // 获取错误日志
  errorLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/errorLog'),
  // 清空错误日志
  clearErrorLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/clearErrorLog'),
  // 获取慢查询日志
  slowLog: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/slowLog'),
  // 清空慢查询日志
  clearSlowLog: (): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/clearSlowLog'),
  // 获取 root 密码
  rootPassword: (): Promise<AxiosResponse<any>> => request.get('/plugins/mysql84/rootPassword'),
  // 修改 root 密码
  setRootPassword: (password: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/rootPassword', { password }),
  // 数据库列表
  databases: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql84/databases', { params: { page, limit } }),
  // 创建数据库
  addDatabase: (database: any): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/databases', database),
  // 删除数据库
  deleteDatabase: (database: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql84/databases', { params: { database } }),
  // 备份列表
  backups: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql84/backups', { params: { page, limit } }),
  // 创建备份
  createBackup: (database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/backups', { database }),
  // 上传备份
  uploadBackup: (backup: any): Promise<AxiosResponse<any>> =>
    request.put('/plugins/mysql84/backups', backup),
  // 删除备份
  deleteBackup: (name: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql84/backups', { params: { name } }),
  // 还原备份
  restoreBackup: (backup: string, database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/backups/restore', { backup, database }),
  // 用户列表
  users: (page: number, limit: number): Promise<AxiosResponse<any>> =>
    request.get('/plugins/mysql84/users', { params: { page, limit } }),
  // 创建用户
  addUser: (user: any): Promise<AxiosResponse<any>> => request.post('/plugins/mysql84/users', user),
  // 删除用户
  deleteUser: (user: string): Promise<AxiosResponse<any>> =>
    request.delete('/plugins/mysql84/users', { params: { user } }),
  // 设置用户密码
  setUserPassword: (user: string, password: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/users/password', { user, password }),
  // 设置用户权限
  setUserPrivileges: (user: string, database: string): Promise<AxiosResponse<any>> =>
    request.post('/plugins/mysql84/users/privileges', { user, database })
}
