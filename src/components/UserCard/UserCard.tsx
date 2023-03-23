import { UserCard as TUserCard } from 'models/User'
import { PureComponent } from 'react'

type UserCardProperties = {
  data: TUserCard
}

export class UserCard extends PureComponent<UserCardProperties> {
  render() {
    const {
      data: { birthdate, country, profilePicture, sex, subscribe, username },
    } = this.props

    const image = URL.createObjectURL(profilePicture)

    return (
      <div className="flex max-w-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-md shadow-violet-100 hover:border-violet-500 hover:ring hover:ring-violet-300 hover:ring-offset-4">
        <div className="mx-auto h-36 w-36 overflow-hidden rounded-full">
          <img
            aria-label="image"
            loading="lazy"
            className="h-full w-full object-cover"
            src={image}
            alt={image}
          />
        </div>
        <span className="font-semibold line-clamp-1">{username}</span>
        <span>{sex}</span>
        <span>{birthdate.toLocaleDateString()}</span>
        <span>{country}</span>
        <span>{subscribe ? 'subscribed' : 'not subscribed'}</span>
      </div>
    )
  }
}
