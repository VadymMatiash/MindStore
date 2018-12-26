import React from 'react'
import { shallow } from 'enzyme'
import NotFound from './NotFound'

describe('NotFound', () => {
  const notFound = shallow(<NotFound />)

  it('renders properly', () => {
    expect(notFound).toMatchSnapshot()
  })

  it('contains a not found header', () => {
    expect(notFound.find('h1').text()).toEqual('Page Not Found')
  })

  it('contains info text', () => {
    expect(notFound.find('p').text()).toEqual('Sorry, this page does not exist')
  })
})