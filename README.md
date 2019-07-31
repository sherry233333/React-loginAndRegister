## 一个高可复用性的登录/注册组件
组件可以很方便地添加表单项，并根据设置的规则rule来设置校验规则，在input失焦时check框中内容。组件中包含Login.js、LoginItem.js、button.js，其中Login.js是登录\注册框、LoginItem.js是框中的一项、button.js是按钮。

在Login.js中的state里面设置item能够添加和删除表单项，其他的表单里面的详细信息也都是在这里设置。在state里面设置ifsame能够设置需要比较两个表单的内容是否相等的表单项，first是被比较项（例如：密码），second是比较项（例如：确认密码）（比较项需要在item里面有firstval属性）。在state里面设置button可用于添加按钮的文字信息（<Button/>需要自行添加）。




