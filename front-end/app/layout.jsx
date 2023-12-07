import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'styles/global.css'

import { Providers } from '@/components/Providers';
import Footer from '../components/footer';
import Header from '../components/header';

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
          <Header />
          
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
