import { Checkbox } from 'components/Form/Checkbox'
import { Input } from 'components/Form/Input'
import { InputFile } from 'components/Form/InputFile'
import { Radio } from 'components/Form/Radio'
import { Select } from 'components/Form/Select'
import { Component, createRef } from 'react'
import { z } from 'zod'

const countries = ['Россия', 'Казахстан', 'США']
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

type FormState = z.inferFormattedError<typeof FormSchema>

export class Form extends Component<Record<string, unknown>, FormState> {
  private usernameRef = createRef<HTMLInputElement>()

  private birthdateRef = createRef<HTMLInputElement>()

  private countryRef = createRef<HTMLSelectElement>()

  private profilePictureRef = createRef<HTMLInputElement>()

  private subscribeRef = createRef<HTMLInputElement>()

  private sexMaleRef = createRef<HTMLInputElement>()

  private sexFemaleRef = createRef<HTMLInputElement>()

  constructor(properties: Record<string, string>) {
    super(properties)
    this.state = {
      _errors: [],
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      sex: (() => {
        if (this.sexMaleRef.current?.checked && this.sexMaleRef.current.value === 'Male') {
          return 'Male'
        }
        if (this.sexFemaleRef.current?.checked && this.sexFemaleRef.current.value === 'Female') {
          return 'Female'
        }
      })(),
    }

    const validatedFormData = FormSchema.safeParse(formData)

    if (!validatedFormData.success) {
      this.setState(validatedFormData.error.format())
    }
  }

  render() {
    const { username, birthdate, sex } = this.state

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
          <div>
            <div className="flex gap-4">
              <Radio
                label="Male"
                name="sex"
                forwardRef={this.sexMaleRef}
              />
              <Radio
                label="Female"
                name="sex"
                forwardRef={this.sexFemaleRef}
              />
            </div>
            {sex && <span className="block text-red-700">Error: {sex?._errors.join(', ')}</span>}
          </div>
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
      </div>
    )
  }
}
