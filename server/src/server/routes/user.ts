import { Router } from 'express';
const router = Router();

import UserController from '../controllers/user'
import HolidayController from '../controllers/holiday'
import HourRegistryController from '../controllers/hourregistry'
import OfferController from '../controllers/offer'
import { TokenValidation } from '../libs/verifyToken'

const userController = new UserController
const holidayController = new HolidayController
const hourregistryController = new HourRegistryController
const offerController = new OfferController

router.get('/', TokenValidation, userController.getUsers);
router.get('/:id', TokenValidation, userController.getUser);
router.get('/:user/holidays', TokenValidation, holidayController.getHolidaysByUser);
router.get('/:user/hourregistries', TokenValidation, hourregistryController.getHourRegistriesByUser);
router.post('/', TokenValidation, userController.createUser);
router.post('/:user/offers/:id', TokenValidation, offerController.applyUserToOffer);
router.put('/:id', TokenValidation, userController.editUser);
router.delete('/:id', TokenValidation, userController.deleteUser);

export default router;
