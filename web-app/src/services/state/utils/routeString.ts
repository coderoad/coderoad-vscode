const createRouteString = (route: object | string): string => {
  if (typeof route === 'string') {
    return route
  }
  const paths: string[] = []
  let current: object | string | undefined = route
  while (current) {
    // current is final string value
    if (typeof current === 'string') {
      paths.push(current)
      break
    }

    // current is object
    const next: string = Object.keys(current)[0]
    paths.push(next)
    // @ts-ignore
    current = current[next]
  }

  return paths.join('.')
}

export default createRouteString
