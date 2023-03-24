import { Checkbox, Input, InputFile, RadioGroup, Select } from 'components/Forms'
import { UserCard } from 'components/UserCard/UserCard'
import { countries } from 'data/countries.json'
import { genderOptions } from 'data/gender.json'
import { UserCard as TUserCard, UserSchema as FormSchema } from 'models/User'
import { Component, createRef, type FormEvent, type MutableRefObject } from 'react'
import { convertErrorsToString, getTodayDate } from 'utils'
import { z } from 'zod'

type FormState = z.inferFormattedError<typeof FormSchema> & { cards: TUserCard[] }

const initialStateForReset = {
  username: undefined,
  birthdate: undefined,
  country: undefined,
  profilePicture: undefined,
  subscribe: undefined,
  sex: undefined,
}

export class Form extends Component<Record<string, unknown>, FormState> {
  private usernameRef = createRef<HTMLInputElement>()

  private birthdateRef = createRef<HTMLInputElement>()

  private countryRef = createRef<HTMLSelectElement>()

  private profilePictureRef = createRef<HTMLInputElement>()

  private subscribeRef = createRef<HTMLInputElement>()

  private sexRef: MutableRefObject<HTMLInputElement[] | null> = createRef()

  constructor(properties: Record<string, string>) {
    super(properties)
    this.state = {
      _errors: [],
      cards: [],
    }

    this.sexRef.current = []
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = {
      username: this.usernameRef?.current?.value,
      birthdate: this.birthdateRef?.current?.value,
      country: this.countryRef?.current?.value,
      profilePicture: this.profilePictureRef?.current?.files?.[0],
      subscribe: this.subscribeRef?.current?.checked,
      sex: this.sexRef.current?.find((element) => element.checked)?.value,
    }

    const validatedFormData = FormSchema.safeParse(formData)

    if (!validatedFormData.success) {
      this.setState({
        ...initialStateForReset,
        ...validatedFormData.error.format(),
      })

      return
    }

    this.setState((previousState) => ({
      ...initialStateForReset,
      cards: [...previousState.cards, validatedFormData.data],
    }))

    event.currentTarget.reset()
  }

  render() {
    const { username, birthdate, sex, cards, profilePicture } = this.state

    return (
      <div className="mx-auto px-12">
        <div className="mx-auto my-4 w-1/3">
          <form
            onSubmit={this.handleSubmit}
            className="flex flex-col gap-4"
          >
            <Input
              isInvalid={!!username}
              errorMessage={convertErrorsToString(username)}
              label="Username"
              name="username"
              forwardRef={this.usernameRef}
            />
            <Input
              isInvalid={!!birthdate}
              errorMessage={convertErrorsToString(birthdate)}
              type="date"
              max={getTodayDate()}
              label="Date of birth"
              name="birthdate"
              forwardRef={this.birthdateRef}
            />
            <Select
              forwardRef={this.countryRef}
              label="Country"
              name="country"
              options={countries}
            />
            <Checkbox
              label="Email me news and special offers"
              name="subscribe"
              forwardRef={this.subscribeRef}
            />
            <RadioGroup
              isInvalid={!!sex}
              errorMessage={convertErrorsToString(sex)}
              name="sex"
              forwardRef={this.sexRef}
              options={genderOptions}
            />
            <InputFile
              isInvalid={!!profilePicture}
              errorMessage={convertErrorsToString(profilePicture)}
              label="Profile Picture"
              name="profilePicture"
              forwardRef={this.profilePictureRef}
            />
            <button
              className="border"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
        <div className="my-4 flex flex-wrap gap-4">
          {cards.map((card) => (
            <UserCard
              key={Math.random()}
              data={card}
            />
          ))}
        </div>
      </div>
    )
  }
}
