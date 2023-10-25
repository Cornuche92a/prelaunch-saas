// ** MUI Imports
import {deepmerge} from '@mui/utils'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import {ThemeProvider, createTheme, responsiveFontSizes} from '@mui/material/styles'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Direction component for LTR or RTL
import Direction from 'src/layouts/components/Direction'

// ** Theme Override Imports
import overrides from './overrides'
import typography from './typography'

// ** Theme
import themeOptions from './ThemeOptions'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'

function ThemeComponent(props) {
  // ** Props
  const {children} = props


  const settings = themeConfig

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Deep Merge Component overrides of core and user
  const mergeComponentOverrides = (theme, settings) =>
    deepmerge({...overrides(theme, settings)}, UserThemeOptions()?.components)

  // ** Deep Merge Typography of core and user
  const mergeTypography = theme => deepmerge(typography(theme), UserThemeOptions()?.typography)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: {...mergeComponentOverrides(theme, settings)},
    typography: {...mergeTypography(theme)}
  })

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings?.direction || 'ltr'}>
        <CssBaseline/>
        <GlobalStyles styles={() => GlobalStyling(theme, settings)}/>
        {children}
      </Direction>
    </ThemeProvider>
  )
}

export default ThemeComponent
