<template>
  <h1>Реєстрація</h1>
  <div class="wrapper">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="'top'"
        label-width="150px"
      >
        <el-form-item label="Ім'я" prop="firstName">
          <el-input
            v-model="form.firstName"
            placeholder="Іван"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Прізвище" prop="lastName">
          <el-input
            v-model="form.lastName"
            placeholder="Шевченко"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Номер телефону" prop="phoneNumber">
          <el-input
            v-model="form.phoneNumber"
            placeholder="+380951234567"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input
            v-model="form.email"
            placeholder="test@gmail.com"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <div class="centered">
          <el-form-item>
            <el-button type="primary" @click.prevent="signUp('form')" plain
              >Зареєструватися</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
      },

      rules: {
        email: [
          {
            required: true,
            message: 'Введіть пошту',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Введіть пароль',
            trigger: 'blur',
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: 'Введіть номер телефону',
            trigger: 'blur',
          },
        ],
        firstName: [
          {
            required: true,
            message: "Введіть ім'я",
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'Введіть прізвище',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    signUp(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          try {
            this.$store
              .dispatch('signUp', {
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                phoneNumber: this.form.phoneNumber,
                email: this.form.email,
                password: this.form.password,
              })
              .then(this.$router.push('/'));
            this.$notify.success({
              title: 'Успіх',
              message: 'Реєстрація успішно завершена',
            });
          } catch (error) {
            this.$notify.error({
              title: 'Помилка',
              message: 'Виникла невідома помилка',
            });
            console.log(error);
          }
          console.log(this.form);
        } else {
          this.$notify.warning({
            title: 'Увага',
            message: 'Поля форми не повинні бути пустими',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

h1 {
  font-size: 32px;
  margin-bottom: 25px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    display: flex;
    justify-content: center;
    text-align: start;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: dashed 2px lightgray;
    border-radius: 30px;
    padding: 30px;
  }
}

.el-form {
  width: 500px;
  padding: 0;
  margin: 0;
  .el-button {
    padding: 0 20px;
    margin-top: 25px;
  }
}

.el-form-item {
  margin-bottom: 10px;
}

.centered {
  text-align: center;
}
</style>
