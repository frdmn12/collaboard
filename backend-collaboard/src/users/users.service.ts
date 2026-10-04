import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  private repo(manager?: EntityManager) {
    return manager ? manager.getRepository(User) : this.users;
  }

  create(
    data: Pick<User, 'name' | 'email' | 'passwordHash'>,
    manager?: EntityManager,
  ) {
    const repo = this.repo(manager);
    return repo.save(repo.create(data));
  }

  findById(id: string) {
    return this.users.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.users.findOne({ where: { email } });
  }

  /** Hanya untuk login: memuat passwordHash yang biasanya disembunyikan. */
  findByEmailWithPassword(email: string) {
    return this.users
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .where('u.email = :email', { email })
      .getOne();
  }

  async updatePassword(
    id: string,
    passwordHash: string,
    manager?: EntityManager,
  ) {
    await this.repo(manager).update({ id }, { passwordHash });
  }

  async markEmailVerified(id: string, manager?: EntityManager) {
    await this.repo(manager).update({ id }, { emailVerifiedAt: new Date() });
  }
}
