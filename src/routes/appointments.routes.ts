import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentsRepositoy';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) =>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({provider, date: parsedDate});

    return response.json(appointment);
  } catch(err) {
    return response.status(404).json({ error: err.message });
  }
});

export default appointmentsRouter;
