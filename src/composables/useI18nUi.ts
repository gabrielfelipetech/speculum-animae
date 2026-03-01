import { computed } from 'vue'
import { useI18n } from '#imports'

type LocaleOption = {
  code: string
  label: string
}

type LocaleEntry = string | { code: string }

function getLocaleCode(entry: LocaleEntry): string {
  return typeof entry === 'string' ? entry : entry.code
}

export function useI18nUi() {
  const { locale, locales, t } = useI18n()

  const availableLocales = computed<LocaleOption[]>(() => {
    const list = Array.isArray(locales.value) ? (locales.value as LocaleEntry[]) : []
    return list.map((entry) => {
      const code = getLocaleCode(entry)
      return { code, label: getLocaleLabel(code) }
    })
  })

  const currentLocaleLabel = computed(() => {
    const match = availableLocales.value.find((item) => item.code === locale.value)
    if (match) return match.label
    return getLocaleLabel(locale.value || 'pt-BR')
  })

  function getLocaleLabel(code: string): string {
    if (code === 'pt-BR') return t('language.pt')
    if (code === 'en') return t('language.en')
    if (code === 'es') return t('language.es')
    return code
  }

  async function setLocaleSafe(code: string): Promise<void> {
    const match = availableLocales.value.find((item) => item.code === code)
    const next = match?.code ?? 'pt-BR'
    if (locale.value !== next) {
      locale.value = next
    }
  }

  return {
    locale,
    locales,
    t,
    availableLocales,
    currentLocaleLabel,
    setLocaleSafe,
  }
}
