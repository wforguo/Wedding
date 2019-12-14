<template>
  <div>
    <Card>
        <Button style="margin: 15px 0;" type="primary" @click="showAddPhoto">添加</Button>
        <tables border :loading="loading" stripe ref="tables" editable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>

        <Modal
            v-model="addShow"
            title="添加照片"
            :mask-closable="false"
            @on-ok="handleSubmit"
            :loading="false"
            @on-cancel="cancel">
            <Form ref="formCustom" label-position="top" style="width: 95%;margin: auto">
<!--                <Upload action="//jsonplaceholder.typicode.com/posts/">-->
<!--                    <Button icon="ios-cloud-upload-outline">上传照片</Button>-->
<!--                </Upload>-->
                <FormItem label="照片链接" style="margin-top: 15px;">
                    <Input type="text" v-model="formData.url"></Input>
                </FormItem>
                <FormItem label="照片描述" style="margin-top: 15px;">
                    <Input type="text" v-model="formData.desc"></Input>
                </FormItem>
            </Form>
        </Modal>

    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getPhoto, addPhoto, delPhoto } from '@/api/data'
export default {
  name: 'photo',
  components: {
    Tables
  },
  data () {
    return {
      loading: true,
      addShow: false,
      formData: {
        url: '',
        desc: ''
      },
      columns: [
        { title: '照片', key: 'url', sortable: true, align: 'center' },
        { title: '描述', key: 'desc', editable: true, align: 'center' },
        { title: '时间', key: 'time' },
        {
          title: '操作',
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delPhoto(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    cancel () {
      this.addShow = false
    },
    showAddPhoto () {
      this.addShow = true
    },
    delPhoto (index) {
      this.$Modal.confirm({
        title: '确认删除吗？',
        content: '<p>删除后将不可恢复</p>',
        loading: true,
        onOk: () => {
          this.confirmDel(index)
        }
      })
    },
    confirmDel (index) {
      delPhoto({
        id: this.tableData[index].id
      }).then(res => {
        this.tableData.splice(index, 1)
        this.$Modal.remove()
        this.$Message.success('删除成功')
      }).catch(() => {
        this.$Modal.remove()
        this.$Message.error('删除失败')
      })
    },
    handleSubmit () {
      addPhoto(this.formData).then(res => {
        this.addShow = false
        this.$Message.success('添加成功')
        this.tableData.push(res)
      })
    }
  },
  mounted () {
    getPhoto({
      page: 1,
      pageSize: 10
    }).then(res => {
      this.tableData = res.result.list
      this.loading = false
    }).catch(error => {
      console.log(error)
      this.loading = false
      // this.$Message.error(error || '当前访问人数过多，请稍后再试')
    })
  }
}
</script>

<style>

</style>
