<template>
  <div class="wrapper">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :label-position="'top'"
        label-width="200px"
        :inline="true"
      >
        <el-form-item label="Місце відправлення" prop="departure">
          <el-input
            v-model="form.departure"
            placeholder="Звідки"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Місце прибуття" prop="arrival">
          <el-input
            v-model="form.arrival"
            placeholder="Куди"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Дата" prop="depTime">
          <el-date-picker
            v-model="form.depTime"
            type="date"
            placeholder="Виберіть дату"
            :disabled-date="disabledDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            @click.prevent="searchFlights('form')"
            icon="el-icon-search"
            plain
            >Пошук</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      disabledDate(time) {
        return time.getTime() < moment(Date.now()).subtract(1, 'days');
      },

      form: {
        departure: '',
        depTime: new Date(),
        arrival: '',
      },

      rules: {
        departure: [
          {
            required: true,
            message: 'Введіть назву місця відправлення',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 25,
            message: 'Довжина повинна складати від 3 до 25 символів',
            trigger: 'blur',
          },
        ],
        depTime: [
          {
            type: 'date',
            required: true,
            message: 'Виберіть дійсну дату',
            trigger: 'change',
          },
        ],
        arrival: [
          {
            required: true,
            message: 'Введіть назву місця прибуття',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 25,
            message: 'Довжина повинна складати від 3 до 25 символів',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    searchFlights(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios
            .post(
              'http://localhost:7000/api/v1/flights/search',
              {
                departure: this.form.departure,
                depTime: this.form.depTime.toISOString(),
                arrival: this.form.arrival,
              },
              { withCredentials: true }
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              this.$notify.error({
                title: 'Помилка',
                message: 'Виникла невідома помилка',
              });
              console.log(error);
            });
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

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    display: flex;
    justify-content: center;
    text-align: start;
  }
}

.el-form {
  width: 100%;
  padding: 0;
  margin: 0;
  .el-button {
    padding: 5px 65px;
    margin-top: 50px;
  }
}

.el-form-item {
  margin: 0 30px 25px;
  text-align: center;
  width: 225px;
}

// .el-form-item--label-top .el-form-item__label {
//   text-align: center;
//   padding: 0;
// }

// label.el-form-item__label {
//   padding: 0 !important;
// }

// input.el-input__inner {
//   width: 300px;
// }

.el-form-item {
  margin-bottom: 10px;
}

.centered {
  text-align: center;
}
</style>
