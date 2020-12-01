<template>
	<div>
		<div class="web-login">
			<div class="logo">
				<img
					src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
				/>
			</div>
			<div class="login-form">
				<el-form
					:rules="rules"
					ref="ruleForm"
					:model="ruleForm"
					class="demo-ruleForm form-group"
				>
					<el-form-item prop="mobile">
						<el-input
							placeholder="手机号"
							v-model="ruleForm.mobile"
							maxlength="11"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							placeholder="请输入密码"
							v-model="ruleForm.password"
							show-password
						></el-input>
					</el-form-item>
					<el-form-item class="submit login-btn">
						<el-button @click="submitForm('ruleForm')"> 登录 </el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import { UserLogin } from "@/api/api";
import { Dialog } from "vant";
import Vue from "vue";
Vue.use(Dialog);
export default {
	data() {
		return {
			visible: false,
			ruleForm: {
				password: "",
				mobile: "",
			},
			rules: {
				mobile: [
					{
						required: true,
						message: "请输入手机号",
						trigger: "blur",
					},
					{
						pattern: /^1[3-9]\d{9}$/,
						message: "手机格式不正确",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					},
					{
						min: 6,
						max: 16,
						message: "长度在 6 到 16 个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				console.log(valid);
				if (valid) {
					// 成功
					let ret = await UserLogin(this.ruleForm);
					if (ret.data.code == 10000) {
						this.$store.commit("updatedToken", ret.data.data._token);
						if (this.$route.query.refer) {
							this.$router.push({ path: this.$route.query.refer });
						} else {
							this.$router.push({ path: "/center" });
						}
					} else {
						// 失败
						alert("登录失败");
					}
				}
			});
		},
	},
	created() {
		// 发起通知 通知APP.Vue组件,移除底部菜单
		this.eventBus.$emit("footerNav", false);
	},
	beforeDestroy() {
		// 发起通知,通知APP.Vue组件,恢复底部菜单
		this.eventBus.$emit("footerNav", true);
	},
	components: {
		[Dialog.Component.name]: Dialog.Component,
	},
};
</script>
<style lang="scss" >
.web-login {
	overflow: hidden;
	font-size: 15px;

	.logo {
		margin: 79px auto 40px;
		text-align: center;
		height: 60px;
		line-height: 60px;
		img {
			height: 60px;
		}
	}
	.login-form {
		width: 100%;
		position: relative;

		.form-group {
			line-height: 55px;
			margin: 0 25px;
			position: relative;
			.el-form-item {
				border-bottom: 1px solid #dcdfe6;
				.el-button {
					border: 0;
					background-color: #ff5f16;
					color: #fff;
					width: 100%;
					height: 100%;
				}
			}

			.el-input__inner {
				height: 15px;
				line-height: 15px;
				padding: 20px 0;
				width: 100%;
				font-size: 15px;
				color: #191a1b;
				border: 0;
				outline-width: 0;
			}
		}
	}
	.submit {
		line-height: 45px;
		font-size: 16px;
		margin: 70px 25px 0;
		margin-top: 70px;
		border-radius: 3px;
		text-align: center;
		background-color: #ff5f16;
		height: 44px;
		color: #fff;
		border: none;
		// span {
		// 	// opacity: 0.3;
		// }
	}
	.login-btn {
		margin-top: 70px;
	}
}
</style>