<template>
  <div class="menu_manage">
    <el-row
      class="btn-group"
      :gutter="24"
    >
      <el-col
        :span="5"
        class="pull-left alignleft"
      >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus"
          @click="append"
        >
          添加
        </el-button>
      </el-col>
    </el-row>
    <el-row
      class="menu_box"
      :gutter="20"
    >
      <p>菜单管理</p>
      <el-col :span="15">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span>菜单id:{{ node.id }}</span>
            <span>名称：{{ node.label }}</span>
            <span>路径：{{ node.path }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => update(data)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
              >
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="50%"
      :before-close="handleClose"
    >
      <MyTwoColumForm
        :form="form"
        ref="myform"
        :formData="formData"
        :formItem="formItem"
        @submit="submit"
      > </MyTwoColumForm>
    </el-dialog>
  </div>
</template>
<script>
import API from "@/api/api_user.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";

let id = 1000;
export default {
  name: "menuIndex",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "addmenu",
      showTitle: false,
      showUploadImg: true,
      labelWidth: px2rem(500),
      labelPositon: "left",
      width: "80%",
      style: "notprepend",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    const data = [
      {
        id: 1,
        label: "一级 1",
        path: "/content",
        hidden: false,
        component: "@/views/menuManage/index",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            path: "/content",
            hidden: false,
            component: "@/views/menuManage/index",
            children: [
              {
                id: 9,
                path: "/content",
                label: "三级 1-1-1",
                hidden: false,
                component: "@/views/menuManage/index"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        path: "/content",
        component: "@/views/menuManage/index",
        children: [
          {
            id: 5,
            path: "/content",
            label: "二级 2-1",
            hidden: false,
            component: "@/views/menuManage/index"
          },
          {
            id: 6,
            path: "/content",
            label: "二级 2-2",
            hidden: false,
            component: "@/views/menuManage/index"
          }
        ]
      }
    ];
    return {
      dialogTitle: "添加菜单",
      dialogVisible: false,
      form: form,
      formItem: [],
      formData: {},
      clickObj: {},
      data: JSON.parse(JSON.stringify(data))
    };
  },
  created() {
    this.formInit();
  },
  methods: {
    formInit(type, row) {
      this.formItem = getFormField("menu", "item");
      this.formData = !!row ? row : getFormField("menu", "data");
    },
    append(data) {
      this.dialogTitle = "添加菜单";
      this.formInit();
      this.clickObj = !!data ? data : {};
      this.dialogVisible = true;
    },
    update(row) {
      this.dialogTitle = "编辑菜单";
      this.formData = row;
      this.formData.name = row.label;
      this.dialogVisible = true;
    },
    submit() {
      this.formData.parentid = this.clickObj.id;
      this.formData.id = id++;
      this.formData.children = [];
      this.formData.label = this.formData.name;
      const newChild = this.formData;
      if (!this.clickObj.children) {
        this.$set(this.clickObj, "children", []);
      }
      this.clickObj.children.push(newChild);
      this.dialogVisible = false;

      //   this.clickObj
      // const newChild = { id: id++, label: "testtest", children: [] };
      //   if (!data.children) {
      //     this.$set(data, "children", []);
      //   }
      //   data.children.push(newChild);
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
      //   this.data = JSON.parse(sessionStorage.getItem("userRow"));
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       {node}

    //       {data}
    //       {node.label}
    //       <span>菜单名：{node.label}</span>
    //       <span>路径：{node.path}</span>
    //       <span>组件：{node.component}</span>
    //       <span>是否显示：{node.hidden}</span>

    //       <span>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.append(data)}
    //         >
    //           Append
    //         </el-button>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.remove(node, data)}
    //         >
    //           Delete
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    // }
  }
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
