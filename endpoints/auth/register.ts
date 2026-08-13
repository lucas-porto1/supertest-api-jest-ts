import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';
import type { AuthPayload } from '../../test-data/requests/auth.payloads.js';

const { apiKey } = getApiEnvironment();
const registerEndpoint = '/register';

export async function postRegister(body: AuthPayload) {
  const response = await request
    .post(registerEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
}
