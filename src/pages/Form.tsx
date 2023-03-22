import { Checkbox, Input, InputFile, RadioGroup, Select } from 'components/Forms'
import { Component, createRef, type FormEvent, type MutableRefObject } from 'react'
import { z } from 'zod'

const countries = ['Россия', 'Казахстан', 'США']
const genderOptions = [
  { id: 0, label: 'Male' },
  { id: 1, label: 'Female' },
]
const today = new Intl.DateTimeFormat('fr-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(Date.now())

const FormSchema = z.object({
  username: z.string().min(3).max(20),
  birthdate: z.coerce.date(),
  country: z.string(),
  profilePicture: z.custom<File>((v) => v instanceof File),
  subscribe: z.boolean(),
  sex: z.enum(['Male', 'Female']),
})

type FormState = z.inferFormattedError<typeof FormSchema> & { cards: z.infer<typeof FormSchema>[] }

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

    this.setState({
      _errors: [],
      username: undefined,
      birthdate: undefined,
      sex: undefined,
    })

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
      this.setState(validatedFormData.error.format())
      return
    }

    this.setState((previousState) => ({
      cards: [...previousState.cards, validatedFormData.data],
    }))
  }

  render() {
    const { username, birthdate, sex, cards } = this.state

    return (
      <div className="mx-auto my-4 w-[300px]">
        <form
          onSubmit={this.handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            isInvalid={!!username}
            errorMessage={username?._errors.join(', ')}
            label="Username"
            name="username"
            forwardRef={this.usernameRef}
          />
          <Input
            isInvalid={!!birthdate}
            errorMessage={birthdate?._errors.join(', ')}
            type="date"
            max={today}
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
            errorMessage={sex?._errors.join(', ')}
            name="sex"
            forwardRef={this.sexRef}
            options={genderOptions}
          />
          <InputFile
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
        {cards.map((card) => (
          <div key={`${card.username}${Math.random()}`}>{JSON.stringify(card)}</div>
        ))}
      </div>
    )
  }
}
