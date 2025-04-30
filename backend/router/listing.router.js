const express = require('express');
const {
  addListing,
  allListing,
  getListById,
  updateListing,
  updateListingImage,
  deleteListing,
  searchProduct,
} = require('../controllers/list.controller.js');

const upload = require('../middleware/fileUpload.middleware.js');
const verifyToken = require('../middleware/auth.middleware.js');


const router = express.Router();

router.post('/', verifyToken, upload.single('imageName'), addListing);  

router.get('/', allListing);
router.get('/:id', getListById);
router.put('/image/:id', verifyToken ,upload.single('imageName'), updateListingImage); 
router.put('/:id', verifyToken, upload.single('imageName'), updateListing);
router.delete('/:id', verifyToken, deleteListing);
router.get('/search/:search', searchProduct);

module.exports = router;
