import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Titulo from '@/components/Titulo';
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'SocialPet',
  description: 'A rede social dos pets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/cinema.ico" />
      </head>
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
