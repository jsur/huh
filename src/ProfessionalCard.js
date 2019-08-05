import React from 'react'

const ProfessionalCard = ({ onClick, imageUrl, name, title }) => {
  return (
    <div style={styles.main} onClick={onClick}>
      <div style={styles.imageContainer}>
        <img src={imageUrl} style={styles.image} alt='professional' />
      </div>
      <div style={styles.details}>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{name}</p>
        <p style={{ margin: 0, fontSize: '0.85rem' }}>{title}</p>
      </div>
    </div>
  )
}

const styles = {
  main: {
    border: 'none',
    display: 'flex',
    height: '100px',
    boxShadow: '8px 10px 15px 0px rgba(0,0,0,0.15)',
    padding: '5%',
    margin: '2% 0'

  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100px',
    width: '100%'
  },
  image: {
    width: '70%',
    height: 'auto',
    maxHeight: '100px',
    borderRadius: '100px',
    backgroundColor: 'red'
  },
  details: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

export default ProfessionalCard
