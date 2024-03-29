<script lang="ts" setup>
import info from '@/api/panel/info'
import type { CountInfo, HomePlugin, NowMonitor, SystemInfo } from './types'
import { router } from '@/router'
import { NButton, NPopconfirm } from 'naive-ui'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const nowMonitor = ref<NowMonitor | null>(null)
const systemInfo = ref<SystemInfo | null>(null)
const homePlugins = ref<HomePlugin[] | null>(null)
const countInfo = ref<CountInfo>({
  website: 0,
  database: 0,
  ftp: 0,
  cron: 0
})

const cores = ref(0)
const netTotalSent = ref(0)
const netTotalRecv = ref(0)
const netCurrentSent = ref(0)
const netCurrentRecv = ref(0)
const diskTotalRead = ref(0)
const diskTotalWrite = ref(0)
const diskCurrentRead = ref(0)
const diskCurrentWrite = ref(0)

const getNowMonitor = async () => {
  info.nowMonitor().then((res) => {
    res.data.percent[0] = formatPercent(res.data.percent[0])
    res.data.mem.usedPercent = formatPercent(res.data.mem.usedPercent)
    // 计算 CPU 核心数
    if (cores.value == 0) {
      for (let i = 0; i < res.data.cpus.length; i++) {
        cores.value += res.data.cpus[i].cores
      }
    }
    // 计算网络流量
    let netTotalSentTemp = 0
    let netTotalRecvTemp = 0
    let netTotalSentOld = netTotalSent.value
    let netTotalRecvOld = netTotalRecv.value
    for (let i = 0; i < res.data.net.length; i++) {
      if (res.data.net[i].name === 'lo') {
        continue
      }
      netTotalSentTemp += res.data.net[i].bytesSent
      netTotalRecvTemp += res.data.net[i].bytesRecv
    }
    netTotalSent.value = netTotalSentTemp
    netTotalRecv.value = netTotalRecvTemp
    netCurrentSent.value = (netTotalSent.value - netTotalSentOld) / 3
    netCurrentRecv.value = (netTotalRecv.value - netTotalRecvOld) / 3
    // 计算磁盘读写
    let diskTotalReadTemp = 0
    let diskTotalWriteTemp = 0
    let diskTotalReadOld = diskTotalRead.value
    let diskTotalWriteOld = diskTotalWrite.value
    for (let i = 0; i < res.data.disk_io.length; i++) {
      diskTotalReadTemp += res.data.disk_io[i].readBytes
      diskTotalWriteTemp += res.data.disk_io[i].writeBytes
    }
    diskTotalRead.value = diskTotalReadTemp
    diskTotalWrite.value = diskTotalWriteTemp
    diskCurrentRead.value = (diskTotalRead.value - diskTotalReadOld) / 3
    diskCurrentWrite.value = (diskTotalWrite.value - diskTotalWriteOld) / 3

    nowMonitor.value = res.data
  })
}

const getSystemInfo = async () => {
  info.systemInfo().then((res) => {
    systemInfo.value = res.data
  })
}
const getCountInfo = async () => {
  info.countInfo().then((res) => {
    countInfo.value = res.data
  })
}

const getHomePlugins = async () => {
  info.homePlugins().then((res) => {
    homePlugins.value = res.data
  })
}

const handleRestartPanel = () => {
  clearInterval(homeInterval)
  window.$message.loading('面板重启中...')
  info.restart().then(() => {
    window.$message.success('面板重启成功')
    setTimeout(() => {
      appStore.reloadPage()
    }, 3000)
  })
}

const handleUpdate = () => {
  info.checkUpdate().then((res) => {
    if (res.data.update) {
      router.push({ name: 'home-update' })
    } else {
      window.$message.success('当前已是最新版本')
    }
  })
}

const formatPercent = (num: any) => {
  num = Number(num)
  return Number(num.toFixed(2))
}

const formatBytes = (size: any) => {
  size = Number(size)
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0

  while (size >= 1024 && i < units.length) {
    size /= 1024
    i++
  }

  return size.toFixed(2) + ' ' + units[i]
}

