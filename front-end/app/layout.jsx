import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Script from 'next/script';
import '@/styles/global.css';
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'SocialPet',
  description: 'A rede social dos pets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="me_adota.png" />
      </head>
      <body>
        <ClienteProvider>
        <Header />
        {children}
        <Footer />
        </ClienteProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.bundle.min.js"
          crossOrigin="anonymous" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous" />
      </body>
    </html>
  )
}