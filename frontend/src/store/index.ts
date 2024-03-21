import useUserStore from './base/user';
import useAppStore from './base/app';
import usePermissionStore from './base/permission';
import useSettingStore from './base/settings';
import useTagsViewStore from './base/tagsView';
import useUserHabitsStorage from './base/storage';
import { createPinia } from 'pinia';
import { createPlugin } from 'vue3-persist-storages'
import { App } from 'vue';
import packagesInfo from '../../package.json'

const store = createPinia()
store.use(createPlugin({
  prefix: packagesInfo.name,
  debug: true
}))

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
  userHabits: useUserHabitsStorage()
});

export function setupStore(app: App) {
  app.use(store);
}

/**
 * 清理用户信息
 */
export function clearUserInfo() {
  const { user } = useStore();
  user.roles = []
}

export default useStore;
