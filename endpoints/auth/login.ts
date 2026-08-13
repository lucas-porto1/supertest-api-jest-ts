import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';
import type { AuthPayload } from '../../test-data/requests/auth.payloads.js';

const { apiKey } = getApiEnvironment();
const loginEndpoint = '/login';

export async function postLogin(body: AuthPayload) {
  const response = await request
    .post(loginEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
}
