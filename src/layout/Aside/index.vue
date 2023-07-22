<template>
<el-menu
	router
	background-color="#242424"
	text-color="#cfd3dc"
	active-text-color="#66b1ff" :default-openeds="['basic', 'basicWriting']">
		<el-sub-menu index="basic">
			<template #title>
				<el-icon><message /></el-icon>基础写法
			</template>
			<el-menu-item index="basicWriting">传参</el-menu-item>
			<el-menu-item index="text">text</el-menu-item>
		</el-sub-menu>
</el-menu>
</template>

<script setup lang='ts'>

</script>

<style>

</style>
