import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function MovingBanner() {
  return (
    <Carousel style={{ height: 300, display: 'flex' }}>
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 300, objectFit: 'cover', width: '100%' }}
          src="https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 300, objectFit: 'cover', width: '100%' }}
          src="https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          style={{ height: 300, objectFit: 'cover', width: '100%' }}
          src="https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
