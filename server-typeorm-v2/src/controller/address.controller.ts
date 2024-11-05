import AppDataSource from '../../data-source';
import { Request, Response } from 'express';
import { Address } from '../entity/Address.entity';
import { User } from '../entity/User.entity';

export class AddressController {
  private addressRepository = AppDataSource.getRepository(Address);
  private userRepository = AppDataSource.getRepository(User);

  async allAddress(_: Request, response: Response) {
    try {
      const users = await this.addressRepository.find();
      response.status(201).json({
        status: true,
        message: `user successfully fetched`,
        data: users,
      });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async oneAddress(request: Request, response: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: request.params.username },
      });
      if (!user) {
        return 'please check the username if it exist';
      }
      const address = await this.addressRepository.findOne({
        relations: {
          user: true,
        },
        loadRelationIds: true,
        where: {
          user: { id: user.id },
        },
      });

      if (!address) {
        return 'unregistered address';
      }
      return address;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async saveAddress(request: Request, response: Response) {
    try {
      const address = Object.assign(new Address(), {
        ...request.body,
      });
      const user = await this.userRepository.findOne({
        where: { username: request.body.username },
      });

      if (!user) {
        return response
          .status(400)
          .send(
            'user with username does not exist, do you have an account with username?',
          );
      }

      const savedAddress = await this.addressRepository.save({
        ...address,
        user: user,
      });

      response.status(201).json({
        status: true,
        message: `address updated successfully`,
        data: savedAddress,
      });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async updateAddress(request: Request, response: Response) {
    try {
      const { username } = request.params;
      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (!user) {
        return response.status(400).json('user name not found');
      }
      const address = await this.addressRepository.findOne({
        relations: {
          user: true,
        },
        loadRelationIds: true,
        where: {
          user: { id: user.id },
        },
      });

      if (!address) {
        return 'unregistered address';
      }
      address.street = request.body.street;
      address.street2 = request.body.street2;
      address.city = request.body.city;
      address.state_province_code = request.body.state_province_code;
      address.state_province_name = request.body.state_province_name;
      address.postal_code = request.body.postal_code;
      address.country_code = request.body.country_code;
      address.location = request.body.location;
      address.country = request.body.country;
      const res = await this.addressRepository.save(address);
      response.status(201).json({
        status: true,
        message: 'password changed successfully',
        data: res,
      });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async removeAddress(
    request: Request<{ username: string }>,
    response: Response,
  ) {
    try {
      const username = request.params.username;
      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (!user) {
        return response.status(400).send('user name not found');
      }

      const addressToRemove = await this.addressRepository.findOneBy({
        user: { id: user.id },
      });

      if (!addressToRemove) {
        return 'this address not exist';
      }

      await this.addressRepository.remove(addressToRemove);

      response.status(201).send('address deleted successfully');
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }
}