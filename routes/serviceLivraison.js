import express from 'express';
import { getAllDelivery, getDeliveryById, createDelivery, updateDelivery, deleteDelivery } from '../controllers/serviceLivraisonController.js';
import { validateDelivery } from '../middleware/validate.js';

const router = express.Router();

router.get('/serviceLivraison', getAllDelivery);
router.get('/serviceLivraison/:id', getDeliveryById);
router.post('/serviceLivraison', validateDelivery, createDelivery);
router.put('/serviceLivraison/:id', validateDelivery, updateDelivery);
router.delete('/serviceLivraison/:id', deleteDelivery);

export default router;