import { type TUserCard, UserCard } from 'components'
import {
  Checkbox,
  DatePicker,
  Input,
  InputFile,
  RadioGroup,
  Select,
  Submit,
} from 'components/Forms'
import countriesOptions from 'data/countries.json'
import genderOptions from 'data/gender.json'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { formatUserCardData, getTodayDate } from 'utils'

export type FormFields = {
  username: string
  birthdate: string
  country: string
  profilePicture: FileList
  subscribe: boolean
  sex: string
}

export function Form() {
  const [cards, setCards] = useState<TUserCard[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormFields>({
    mode: 'onChange',
  })

  useEffect(() => {
    reset()
  }, [reset, isSubmitSuccessful])

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setCards((previous) => {
      return [...previous, formatUserCardData(data)]
    })
  }

  return (
    <div className="mx-auto px-12">
      <div className="mx-auto my-4 w-1/3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          data-testid="form"
        >
          <Input
            label="Username"
            name="username"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
              minLength: {
                value: 5,
                message: 'String must contain at least 5 character(s)',
              },
              maxLength: {
                value: 32,
                message: 'String must contain at most 32 character(s)',
              },
              pattern: {
                value: /^[A-Za-z]\w+$/,
                message: 'You can use the characters A-Z, a-z, 0-9 and underscore',
              },
            }}
          />
          <DatePicker
            label="Date of birth"
            name="birthdate"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
              max: getTodayDate(),
            }}
          />
          <Select
            label="Country"
            name="country"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
            }}
            options={countriesOptions}
          />
          <Checkbox
            label="Email me news and special offers"
            name="subscribe"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
            }}
          />
          <RadioGroup
            name="sex"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
            }}
            options={genderOptions}
          />
          <InputFile
            label="Profile Picture"
            name="profilePicture"
            register={register}
            errors={errors}
            rules={{
              required: 'Required',
            }}
          />
          <Submit value="Send" />
        </form>
      </div>
      <div className="my-6 flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <UserCard
            key={`${card.username}${index}`}
            data={card}
          />
        ))}
      </div>
    </div>
  )
}
