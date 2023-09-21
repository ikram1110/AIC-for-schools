import { Form, Input, Radio, Select } from 'antd'

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
                      message: `Mohon masukan ${item.label}!`,
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
              <Input type="number" readOnly={readonly ?? false} />
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
