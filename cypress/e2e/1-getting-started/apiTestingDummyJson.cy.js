/// <reference types="cypress" />

describe('API Test with Cypress', () => {
  it('Test GET Request', () => {
      cy.request('GET', 'https://dummyjson.com/products/1')
          .then((response) => {
              expect(response.status).to.eq(200);
              expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
              expect(response.body.id).to.eq(1);
              expect(response.body.title).to.eq("iPhone 9");
              expect(response.body.description).to.eq("An apple mobile which is nothing like apple");
              expect(response.body.price).to.eq(549);
              expect(response.body.discountPercentage).to.eq(12.96);
              expect(response.body.rating).to.eq(4.69);
              expect(response.body.stock).to.eq(94);
              expect(response.body.brand).to.eq("Apple");
              expect(response.body.category).to.eq("smartphones");
              expect(response.body.thumbnail).to.eq("https://i.dummyjson.com/data/products/1/thumbnail.jpg");
              expect(response.body.images).to.be.an('array').that.includes(
                  "https://i.dummyjson.com/data/products/1/1.jpg",
                  "https://i.dummyjson.com/data/products/1/2.jpg",
                  "https://i.dummyjson.com/data/products/1/3.jpg",
                  "https://i.dummyjson.com/data/products/1/4.jpg",
                  "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              );
          });
  });

  it('Test POST Request', () => {
    const newProduct = {
        "id": 101,
        "title": "iPhone 10",
        "description": "The next generation of Apple mobile devices",
        "price": 699,
        "discountPercentage": 10.50,
        "rating": 4.9,
        "stock": 50,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    };
    cy.request('POST', 'https://dummyjson.com/products/add', newProduct)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
            expect(response.body).to.have.property('id', newProduct.id);
            expect(response.body.title).to.eq(newProduct.title);
        });
  });
  it('Test PUT Request', () => {
    const updatedProduct = {
        "title": "iPhone 9S",
        "description": "An updated version of the iPhone 9",
        "price": 559,
    };
    cy.request('PUT', 'https://dummyjson.com/products/1', updatedProduct)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
            expect(response.body.title).to.eq(updatedProduct.title);
            expect(response.body.description).to.eq(updatedProduct.description);
            expect(response.body.price).to.eq(updatedProduct.price );
        });
  });
  it.only('Test DELETE Request', () => {
    cy.request('DELETE', 'https://dummyjson.com/products/1')
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
        });
  });
});
