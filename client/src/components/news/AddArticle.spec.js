import React from 'react'
import { shallow } from 'enzyme'
import AddArticle from './AddArticle'

describe('AddArticle initial', () => {

  const mockFetchSendArticle = jest.fn() 
  const nextProps = { 
    sendArticle: mockFetchSendArticle, 
  }

  const addArticle = shallow(<AddArticle {...nextProps} />) // передали nextProps

  it('renders properly', () => {
    expect(addArticle).toMatchSnapshot()
  })

  it('dispatches the `sendArticle()` method it receives from props', () => {
    expect(mockFetchSendArticle).toHaveBeenCalledTimes(0) // создали ожидание с нужным ассертом
  })


})