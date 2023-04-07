import { FormFields } from 'pages'

export type TUserCard = Omit<FormFields, 'profilePicture' | 'subscribe'> & {
  profilePicture: File
  subscribe: string
}

type UserCardProperties = {
  data: TUserCard
}

export const UserCard = ({
  data: { birthdate, country, profilePicture, sex, subscribe, username },
}: UserCardProperties) => {
  const image = URL.createObjectURL(profilePicture)

  return (
    <div className='flex max-w-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-md shadow-violet-100 hover:border-violet-500 hover:ring hover:ring-violet-300 hover:ring-offset-4'>
      <div className='mx-auto h-36 w-36 overflow-hidden rounded-full'>
        <img
          aria-label='image'
          loading='lazy'
          className='h-full w-full object-cover'
          src={image}
          alt={image}
        />
      </div>
      <span className='line-clamp-1 font-semibold'>{username}</span>
      <span>{sex}</span>
      <span>{birthdate}</span>
      <span>{country}</span>
      <span>{subscribe ? 'subscribed' : 'not subscribed'}</span>
    </div>
  )
}
