import Vue from 'vue'

import {
  DatePicker,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Card,
  Button,
  Message
} from 'element-ui'

Vue.component(DatePicker.name, DatePicker)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(Button.name, Button)

Vue.prototype.$message = Message
