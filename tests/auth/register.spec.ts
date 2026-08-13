import { describe, expect, test } from '@jest/globals';
import Joi from 'joi';
import { getTestUser } from '../../config/environment.js';
import { postRegister } from '../../endpoints/auth/register.js';
import { createAuthPayload } from '../../test-data/requests/auth.payloads.js';
import { authErrorResponses } from '../../test-data/responses/expected/auth.responses.js';
import { registerResponseSchema } from '../../test-data/responses/schemas/auth.schemas.js';

describe('Registration', () => {
  test('returns an id and token for a defined user', async () => {
    const payload = createAuthPayload(getTestUser());
    const response = await postRegister(payload);

    expect(response.status).toBe(200);
    Joi.assert(response.body, registerResponseSchema);
  });

  test('rejects an unknown user', async () => {
    const payload = createAuthPayload({
      email: 'unknown.user@example.com',
      password: 'test-password',
    });
    const response = await postRegister(payload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(authErrorResponses.unknownUser);
  });

  test('requires an email', async () => {
    const { password } = getTestUser();
    const response = await postRegister(createAuthPayload({ password }));

    expect(response.status).toBe(400);
    expect(response.body).toEqual(authErrorResponses.missingEmail);
  });

  test('requires a password', async () => {
    const { email } = getTestUser();
    const response = await postRegister(createAuthPayload({ email }));

    expect(response.status).toBe(400);
    expect(response.body).toEqual(authErrorResponses.missingPassword);
  });
});
