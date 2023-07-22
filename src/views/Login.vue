<template>
	<el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="ruleForm"
  >
    <el-form-item label="用户名：" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
		<el-form-item label="密码：" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/store';

defineOptions({ name: 'Login' });

const userInfo = ref('')
const auth = useAuthStore()
userInfo.value = auth.userInfo

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.name !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('name', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  name: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  name: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
			auth.submitLoginInfo(ruleForm.name)
			userInfo.value = auth.userInfo
    } else {
			auth.resetAuthStore()
			userInfo.value = auth.userInfo
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
	auth.resetAuthStore()
	userInfo.value = auth.userInfo
}
</script>

<style lang="less" scoped>
.ruleForm {
	max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
	/deep/ .el-form-item {
		label {
			font-size: @size-title;
    	color: @color-title;
		}
	}
}
</style>
