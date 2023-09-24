import { Form, Input, InputNumber, Radio, Select, Typography } from 'antd'

const DefaultForm = (props) => {
  const { form, fields, onFinish, readonly, withRef, nameRef } = props

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      layout="horizontal"
      onFinish={onFinish}
    >
      {fields.map((item) => {
        if (item.name === 'titleform')
          return (
            <Typography.Title key={item.label} level={4}>
              {item.label}
            </Typography.Title>
          )
        return (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.idInput === undefined ? item.name : item.idInput}
            rules={
              item.require
                ? [
                    {
                      required: true,
                      message: `Mohon masukkan ${item.label}!`,
                    },
                  ]
                : null
            }
          >
            {item.type === 'input' ? (
              <Input
                readOnly={readonly ?? false}
                ref={
                  nameRef !== undefined && item.name === nameRef
                    ? withRef
                    : null
                }
              />
            ) : item.type === 'number' ? (
              <InputNumber
                style={{ width: '100%' }}
                readOnly={readonly ?? false}
                controls={item.controlNumber ?? true}
              />
            ) : item.type === 'select' ? (
              <Select options={item.inputItems} />
            ) : item.type === 'radio' ? (
              <Radio.Group>
                {item.inputItems.map((rItem) => {
                  return (
                    <Radio key={rItem.value} value={rItem.value}>
                      {' '}
                      {rItem.label}{' '}
                    </Radio>
                  )
                })}
              </Radio.Group>
            ) : (
              <></>
            )}
          </Form.Item>
        )
      })}
    </Form>
  )
}
export default DefaultForm
