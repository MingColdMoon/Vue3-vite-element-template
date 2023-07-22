<template>
	<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>通过ref和defineExpose来相互调用</span>
				<div ref="copyRef" data-clipboard-target="#CopyTarget">
					<el-button class="button" text  @click="copy">复制代码</el-button>
				</div>
      </div>
    </template>
    <HelloChild @go="childGo" :type="1" ref="chid" />
		<el-button class="button" text  @click="clickChildMehtod">调用子组件的方法</el-button>
		<textarea id="CopyTarget" v-model="dataClipboardText">
		</textarea>
  </el-card>

	<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>defineProps和defineEmits来调用</span>
				<div ref="copyRef" data-clipboard-target="#CopyTarget">
					<el-button class="button" text  @click="copy">复制代码</el-button>
				</div>
      </div>
    </template>
    <HelloChild @go="childGo" :type="2" />
		<textarea id="CopyTarget" v-model="dataClipboardText">
		</textarea>
  </el-card>
</template>

<script setup lang='ts'>
import Clipboard from 'clipboard';
import HelloChild from './HelloChild.vue';
import { ElMessage } from 'element-plus'

defineOptions({ name: 'Basic-Writing' });

const copyRef = ref<HTMLElement>();

const chid = ref<HTMLElement>();

const dataClipboardText = ref(getClipboardText());

function getClipboardText() {
  return ` // 父组件
			<HelloChild ref="chid" />
			chid?.value?.func()

			// 子组件
			function func () {
				return '我是子组件方法'
			}
			defineExpose({ func });
		`
}

function copy() {
	if (!copyRef.value) return;
	const clipboard = new Clipboard(copyRef.value);
	clipboard.on('success', () => {
		ElMessage.success('复制成功')
	})
}

function clickChildMehtod() {
	ElMessage.success(chid?.value?.func())
}

function childGo(params: string) {
	ElMessage.success(`我点击了子组件的方法，参数是${ params }`)
}
</script>

<style lang="less" scoped>
.box-card {
	width: 50%;
	margin: 20px auto;
	.card-header {
		display: flex;
    justify-content: space-between;
	}
}
</style>
