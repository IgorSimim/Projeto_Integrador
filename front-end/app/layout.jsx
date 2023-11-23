import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Providers } from '@/components/Providers';
import Card from '@/components/cards';
import Titulo from '@/components/Titulo';

export const metadata = {
  title: 'Social Pet',
  description: 'A rede social dos pets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <link rel="shortcut icon" href="me_adota.png" type="image/x-icon" />
      <body>
        <Providers>
          <Titulo/>
          {children}
          <Card/>
        </Providers>
      </body>
    </html>
  )
}
