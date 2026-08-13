export interface UserAddress {
  city: string;
  country: string;
}

export interface UserPayload {
  name: string;
  job: string;
  email: string;
  department: string;
  active: boolean;
  skills: string[];
  address: UserAddress;
}

export type UserPayloadOverrides = Omit<Partial<UserPayload>, 'address'> & {
  address?: Partial<UserAddress>;
};

const defaultUser: UserPayload = {
  name: 'Lucas Porto',
  job: 'Senior QA Engineer',
  email: 'lucas@example.com',
  department: 'Quality Engineering',
  active: true,
  skills: ['API Testing', 'Automation'],
  address: {
    city: 'Porto Alegre',
    country: 'Brazil',
  },
};

export function createUserPayload(overrides: UserPayloadOverrides = {}): UserPayload {
  return {
    ...defaultUser,
    ...overrides,
    skills: overrides.skills ?? [...defaultUser.skills],
    address: {
      ...defaultUser.address,
      ...overrides.address,
    },
  };
}
