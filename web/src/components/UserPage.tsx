import React from 'react'
import { useByeQuery } from '../generated/graphql'

export default function TestPage() {
  const { data, loading, error } = useByeQuery()
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    console.log(error)
    return <div>hata</div>
  }
  if (!data) {
    return <div>nodata</div>
  }
  return <div>kabul</div>
}
