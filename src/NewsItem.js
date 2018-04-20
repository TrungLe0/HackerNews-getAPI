import React, { Component } from 'react'
// import axios from 'axios'

const urlNewStoriesAPI = () => {
  return `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
}
const urlItemAPI = (id) => {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
}

class NewsItems extends Component {
  constructor (props) {
    super(props)
    this.createNewsItem = this.createNewsItem.bind(this)
    this.getNewsById = this.getNewsById.bind(this)
    this.state = {listNews: []}
  }

  createNewsItem (newsItem, index) {
    if (newsItem) {
      let url = newsItem['url'] ? <a href={newsItem['url']}>Details</a> : ''
      return(
        <tr key={newsItem['id']}>
          <th className="text-center">{index + 1}</th>
          <td className="text-center score">{newsItem['score']}</td>
          <td>{newsItem['title']}</td>
          <td>{url}</td>
        </tr>
      )
    }
  }

  componentDidMount() {
    fetch(urlNewStoriesAPI())
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach((newsItem) => {
            this.getNewsById(newsItem)
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getNewsById (id) {
    fetch(urlItemAPI(id))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            listNews: this.state.listNews.concat(result)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    let newsItem = this.state.listNews.map(this.createNewsItem)
    if (!this.state.isLoaded) return <p>Loading....</p>
    return(
      <table className="table table-hover">
        <thead>
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col">Score</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {newsItem}
        </tbody>
      </table>
    )
  }
}

export default NewsItems
