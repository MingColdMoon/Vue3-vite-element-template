<template>
	我是HelloChild子组件
	<el-button v-if="props.type === 2" class="button" text  @click="click">我是子组件按钮</el-button>
</template>

<script setup lang='ts'>

interface Emits {
	(e: 'go', value: string): void
}

interface Props {
	type: Number
}

const props = defineProps<Props>()

const num = ref('1')

const emit = defineEmits<Emits>()

function func () {
	return '我是子组件方法'
}

function click () {
	emit('go', '我是go方法的参数')
}

defineExpose({ func });
</script>

<style>

</style>
