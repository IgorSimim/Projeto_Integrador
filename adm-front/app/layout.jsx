import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'
import Titulo from '@/components/Titulo'


export const metadata = {
  title: 'Controle de Usuários e suas postagens',
  description: 'Sistema de Controle de Usuários e Postagens',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="../me_adota.png" type="image/x-icon" />
      </head>
      <body>
        <Titulo />
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous" />
        {/* <Script src="bootstrap/dist/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous" /> */}
      </body>
    </html>
  )
}