import { getRemote } from '../ipc/ipc-renderer'
import { MainApiType } from '../main/index'

export const ipcProxy = getRemote<MainApiType>()
