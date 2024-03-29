import { withInstall } from '@/fits-components/withInstall'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const WangEditor = withInstall(Editor)
const WangToolbar = withInstall(Toolbar)

export { WangEditor, WangToolbar }