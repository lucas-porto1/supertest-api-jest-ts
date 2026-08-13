import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';
import type { UserPayload } from '../../test-data/requests/user.payloads.js';

const { apiKey } = getApiEnvironment();
const usersEndpoint = '/users';

type QueryParameters = Record<string, string | number | boolean>;

export async function getUsers(query: QueryParameters = {}) {
  const response = await request
    .get(usersEndpoint)
    .set('x-api-key', apiKey)
    .query(query)
    .accept('application/json');

  return response;
}

export async function getUserById(id: number) {
  const response = await request
    .get(`${usersEndpoint}/${id}`)
    .set('x-api-key', apiKey)
    .accept('application/json');

  return response;
}

export async function postUser(body: UserPayload) {
  const response = await request
    .post(usersEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
}
