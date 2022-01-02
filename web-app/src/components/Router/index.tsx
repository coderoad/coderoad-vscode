import * as React from 'react'
import logger from '../../services/logger'

interface RouterProps {
  children: any
  route: string
}

// check if a route string (eg. 'a.b.c')
// matches a paths object ({ a: { b: { c: true }}})
const matches = (route: string, paths: object): boolean => {
  const keys: string[] = route.split('.')
  let current: any = paths || {}
  // if the key throws, there is no match
  for (const key of keys) {
    const next = current[key]
    if (next) {
      // exit early if property value is true
      if (next === true) {
        return true
      }
      current = next
      continue
    } else {
      return false
    }
  }
  return true
}

export const Router = ({ children, route }: RouterProps) => {
  // @ts-ignore may accept string as well as element
  const childArray: React.ReactElement[] = React.Children.toArray(children)
  for (const child of childArray) {
    // match path
    const { paths } = child.props
    let pathMatch = matches(route, paths)

    if (pathMatch) {
      return child.props.children
    }
  }
  const message = `No Route matches for "${JSON.stringify(route)}"`
  // TODO: onError(new Error(message))
  logger(message)
  return null
}

interface RouteProps {
  children: any
  paths: object
}

export const Route = ({ children }: RouteProps) => children
