import React from 'react'
import { shallow } from 'enzyme'
import ArticleDesc from './ArticleDesc'


describe('ArticleDesc', () => { 
  const props = { 
    title: "",
    text: "",
    onGetNews: () => {}, 
  }

  describe('ArticleDesc initial', () => { 
    const newsContainer = shallow(<ArticleDesc {...props} />)

    it('render initial', () => {
      expect(newsContainer.find('h3')).toHaveLength(1) // .find + поиск по тэгу
      expect(newsContainer.find('p')).toHaveLength(1) // .find + поиск по имени компонента
    })

  })
})