let eggCount = 0
const getEgg = () => {
  eggCount++
  if (eggCount > 10) {
    return '你干嘛，哎呦！'
  } else if (eggCount > 4) {
    return '厉不厉害你坤哥'
  } else {
    return '在多一眼看一眼就会爆炸'
  }
}

const toJiHu = () => {
  window.open('https://git.haozi.net/opensource/panel')
}

const handleManagePlugin = (slug: string) => {
  router.push({ name: 'plugins-' + slug + '-index' })
}

let homeInterval: any = null

onMounted(() => {
  getNowMonitor()
  getSystemInfo()
  getCountInfo()
  getHomePlugins()
  homeInterval = setInterval(() => {
    getNowMonitor()
  }, 3000)
})

onUnmounted(() => {
  clearInterval(homeInterval)
})
</script>

<template>
  <AppPage :show-footer="true" min-w-375>
    <div flex-1>
      <n-space vertical>
        <div>
          <n-card :segmented="true" rounded-10 size="small">
            <n-page-header :subtitle="systemInfo?.panel_version">
              <n-grid :cols="4">
                <n-gi>
                  <n-statistic label="网站" :value="countInfo.website + ' 个'" />
                </n-gi>
                <n-gi>
                  <n-statistic label="数据库" :value="countInfo.database + ' 个'" />
                </n-gi>
                <n-gi>
                  <n-statistic label="FTP" :value="countInfo.ftp + ' 个'" />
                </n-gi>
                <n-gi>
                  <n-statistic label="计划任务" :value="countInfo.cron + ' 个'" />
                </n-gi>
              </n-grid>
              <template #title> 耗子 Linux 面板</template>
              <template #extra>
                <n-space>
                  <n-button @click="toJiHu">开源地址</n-button>
                </n-space>
              </template>
            </n-page-header>
          </n-card>
        </div>
        <n-grid
          x-gap="12"
          y-gap="12"
          cols="1 s:1 m:1 l:3 xl:3 2xl:3"
          item-responsive
          responsive="screen"
        >
          <n-gi>
            <n-card :segmented="true" rounded-10 size="small" title="资源使用">
              <n-space v-if="nowMonitor" vertical :size="30">
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:cpu-64-bit />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> CPU</template>
                  <template #description>
                    <n-progress
                      type="line"
                      :percentage="nowMonitor.percent[0]"
                      :indicator-placement="'inside'"
                    />
                  </template>
                  <p>{{ nowMonitor.cpus.length }} CPU / 共 {{ cores }} 线程</p>
                  <p>{{ nowMonitor.cpus[0].modelName }}</p>
                </n-thing>
                <n-thing v-if="nowMonitor">
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:memory />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 内存</template>
                  <template #description>
                    <n-progress
                      type="line"
                      status="info"
                      :percentage="nowMonitor.mem.usedPercent"
                      :indicator-placement="'inside'"
                    />
                  </template>
                  <p>
                    物理内存 使用
                    {{ formatBytes(nowMonitor.mem.used) }}
                    / 总共
                    {{ formatBytes(nowMonitor.mem.total) }}
                  </p>
                  <p>
                    交换分区 使用
                    {{ formatBytes(nowMonitor.swap.used) }}
                    / 总共
                    {{ formatBytes(nowMonitor.swap.total) }}
                  </p>
                </n-thing>
              </n-space>
              <n-skeleton v-else text :repeat="10" />
            </n-card>
          </n-gi>
          <n-gi>
            <n-card :segmented="true" rounded-10 size="small" title="系统负载">
              <n-space v-if="nowMonitor" vertical size="large">
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:gauge-empty />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 近 1 分钟</template>
                  <n-popover trigger="hover" placement="top-end">
                    <template #trigger>
                      <n-progress
                        type="line"
                        :percentage="formatPercent((nowMonitor.load.load1 / cores) * 100)"
                        :indicator-placement="'inside'"
                      />
                    </template>
                    <span>
                      1 分钟负载 <n-tag type="primary">{{ nowMonitor.load.load1 }}</n-tag>
                    </span>
                  </n-popover>
                </n-thing>
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <!--系统负载-->
                        <icon-mdi:gauge />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 近 5 分钟</template>
                  <n-popover trigger="hover" placement="top-end">
                    <template #trigger>
                      <n-progress
                        type="line"
                        :percentage="formatPercent((nowMonitor.load.load5 / cores) * 100)"
                        :indicator-placement="'inside'"
                      />
                    </template>
                    <span>
                      5 分钟负载 <n-tag type="primary">{{ nowMonitor.load.load5 }}</n-tag>
                    </span>
                  </n-popover>
                </n-thing>
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:gauge-full />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 近 15 分钟</template>
                  <n-popover trigger="hover" placement="top-end">
                    <template #trigger>
                      <n-progress
                        type="line"
                        :percentage="formatPercent((nowMonitor.load.load15 / cores) * 100)"
                        :indicator-placement="'inside'"
                      />
                    </template>
                    <span>
                      15 分钟负载 <n-tag type="primary">{{ nowMonitor.load.load15 }}</n-tag>
                    </span>
                  </n-popover>
                </n-thing>
              </n-space>
              <n-skeleton v-else text :repeat="10" />
            </n-card>
          </n-gi>
          <n-gi>
            <n-card :segmented="true" rounded-10 size="small" title="实时流量">
              <n-space v-if="nowMonitor" vertical :size="36">
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:server-network />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 网络</template>
                  <p>
                    实时上行 {{ formatBytes(netCurrentSent) }}/s / 实时下行
                    {{ formatBytes(netCurrentRecv) }}/s
                  </p>
                  <p>
                    累计上行 {{ formatBytes(netTotalSent) }} / 累计下行
                    {{ formatBytes(netTotalRecv) }}
                  </p>
                </n-thing>
                <n-thing>
                  <template #avatar>
                    <n-avatar>
                      <n-icon>
                        <icon-mdi:harddisk />
                      </n-icon>
                    </n-avatar>
                  </template>
                  <template #header> 磁盘</template>
                  <p>
                    实时读取 {{ formatBytes(diskCurrentRead) }}/s / 实时写入
                    {{ formatBytes(diskCurrentWrite) }}/s
                  </p>
                  <p>
                    累计读取 {{ formatBytes(diskTotalRead) }} / 累计写入
                    {{ formatBytes(diskTotalWrite) }}
                  </p>
                </n-thing>
              </n-space>
              <n-skeleton v-else text :repeat="10" />
            </n-card>
          </n-gi>
        </n-grid>
        <n-grid
          x-gap="12"
          y-gap="12"
          cols="1 s:1 m:2 l:3 xl:3 2xl:3"
          item-responsive
          responsive="screen"
        >
          <n-gi span="2 s:1 m:1 l:2">
            <div min-w-375 flex-1>
              <n-card :segmented="true" rounded-10 size="small" title="存储信息">
                <n-space v-if="nowMonitor" class="pb-10 pt-10">
                  <div v-for="item in nowMonitor?.disk_usage" :key="item.path">
                    <n-popover trigger="hover">
                      <template #trigger>
                        <n-space vertical class="flex items-center">
                          <p>{{ item.path }}</p>
                          <n-progress :percentage="formatPercent(item.usedPercent)" type="circle">
                          </n-progress>
                          <p>{{ formatBytes(item.used) }} / {{ formatBytes(item.total) }}</p>
                        </n-space>
                      </template>
                      <n-table :single-line="false">
                        <tr>
                          <th>挂载点</th>
                          <td>{{ item.path }}</td>
                        </tr>
                        <tr>
                          <th>文件系统</th>
                          <td>{{ item.fstype }}</td>
                        </tr>
                        <tr>
                          <th>Inodes 使用率</th>
                          <td>{{ formatPercent(item.inodesUsedPercent) }}%</td>
                        </tr>
                        <tr>
                          <th>Inodes 总共</th>
                          <td>{{ item.inodesTotal }}</td>
                        </tr>
                        <tr>
                          <th>Inodes 已用</th>
                          <td>{{ item.inodesUsed }}</td>
                        </tr>
                        <tr>
                          <th>Inodes 可用</th>
                          <td>{{ item.inodesFree }}</td>
                        </tr>
                      </n-table>
                    </n-popover>
                  </div>
                </n-space>
                <n-skeleton v-else text :repeat="9" />
              </n-card>
            </div>
          </n-gi>
          <n-gi>
            <div min-w-375 flex-1>
              <n-card :segmented="true" rounded-10 size="small" title="系统信息">
                <n-table :single-line="false">
                  <tr>
                    <th>系统信息</th>
                    <td>{{ systemInfo?.os_name || '加载中...' }}</td>
                  </tr>
                  <tr>
                    <th>面板版本</th>
                    <td>{{ systemInfo?.panel_version || '加载中...' }}</td>
                  </tr>
                  <tr>
                    <th>运行时间</th>
                    <td>{{ systemInfo?.uptime || '加载中...' }} 天</td>
                  </tr>
                  <tr>
                    <th>操作</th>
                    <td>
                      <n-space>
                        <n-popconfirm @positive-click="handleRestartPanel">
                          <template #trigger>
                            <n-button type="warning">
                              <n-icon size="20">
                                <icon-mdi:restart />
                              </n-icon>
                              重启面板
                            </n-button>
                          </template>
                          确定要重启面板吗？
                        </n-popconfirm>
                        <n-button type="success" @click="handleUpdate">
                          <n-icon size="20">
                            <icon-mdi:arrow-up-bold-circle-outline />
                          </n-icon>
                          检查更新
                        </n-button>
                      </n-space>
                    </td>
                  </tr>
                </n-table>
              </n-card>
            </div>
          </n-gi>
        </n-grid>
        <n-grid
          x-gap="12"
          y-gap="12"
          cols="1 s:1 m:2 l:3 xl:3 2xl:3"
          item-responsive
          responsive="screen"
        >
          <n-gi span="2 s:1 m:1 l:2">
            <div min-w-375 flex-1>
              <n-card :segmented="true" rounded-10 size="small" title="快捷插件">
                <n-grid
                  v-if="homePlugins"
                  x-gap="12"
                  y-gap="12"
                  cols="3 s:1 m:2 l:3"
                  item-responsive
                  responsive="screen"
                >
                  <n-gi v-for="item in homePlugins" :key="item.name">
                    <n-card
                      :segmented="true"
                      size="small"
                      cursor-pointer
                      rounded-10
                      hover:card-shadow
                      @click="handleManagePlugin(item.slug)"
                    >
                      <n-space>
                        <n-thing>
                          <template #avatar>
                            <n-avatar class="mt-4">
                              <n-icon>
                                <icon-mdi:package-variant-closed />
                              </n-icon>
                            </n-avatar>
                          </template>
                          <template #header>
                            {{ item.name }}
                          </template>
                          <template #description>
                            {{ item.version }}
                          </template>
                        </n-thing>
                      </n-space>
                    </n-card>
                  </n-gi>
                </n-grid>
                <n-skeleton v-else text :repeat="9" />
              </n-card>
            </div>
          </n-gi>
          <n-gi>
            <div min-w-375 flex-1>
              <n-card :segmented="true" rounded-10 size="small" title="关于面板">
                <template #header-extra>
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-icon size="20">
                        <icon-mdi:about-circle-outline />
                      </n-icon>
                    </template>
                    <span>{{ getEgg() }}</span>
                  </n-popover>
                </template>
                <n-space vertical :size="12">
                  <n-alert type="success">
                    树新蜂开发组祝大家 2024 立春快乐！永无Bug！永不宕机！
                  </n-alert>
                  <n-alert type="info">
                    欢迎使用耗子 Linux 面板。如遇到问题，可通过
                    <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH"> QQ 群 </a>
                    /
                    <a target="_blank" href="https://pd.qq.com/s/fyol46wfy"> QQ 频道 </a>
                    /
                    <a target="_blank" href="https://github.com/TheTNB/panel/issues"> GitHub </a>
                    寻求帮助
                  </n-alert>
                  <n-alert type="info">
                    特别感谢
                    <a target="_blank" href="https://www.weixiaoduo.com/">『薇晓朵』</a>
                    对面板的大力支持！
                  </n-alert>
                </n-space>
              </n-card>
            </div>
          </n-gi>
        </n-grid>
      </n-space>
    </div>
  </AppPage>
</template>
