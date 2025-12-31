import React from 'react';


// Create a function that takes token as parameter
export const getAdminMenuItems = (token) => [
  {
    id: 1,
    name: 'Dashboard',
    path: `/admin/${encodeURIComponent(token)}/dashboard`,
  },
  {
    id: 2,
    name: 'New Product and Sizes',
    path: `/admin/${encodeURIComponent(token)}/new-product-sizes`,
  },
  // {
  //   id: 3,
  //   name: 'Add Product Catalogue',
  //   path: `/admin/${encodeURIComponent(token)}/categories`,
  // },
  // {
  //   id: 4,
  //   name: 'Product List',
  //   path: `/admin/${encodeURIComponent(token)}/products`,
  //   icon: <Inventory />
  // },
  // {
  //   id: 5,
  //   name: 'Catalogue Management',
  //   path: `/admin/${encodeURIComponent(token)}/catalogue`,
  //   icon: <PhotoLibrary />
  // },
  // {
  //   id: 6,
  //   name: 'Settings',
  //   path: `/admin/${encodeURIComponent(token)}/settings`,
  //   icon: <Settings />
  // }
];