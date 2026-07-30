export interface CreateSettingsDTO {
  profile: ProfileData
  payment: PaymentData
  preferences: PreferencesData
}

export interface UpdateSettingsDTO extends Partial<CreateSettingsDTO> {}

export interface ProfileData {
  nome: string
  crea: string
  email: string
  foto: string
}

export interface PaymentData {
  cardNumber: string
  holderName: string
  expiry: string
  brand: string
  last4: string
}

export interface PreferencesData {
  theme: "light" | "dark"
  notifications: boolean
}

export interface Settings {
  profile: ProfileData
  payment: PaymentData
  preferences: PreferencesData
  updatedAt: string
}