export interface DesktopAuthConfiguration {
  clientId: string
  serverUrl: string
}

export const desktopAuthConfiguration: DesktopAuthConfiguration = {
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID || 'lyra-stage-electron',
  serverUrl: import.meta.env.VITE_SERVER_URL || 'https://api.lyra.build',
}
