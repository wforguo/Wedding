<template>
    <div>
        <Card>
            <Button style="margin: 15px 0;" type="primary" @click="showAddUser">添加</Button>
            <Button style="margin: 10px 15px;" type="primary" @click="exportExcel">导出为Csv文件</Button>
            <tables border :loading="loading" stripe ref="tables" editable search-place="top" v-model="tableData"
                    :columns="columns" @on-delete="handleDelete"/>

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
                    <FormItem label="用户头像" style="margin-top: 15px;">
                        <Input type="text" v-model="formData.userAvatar"></Input>
                    </FormItem>
                    <FormItem label="用户昵称" style="margin-top: 15px;">
                        <Input type="text" v-model="formData.userName"></Input>
                    </FormItem>
                </Form>
            </Modal>

        </Card>
    </div>
</template>

<script>
    import Tables from '_c/tables'
    import { getUser, addUser, delUser } from '@/api/user'

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
                    {
                        title: '头像',
                        key: 'url',
                        sortable: false,
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
                            return h('Avatar', {
                                props: {
                                    src: params.row.userAvatar
                                }
                            })
                        }
                    },
                    {
                        title: '昵称', key: 'userName', editable: false, align: 'center' },
                    {
                        title: '创建时间',
                        key: 'userTime',
                        align: 'center'
                    },
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
                                            this.delUser(params.index)
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
            showAddUser () {
                this.addShow = true
            },
            delUser (index) {
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
                console.log(index, this.tableData[index])
                delUser({
                    userId: this.tableData[index]._id
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
                addUser(this.formData).then(res => {
                    this.addShow = false
                    console.log(res)
                    this.$Message.success('添加成功')
                    this.tableData.push(res.data)
                })
            }
        },
        mounted () {
            getUser({
                pageNum: 1,
                pageSize: 10
            }).then(res => {
                console.log(res.data.list)
                this.tableData = res.data.list
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
