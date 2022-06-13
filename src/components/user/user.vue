     <template>
  <el-card>
    <el-breadcrumb>
      <el-breadcrumb-item>录音管理</el-breadcrumb-item>
      <el-breadcrumb-item>录音数据</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="inputArea">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        format="YYYY-MM-DD"
        value-format="x"
      />
       <el-select v-model="value2" class="m-2" placeholder="呼叫类型" size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
      <el-input v-model="name" placeholder="请输入姓名"></el-input>
      <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      <el-button @click="reset" type="primary">重置</el-button>
      <el-button @click="search" type="primary">查询</el-button>
    </div>
  </el-card>
  <el-table v-loading="loading" stripe border :data="userData">
    <el-table-column label="业务员姓名" prop="business" />
    <el-table-column label="主叫号码" prop="callerNo" />
    <el-table-column label="被叫号码" prop="calledNo" />
    <el-table-column label="呼叫类型" prop="callType" />
    <el-table-column label="通话开始时间" prop="startTime" />
    <el-table-column label="通话结束时间" prop="endTime" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handle(scope.$index, scope.row)"
          >播放录音</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[10, 20, 30, 40]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
import { ref, getCurrentInstance } from "vue";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
  const options = [
  {
    value: 'callerNo ',
    label: ' 呼出',
  },
  {
    value: 'callerdNo',
    label: ' 呼入 ',
  },
]
const value2 = ref('')
    let name = ref("");
    let phone = ref("");
    let value = ref("");
    function reset() {
      console.log(1);
      name.value = "";
      phone.value = "";
      value.value = "";
      value2.value = "";
    }
    const userData = ref([]);
    const loading=ref(false)
    const total = ref(0);
    function search(page, page_number) {
      loading.value=true
      const one_day = value.value[0] || 0;
      const two_day = value.value[1] || 0;
      const obj = {
        phone: phone.value,
        name: name.value,
        one_day: one_day,
        two_day: two_day,
        page_number: page_number || 10,
        page: page,
        call_type: value2.value,
      };
      if (obj.phone) {
        if (!/(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/.test(obj.phone)) {
          alert("手机号不正确");
          return;
        }
      }
      proxy.$axios
        .post("/new_search_serve", obj)
        .then((res) => {
          loading.value=false
          console.log(res);
          userData.value = res.data.info.data;
          total.value = res.data.info.total;
        })
        .catch((error) => {
            loading.value=false
          console.log(error);
        });
    }
    const handleSizeChange = (val) => {
      console.log(val);
      search(1, val);
    };
    const handleCurrentChange = (val) => {
      console.log(val);
      search(val, 10);
    };
    const handle = (val1, val2) => {
      window.open(val2.oss_url);
    };
    const shortcuts = [
      {
        text: "上个星期",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
        },
      },
      {
        text: "上个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
        },
      },
      {
        text: "过去三个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
        },
      },
    ];
    return {
      value,
      value2,
      shortcuts,
      name,
      phone,
      reset,
      search,
      userData,
      total,
      handleSizeChange,
      handleCurrentChange,
      handle,
      loading,options
    };
  },
};
</script>
<style>
.el-input {
  width: 200px;
  margin-left: 10px;
}
.inputArea {
  margin: 10px 10px;
  display: flex;
  justify-content: center;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.el-button {
  margin-left: 10px;
}
</style>
