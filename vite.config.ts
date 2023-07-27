import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import { getSrcPath, getStylePath } from './build';

const srcPath = getSrcPath()
const stylePath = getStylePath()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
	css: {
		preprocessorOptions: {
			less: {
				 // 添加全局变量less，后面的；不能省略，不然会报错
				additionalData: `@import "${stylePath}";`,
				javascriptEnabled: true,
		},
		},
	},
	resolve: {
		alias: {
		'@': srcPath
		}
	},
  plugins: [
		vueJsx(),
    vue(),
		// mockJS配置
		viteMockServe({
			mockPath: "./mock",  // mock文件存放的位置
			localEnabled: command === "serve" && mode === "mock", //在开发环境中启用 mock
			}),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
        ElementPlusResolver()
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    }),
  ]
}))
