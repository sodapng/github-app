import { type TUserCard } from 'components'
import { type FormFields } from 'pages'

export const formatUserCardData = ({
  birthdate,
  profilePicture,
  subscribe,
  ...rest
}: FormFields): TUserCard => {
  return {
    ...rest,
    birthdate: new Date(birthdate).toLocaleDateString(),
    profilePicture: profilePicture[0],
    subscribe: subscribe ? 'subscribed' : 'not subscribed',
  }
}
