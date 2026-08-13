import { describe, expect, test } from '@jest/globals';
import Joi from 'joi';
import { getTestUser } from '../../config/environment.js';
import { postLogin } from '../../endpoints/auth/login.js';
import { createAuthPayload } from '../../test-data/requests/auth.payloads.js';
import { loginResponseSchema } from '../../test-data/responses/schemas/auth.schemas.js';

describe('Login', () => {
  test('returns a token for valid credentials', async () => {
    const response = await postLogin(createAuthPayload(getTestUser()));

    expect(response.status).toBe(200);
    Joi.assert(response.body, loginResponseSchema);
  });
});
