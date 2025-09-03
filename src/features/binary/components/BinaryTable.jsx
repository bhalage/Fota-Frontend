import { Table } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'

const BinaryTable = ({data}) => {
    const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    //   sorter: (a, b) => a.variantId.localeCompare(b.variantId),
    },]
  return (
    <Table
    columns={columns}
    dataSource={data}
    // rowKey={filname}
    // pagination={{ pageSize: 10 }}
    bordered
    />
  )
}

export default BinaryTable