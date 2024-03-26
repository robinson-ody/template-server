import { RequestHandler } from 'express';
import { User } from '../../../models/user';

const get_all_users_controller: RequestHandler = async (_req, res) => {
  const all_users = await User.find();
  res.status(200).json({ message: `Get all users success!`, data: all_users });
};

export default get_all_users_controller;
