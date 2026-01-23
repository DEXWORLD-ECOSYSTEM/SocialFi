import type { IUserItem } from 'src/types/user';

import { _mock } from 'src/_mock';

import { UserCreateEditForm } from 'src/sections/user/user-create-edit-form';

// ----------------------------------------------------------------------

export const runtime = 'nodejs';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEditPage({ params }: Props) {
  const { id } = await params;

  const currentUser = {
    id: _mock.id(1),
    role: _mock.role(1),
    email: _mock.email(1),
    name: _mock.fullName(1),
    state: 'Rio de Janeiro',
    status: 'active',
    address: _mock.fullAddress(1),
    country: 'Brazil', 
    avatarUrl: _mock.image.avatar(1),
    phoneNumber: _mock.phoneNumber(1),
    // CORREÇÃO: Usando string fixa ou tentativa de acesso seguro para evitar erro de tipo
    company: 'ASPPIBRA', 
    isVerified: true,
    city: 'Paraty',
    zipCode: '23970-000',
  } as IUserItem;

  return <UserCreateEditForm currentUser={currentUser} />;
}