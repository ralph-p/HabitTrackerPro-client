import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'
import { BreadCrumbItem } from '../hooks/types/breadcrub'

type Props = {
  items: BreadCrumbItem[]
}

export const BreadCrumb = ({ items }: Props) => {
  return (
    <Breadcrumb fontWeight='medium' fontSize='sm'>
      {
        items.map((item) => (
          <BreadcrumbItem key={`${item.link}-${item.name}-key`}>
            {item.link ? <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink> : <BreadcrumbLink>{item.name}</BreadcrumbLink>}
          </BreadcrumbItem>
        ))
      }

    </Breadcrumb>
  )
}
