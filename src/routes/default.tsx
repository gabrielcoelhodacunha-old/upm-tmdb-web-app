import React from 'react'
import { Navigate } from 'react-router'
import IRoute from './IRoute'

function DefaultRoute(path : string) {
  return {
    index: true,
    element: <Navigate to={`/${path}`}/>
  } as IRoute
}

export default DefaultRoute