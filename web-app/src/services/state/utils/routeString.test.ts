import createRouteString from './routeString'

describe('route string', () => {
  it('should take a single key route', () => {
    const result = createRouteString('a')
    expect(result).toBe('a')
  })
  it('should take a 1 level nested key route', () => {
    const result = createRouteString({ a: 'b' })
    expect(result).toBe('a.b')
  })
  it('should take a 3 level nested key route', () => {
    const result = createRouteString({ a: { b: { c: 'd' } } })
    expect(result).toBe('a.b.c.d')
  })
})
