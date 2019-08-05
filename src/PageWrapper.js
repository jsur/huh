import * as React from 'react'

class PageWrapper extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: '0 5%',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxWidth: '100%'
        }}
      >
        { this.props.children }
      </div>
    )
  }
}

export default PageWrapper
