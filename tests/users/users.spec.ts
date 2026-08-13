import { describe, expect, test } from '@jest/globals';
import Joi from 'joi';
import { getUserById, getUsers, postUser } from '../../endpoints/users/users.js';
import { createUserPayload } from '../../test-data/requests/user.payloads.js';
import {
  createdUserResponseSchema,
  singleUserResponseSchema,
  usersListResponseSchema,
} from '../../test-data/responses/schemas/users.schemas.js';

describe('Users', () => {
  test('returns a paginated list of users', async () => {
    const response = await getUsers({ page: 2 });

    expect(response.status).toBe(200);
    expect(response.body.page).toBe(2);
    Joi.assert(response.body, usersListResponseSchema);
  });

  test('returns a user by id', async () => {
    const userId = 2;
    const response = await getUserById(userId);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(userId);
    Joi.assert(response.body, singleUserResponseSchema);
  });

  test('creates a user with customized data', async () => {
    const payload = createUserPayload({
      job: 'QA Lead',
      address: {
        city: 'Sao Paulo',
      },
    });
    const response = await postUser(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: payload.name,
      job: payload.job,
      email: payload.email,
      department: payload.department,
      active: payload.active,
    });
    expect(response.body.skills).toEqual(payload.skills);
    expect(response.body.address).toEqual(payload.address);
    Joi.assert(response.body, createdUserResponseSchema);
  });

  test('returns 404 for an unknown user', async () => {
    const response = await getUserById(999_999);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
