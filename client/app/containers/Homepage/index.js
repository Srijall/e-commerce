/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import axios from 'axios'; // Import axios for making HTTP requests

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recommendedProducts: [], // Initialize an empty array to store recommended products
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    // Make the API call when the component mounts
    axios.get('http://localhost:3000/api/product/recommended', {
      headers: {
        Authorization: `${accessToken}`, // Include the access token in the request headers
      },
    })
      .then(response => {
        this.setState({ recommendedProducts: response.data.data }); // Update state with recommended products
      })
      .catch(error => {
        console.error('Error fetching recommended products:', error);
      });
  }
  render() {
    const { recommendedProducts } = this.state;
    console.log(recommendedProducts);
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-5.jpg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/banners/banner-2.jpg' className='mb-3' />
              <img src='/images/banners/banner-6.jpg' />
            </div>
          </Col>
        </Row>
        {/* Render recommended products */}
        <h1 style={{margin:'30px 0'}}>
          Recommended Products
        </h1>
        <Row>
          {recommendedProducts?.map((product, index) => (
             <Col key={index} xs='12' lg='4' className='mb-3 px-3 px-md-2'>
             <div className='recommended-product'>
               {/* Render product details */}
               <div className='recommended-product-container'>
                 <img src={product.imageUrl} alt={product.name} className='recommended-product-image' />
                 <h3>{product.name}</h3>
                 <p>{product.description}</p>
                 <div className="d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer">
                  <p className="price mb-0">Rs. {product.price}</p>
                  <p className="mb-0">
                    <span className="fs-16 fw-normal mr-1">{product.avgReview}</span>
                    <span className="fa fa-star checked" ></span>
                   </p>
                  </div>
               </div>
             </div>
           </Col>
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
